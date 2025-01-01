import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../../components/button";
import Header from '../../../components/header';
import TextField from '../../../components/textfield';

function ProfileSetup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    phoneNumber: '',
    gender: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login-customer');
    } else {
      fetchProfile(token);
    }
  }, [navigate]);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch('/api/user/profile/profiles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/user/profile/profile', {
        method: profile.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'Profile updated successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('An error occurred while saving the profile.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <><Header />
    <div className="min-h-screen flex items-start mt-10 justify-center bg-white font-open-sans">
      <form onSubmit={handleSubmit} className="p-8 rounded-xl shadow-lg w-full max-w-md" style={{ backgroundColor: 'rgba(152, 211, 191, 0.4)' }}>
        <h2 className="text-2xl text-center text-gray-800 mb-6"> Set Profile</h2>

        <div className="mb-4">
          <label htmlFor="Full Name" className="block text-black text-sm font-medium mb-2">Full Name</label>
          <TextField
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="Phone Number" className="block text-black text-sm font-medium mb-2">Phone Number</label>
          <TextField
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="Gender" className="block text-black text-sm font-medium mb-2">Gender</label>
          <TextField
            type="text"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-black text-sm font-medium mb-2">Email Address</label>
          <TextField
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <Button type="submit" className="w-full py-3  text-white rounded-md hover:bg-green-600 transition duration-300 bg-[#80CBB2] ">
          Save Profile
        </Button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
      </form>
    </div></>
  );
}

export default ProfileSetup;

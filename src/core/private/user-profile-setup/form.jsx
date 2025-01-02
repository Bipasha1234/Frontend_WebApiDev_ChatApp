import axios from 'axios'; // Ensure axios is imported
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import user from '../../../assets/images/user.png';
import Button from "../../../components/button";
import Header from '../../../components/header';
import TextField from '../../../components/textfield';

const ProfileSetup = () => {
  const navigate = useNavigate(); // Initialize navigate

  const [profile, setProfile] = useState({
    name: '',
    phoneNumber: '',
    aboutYou: '',
    image: null, // Add image state for image
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handling the image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("phoneNumber", profile.phoneNumber);
    formData.append("aboutYou", profile.aboutYou);
  
    // If there's an image, append it as well
    if (profile.image) {
      formData.append("image", profile.image);
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/user/profile/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile Created:', response.data);
      setSuccessMessage('Profile successfully created');
      
      // Redirect to the /chat route upon success
      navigate('/login-customer');
    } catch (error) {
      console.error('Error creating profile:', error.response ? error.response.data : error.message);
      setError('An error occurred while creating the profile.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-start mt-10 justify-center bg-white font-open-sans">
        <form onSubmit={handleSubmit} className="p-8 rounded-xl shadow-lg w-full max-w-md" style={{ backgroundColor: 'rgba(152, 211, 191, 0.4)' }}>
          <h2 className="text-2xl text-center text-gray-800 mb-6">Set Profile</h2>

          {/* image Section */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={profile.image ? URL.createObjectURL(profile.image) : user}
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <button
                type="button"
                onClick={() => document.getElementById('imageInput').click()}
                className="absolute bottom-0 right-0 bg-[#2f8e6f] p-2 rounded-full text-white"
              >
                <FaEdit size={16} />
              </button>
            </div>
          </div>

          {/* Hidden file input triggered by the FaEdit icon */}
          <input
            id="imageInput"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }} // Hide the file input
          />

          <div className="grid grid-cols-2 gap-x-2">
            <div className="mb-4">
              <label htmlFor="name" className="block text-black text-sm font-normal mb-2">Full Name</label>
              <TextField
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className=""
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-black text-sm font-normal mb-2">Phone Number</label>
              <TextField
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                className=""
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="aboutYou" className="block text-black text-sm font-normal mb-2">About You (Bio)</label>
            <TextField
              name="aboutYou"
              value={profile.aboutYou}
              onChange={handleChange}
              className=""
            >
            </TextField>
          </div>

          <div className="mt-6">
            <Button type="submit">
              Save Profile
            </Button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
          {!isFormValid && <p className="text-red-500 text-center mt-4">Please fill out all fields.</p>}
        </form>
      </div>
    </>
  );
};

export default ProfileSetup;

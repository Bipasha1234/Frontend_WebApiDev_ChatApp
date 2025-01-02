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

  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    aboutYou: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));

    // Clear error for the field being updated
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialize errors
    const newErrors = {
      name: '',
      phoneNumber: '',
    };

    let isValid = true;

    // Validate name
    if (!profile.name) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    // Validate phone number
    if (!profile.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(profile.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number.';
      isValid = false;
    }

    // Update errors state
    setErrors(newErrors);

    if (!isValid) {
      return; // Prevent form submission if there are errors
    }

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("phoneNumber", profile.phoneNumber);

    // Append aboutYou only if provided
    if (profile.aboutYou) {
      formData.append("aboutYou", profile.aboutYou);
    }

    if (profile.image) {
      formData.append("image", profile.image);
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/profile/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Profile Created:', response.data);
      navigate('/login-customer');
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-start mt-10 justify-center bg-white font-open-sans">
        <form onSubmit={handleSubmit} className="p-8 rounded-xl shadow-lg w-full max-w-md" style={{ backgroundColor: 'rgba(152, 211, 191, 0.4)' }}>
          <h2 className="text-2xl text-center text-gray-800 mb-6">Set Profile</h2>

          {/* Image Section */}
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
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-black text-sm font-normal mb-2">Phone Number</label>
              <TextField
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="aboutYou" className="block text-black text-sm font-normal mb-2">About You (Bio)</label>
            <TextField
              name="aboutYou"
              value={profile.aboutYou}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <Button type="submit">
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileSetup;

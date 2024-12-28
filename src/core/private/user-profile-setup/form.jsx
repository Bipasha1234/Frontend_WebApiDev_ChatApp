import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfileSetupForm() {
  const [userProfile, setUserProfile] = useState({
    name: "",
    phoneNumber: "",
    gender: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create the profile data payload
    const profileData = {
      name: userProfile.name,
      phoneNumber: userProfile.phoneNumber,
      gender: userProfile.gender,
      email: userProfile.email,
    };
  
    // Retrieve the token from localStorage (or from context)
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      // If no token exists, redirect to login or handle accordingly
      alert("Please log in to complete your profile setup.");
      navigate("/login");  // Redirect to login page
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/user/profile/profile", {
        method: "POST", // You can change this to PUT if updating an existing profile
        headers: {
          "Content-Type": "application/json", // Indicate that you're sending JSON data
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(profileData), // Send the profile data as the body
      });
  
      if (response.ok) {
        // If successful, redirect to the home page or dashboard
        navigate("/home");
      } else {
        // Handle errors if the response is not OK
        alert("Failed to save profile. Please try again.");
      }
    } catch (error) {
      // Catch and handle any network errors
      console.error("Error submitting profile:", error);
      alert("An error occurred while saving your profile. Please try again.");
    }
  };
  

  return (
    <div>
      <h1>Setup Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userProfile.name}
          onChange={handleInputChange}
        />
        <br />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={userProfile.phoneNumber}
          onChange={handleInputChange}
        />
        <br />
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={userProfile.gender}
          onChange={handleInputChange}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userProfile.email}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default UserProfileSetupForm;

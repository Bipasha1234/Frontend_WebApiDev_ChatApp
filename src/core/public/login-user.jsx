import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../../components/button.jsx";
import Header from "../../components/header.jsx";
import { useAuth } from "../../context/authContext.jsx";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    setError({ email: "", password: "" });

    if (!email || !password) {
      setError({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      const { token, role, userData } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role); 

      login(userData); 

      alert("Login successful!");

      if (role === "admin") {
        navigate("/admin"); 
      } else {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };
  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <><Header />
    <div className="min-h-screen flex items-start justify-center  mt-10 font-open-sans">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md" style={{ backgroundColor: 'rgba(152, 211, 191, 0.4)' }}>
        <h1 className="text-2xl font-medium text-center text-black mb-6">Sign In your Account</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              className={`w-full py-2 border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-black text-sm font-medium mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full py-2 border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          </div>
          <div className="mt-2 mb-2">
          <label className="inline-flex items-center text-xs">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4" />
            <span className="ml-2 text-gray-500">Remember Me</span>
          </label>
        </div>

          <Button
            type="submit"
            className={""}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign In"}
          </Button>
        </form>

        <div className="flex items-center text-xs justify-center mt-4">
          <hr className="border-t border-dashed border-gray-500 w-1/2 mr-2" />
          <span className="text-gray-500">OR</span>
          <hr className="border-t border-dashed border-gray-500 w-1/2 ml-2" />
        </div>

        <div className="mt-4">
          <button
            onClick={() => navigate('/login-customer-code')}
            className="w-full text-sm bg-white py-3 rounded-3xl text-black font-semibold"
            style={{ border: "1px solid #80CBB2" }}
          >
            Sign In with a Code
          </button>
        </div>

        <div onClick={handleForgotPasswordClick} className="mt-4 text-center cursor-pointer">
          <a className="text-gray-600 hover:text-gray-700 text-xs hover:underline">Forgot Password?</a>
        </div>
        <p className="text-right text-xs text-gray-700 hover:text-gray-700 mt-4">
          Do not have an account?{' '}
          <button
            onClick={handleSignUpClick} 
            className="hover:underline hover:text-gray-900 text-gray-700"
          >
            Sign Up
          </button>
        </p>

        
      </div>
    </div></>
  );
};

export default CustomerLogin;

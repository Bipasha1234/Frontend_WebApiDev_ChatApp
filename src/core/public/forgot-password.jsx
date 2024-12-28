import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: '',
  });

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError({ email: '', });

    let valid = true;

    // Client-side validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError((prevError) => ({ ...prevError, email: 'Please enter a valid email address' }));
      valid = false;
    }


    if (!valid) return;

    setLoading(true);
    setSuccess(false);

    const userData = { email, role: 'user' };

    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError({ email: data.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Error:', error);
      setError({ email: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password-verification');
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-open-sans">
      <div
        className="p-8 rounded-xl shadow-lg w-full max-w-md"
        style={{ backgroundColor: 'rgba(152, 211, 191, 0.4)' }}
      >
        <h2 className="text-2xl font-medium text-center text-black mb-2">Enter Your Email</h2>
        <h2 className="text-xs font-light text-center text-gray-500 mb-6">We will email you a code to reset your password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className=" block text-black text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full py-2 border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded-lg transition-all ${
              loading ? 'bg-[#80CBB2] cursor-not-allowed' : 'bg-[#80CBB2] hover:bg-[#90c9b8] hover:text-white'
            }`}
            disabled={loading}
            onClick={handleForgotPasswordClick}
          >
            {loading ? 'Processing...' : 'Send'}
           
          </button>
        </form>

       

        
      </div>
    </div>
  );
}

export default ForgotPassword;

import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError({ email: '', password: '', confirmPassword: '' });

    let valid = true;

    // Client-side validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError((prevError) => ({ ...prevError, email: 'Please enter a valid email address' }));
      valid = false;
    }

    if (password !== confirmPassword) {
      setError((prevError) => ({ ...prevError, confirmPassword: "Passwords don't match" }));
      valid = false;
    }

    if (password.length < 6) {
      setError((prevError) => ({ ...prevError, password: 'Password must be at least 6 characters' }));
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    setSuccess(false);

    const userData = { email, password, confirmPassword, role: 'user' };

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-open-sans">
      <div
        className="p-8 rounded-xl shadow-lg w-full max-w-md"
        style={{ backgroundColor: 'rgba(152, 211, 191, 0.4)' }}
      >
        <h2 className="text-2xl font-medium text-center text-black mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black font-normal mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-3 border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-black font-normal mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full p-3 border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-black font-normal mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`w-full p-3 border ${error.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error.confirmPassword && <p className="text-red-500 text-sm">{error.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className={`w-full p-3 text-white font-semibold rounded-lg transition-all ${
              loading ? 'bg-[#80CBB2] cursor-not-allowed' : 'bg-[#80CBB2] hover:bg-[#90c9b8] hover:text-white'
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-center text-green-600">
            Registration successful! Please check your email for verification.
          </p>
        )}

        <p className="text-right text-black mt-4">
          Already have an account?{' '}
          <a href="/signin" className="hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;

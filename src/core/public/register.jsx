// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../../src/core/public/store/useAuthStore.js";
// import Header from "../../components/header";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState({});
//   const [success, setSuccess] = useState(false);

//   const signup = useAuthStore((state) => state.signup);
//   const isSigningUp = useAuthStore((state) => state.isSigningUp);

//   const navigate = useNavigate();

//   const handleSignInClick = () => {
//     navigate("/login-customer");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     const newError = {};
//     if (!email) newError.email = "Email is required";
//     if (!password) newError.password = "Password is required";
//     if (password !== confirmPassword)
//       newError.confirmPassword = "Passwords do not match";

//     setError(newError);
//     if (Object.keys(newError).length > 0) return;

//     try {
//       await signup({ email, password });
//       setSuccess(true);
//     } catch (err) {
//       setError({ email: "Registration failed. Try again." });
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen flex items-start mt-10 justify-center bg-white font-open-sans">
//         <div
//           className="p-8 rounded-xl shadow-lg w-full max-w-md"
//           style={{ backgroundColor: "rgba(152, 211, 191, 0.4)" }}
//         >
//           <h2 className="text-2xl font-medium text-center text-black mb-6">
//             Create Your Account
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-black text-sm font-medium mb-2"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className={`w-full py-2 border ${
//                   error.email ? "border-red-500" : "border-gray-300"
//                 } rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               {error.email && (
//                 <p className="text-red-500 text-sm">{error.email}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block text-black text-sm font-medium mb-2"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className={`w-full py-2 border ${
//                   error.password ? "border-red-500" : "border-gray-300"
//                 } rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               {error.password && (
//                 <p className="text-red-500 text-sm">{error.password}</p>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-black text-sm font-medium mb-2"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 className={`w-full py-2 border ${
//                   error.confirmPassword ? "border-red-500" : "border-gray-300"
//                 } rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               {error.confirmPassword && (
//                 <p className="text-red-500 text-sm">
//                   {error.confirmPassword}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className={`w-full py-2 text-white font-semibold rounded-lg transition-all ${
//                 isSigningUp
//                   ? "bg-[#80CBB2] cursor-not-allowed"
//                   : "bg-[#80CBB2] hover:bg-[#90c9b8] hover:text-white"
//               }`}
//               disabled={isSigningUp}
//             >
//               {isSigningUp ? "Processing..." : "Sign Up"}
//             </button>
//           </form>

//           {success && (
//             <p className="mt-4 text-center text-green-600">
//               Registration successful
//             </p>
//           )}

//           <p className="text-right text-xs text-gray-500 mt-4">
//             Already have an account?{" "}
//             <button
//               onClick={handleSignInClick}
//               className="hover:underline text-gray-500"
//             >
//               Sign In
//             </button>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;



import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../src/core/public/store/useAuthStore.js";
import Header from "../../components/header.jsx";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";

    setError(errors);

    // If there are any errors, return false; otherwise, return true
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success) {
      // Proceed with sign-up logic if the form is valid
      await signup(formData);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-start mt-10 justify-center bg-white font-open-sans">
        <div
          className="p-8 rounded-xl shadow-lg w-full max-w-md"
          style={{ backgroundColor: "rgba(152, 211, 191, 0.4)" }}
        >
          <h2 className="text-2xl font-medium text-center text-black mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-black text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className={`w-full py-2 border ${error.fullName ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
              {error.fullName && <p className="text-red-500 text-sm">{error.fullName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`w-full py-2 border ${error.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-black text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full py-2 border ${error.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-white`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
            </div>

            <button
              type="submit"
              className={`w-full py-2 text-white font-semibold rounded-lg transition-all ${isSigningUp ? "bg-[#80CBB2] cursor-not-allowed" : "bg-[#80CBB2] hover:bg-[#90c9b8] hover:text-white"}`}
              disabled={isSigningUp}
            >
              {isSigningUp ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <p className="text-right text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login-customer" className="hover:underline text-gray-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { InfoProvider } from "./context/InfoContext.jsx";
import { AuthProvider, useAuth } from "./context/authContext.jsx";

// Lazy load components
const CustomerForm = lazy(() => import("./core/private/customer/form"));
const CustomerIndex = lazy(() => import("./core/private/customer"));
const UserProfileSetup = lazy(() => import("./core/private/user-profile-setup/form"));
const Home = lazy(() => import("./core/public/home"));
const Login = lazy(() => import("./core/public/login"));
const LoginCustomer = lazy(() => import("./core/public/login-customer"));
const LoginCustomerCode = lazy(() => import("./core/public/signin-code"));
const OtpVerification = lazy(() => import("./core/public/otp-verification"));
const ForgotPassword = lazy(() => import("./core/public/forgot-password"));
const ForgotPasswordVerification = lazy(() => import("./core/public/forgot-password-verification"));
const Register = lazy(() => import("./core/public/register"));
const Layout = lazy(() => import("./core/private/layout"));

function App() {
  return (
    <AuthProvider>
      <InfoProvider>
        <AuthRoutes />
      </InfoProvider>
    </AuthProvider>
  );
}

function AuthRoutes() {
  const { user } = useAuth(); // Now inside AuthProvider
  const isAdmin = user?.role === 'admin';  // Check if the user is an admin
  const isLoggedIn = user !== null; // Check if the user is logged in

  const publicRoutes = [
    { path: "/", element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense> },
    { path: "/login", element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense> },
    { path: "/login-customer", element: <Suspense fallback={<div>Loading...</div>}><LoginCustomer /></Suspense> },
    { path: "/login-customer-code", element: <Suspense fallback={<div>Loading...</div>}><LoginCustomerCode /></Suspense> },
    { path: "/otp-verification", element: <Suspense fallback={<div>Loading...</div>}><OtpVerification /></Suspense> },
    { path: "/forgot-password", element: <Suspense fallback={<div>Loading...</div>}><ForgotPassword /></Suspense> },
    { path: "/forgot-password-verification", element: <Suspense fallback={<div>Loading...</div>}><ForgotPasswordVerification /></Suspense> },
    { path: "/register", element: <Suspense fallback={<div>Loading...</div>}><Register /></Suspense> },
    { path: "*", element: <div>404 - Unauthorized</div> },
  ];

  const privateAdminRoutes = [
    { path: "/admin", element: <Suspense fallback={<div>Loading...</div>}><Layout /></Suspense> },
    { path: "/admin/customer", element: <Suspense fallback={<div>Loading...</div>}><CustomerIndex /></Suspense> },
    { path: "/admin/customer/form", element: <Suspense fallback={<div>Loading...</div>}><CustomerForm /></Suspense> },
    { path: "*", element: <div>404 - Unauthorized</div> },
  ];

  const privateUserRoutes = [
    { path: "/user/profile-setup", element: <Suspense fallback={<div>Loading...</div>}><UserProfileSetup /></Suspense> },
    { path: "*", element: <div>404 - Unauthorized</div> },
  ];

  // Choose the correct set of routes based on the user status
  const routes = isAdmin ? privateAdminRoutes : isLoggedIn ? privateUserRoutes : publicRoutes;

  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}

export default App;

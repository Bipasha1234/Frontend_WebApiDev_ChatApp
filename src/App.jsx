import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { InfoProvider } from "./context/InfoContext.jsx";
import SignInCode from "./core/public/signin-code";

// import CustomerForm from "./core/private/customer/form";
const CustomerForm = lazy(() => import("./core/private/customer/form"));

// import CustomerIndex from "./core/private/customer";
const CustomerIndex = lazy(() => import("./core/private/customer"));

const UserProfileSetup = lazy(() => import("./core/private/user-profile-setup/form"));


// import Home from "./core/public/home"
const Home = lazy(() => import("./core/public/home"));

// import Login from "./core/public/login"
const Login = lazy(() => import("./core/public/login"));

// import LoginCustomer from "./core/public/login-customer"
const LoginCustomer = lazy(() => import("./core/public/login-customer"));

const LoginCustomerCode = lazy(() => import("./core/public/signin-code"));

// import Register from "./core/public/register"
const Register = lazy(() => import("./core/public/register"));

// import Layout from "./core/private/layout"
const Layout = lazy(() => import("./core/private/layout"));

function App() {
  const publicRoutes = [
    {
      path: "/",
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),
      // errorElement: <>error</>,
    },
    {
      path: "/login",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
      errorElement: <>error</>,
    },
    {
      path: "/login-customer",
      element: (
        <Suspense>
          <LoginCustomer />
        </Suspense>
      ),
      errorElement: <>error</>,
    },
    {
      path: "/login-customer-code",
      element: (
        <Suspense>
          <SignInCode />
        </Suspense>
      ),
      errorElement: <>error</>,
    },
    {
      path: "/register",
      element: (
        <Suspense>
          <Register />
        </Suspense>
      ),
      errorElement: <>error</>,
    },
    { path: "*", element: <>unauthorized</> },
  ];

  const privateRoutes = [
    {
      path: "/admin",
      element: (
        <Suspense>
          <Layout />
        </Suspense>
      ),
      errorElement: <>error</>,
      children: [
        {
          path: "/admin/customer",
          element: (
            <Suspense>
              <CustomerIndex />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "/admin/customer/form",
          element: (
            <Suspense>
              <CustomerForm />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "/user/profile-setup",
          element: (
            <Suspense>
              <UserProfileSetup />
            </Suspense>
          ),
          errorElement: <>error</>,
        
        }
        
      ],
    },
    { path: "*", element: <>Page not found</> },
  ];



  // LOGIN logic TODO
  const isAdmin = false;
  const routes = isAdmin ? privateRoutes : publicRoutes;
  return (
    <>
      <InfoProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
      </InfoProvider>
    </>
  );
}

export default App;

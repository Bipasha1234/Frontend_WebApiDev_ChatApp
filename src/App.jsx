import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


// import Home from "./core/public/home"
const Home =lazy(()=>import("./core/public/home"))

// import Login from "./core/public/login"
const Login =lazy(()=>import("./core/public/login"))

// import LoginCustomer from "./core/public/login-customer"
const LoginCustomer =lazy(()=>import("./core/public/login-customer"))

// import Register from "./core/public/register"
const Register =lazy(()=>import("./core/public/register"))

// import Layout from "./core/private/layout"
const Layout =lazy(()=>import("./core/private/layout"))



function App() {

  const publicRoutes=[
    {path:"/",element:<Home/>},
    {path:"/login",element:<Login/>},
    {path:"/login-customer",element:<LoginCustomer/>},
    {path:"/register",element:<Register/>},
    {path:"*",element:<>unauthorized</>}
   ]

   const privateRoutes=[
    {path:"/admin",element:<Layout/>},
    {path:"*",element:<>Page not found</>}
   ]

   // LOGIN logic TODO
   const isAdmin=false;
   const routes=isAdmin?privateRoutes:publicRoutes
  return (
    <>
   <RouterProvider router={createBrowserRouter(routes)}/>
    </>
  )
}

export default App

import "./App.css";

import * as React from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import NearestUser from "./pages/NearestUser";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const routes = [
    {
      path: "/login",
      element: <SignIn />,
      isSecure: false,
    },
    {
      path: "/register",
      element: <SignUp />,
      isSecure: false,
    },
    {
      path: "/",
      element: <Home />,
      isSecure: true,
    },

    {
      path: "/nearest-users",
      element: <NearestUser />,
      isSecure: true,
    },
    {
      path: "/profile/:userId",
      element: <Profile />,
      isSecure: true,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
      isSecure: false,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const SecureRoute = ({ element, isSecure }) => {
    return element;
  };
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route?.path}
            path={route?.path}
            element={
              <SecureRoute
                element={route?.element}
                isSecure={route?.isSecure}
              />
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;

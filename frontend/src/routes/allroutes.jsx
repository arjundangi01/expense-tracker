import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Signup from "../pages/login/signup";
import PrivateRoute from "./private.route";
import LoginPrivate from "./loginPrivate";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        {" "}
      </Route>

      <Route path="/login" element={<LoginPrivate><Login /></LoginPrivate>}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
};

export default AllRoutes;

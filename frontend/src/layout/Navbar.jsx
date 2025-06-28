import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import { LogOut, ShoppingCart } from "lucide-react"; // from lucide-react
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = ({ isLoggedIn }) => {
  const { authUser, checkAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  const handleLogout = () => {
    logout();
    navigate("/auth/login")
  }
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-700">
        BookBazar
      </Link>

      {/* Navigation Items */}
      <div className="flex items-center gap-5">
        {!isLoggedIn ? (
          <>
            <Link
              to="/auth/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-800 font-medium">
              Welcome, {authUser?.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </>
        )}

        {/* Cart */}
        <Link to="/orders" className="relative group">
          <span className="text-gray-800 font-medium">
              Orders
            </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

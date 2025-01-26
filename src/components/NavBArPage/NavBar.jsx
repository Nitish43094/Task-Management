import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authApi";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };
  const isLoggedIn = userData;
  console.log("User Data is ",userData)

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Brand Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="hover:text-purple-200 transition duration-300">
            MyApp
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="text-white text-sm bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Profile ▼
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/dashbord")}
                  >
                    Dashboard
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/task")}
                  >
                    Task
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/feed")}
                  >
                    Feed
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-sm bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-sm bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isLoggedIn ? (
              <img
                className="w-10 h-10 rounded-full"
                src={userData?.data?.image || "/default-avatar.png"}
                alt="User Avatar"
                loading="lazy"
              />
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 space-y-2">
          {isLoggedIn ? (
            <>
              <button
                className="block w-full text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                onClick={handleLogout}
              >
                Log Out
              </button>
              <button
                className="block w-full text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                onClick={() => navigate("/dashbord")}
              >
                Dashboard
              </button>
              <button
                className="block w-full text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                onClick={() => navigate("/task")}
              >
                Task
              </button>
              <button
                className="block w-full text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                onClick={() => navigate("/feed")}
              >
                Feed
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block w-full text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

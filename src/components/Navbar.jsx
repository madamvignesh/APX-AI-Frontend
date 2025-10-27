import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Activity } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u && location.pathname === "/login") navigate("/"); // after login -> home
      if (!u && location.pathname === "/profile") navigate("/login"); // logout on profile -> login
    });
    return () => unsub();
  }, [navigate, location]);

  const handleLogout = async () => {
    await signOut(auth);
    if (location.pathname === "/profile") navigate("/login");
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${location.pathname === path
      ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
      : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/30">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 bg-clip-text text-transparent">
              APX AI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/chat" className={linkClass("/chat")}>
              Chat
            </Link>
            <Link to="/about" className={linkClass("/about")}>
              About
            </Link>
            <Link to="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/profile" className={linkClass("/profile")}>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-300 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className={linkClass("/login")}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import {
  loginUser,
  registerUser,
  initAnonymousAuth,
} from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) await loginUser(email, password);
      else await registerUser(email, password);
      alert("✅ Success!");
    } catch (err) {
      alert(`⚠️ ${err.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("✅ Google Sign-In successful!");
    } catch (err) {
      alert(`🚫 Google Sign-In failed: ${err.message}`);
    }
  };

  const handleGuest = async () => {
    await initAnonymousAuth();
    alert("🕶 Guest session started.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4 flex flex-col space-y-3">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {isLogin ? "Login with Google" : "Sign up with Google"}
          </button>

          <button
            onClick={handleGuest}
            className="text-sm text-gray-500 hover:text-blue-600 underline"
          >
            Continue as Guest
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

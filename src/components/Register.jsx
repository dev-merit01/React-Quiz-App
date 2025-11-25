import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, loginWithGoogle } from "../store/AuthSlice";
import { auth } from "../firebase/firebase";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      // Dispatch registration action
      const result = await dispatch(
        registerUser({ email, password, username })
      ).unwrap();

      toast.success("Account created! Please verify your email.");

      // Logout so they cannot access protected pages before verifying
      await auth.signOut();

      // Redirect to login page
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await dispatch(loginWithGoogle()).unwrap();
      toast.success("Signed in with Google");
      navigate("/quiz");
    } catch (err) {
      toast.error(err || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* divider between form and external providers */}
        <div className="flex items-center gap-3 my-4">
          <span className="flex-1 h-px bg-gray-200"></span>
          <span className="text-sm text-gray-500">or</span>
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>

        {/* Google sign-in */}
        <div className="mt-2 text-center">
          <button
            onClick={handleGoogle}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold shadow-md"
            disabled={loading}
          >
            Continue with Google
          </button>
        </div>

        <p
          className="text-center mt-4 text-gray-700 cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

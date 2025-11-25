import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, sendVerificationEmail, loginWithGoogle } from "../store/AuthSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [resendMode, setResendMode] = useState(false);
  const [resendPassword, setResendPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await dispatch(loginUser({ email, password })).unwrap();

      toast.success("Login successful!");
      navigate("/quiz");
    } catch (error) {
      const errMsg = typeof error === "string" ? error : error.message || "Login failed";
      toast.error(errMsg);

      if (errMsg.toLowerCase().includes("not verified")) {
        setResendMode(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!resendPassword) {
      toast.error("Please enter your password to resend verification.");
      return;
    }

    try {
      setLoading(true);
      await dispatch(sendVerificationEmail({ email, password: resendPassword })).unwrap();
      toast.success("Verification email sent!");
      setResendMode(false);
      setResendPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to resend verification");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await dispatch(loginWithGoogle()).unwrap();
      toast.success("Login successful!");
      navigate("/quiz");
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p
            className="text-sm text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <button
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <span className="flex-1 h-px bg-gray-200"></span>
          <span className="text-sm text-gray-500">or</span>
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>

        {/* Google Sign-In */}
        <div className="text-center">
          <button
            onClick={handleGoogle}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold shadow-md"
            disabled={loading}
          >
            Continue with Google
          </button>
        </div>

        {/* Resend Verification UI */}
        {resendMode && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm mb-2">
              Your email is not verified. Enter your password to resend the verification email.
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Your password is required to briefly sign in and send the verification link.
            </p>

            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded mb-2"
              value={resendPassword}
              onChange={(e) => setResendPassword(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={handleResend}
                disabled={loading}
                className="flex-1 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                {loading ? "Sending..." : "Resend Verification"}
              </button>

              <button
                onClick={() => setResendMode(false)}
                className="flex-1 py-2 bg-gray-300 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <p
          className="text-center mt-4 text-gray-700 cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/register")}
        >
          Create an account
        </p>
      </div>
    </div>
  );
}

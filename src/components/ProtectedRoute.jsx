import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    toast.info("You must be logged in to access this page.");
    return <Navigate to="/login" />;
  }

  // Block unverified email users from protected routes
  if (!user.emailVerified) {
    toast.error("Email not verified! Check your inbox.");
    return <Navigate to="/login" />;
  }

  return children;
}

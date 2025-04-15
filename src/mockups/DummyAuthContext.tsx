import React from "react";
import { AuthProvider } from "../context/Auth/AuthContext";

export const DummyAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

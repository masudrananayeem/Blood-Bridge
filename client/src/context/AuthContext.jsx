import { createContext, useContext, useState } from "react";

/*
  NOTE: This is a structural placeholder for now.
  In Step 5 we will wire this up to Firebase Authentication
  (onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup
  for Google, createUserWithEmailAndPassword, etc.) plus a call to
  our backend to fetch the MongoDB user profile + role + JWT.
*/

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

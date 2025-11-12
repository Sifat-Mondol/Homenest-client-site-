import React, { createContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Firebase ID token

  // Register
  const register = async (email, password, displayName, photoURL) => {
    setLoading(true);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName || photoURL) {
      await updateProfile(res.user, { displayName, photoURL });
    }
    const idToken = await res.user.getIdToken();
    setToken(idToken);
    localStorage.setItem("userToken", idToken);
    setUser({ ...res.user });
    setLoading(false);
    return res.user;
  };

  // Login with email/password
  const login = async (email, password) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await res.user.getIdToken();
    setToken(idToken);
    localStorage.setItem("userToken", idToken);
    setUser(res.user);
    setLoading(false);
    return res.user;
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, googleProvider);
    const idToken = await res.user.getIdToken();
    setToken(idToken);
    localStorage.setItem("userToken", idToken);
    setUser(res.user);
    setLoading(false);
    return res.user;
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    localStorage.removeItem("userToken");
    setUser(null);
    setToken(null);
    setLoading(false);
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
        localStorage.setItem("userToken", idToken);
        setUser(currentUser);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("userToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    token,
    loading,
    register,
    login,
    loginWithGoogle,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

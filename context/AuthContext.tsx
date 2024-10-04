import React, { createContext, useState, useEffect, ReactNode } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FIREBASE_AUTH } from "@/config/FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
// import { firebaseConfig } from '../firebaseConfig'; // Make sure to configure your Firebase project

// Initialize Firebase
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

interface AuthContextProps {
  user?: User | null;
  initialized?: boolean;
}

export const AuthContext = createContext<AuthContextProps>({});

export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    console.log("AuthProvider");

    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("User AUTHENTICATED: ", user && user.email);
      setUser(user);
      setInitialized(true);
    });
  }, []);

  // Cleanup subscription on unmount
  //   return () => unsubscribe();
  const value = {
    user,
    initialized,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

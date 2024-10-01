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
  currentUser?: User | null;
  initialized?: boolean;
}

export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    console.log("AuthProvider");

    onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      console.log("User AUTHENTICATED: ", currentUser && currentUser.email);
      setCurrentUser(currentUser);
      setInitialized(true);
    });
  }, []);

  // Cleanup subscription on unmount
  //   return () => unsubscribe();
  const value = {
    currentUser,
    initialized,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

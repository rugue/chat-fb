import React from "react";
import { Tabs } from "expo-router";
import { Button } from "react-native";
import { signOut } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { FIREBASE_AUTH } from "@/config/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const TabsPage = () => {
  const { user, initialized } = useAuth();
  const doLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log("Logged out");
    } catch (error) {
      console.error("There was an error logging out", error);
    }
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="groups"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
          tabBarLabel: "Chat Groups",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabel: "My Profile",
          headerTitle: "My Profile",
          headerRight: () => <Button onPress={doLogout} title="Logout" />,
        }}
      />
    </Tabs>
  );
};

export default TabsPage;

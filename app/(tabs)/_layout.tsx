import React from "react";
import { Tabs } from "expo-router";
import { Button } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/config/FirebaseConfig";

const _layout = () => {
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
          headerTitle: "Chat Groups",
          headerRight: () => <Button onPress={doLogout} title="Logout" />,
        }}
      />
    </Tabs>
  );
};

export default _layout;

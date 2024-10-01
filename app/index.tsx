import React, { useContext, useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { StyleSheet, Text, View } from "react-native";

const InitialLayout = () => {
  const { currentUser, initialized } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log("StartPage");
    if (!initialized) return;

    if (currentUser) {
      console.log("Redirect to /(tabs)/groups");
      router.push("/(tabs)/groups");
    } else {
      console.log("Redirect to /(auth)/login");
      router.push("/(auth)/login");
    }
  }, [currentUser, initialized]);
  return (
    <View style={styles.container}>
      {initialized ? <></> : <Text>Loading...</Text>}
    </View>
  );
};

const StartPage = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartPage;

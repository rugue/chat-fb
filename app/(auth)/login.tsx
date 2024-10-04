import { FIREBASE_AUTH } from "@/config/FirebaseConfig";
import { Link } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, TextInput, Button, Image, StyleSheet, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      // Handle login functionality here
      const user = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log("Logging in with:", email, password, user);
      //   navigation.navigate("profile");
    } catch (error) {
      console.error("There was an error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterNavigation = () => {
    // Navigate to the registration screen
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={"Loading..."} />
      {/* Image above the input fields */}
      <Image
        source={{ uri: "https://via.placeholder.com/150" }} // Add your image URL here
        style={styles.image}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <Button title="Login" onPress={handleLogin} />

      {/* Register Link */}
      <Link href="/register">
        <Text style={styles.registerText}>
          Don't have an account? Register here
        </Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  registerText: {
    marginTop: 20,
    color: "#0066cc",
    textAlign: "center",
  },
});

export default LoginScreen;

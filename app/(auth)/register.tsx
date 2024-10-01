import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [username, setUsername] = useState<string>("rugue");
  const [email, setEmail] = useState<string>("nehirugue@gmail.com");
  const [password, setPassword] = useState<string>("123456");
  const [confirmPassword, setConfirmPassword] = useState<string>("123456");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Handle registration functionality here
    console.log("Registering with:", email, password, confirmPassword);
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log("Registration Success", userCredential);
      createUserInformation(userCredential);
    } catch (error: any) {
      console.error("There was an error", error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createUserInformation = async (user: UserCredential) => {
    try {
      const decRef = await setDoc(doc(FIREBASE_DB, `users/${user.user.uid}`), {
        username,
        email: user.user.email,
      });
    } catch (error) {
      console.error("There was an error creating user information: ", error);
      ("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
        autoCapitalize="none"
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

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Loading Indicator, otherwise Register Button (using Link for navigation)*/}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Link
          href="/groups"
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Link>
      )}

      {/* Login Link */}
      <Link href="/login">
        <Text style={styles.loginText}>
          Already have an account? Login here
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
  registerButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  loginText: {
    marginTop: 20,
    color: "#0066cc",
    textAlign: "center",
  },
});

export default RegisterScreen;

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

// Food-themed logo component
const ChefHatIcon = ({ size = 80, color = "#FF6B35" }) => {
  return (
    <View style={[styles.logo, { width: size, height: size }]}>
      <View style={[styles.hatBase, { 
        backgroundColor: color, 
        width: size * 0.8, 
        height: size * 0.25,
        borderTopLeftRadius: size * 0.12,
        borderTopRightRadius: size * 0.12,
      }]} />
      <View style={[styles.hatTop, { 
        backgroundColor: color, 
        width: size * 0.5, 
        height: size * 0.3,
        borderTopLeftRadius: size * 0.25,
        borderTopRightRadius: size * 0.25,
        top: size * -0.15
      }]} />
    </View>
  );
};

const Login = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleLogin = async () => {
   try{
     if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (isLoading) return;
    
    setIsLoading(true);
    const response = await login(email, password)
     if(response){
      setIsLoading(false);
      //set email AsyncStorage
      await AsyncStorage.setItem("userEmail", email);
      router.replace("/(dashboard)/home");
      Alert.alert("Success", "Login successful");
      setEmail("");
      setPassword("");
      
     }
      else{
       Alert.alert("Error", "Login failed");
       setIsLoading(false);
      }
   }catch{
      Alert.alert("Error", "Login failed. Please check your credentials and try again.");
      setIsLoading(false);
   }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {/* Background decorative elements */}
            <View style={styles.backgroundPattern} />
            
            {/* Logo/Header Section */}
            <View style={styles.logoContainer}>
              <ChefHatIcon size={100} color="#FF6B35" />
              <Text style={styles.appName}>RecipeMate</Text>
              <Text style={styles.tagline}>Cook, Share, Enjoy!</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.instructionText}>
                Sign in to access your recipe collection
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#5C5C5C" style={styles.inputIcon} />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#888"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#5C5C5C" style={styles.inputIcon} />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#888"
                  style={styles.input}
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable 
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={secureTextEntry ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#5C5C5C" 
                  />
                </Pressable>
              </View>

              <Pressable 
                onPress={() => Alert.alert("Info", "Forgot password feature would be implemented here")}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="large" />
                ) : (
                  <View style={styles.buttonContent}>
                    <Text style={styles.loginButtonText}>Login</Text>
                    <Ionicons name="restaurant-outline" size={20} color="#fff" style={{marginLeft: 10}} />
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable 
                style={styles.signupContainer}
                onPress={() => router.push("/register")}
              >
                <Text style={styles.signupText}>
                  Don't have an account?{" "}
                  <Text style={styles.signupLink}>Sign Up Now</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 20,
    position: 'relative',
  },
  backgroundPattern: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    backgroundColor: '#FFEEDD',
    borderRadius: 150,
    opacity: 0.5,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFE4CC",
    shadowColor: "#FF9E6D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hatBase: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  hatTop: {
    position: 'absolute',
    alignSelf: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FF6B35",
    marginTop: 15,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: "#E67F4C",
    marginTop: 5,
    fontWeight: "500",
    fontStyle: 'italic',
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#FF9E6D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FFE4CC",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF6B35",
    textAlign: "center",
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 14,
    color: "#E67F4C",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F2",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FFD9BF",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#5C5C5C",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    height: 55,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#FF6B35",
    shadowColor: "#FF6B35",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFD9BF",
  },
  dividerText: {
    color: "#E67F4C",
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  signupContainer: {
    alignItems: "center",
  },
  signupText: {
    color: "#5C5C5C",
    fontSize: 15,
  },
  signupLink: {
    color: "#FF6B35",
    fontWeight: "700",
  },
});

export default Login;
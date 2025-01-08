import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth(); // Destructure login and loading from AuthContext
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/(tabs)/(dashboard)');
    } catch (error) {
      Alert.alert('Login Error', 'Invalid email or password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#777777"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      <Link href="/forgot-password" asChild>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </Link>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <Link href="/register" asChild>
          <Text style={styles.registerLink}>Register</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Replace 'bg-background'
    padding: 24, // 'p-6'
    justifyContent: 'center',
  },
  title: {
    fontSize: 28, // 'text-3xl'
    fontWeight: 'bold',
    color: '#333', // Replace 'text-text'
    marginBottom: 32, // 'mb-8'
  },
  inputContainer: {
    marginBottom: 24, // 'mb-6'
  },
  input: {
    backgroundColor: '#fff', // 'bg-white'
    padding: 16, // 'p-4'
    borderRadius: 8, // 'rounded-lg'
    fontSize: 16, // 'text-base'
    marginBottom: 16, // 'space-y-4'
  },
  passwordContainer: {
    flexDirection: 'row', // 'flex-row'
    alignItems: 'center', // 'items-center'
    backgroundColor: '#fff', // 'bg-white'
    borderRadius: 8, // 'rounded-lg'
  },
  passwordInput: {
    flex: 1, // 'flex-1'
    padding: 16, // 'p-4'
    fontSize: 16, // 'text-base'
  },
  passwordToggle: {
    padding: 16, // 'p-4'
  },
  forgotPassword: {
    marginTop: 16, // 'mt-4'
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: '#007BFF', // Replace 'text-primary'
  },
  registerContainer: {
    flexDirection: 'row', // 'flex-row'
    justifyContent: 'center', // 'justify-center'
    marginTop: 24, // 'mt-6'
  },
  registerText: {
    color: '#333', // Replace 'text-text'
  },
  registerLink: {
    color: '#007BFF', // Replace 'text-primary'
    fontWeight: 'bold', // 'font-bold'
  },
});

export default LoginScreen;

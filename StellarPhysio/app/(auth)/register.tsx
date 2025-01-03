import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import { colors } from '../../utils/colors';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { useRouter } from 'expo-router';

const RegistrationScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const { signUp, loading } = useAuth(); // Destructure signUp from AuthContext
  const router = useRouter()

  const handleRegister = async () => {
    try {
      setError(''); // Clear previous errors
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      await signUp(email, password, confirmPassword, 'patient'); // Assuming userType is 'user'
      router.push('/(auth)/login')
    } catch (error:any) {
      setError(error.message || 'Registration error');
      console.error('Registration error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
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
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={colors.lightText}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.termsContainer}>
        <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)}>
          <Ionicons
            name={agreeTerms ? 'checkbox' : 'square-outline'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
        <Text style={styles.termsText}>I agree to the terms and conditions</Text>
      </View>
      <Button
        title="Create Account"
        onPress={handleRegister}
        disabled={!agreeTerms || password !== confirmPassword}
        loading={loading}
      />
      <Text style={styles.termsText}>Kindly ensure passwords match</Text>
      <View style={styles.loginPrompt}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => console.log('Navigate to login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',

  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsText: {
    marginLeft: 8,
    color: colors.text,
    fontSize: 14,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 8,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: colors.text,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RegistrationScreen;

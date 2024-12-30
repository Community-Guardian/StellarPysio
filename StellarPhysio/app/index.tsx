import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Button from '../components/Button';
import { colors } from '../utils/colors';

const WelcomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-icon.png')}
        style={styles.logo}
      />
      <Text style={styles.tagline}>
        Your Health, Our Priority
      </Text>
      <View style={styles.buttonContainer}>
        <Link href="/login" asChild>
          <Button title="Login" onPress={() => {}} />
        </Link>
        <Link href="/register" asChild>
          <Button title="Register" variant="outline" onPress={() => {}} style={styles.registerButton} />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 192,
    height: 192,
    marginBottom: 32,
  },
  tagline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  registerButton: {
    marginTop: 16,
  },
});

export default WelcomeScreen;


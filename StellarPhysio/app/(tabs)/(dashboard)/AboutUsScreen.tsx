import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About StellarPhysio</Text>
      <Image
        source={require('@/assets/images/logo.webp')}
        style={styles.logo}
      />
      <Text style={styles.description}>
        StellarPhysio Health and Wellness Centre is a leading provider of comprehensive physiotherapy and wellness services. Our mission is to empower individuals to achieve optimal health and well-being through personalized care and innovative treatments.
      </Text>
      <Text style={styles.sectionTitle}>Our History</Text>
      <Text style={styles.sectionText}>
        Founded in 2010, StellarPhysio has grown from a small clinic to a multi-disciplinary wellness center. We have consistently expanded our services to meet the evolving needs of our community.
      </Text>
      <Text style={styles.sectionTitle}>Our Team</Text>
      <Text style={styles.sectionText}>
        Our team consists of highly qualified physiotherapists, nutritionists, wellness coaches, and support staff. Each member is committed to providing the highest quality of care to our patients.
      </Text>
      <Text style={styles.sectionTitle}>Our Approach</Text>
      <Text style={styles.sectionText}>
        At StellarPhysio, we believe in a holistic approach to health. We combine traditional physiotherapy techniques with cutting-edge technology and complementary wellness services to provide comprehensive care tailored to each individual's needs.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F8FA',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
});

export default AboutUsScreen;


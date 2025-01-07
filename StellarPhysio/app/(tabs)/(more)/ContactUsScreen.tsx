import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../../components/Button';

const ContactUsScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Implement contact form submission logic
    console.log('Submitting contact form:', { name, email, message });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <View style={styles.contactInfo}>
        <View style={styles.contactItem}>
          <Ionicons name="location" size={24} color="#4A90E2" style={styles.contactIcon} />
          <Text style={styles.contactText}>123 Health Street, Wellness City, 12345</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call" size={24} color="#4A90E2" style={styles.contactIcon} />
          <Text style={styles.contactText}>+1 (555) 123-4567</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="mail" size={24} color="#4A90E2" style={styles.contactIcon} />
          <Text style={styles.contactText}>info@stellarphysio.com</Text>
        </View>
      </View>
      <Text style={styles.formTitle}>Send us a message</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button
        title="Send Message"
        onPress={handleSubmit}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F8FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contactInfo: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  messageInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
  },
});

export default ContactUsScreen;


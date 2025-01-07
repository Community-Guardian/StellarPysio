import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../../components/Button';

const HelpScreen = () => {
  const helpTopics = [
    { title: 'How to Book an Appointment', icon: 'calendar' },
    { title: 'Understanding Your Treatment Plan', icon: 'medical' },
    { title: 'Accessing Your Health Records', icon: 'document-text' },
    { title: 'Payment and Billing', icon: 'card' },
    { title: 'Contacting Your Healthcare Provider', icon: 'call' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help Center</Text>
      {helpTopics.map((topic, index) => (
        <View key={index} style={styles.topicItem}>
          <Ionicons name={topic.icon} size={24} color="#4A90E2" style={styles.topicIcon} />
          <Text style={styles.topicTitle}>{topic.title}</Text>
        </View>
      ))}
      <Button
        title="Contact Support"
        onPress={() => {/* Implement contact support logic */}}
        style={styles.supportButton}
      />
      <Button
        title="FAQs"
        onPress={() => {/* Navigate to FAQs screen */}}
        style={styles.faqButton}
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
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  topicIcon: {
    marginRight: 15,
  },
  topicTitle: {
    fontSize: 16,
    color: '#333',
  },
  supportButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
  },
  faqButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
  },
});

export default HelpScreen;


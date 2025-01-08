import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import {useRouter} from 'expo-router';
const HelpScreen: React.FC = () => {
  const [showFAQs, setShowFAQs] = useState(false);

  const helpTopics = [
    { title: 'Contacting Your Healthcare Provider', icon: 'call' },
    { title: 'Managing Your Appointments', icon: 'calendar' },
    { title: 'Using the App Features', icon: 'apps' },
  ];

  const faqs = [
    { question: 'How do I book an appointment?', answer: 'To book an appointment, go to the Appointments tab and select "Book Appointment".' },
    { question: 'How do I contact support?', answer: 'You can contact support by clicking the "Contact Support" button on this screen.' },
    { question: 'How do I reset my password?', answer: 'To reset your password, go to the Profile tab and select "Reset Password".' },
  ];
  const router = useRouter();
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
        onPress={() => { router.push('/ContactUsScreen') }}
        style={styles.supportButton}
      />
      <TouchableOpacity onPress={() => setShowFAQs(!showFAQs)} style={styles.faqButton}>
        <Text style={styles.faqButtonText}>{showFAQs ? 'Hide FAQs' : 'Show FAQs'}</Text>
      </TouchableOpacity>
      {showFAQs && (
        <View style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  topicIcon: {
    marginRight: 12,
  },
  topicTitle: {
    fontSize: 18,
    color: '#212529',
  },
  supportButton: {
    marginTop: 16,
    backgroundColor: '#4A90E2',
  },
  faqButton: {
    marginTop: 16,
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  faqButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  faqContainer: {
    marginTop: 16,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
});

export default HelpScreen;
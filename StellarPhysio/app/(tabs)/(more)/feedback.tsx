import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';
import Button from '@/components/Button';
import { useFeedback } from '@/context/FeedbackContext'; // Ensure proper import path

const FeedbackScreen: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { submitFeedback } = useFeedback(); // Destructure submitFeedback from FeedbackContext

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating before submitting.');
      return;
    }

    try {
      await submitFeedback({ rating, comment });
      Alert.alert('Thank You!', 'Your feedback has been submitted successfully.');
      
      // Reset form
      setRating(0);
      setComment('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <Text style={styles.subtitle}>We value your opinion!</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>How was your experience?</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= rating ? 'star' : 'star-outline'}
              size={40}
              color={star <= rating ? colors.primary : colors.lightText}
              onPress={() => setRating(star)}
            />
          ))}
        </View>
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commentTitle}>Additional Comments (Optional)</Text>
        <TextInput
          style={styles.commentInput}
          multiline
          numberOfLines={5}
          placeholder="Tell us more about your experience..."
          value={comment}
          onChangeText={setComment}
        />
      </View>

      <Button title="Submit Feedback" onPress={handleSubmit} style={styles.submitButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.lightText,
    marginBottom: 24,
  },
  ratingContainer: {
    marginBottom: 24,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentContainer: {
    marginBottom: 24,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  commentInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 12,
  },
});

export default FeedbackScreen;
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getFeedbacks, createFeedback } from '@/handlers/feedbackManager';
import { Alert } from 'react-native';
import { useAuth } from './AuthContext';

// Feedback Interfaces
interface Feedback {
  id: number;
  user: string;
  message: string;
  created_at: string;
}

// Context Interface
interface FeedbackContextData {
  feedbacks: Feedback[];
  loading: boolean;
  fetchFeedbacks: () => Promise<void>;
  addFeedback: (feedbackData: Partial<Feedback>) => Promise<void>;
}

// Context Props
interface FeedbackProviderProps {
  children: ReactNode;
}

// Default Context Values
const FeedbackContext = createContext<FeedbackContextData>({
  feedbacks: [],
  loading: false,
  fetchFeedbacks: async () => {},
  addFeedback: async () => {},
});

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch feedbacks.');
    } finally {
      setLoading(false);
    }
  };

  const addFeedback = async (feedbackData: Partial<Feedback>) => {
    try {
      setLoading(true);
      await createFeedback(feedbackData);
      await fetchFeedbacks();
    } catch (error) {
      console.error('Error adding feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeedbacks();
    }
  }, [isAuthenticated]);

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        loading,
        fetchFeedbacks,
        addFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => useContext(FeedbackContext);

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '@/handlers/AchievementsManager';
import { Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';

// Achievement Interface
interface Achievement {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

// Context Interface
interface AchievementsContextData {
  achievements: Achievement[];
  loading: boolean;
  fetchAchievements: () => Promise<void>;
  addAchievement: (achievementData: Partial<Achievement>) => Promise<void>;
  updateAchievement: (achievementId: string, updatedData: Partial<Achievement>) => Promise<void>;
  removeAchievement: (achievementId: string) => Promise<void>;
}

// Context Props
interface AchievementsProviderProps {
  children: ReactNode;
}

// Default Context Values
const AchievementsContext = createContext<AchievementsContextData>({
  achievements: [],
  loading: false,
  fetchAchievements: async () => {},
  addAchievement: async () => {},
  updateAchievement: async () => {},
  removeAchievement: async () => {},
});

export const AchievementsProvider: React.FC<AchievementsProviderProps> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const data = await getAchievements();
      setAchievements(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch achievements. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addAchievement = async (achievementData: Partial<Achievement>) => {
    try {
      setLoading(true);
      await createAchievement(achievementData);
      await fetchAchievements(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding achievement:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateAchievement = async (achievementId: string, updatedData: Partial<Achievement>) => {
    try {
      setLoading(true);
      await updateAchievement(achievementId, updatedData);
      await fetchAchievements(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating achievement:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeAchievement = async (achievementId: string) => {
    try {
      setLoading(true);
      await deleteAchievement(achievementId);
      await fetchAchievements(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting achievement:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAchievements();
    }
  }, [isAuthenticated]);

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        loading,
        fetchAchievements,
        addAchievement,
        updateAchievement,
        removeAchievement,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementsContext);
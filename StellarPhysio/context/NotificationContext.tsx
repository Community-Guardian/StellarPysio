import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getNotifications, getUnreadNotifications, markNotificationsAsRead } from '@/handlers/NotificationsManager';
import { Alert } from 'react-native';
import { useAuth } from './AuthContext';


interface NotificationType {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface Notification {
  id: number;
  notification_type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  user: string;
}

// Context Interface
interface NotificationContextData {
  notifications: Notification[];
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  fetchUnreadNotifications: () => Promise<void>;
  markNotificationAsRead: (notificationId: number) => Promise<void>;
}

// Context Props
interface NotificationProviderProps {
  children: ReactNode;
}

// Default Context Values
const NotificationContext = createContext<NotificationContextData>({
  notifications: [],
  loading: false,
  fetchNotifications: async () => {},
  fetchUnreadNotifications: async () => {},
  markNotificationAsRead: async () => {},
});

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getUnreadNotifications();
      setNotifications(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getUnreadNotifications();
      setNotifications(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch unread notifications.');
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: number) => {
    try {
      setLoading(true);
      await markNotificationsAsRead(notificationId);
      setNotifications(prevState =>
        prevState.map(notification =>
          notification.id === notificationId ? { ...notification, is_read: true } : notification
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to mark notification as read.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        fetchNotifications,
        fetchUnreadNotifications,
        markNotificationAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

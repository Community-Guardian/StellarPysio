import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  getLogs,
  createLog,
  updateLog,
  deleteLog,
} from '@/handlers/LogsManager';
import { Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';

// Log Interface
interface Log {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR';
  message: string;
}

// Context Interface
interface LogsContextData {
  logs: Log[];
  loading: boolean;
  fetchLogs: () => Promise<void>;
  addLog: (logData: Partial<Log>) => Promise<void>;
  updateLog: (logId: string, updatedData: Partial<Log>) => Promise<void>;
  removeLog: (logId: string) => Promise<void>;
}

// Context Props
interface LogsProviderProps {
  children: ReactNode;
}

// Default Context Values
const LogsContext = createContext<LogsContextData>({
  logs: [],
  loading: false,
  fetchLogs: async () => {},
  addLog: async () => {},
  updateLog: async () => {},
  removeLog: async () => {},
});

export const LogsProvider: React.FC<LogsProviderProps> = ({ children }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await getLogs();
      setLogs(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch logs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addLog = async (logData: Partial<Log>) => {
    try {
      setLoading(true);
      await createLog(logData);
      await fetchLogs(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding log:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateLog = async (logId: string, updatedData: Partial<Log>) => {
    try {
      setLoading(true);
      await updateLog(logId, updatedData);
      await fetchLogs(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating log:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeLog = async (logId: string) => {
    try {
      setLoading(true);
      await deleteLog(logId);
      await fetchLogs(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting log:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLogs();
    }
  }, [isAuthenticated]);

  return (
    <LogsContext.Provider
      value={{
        logs,
        loading,
        fetchLogs,
        addLog,
        updateLog,
        removeLog,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};

export const useLogs = () => useContext(LogsContext);
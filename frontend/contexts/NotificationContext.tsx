import React, { createContext, useContext, useState, useEffect } from 'react';

interface NotificationData {
  messages: number;
  testimonies: number;
  prayers: number;
  support: number;
  fundRequests: number;
  total: number;
}

interface NotificationContextType {
  notifications: NotificationData;
  markAsRead: (type: keyof Omit<NotificationData, 'total'>, count?: number) => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationData>({
    messages: 3,
    testimonies: 2,
    prayers: 5,
    support: 1,
    fundRequests: 4,
    total: 15
  });

  const markAsRead = (type: keyof Omit<NotificationData, 'total'>, count = 1) => {
    setNotifications(prev => {
      const newCount = Math.max(0, prev[type] - count);
      const newTotal = prev.total - (prev[type] - newCount);
      
      return {
        ...prev,
        [type]: newCount,
        total: newTotal
      };
    });
  };

  const refreshNotifications = () => {
    // In a real app, this would fetch from API
    // For now, simulate some new notifications
    setNotifications(prev => ({
      ...prev,
      messages: prev.messages + 1,
      total: prev.total + 1
    }));
  };

  // Calculate total whenever individual counts change
  useEffect(() => {
    const total = notifications.messages + notifications.testimonies + 
                 notifications.prayers + notifications.support + notifications.fundRequests;
    setNotifications(prev => ({ ...prev, total }));
  }, [notifications.messages, notifications.testimonies, notifications.prayers, 
      notifications.support, notifications.fundRequests]);

  const value = {
    notifications,
    markAsRead,
    refreshNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

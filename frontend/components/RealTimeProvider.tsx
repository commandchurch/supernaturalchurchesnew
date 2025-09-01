import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RealTimeData {
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
  activeUsers: number;
  messages: number;
  notifications: number;
  timestamp: number;
}

interface RealTimeStats {
  totalMembers: number;
  activeMembers: number;
  newMembersToday: number;
  totalRevenue: number;
  monthlyRevenue: number;
  conversionRate: number;
}

interface RealTimeContextType {
  data: RealTimeData;
  stats: RealTimeStats;
  isConnected: boolean;
  error: string | null;
  reconnect: () => void;
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined);

interface RealTimeProviderProps {
  children: ReactNode;
}

export const RealTimeProvider: React.FC<RealTimeProviderProps> = ({ children }) => {
  const [data, setData] = useState<RealTimeData>({
    connectionStatus: 'connecting',
    activeUsers: 0,
    messages: 0,
    notifications: 0,
    timestamp: Date.now()
  });

  const [stats, setStats] = useState<RealTimeStats>({
    totalMembers: 0,
    activeMembers: 0,
    newMembersToday: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    conversionRate: 0
  });

  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate real-time data updates
  useEffect(() => {
    const connect = () => {
      setData(prev => ({ ...prev, connectionStatus: 'connected' }));
      setIsConnected(true);
      setError(null);
    };

    const disconnect = () => {
      setData(prev => ({ ...prev, connectionStatus: 'disconnected' }));
      setIsConnected(false);
    };

    const updateData = () => {
      if (isConnected) {
        setData(prev => ({
          ...prev,
          activeUsers: Math.floor(Math.random() * 1000) + 500,
          messages: prev.messages + Math.floor(Math.random() * 5),
          notifications: prev.notifications + Math.floor(Math.random() * 3),
          timestamp: Date.now()
        }));

        setStats(prev => ({
          totalMembers: 12847 + Math.floor(Math.random() * 100),
          activeMembers: 8900 + Math.floor(Math.random() * 500),
          newMembersToday: 15 + Math.floor(Math.random() * 20),
          totalRevenue: 150000 + Math.floor(Math.random() * 5000),
          monthlyRevenue: 25000 + Math.floor(Math.random() * 3000),
          conversionRate: 3.2 + Math.random() * 2
        }));
      }
    };

    // Initial connection
    const timer = setTimeout(connect, 1000);

    // Update data every 5 seconds
    const interval = setInterval(updateData, 5000);

    // Simulate occasional disconnections
    const disconnectTimer = setTimeout(() => {
      disconnect();
      setTimeout(connect, 3000); // Reconnect after 3 seconds
    }, 30000 + Math.random() * 60000); // Random disconnect between 30-90 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearTimeout(disconnectTimer);
    };
  }, [isConnected]);

  const reconnect = () => {
    setData(prev => ({ ...prev, connectionStatus: 'connecting' }));
    setError(null);
    setTimeout(() => {
      setData(prev => ({ ...prev, connectionStatus: 'connected' }));
      setIsConnected(true);
    }, 2000);
  };

  const value: RealTimeContextType = {
    data,
    stats,
    isConnected,
    error,
    reconnect
  };

  return (
    <RealTimeContext.Provider value={value}>
      {children}
    </RealTimeContext.Provider>
  );
};

export const useRealTime = () => {
  const context = useContext(RealTimeContext);
  if (context === undefined) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
};

export const useRealTimeStats = () => {
  const context = useContext(RealTimeContext);
  if (context === undefined) {
    throw new Error('useRealTimeStats must be used within a RealTimeProvider');
  }
  return { stats: context.stats };
};

// Hook for specific real-time metrics
export const useRealTimeMetric = (metric: keyof RealTimeStats) => {
  const { stats } = useRealTimeStats();
  return stats[metric];
};

// Hook for connection status with auto-reconnect
export const useConnectionStatus = () => {
  const { isConnected, error, reconnect } = useRealTime();

  useEffect(() => {
    if (!isConnected && !error) {
      const timer = setTimeout(reconnect, 5000);
      return () => clearTimeout(timer);
    }
  }, [isConnected, error, reconnect]);

  return { isConnected, error, reconnect };
};


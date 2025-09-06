// Offline sync utility for PWA form submissions
export interface OfflineFormData {
  type: string;
  data: any;
  timestamp: number;
  key?: string;
}

class OfflineSyncManager {
  private isOnline: boolean = navigator.onLine;

  constructor() {
    this.setupNetworkListeners();
  }

  private setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.triggerBackgroundSync();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Store form data offline
  async storeFormData(type: string, data: any): Promise<string | null> {
    if (this.isOnline) {
      // If online, submit immediately
      return this.submitFormData(type, data);
    }

    // Store offline
    try {
      const offlineData: OfflineFormData = {
        type,
        data,
        timestamp: Date.now()
      };

      // Use service worker to store data
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        // Store in cache via service worker message
        registration.active?.postMessage({
          action: 'storeOfflineData',
          data: offlineData
        });
      }

      return `offline-${type}-${Date.now()}`;
    } catch (error) {
      console.error('Failed to store offline data:', error);
      return null;
    }
  }

  // Submit form data (online)
  private async submitFormData(type: string, data: any): Promise<string | null> {
    try {
      let endpoint = '';
      let method = 'POST';

      switch (type) {
        case 'prayer-request':
          endpoint = '/api/prayer-requests';
          break;
        case 'recruit':
          endpoint = '/api/recruits';
          break;
        case 'testimony':
          endpoint = '/api/testimonies';
          break;
        case 'funding-request':
          endpoint = '/api/funding-requests';
          break;
        default:
          throw new Error(`Unknown form type: ${type}`);
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit ${type}`);
      }

      return `submitted-${type}-${Date.now()}`;
    } catch (error) {
      console.error(`Failed to submit ${type}:`, error);
      // If submission fails, store offline
      return this.storeFormData(type, data);
    }
  }

  // Trigger background sync
  private async triggerBackgroundSync() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      // Cast to any to access sync property (background sync API)
      (registration as any).sync?.register('background-sync');
    }
  }

  // Get offline data count for UI feedback
  async getOfflineDataCount(): Promise<number> {
    // This would need to be implemented with a way to query the service worker
    // For now, return 0
    return 0;
  }

  // Check if we're online
  isOnlineStatus(): boolean {
    return this.isOnline;
  }
}

// Export singleton instance
export const offlineSync = new OfflineSyncManager();

// React hook for offline sync
export const useOfflineSync = () => {
  const submitForm = async (type: string, data: any) => {
    const result = await offlineSync.storeFormData(type, data);
    return {
      success: result !== null,
      offline: !offlineSync.isOnlineStatus(),
      id: result
    };
  };

  return {
    submitForm,
    isOnline: offlineSync.isOnlineStatus(),
    getOfflineCount: offlineSync.getOfflineDataCount.bind(offlineSync)
  };
};
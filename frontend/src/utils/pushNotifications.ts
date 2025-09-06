// Push notification service for PWA
export interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

class PushNotificationManager {
  private vapidPublicKey: string = 'BKxQz9vHq8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8'; // Replace with your VAPID public key
  private subscription: PushSubscription | null = null;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        this.subscription = await registration.pushManager.getSubscription();

        if (!this.subscription) {
          // Subscribe to push notifications
          this.subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
          });

          // Send subscription to server
          await this.sendSubscriptionToServer(this.subscription);
        }
      } catch (error) {
        console.error('Failed to initialize push notifications:', error);
      }
    }
  }

  // Convert VAPID key to Uint8Array
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Send subscription to your server
  private async sendSubscriptionToServer(subscription: PushSubscription) {
    try {
      const response = await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          userId: this.getCurrentUserId() // You'll need to implement this
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }

      console.log('Push subscription sent to server');
    } catch (error) {
      console.error('Failed to send subscription to server:', error);
    }
  }

  // Get current user ID (implement based on your auth system)
  private getCurrentUserId(): string | null {
    // This should return the current user's ID from your auth system
    // For example, from Clerk or your custom auth
    return localStorage.getItem('userId');
  }

  // Send a test notification (for development)
  async sendTestNotification() {
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: this.getCurrentUserId(),
          title: 'Test Notification',
          body: 'This is a test push notification from Supernatural Institute!',
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send test notification');
      }

      console.log('Test notification sent');
    } catch (error) {
      console.error('Failed to send test notification:', error);
    }
  }

  // Unsubscribe from push notifications
  async unsubscribe() {
    if (this.subscription) {
      try {
        await this.subscription.unsubscribe();
        this.subscription = null;

        // Notify server to remove subscription
        await fetch('/api/push-subscription', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: this.getCurrentUserId()
          }),
        });

        console.log('Unsubscribed from push notifications');
      } catch (error) {
        console.error('Failed to unsubscribe:', error);
      }
    }
  }

  // Check if push notifications are supported
  isSupported(): boolean {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }

  // Get current subscription status
  getSubscriptionStatus(): 'subscribed' | 'unsubscribed' | 'unsupported' {
    if (!this.isSupported()) return 'unsupported';
    return this.subscription ? 'subscribed' : 'unsubscribed';
  }
}

// Export singleton instance
export const pushNotifications = new PushNotificationManager();

// React hook for push notifications
export const usePushNotifications = () => {
  const subscribe = async () => {
    if (pushNotifications.getSubscriptionStatus() === 'unsubscribed') {
      // Trigger subscription by requesting permission and subscribing
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // Re-initialize to create subscription
          const manager = new PushNotificationManager();
          await manager['initialize'](); // Access private method
        }
      }
    }
  };

  const unsubscribe = async () => {
    await pushNotifications.unsubscribe();
  };

  const sendTest = async () => {
    await pushNotifications.sendTestNotification();
  };

  return {
    subscribe,
    unsubscribe,
    sendTest,
    isSupported: pushNotifications.isSupported(),
    status: pushNotifications.getSubscriptionStatus()
  };
};
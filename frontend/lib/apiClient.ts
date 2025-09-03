import client from '../client';
import { useUIStore } from '../stores/uiStore';

// Error handling utility
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Generic error handler wrapper
function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const uiStore = useUIStore.getState();

    try {
      return await fn(...args);
    } catch (error: any) {
      console.error('API Error:', error);

      let message = 'An unexpected error occurred';
      let code = 'UNKNOWN_ERROR';
      let statusCode = 500;

      // Handle different error types
      if (error instanceof Error) {
        message = error.message;

        // Handle Encore.dev API errors
        if (error.message.includes('APIError')) {
          code = 'API_ERROR';
          statusCode = 400;
        }

        // Handle network errors
        if (error.message.includes('fetch') || error.message.includes('network')) {
          code = 'NETWORK_ERROR';
          statusCode = 0;
          message = 'Network connection error. Please check your internet connection.';
        }

        // Handle authentication errors
        if (error.message.includes('unauthorized') || error.message.includes('token')) {
          code = 'AUTH_ERROR';
          statusCode = 401;
          message = 'Authentication required. Please sign in again.';
        }
      }

      const appError = new AppError(message, code, statusCode);

      // Show user-friendly notification
      uiStore.addNotification({
        type: statusCode >= 500 ? 'error' : 'warning',
        message: message,
        duration: 5000
      });

      throw appError;
    }
  };
}

// Centralized API client
export const apiClient = {
  // Academy services
  academy: {
    listCourses: withErrorHandling(async (params?: any) => {
      const response = await client.academy.listCourses(params || {});
      return response;
    }),

    getCourse: withErrorHandling(async (id: string) => {
      const response = await client.academy.getCourse({ id });
      return response;
    }),

    createCourse: withErrorHandling(async (params: any) => {
      const response = await client.academy.createCourse(params);
      return response;
    }),

    updateCourse: withErrorHandling(async (id: string, params: any) => {
      const response = await client.academy.updateCourse(id, params);
      return response;
    }),

    deleteCourse: withErrorHandling(async (id: string) => {
      const response = await client.academy.deleteCourse(id);
      return response;
    })
  },

  // Church services
  church: {
    listEvents: withErrorHandling(async (params?: any) => {
      const response = await client.church.listEvents(params || {});
      return response;
    }),

    submitPrayerRequest: withErrorHandling(async (params: any) => {
      const response = await client.church.submitPrayerRequest(params);
      return response;
    }),

    listPrayerRequests: withErrorHandling(async () => {
      const response = await client.church.listPrayerRequests();
      return response;
    })
  },

  // Fund services
  fund: {
    listNeeds: withErrorHandling(async (params?: any) => {
      const response = await client.fund.listNeeds(params || {});
      return response;
    }),

    listTransactions: withErrorHandling(async (params?: any) => {
      const response = await client.fund.listTransactions(params || {});
      return response;
    }),

    createDonation: withErrorHandling(async (params: any) => {
      const response = await client.fund.createDonation(params);
      return response;
    })
  },

  // Membership services
  membership: {
    listPlans: withErrorHandling(async () => {
      const response = await client.membership.listPlans();
      return response;
    }),

    getSubscription: withErrorHandling(async () => {
      const response = await client.membership.getSubscription();
      return response;
    })
  },

  // User services
  user: {
    getProfile: withErrorHandling(async () => {
      const response = await client.user.getMe();
      return response;
    }),

    updateProfile: withErrorHandling(async (params: any) => {
      const response = await client.user.updateProfile(params);
      return response;
    })
  }
};

// Export individual services for direct access if needed
export const {
  academy: academyAPI,
  church: churchAPI,
  fund: fundAPI,
  membership: membershipAPI,
  user: userAPI
} = apiClient;


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  SubscriptionPlan,
  Subscription,
  Transaction,
  PaymentMethod,
  SubscriptionSettings,
  UserProfile
} from '../types/membership';
import { apiClient } from '../lib/apiClient';
import { useUIStore } from './uiStore';

interface MembershipState {
  // Current subscription data
  currentPlan: SubscriptionPlan | null;
  subscription: Subscription | null;
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing' | null;

  // Plans and pricing
  availablePlans: SubscriptionPlan[];
  selectedPlan: SubscriptionPlan | null;

  // Billing information
  billingHistory: Transaction[];
  paymentMethods: PaymentMethod[];

  // Settings
  settings: SubscriptionSettings;

  // UI state
  isLoading: boolean;
  activeTab: 'plans' | 'billing' | 'settings';

  // Actions
  setSelectedPlan: (plan: SubscriptionPlan | null) => void;
  setActiveTab: (tab: 'plans' | 'billing' | 'settings') => void;
  loadSubscriptionData: () => Promise<void>;
  loadBillingHistory: () => Promise<void>;
  loadAvailablePlans: () => Promise<void>;
  updateSubscription: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  updateSettings: (settings: Partial<SubscriptionSettings>) => Promise<void>;
  reset: () => void;
}

// Default settings
const defaultSettings: SubscriptionSettings = {
  autoRenew: true,
  paymentMethodId: '',
  notifications: {
    paymentFailed: true,
    renewalReminder: true,
    planChanges: true,
  },
};

// Create the membership store with persistence
export const useMembershipStore = create<MembershipState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentPlan: null,
      subscription: null,
      subscriptionStatus: null,
      availablePlans: [],
      selectedPlan: null,
      billingHistory: [],
      paymentMethods: [],
      settings: defaultSettings,
      isLoading: false,
      activeTab: 'plans',

      // Actions
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      loadSubscriptionData: async () => {
        const uiStore = useUIStore.getState();
        try {
          set({ isLoading: true });
          uiStore.setLoading(true, 'Loading subscription data...');

          const subscriptionData = await apiClient.membership.getSubscription();
          const plans = await apiClient.membership.listPlans();

          set({
            subscription: subscriptionData,
            subscriptionStatus: subscriptionData.status,
            availablePlans: plans.plans,
            currentPlan: plans.plans.find(p => p.id === subscriptionData.planId) || null,
          });
        } catch (error: any) {
          console.error('Failed to load subscription data:', error);
          uiStore.addNotification({
            type: 'error',
            message: 'Failed to load subscription data. Please try again.',
            duration: 5000,
          });
          throw error;
        } finally {
          set({ isLoading: false });
          uiStore.setLoading(false);
        }
      },

      loadBillingHistory: async () => {
        const uiStore = useUIStore.getState();
        try {
          set({ isLoading: true });
          uiStore.setLoading(true, 'Loading billing history...');

          // Note: This would need to be implemented in the API client
          // For now, using placeholder
          const transactions: Transaction[] = [];
          set({ billingHistory: transactions });
        } catch (error: any) {
          console.error('Failed to load billing history:', error);
          uiStore.addNotification({
            type: 'error',
            message: 'Failed to load billing history. Please try again.',
            duration: 5000,
          });
          throw error;
        } finally {
          set({ isLoading: false });
          uiStore.setLoading(false);
        }
      },

      loadAvailablePlans: async () => {
        const uiStore = useUIStore.getState();
        try {
          const plans = await apiClient.membership.listPlans();
          set({ availablePlans: plans.plans });
        } catch (error: any) {
          console.error('Failed to load available plans:', error);
          uiStore.addNotification({
            type: 'error',
            message: 'Failed to load available plans. Please try again.',
            duration: 5000,
          });
          throw error;
        }
      },

      updateSubscription: async (planId: string) => {
        const uiStore = useUIStore.getState();
        try {
          set({ isLoading: true });
          uiStore.setLoading(true, 'Updating subscription...');

          await apiClient.membership.updateSubscription(planId);

          uiStore.addNotification({
            type: 'success',
            message: 'Subscription updated successfully!',
            duration: 3000,
          });

          // Reload subscription data
          await get().loadSubscriptionData();
        } catch (error: any) {
          console.error('Failed to update subscription:', error);
          uiStore.addNotification({
            type: 'error',
            message: 'Failed to update subscription. Please try again.',
            duration: 5000,
          });
          throw error;
        } finally {
          set({ isLoading: false });
          uiStore.setLoading(false);
        }
      },

      cancelSubscription: async () => {
        const uiStore = useUIStore.getState();
        try {
          set({ isLoading: true });
          uiStore.setLoading(true, 'Canceling subscription...');

          await apiClient.membership.cancelSubscription();

          uiStore.addNotification({
            type: 'success',
            message: 'Subscription canceled successfully.',
            duration: 5000,
          });

          // Reload subscription data
          await get().loadSubscriptionData();
        } catch (error: any) {
          console.error('Failed to cancel subscription:', error);
          uiStore.addNotification({
            type: 'error',
            message: 'Failed to cancel subscription. Please try again.',
            duration: 5000,
          });
          throw error;
        } finally {
          set({ isLoading: false });
          uiStore.setLoading(false);
        }
      },

      updateSettings: async (newSettings: Partial<SubscriptionSettings>) => {
        const uiStore = useUIStore.getState();
        try {
          set({ isLoading: true });
          uiStore.setLoading(true, 'Updating settings...');

          const updatedSettings = { ...get().settings, ...newSettings };
          set({ settings: updatedSettings });

          uiStore.addNotification({
            type: 'success',
            message: 'Settings updated successfully!',
            duration: 3000,
          });
        } catch (error: any) {
          console.error('Failed to update settings:', error);
          uiStore.addNotification({
            type: 'error',
            message: 'Failed to update settings. Please try again.',
            duration: 5000,
          });
          throw error;
        } finally {
          set({ isLoading: false });
          uiStore.setLoading(false);
        }
      },

      reset: () => set({
        currentPlan: null,
        subscription: null,
        subscriptionStatus: null,
        availablePlans: [],
        selectedPlan: null,
        billingHistory: [],
        paymentMethods: [],
        settings: defaultSettings,
        isLoading: false,
        activeTab: 'plans',
      }),
    }),
    {
      name: 'membership-storage',
      // Only persist user preferences and settings, not volatile data
      partialize: (state) => ({
        settings: state.settings,
        activeTab: state.activeTab,
        selectedPlan: state.selectedPlan,
      }),
    }
  )
);

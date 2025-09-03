import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { MembershipContainerProps, SubscriptionPlan } from '../../types/membership';
import { useMembershipStore } from '../../stores/membershipStore';
import { useUIStore } from '../../stores/uiStore';
import { useUserStore } from '../../stores/userStore';
import ErrorBoundary from '../ErrorBoundary';
import MembershipPlans from './MembershipPlans';

// Advanced loading state management
interface LoadingState {
  subscription: boolean;
  plans: boolean;
  billing: boolean;
  overall: boolean;
}

// Sophisticated error handling
interface ErrorState {
  subscription?: Error;
  plans?: Error;
  billing?: Error;
  hasCriticalError: boolean;
}

// Retry mechanism with exponential backoff
const retryWithBackoff = async (
  fn: () => Promise<any>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<any> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Navigation tabs component
interface NavigationTabsProps {
  activeView: 'plans' | 'billing' | 'settings';
  onViewChange: (view: 'plans' | 'billing' | 'settings') => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = memo(({ activeView, onViewChange }) => {
  const tabs = [
    { key: 'plans' as const, label: 'Membership Plans', icon: '💎' },
    { key: 'billing' as const, label: 'Billing & History', icon: '💳' },
    { key: 'settings' as const, label: 'Account Settings', icon: '⚙️' },
  ];

  return (
    <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onViewChange(tab.key)}
          className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
            activeView === tab.key
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
          aria-current={activeView === tab.key ? 'page' : undefined}
        >
          <span className="mr-2">{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.key.charAt(0).toUpperCase() + tab.key.slice(1)}</span>
        </button>
      ))}
    </div>
  );
});

const MembershipContainer: React.FC<MembershipContainerProps> = memo(({ user, onError }) => {
  // State management
  const membershipStore = useMembershipStore();
  const uiStore = useUIStore();
  const { user: currentUser } = useUserStore();

  // Local state - enhanced for UX excellence
  const [activeView, setActiveView] = useState<'plans' | 'billing' | 'settings'>('plans');
  const [loadingState, setLoadingState] = useState<LoadingState>({
    subscription: false,
    plans: false,
    billing: false,
    overall: false,
  });
  const [errorState, setErrorState] = useState<ErrorState>({
    hasCriticalError: false,
  });

  // UX-focused state management
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [upgradeInProgress, setUpgradeInProgress] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [userInteraction, setUserInteraction] = useState<'idle' | 'selecting' | 'upgrading' | 'comparing'>('idle');

  // Memoized data from stores
  const membershipData = useMemo(() => ({
    currentPlan: membershipStore.currentPlan,
    subscription: membershipStore.subscription,
    availablePlans: membershipStore.availablePlans,
    billingHistory: membershipStore.billingHistory,
    settings: membershipStore.settings,
    isLoading: membershipStore.isLoading,
  }), [
    membershipStore.currentPlan,
    membershipStore.subscription,
    membershipStore.availablePlans,
    membershipStore.billingHistory,
    membershipStore.settings,
    membershipStore.isLoading,
  ]);

  // Global error handler
  const handleGlobalError = useCallback((error: Error, context: string) => {
    console.error(`MembershipContainer error in ${context}:`, error);

    setErrorState(prev => ({
      ...prev,
      [context]: error,
      hasCriticalError: context === 'subscription' || context === 'plans'
    }));

    // Show user-friendly notification
    uiStore.addNotification({
      type: 'error',
      message: `Failed to load ${context} data. Please try refreshing the page.`,
      duration: 5000,
    });

    // Call parent error handler if provided
    onError?.(error);
  }, [uiStore, onError]);

  // Load membership data with retry mechanism
  const loadMembershipData = useCallback(async () => {
    setLoadingState(prev => ({ ...prev, overall: true }));
    setErrorState({ hasCriticalError: false });

    try {
      // Load subscription data with retry
      setLoadingState(prev => ({ ...prev, subscription: true }));
      await retryWithBackoff(async () => {
        await membershipStore.loadSubscriptionData();
      }, 3, 1000);
      setLoadingState(prev => ({ ...prev, subscription: false }));

      // Load plans data with retry
      setLoadingState(prev => ({ ...prev, plans: true }));
      await retryWithBackoff(async () => {
        await membershipStore.loadAvailablePlans();
      }, 3, 1000);
      setLoadingState(prev => ({ ...prev, plans: false }));

      // Load billing data (non-critical, no retry needed)
      setLoadingState(prev => ({ ...prev, billing: true }));
      try {
        await membershipStore.loadBillingHistory();
      } catch (billingError) {
        console.warn('Billing history failed to load:', billingError);
        // Don't fail the entire load for billing errors
      }
      setLoadingState(prev => ({ ...prev, billing: false }));

    } catch (error: any) {
      handleGlobalError(error, 'data loading');
    } finally {
      setLoadingState(prev => ({ ...prev, overall: false }));
    }
  }, [membershipStore, handleGlobalError]);

  // Load data on mount and when user changes
  useEffect(() => {
    if (currentUser) {
      loadMembershipData();
    }
  }, [currentUser, loadMembershipData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup any subscriptions or timers if needed
    };
  }, []);

  // Navigation change handler
  const handleViewChange = useCallback((view: 'plans' | 'billing' | 'settings') => {
    setActiveView(view);
    // Persist navigation preference
    membershipStore.setActiveTab(view);
  }, [membershipStore]);

  // Optimistic plan upgrade handler with rollback
  const handlePlanUpgrade = useCallback(async (plan: SubscriptionPlan) => {
    setUpgradeInProgress(true);
    setUserInteraction('upgrading');

    // Optimistic update for instant UX feedback
    const previousPlan = membershipData.currentPlan;
    membershipStore.setSelectedPlan(plan);

    try {
      await membershipStore.updateSubscription(plan.id);
      uiStore.addNotification({
        type: 'success',
        message: `Successfully upgraded to ${plan.name}!`,
        duration: 3000,
      });
      setSelectedPlan(null); // Clear selection after successful upgrade
    } catch (error) {
      // Rollback on error
      membershipStore.setSelectedPlan(previousPlan);
      uiStore.addNotification({
        type: 'error',
        message: 'Upgrade failed. Please try again.',
        duration: 5000,
      });
    } finally {
      setUpgradeInProgress(false);
      setUserInteraction('idle');
    }
  }, [membershipStore, uiStore, membershipData.currentPlan]);

  // Plan selection handler
  const handlePlanSelect = useCallback((plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setUserInteraction('selecting');
  }, []);

  // Render active view content
  const renderActiveView = useCallback(() => {
    if (errorState.hasCriticalError) {
      return (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Membership Data
          </h3>
          <p className="text-gray-600 mb-6">
            We're experiencing issues loading your membership information. Please try again.
          </p>
          <button
            onClick={loadMembershipData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Retry Loading
          </button>
        </div>
      );
    }

    // Placeholder for actual components - will be replaced with real components
    switch (activeView) {
      case 'plans':
        return (
          <MembershipPlans
            plans={membershipData.availablePlans}
            currentPlan={membershipData.currentPlan || undefined}
            selectedPlan={selectedPlan || undefined}
            onSelectPlan={handlePlanSelect}
            onUpgrade={handlePlanUpgrade}
            isLoading={loadingState.plans}
          />
        );

      case 'billing':
        return (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Billing & History</h3>
            <p className="text-gray-600">Billing component will be integrated here</p>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-500">
                Transactions: {membershipData.billingHistory.length}
              </p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Account Settings</h3>
            <p className="text-gray-600">Settings component will be integrated here</p>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-500">
                Auto-renew: {membershipData.settings.autoRenew ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [activeView, errorState.hasCriticalError, membershipData, loadMembershipData]);

  // Show loading state for initial load
  if (loadingState.overall && !membershipData.subscription) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your membership data...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-red-600 mb-4">Container Error</h3>
          <p className="text-gray-600 mb-6">The membership container encountered an error.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Reload Page
          </button>
        </div>
      }
    >
      <div className="max-w-6xl mx-auto">
        <NavigationTabs activeView={activeView} onViewChange={handleViewChange} />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {renderActiveView()}
        </div>

        {/* Enhanced Debug info for development */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 p-4 bg-gray-100 rounded">
            <summary className="cursor-pointer text-sm font-medium">Enhanced Debug Info (Development)</summary>
            <div className="mt-2 text-xs space-y-1">
              <p><strong>Active View:</strong> {activeView}</p>
              <p><strong>User Interaction:</strong> {userInteraction}</p>
              <p><strong>Loading State:</strong> {JSON.stringify(loadingState)}</p>
              <p><strong>UX State:</strong> Upgrade: {upgradeInProgress}, Comparison: {comparisonMode}</p>
              <p><strong>Has Errors:</strong> {errorState.hasCriticalError ? 'Yes' : 'No'}</p>
              <p><strong>Plans Count:</strong> {membershipData.availablePlans.length}</p>
              <p><strong>Current Plan:</strong> {membershipData.currentPlan?.name || 'None'}</p>
              <p><strong>Selected Plan:</strong> {selectedPlan?.name || 'None'}</p>
              <p><strong>Subscription Status:</strong> {membershipData.subscription?.status || 'None'}</p>
            </div>
          </details>
        )}
      </div>
    </ErrorBoundary>
  );
});

MembershipContainer.displayName = 'MembershipContainer';

export default MembershipContainer;

// types/membership.ts - Shared across all membership components
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'annual';
  features: string[];
  isPopular?: boolean;
  trialDays?: number;
  stripePriceId?: string;
}

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd?: string;
}

export interface Transaction {
  id: string;
  type: 'subscription' | 'one_time' | 'refund';
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  description: string;
  createdAt: string;
  invoiceUrl?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface SubscriptionSettings {
  autoRenew: boolean;
  paymentMethodId: string;
  notifications: {
    paymentFailed: boolean;
    renewalReminder: boolean;
    planChanges: boolean;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  preferences: {
    newsletter: boolean;
    marketing: boolean;
    language: string;
  };
}

// Component Props Interfaces
export interface MembershipContainerProps {
  user: UserProfile;
  onError?: (error: Error) => void;
}

export interface MembershipPlansProps {
  plans: SubscriptionPlan[];
  currentPlan?: SubscriptionPlan;
  selectedPlan?: SubscriptionPlan;
  onSelectPlan: (plan: SubscriptionPlan) => void;
  onUpgrade: (plan: SubscriptionPlan) => void;
  isLoading?: boolean;
}

export interface MembershipCheckoutProps {
  selectedPlan: SubscriptionPlan;
  onSuccess: (subscription: Subscription) => void;
  onCancel: () => void;
  user: UserProfile;
}

export interface MembershipBillingProps {
  billingHistory: Transaction[];
  paymentMethods: PaymentMethod[];
  currentSubscription: Subscription;
  onUpdatePaymentMethod: (method: PaymentMethod) => void;
  onDownloadInvoice: (transactionId: string) => void;
  isLoading?: boolean;
}

export interface MembershipSettingsProps {
  subscription: Subscription;
  userProfile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  onUpdateSubscription: (settings: SubscriptionSettings) => void;
  onCancelSubscription: () => void;
}


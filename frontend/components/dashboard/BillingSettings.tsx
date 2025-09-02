// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

import { 
  CreditCard, 
  Wallet, 
  Save, 
  AlertCircle, 
  User, 
  Shield, 
  CheckCircle,
  Crown,
  Star,
  Target,
  Gem,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

import client from '../../client';

export default function BillingSettings() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        setLoading(true);
        const response = await client.membership.getSubscription();
        setSubscription(response);
      } catch (error) {
        console.error('Failed to fetch subscription:', error);
        // Fallback to mock data if API fails
        setSubscription({
          plan: 'BRONZE',
          status: 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancelAtPeriodEnd: false,
          amount: 19,
          currency: 'AUD'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [isLoaded, isSignedIn]);

  const handleCancelSubscription = async () => {
    try {
      setUpdating(true);
      await client.membership.cancelSubscription();
      const response = await client.membership.getSubscription();
      setSubscription(response);
      console.log('Subscription cancelled successfully');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      setUpdating(true);
      await client.membership.activateSubscription();
      const response = await client.membership.getSubscription();
      setSubscription(response);
      console.log('Subscription reactivated successfully');
    } catch (error) {
      console.error('Failed to reactivate subscription:', error);
    } finally {
      setUpdating(false);
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'BRONZE': return <Target className="h-6 w-6 text-orange-600" />;
      case 'SILVER': return <Star className="h-6 w-6 text-gray-400" />;
      case 'GOLD': return <Crown className="h-6 w-6 text-yellow-400" />;
      case 'DIAMOND': return <Gem className="h-6 w-6 text-purple-400" />;
      default: return <Shield className="h-6 w-6 text-gray-400" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'BRONZE': return 'text-orange-600';
      case 'SILVER': return 'text-gray-400';
      case 'GOLD': return 'text-yellow-400';
      case 'DIAMOND': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Current Subscription */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Current Subscription</h2>
        </div>

        {subscription ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getPlanIcon(subscription.plan)}
                <div>
                  <h3 className={`text-lg font-bold ${getPlanColor(subscription.plan)}`}>
                    {subscription.plan} MEMBERSHIP
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Status: <span className={subscription.status === 'active' ? 'text-green-400' : 'text-red-400'}>
                      {subscription.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">
                  ${subscription.amount} {subscription.currency}
                </p>
                <p className="text-gray-400 text-sm">per month</p>
              </div>
            </div>

            <div className="bg-gray-700/50 border border-gray-600 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Next billing date:</p>
                  <p className="text-white">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Auto-renewal:</p>
                  <p className={subscription.cancelAtPeriodEnd ? 'text-red-400' : 'text-green-400'}>
                    {subscription.cancelAtPeriodEnd ? 'Cancelled' : 'Active'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {subscription.cancelAtPeriodEnd ? (
                <button
                  onClick={handleReactivateSubscription}
                  disabled={updating}
                  className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 font-semibold uppercase tracking-wide disabled:opacity-50"
                >
                  {updating ? 'Processing...' : 'Reactivate Subscription'}
                </button>
              ) : (
                <button
                  onClick={handleCancelSubscription}
                  disabled={updating}
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 font-semibold uppercase tracking-wide disabled:opacity-50"
                >
                  {updating ? 'Processing...' : 'Cancel Subscription'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No active subscription found.</p>
            <button className="mt-4 bg-orange-500 text-white hover:bg-orange-600 px-6 py-2 font-semibold uppercase tracking-wide">
              Choose a Plan
            </button>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Payment Methods</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-700/50 border border-gray-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-white font-semibold">•••• •••• •••• 4242</p>
                <p className="text-gray-400 text-sm">Expires 12/25</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
              <button className="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
          </div>

          <button className="w-full bg-gray-700 border border-gray-600 text-white hover:bg-gray-600 px-4 py-3 font-semibold uppercase tracking-wide">
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Billing History</h2>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-700/50 border border-gray-600 p-4 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">January 2025 - BRONZE Membership</p>
              <p className="text-gray-400 text-sm">Paid on Jan 1, 2025</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">$19.00 AUD</p>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Download Invoice</button>
            </div>
          </div>

          <div className="bg-gray-700/50 border border-gray-600 p-4 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">December 2024 - BRONZE Membership</p>
              <p className="text-gray-400 text-sm">Paid on Dec 1, 2024</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">$19.00 AUD</p>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Download Invoice</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

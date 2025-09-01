import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useBackend } from '../../hooks/useBackend';
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

export default function BillingSettings() {
  const authedBackend = useBackend();
  const queryClient = useQueryClient();
  const [walletAddress, setWalletAddress] = useState('');
  const [bsb, setBsb] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [lastSaved, setLastSaved] = useState('');

  const { data: membership, refetch: refreshMembership } = useQuery({
    queryKey: ['membership'],
    queryFn: () => authedBackend.membership.getSubscription(),
  });

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => authedBackend.user.getMe(),
  });

  useEffect(() => {
    if (profile) {
      setWalletAddress(profile.usdtWalletAddress || '');
      setBsb(profile.bsb || '');
      setAccountNumber(profile.accountNumber || '');
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
      setAddress(profile.address || '');
      setIs2FAEnabled(profile.is2FAEnabled || false);
      setLastSaved(profile.lastUpdated || '');
    }
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationFn: (params: any) => authedBackend.user.updateProfile(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      setLastSaved(new Date().toISOString());
      alert('Information saved successfully.');
    },
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: () => authedBackend.membership.cancelSubscription(),
    onSuccess: async () => {
      await refreshMembership();
      alert('Your subscription has been set to cancel at the end of the current period.');
    },
  });

  const handleSavePayoutInfo = () => {
    updateProfileMutation.mutate({ 
      usdtWalletAddress: walletAddress, 
      bsb, 
      accountNumber,
      firstName,
      lastName,
      email,
      phone,
      address,
      is2FAEnabled,
      lastUpdated: new Date().toISOString()
    });
  };

  const toggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  // Mock membership tiers
  const membershipTiers = [
    {
      name: 'BRONZE',
      price: 19,
      icon: Target,
      benefits: [
        'Private Telegram group access',
        'Access to all institute (premium) courses', 
        'Weekly community updates',
        'Help Me Fund access',
        '5% Promo discount on merch',
        'Affiliate earnings capped at $1,000 AUD/month'
      ]
    },
    {
      name: 'SILVER', 
      price: 33,
      icon: Star,
      benefits: [
        'Private Telegram group access',
        'Access to all institute (premium) courses',
        'Fortnightly Q&A Meetings',
        'Monthly live group Q&A with leadership',
        'Help Me Fund access',
        'Exclusive member content',
        '10% Promo discount on merch',
        'Affiliate earnings capped at $3,000 AUD/month'
      ]
    },
    {
      name: 'GOLD',
      price: 149,
      icon: Crown,
      benefits: [
        'Private Telegram group access',
        'Access to all institute (premium) courses',
        'Fortnightly Q&A Meetings',
        'Help Me Fund access',
        '10% Promo discount on merch',
        'Affiliate earnings capped at $5,000 AUD/month'
      ]
    },
    {
      name: 'DIAMOND',
      price: 499,
      icon: Gem,
      benefits: [
        'Private Telegram group access',
        'Access to all institute (premium) courses',
        'Quarterly 1-on-1 strategy session with Senior Leader, Samuel Waterhouse',
        'Free access to all paid events & summits',
        'Help Me Fund access',
        'Fortnightly Q&A Meetings',
        '10% Promo discount on merch',
        'Affiliate earnings capped at $10,000 AUD/month'
      ]
    }
  ];

  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your membership? This action cannot be undone.')) {
      cancelSubscriptionMutation.mutate();
    }
  };

  return (
    <div className="space-y-8">
      {/* Personal Contact Information */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Personal Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">First Name</label>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2" 
              disabled={isProfileLoading} 
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">Last Name</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2" 
              disabled={isProfileLoading} 
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">Email</label>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="flex-1 bg-gray-700 border border-gray-600 text-white px-4 py-2" 
                disabled={isProfileLoading} 
              />
            </div>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">Phone</label>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="flex-1 bg-gray-700 border border-gray-600 text-white px-4 py-2" 
                disabled={isProfileLoading} 
                placeholder="+61 xxx xxx xxx"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-white font-semibold mb-2 text-sm">Address</label>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                className="flex-1 bg-gray-700 border border-gray-600 text-white px-4 py-2" 
                disabled={isProfileLoading} 
                placeholder="Street, City, State, Postcode"
              />
            </div>
          </div>
        </div>
        
        {lastSaved && (
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            Last saved: {new Date(lastSaved).toLocaleString()}
          </div>
        )}
      </div>

      {/* 2FA Security */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Security Settings</h2>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Two-Factor Authentication (2FA)</h3>
            <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={toggle2FA}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              is2FAEnabled ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                is2FAEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {is2FAEnabled && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">2FA is enabled on your account</span>
            </div>
          </div>
        )}
      </div>

      {/* Current Membership */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Current Membership</h2>
        </div>
        {membership?.active ? (
          <div>
            <p className="text-white">Current Plan: <span className="font-bold">{membership.planName}</span></p>
            <p className="text-gray-400 text-sm">Status: <span className="text-green-400">{membership.status}</span></p>
            {membership.renewsAt && (
              <p className="text-gray-400 text-sm">Renews on: {new Date(membership.renewsAt).toLocaleDateString()}</p>
            )}
            <button
              onClick={handleCancelSubscription}
              className="mt-4 bg-red-600 text-white hover:bg-red-700 px-4 py-2 font-semibold uppercase tracking-wide text-sm"
              disabled={cancelSubscriptionMutation.isPending}
            >
              {cancelSubscriptionMutation.isPending ? 'Cancelling...' : 'Cancel Subscription'}
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-400">You do not have an active membership.</p>
          </div>
        )}
      </div>

      {/* Membership Options */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Crown className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Membership Plans</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {membershipTiers.map((tier) => {
            const Icon = tier.icon;
            const isCurrentPlan = membership?.planName === tier.name;
            
            return (
              <div key={tier.name} className="bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white">{tier.name}</h3>
                </div>
                
                <div className="text-2xl font-black text-white mb-3">
                  ${tier.price}
                  <span className="text-sm text-gray-400">/28 days</span>
                </div>
                
                <ul className="space-y-2 text-xs text-gray-300 flex-grow mb-4">
                  {tier.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                  {tier.benefits.length > 3 && (
                    <li className="text-gray-500">+{tier.benefits.length - 3} more...</li>
                  )}
                </ul>
                
                <div className="mt-auto">
                  {!isCurrentPlan ? (
                    <button className="w-full bg-orange-500 text-white hover:bg-orange-600 px-3 py-2 text-sm font-semibold uppercase tracking-wide">
                      UPGRADE
                    </button>
                  ) : (
                    <div className="w-full bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-center">
                      CURRENT PLAN
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Payout Information</h2>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          This is where your affiliate commissions will be sent. Please provide either Australian bank details or a USDT wallet. All details are securely stored and timestamped for audit purposes.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Australian Payouts</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">BSB</label>
                <input type="text" value={bsb} onChange={(e) => setBsb(e.target.value)} placeholder="000-000" className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2" disabled={isProfileLoading} />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">Account Number</label>
                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="000000000" className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2" disabled={isProfileLoading} />
              </div>
            </div>
          </div>

          <div className="text-center text-gray-400 my-4">OR</div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">International Payouts</h3>
            <div>
              <label className="block text-white font-semibold mb-2 text-sm">USDT (TRC20) Wallet Address</label>
              <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="Enter your TRC20 wallet address" className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2" disabled={isProfileLoading} />
              <div className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 p-3 mt-2 flex items-center gap-2 text-sm">
                <AlertCircle className="h-5 w-5" />
                <div><strong>Important:</strong> Incorrect wallet addresses may result in permanent loss of funds. Double-check your address.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mt-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-blue-100 text-sm">
              <strong>Important:</strong> All payment details are securely encrypted and timestamped. 
              If there are any payment discrepancies, we can verify the details you provided at the time of submission.
            </div>
          </div>
        </div>

        <button
          onClick={handleSavePayoutInfo}
          className="mt-8 bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 font-semibold uppercase tracking-wide inline-flex items-center"
          disabled={updateProfileMutation.isPending}
        >
          <Save className="mr-2 h-4 w-4" />
          {updateProfileMutation.isPending ? 'Saving All Details...' : 'Save All Details'}
        </button>
      </div>
    </div>
  );
}

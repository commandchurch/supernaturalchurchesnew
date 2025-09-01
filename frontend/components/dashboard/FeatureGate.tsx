import React, { useState } from 'react';
import { Lock, Users, Crown, Star, X } from 'lucide-react';

interface FeatureGateProps {
  feature: string;
  requiredPlan?: 'bronze' | 'silver' | 'gold' | 'diamond';
  userPlan?: 'free' | 'bronze' | 'silver' | 'gold' | 'diamond';
  children: React.ReactNode;
}

export default function FeatureGate({ 
  feature, 
  requiredPlan = 'bronze', 
  userPlan = 'free', 
  children 
}: FeatureGateProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);

  const planHierarchy = {
    free: 0,
    bronze: 1,
    silver: 2,
    gold: 3,
    diamond: 4
  };

  const hasAccess = planHierarchy[userPlan] >= planHierarchy[requiredPlan];

  if (hasAccess) {
    return <>{children}</>;
  }

  const upgradeOptions = [
    {
      method: 'Referrals',
      icon: Users,
      description: 'Refer 3 Bronze OR 2 Silver OR 1 Gold/Diamond members for FREE upgrade',
      action: 'Start Referring',
      color: 'blue',
      link: '/dashboard?tab=outreach'
    },
    {
      method: 'Direct Upgrade',
      icon: Crown,
      description: 'Upgrade to any paid plan instantly',
      action: 'View Plans',
      color: 'purple',
      link: '/membership'
    }
  ];

  return (
    <>
      <div className="relative">
        <div className="blur-sm pointer-events-none opacity-50">
          {children}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setShowUpgrade(true)}
            className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 font-semibold uppercase tracking-wide inline-flex items-center gap-2 shadow-lg"
          >
            <Lock className="w-5 h-5" />
            Upgrade to Access {feature}
          </button>
        </div>
      </div>

      {/* Upgrade Popup */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowUpgrade(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 heading-font">Upgrade Required</h2>
              <p className="text-gray-400 text-sm">
                <span className="font-semibold text-orange-400">{feature}</span> requires a {requiredPlan} plan or higher.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {upgradeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.method}
                    className={`border p-4 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer ${
                      option.color === 'blue' ? 'border-blue-500/30 bg-blue-500/10' : 'border-purple-500/30 bg-purple-500/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-5 h-5 ${option.color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`} />
                      <h3 className="text-white font-semibold">{option.method}</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{option.description}</p>
                    <button
                      className={`w-full py-2 px-4 font-semibold uppercase tracking-wide text-sm transition-colors ${
                        option.color === 'blue'
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}
                      onClick={() => {
                        window.location.href = option.link;
                      }}
                    >
                      {option.action}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                FREE users: Refer members to unlock paid features instantly!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

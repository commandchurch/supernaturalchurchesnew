import React from 'react';
import { X, Crown, Star, Users, Target } from 'lucide-react';

interface UpgradePopupProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export default function UpgradePopup({ isOpen, onClose, feature }: UpgradePopupProps) {
  if (!isOpen) return null;

  const upgradeOptions = [
    {
      method: 'Referrals',
      icon: Users,
      description: 'Refer 3 Bronze members for FREE Bronze upgrade',
      action: 'Start Referring',
      color: 'blue'
    },
    {
      method: 'Direct Upgrade',
      icon: Crown,
      description: 'Upgrade to any paid plan instantly',
      action: 'View Plans',
      color: 'purple'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
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
            <span className="font-semibold text-orange-400">{feature}</span> is only available to paid members.
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
                    if (option.method === 'Referrals') {
                      window.location.href = '/dashboard?tab=outreach';
                    } else {
                      window.location.href = '/membership';
                    }
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
            Upgrade paths: 3 Bronze OR 2 Silver OR 1 Gold OR 1 Diamond referral
          </p>
        </div>
      </div>
    </div>
  );
}

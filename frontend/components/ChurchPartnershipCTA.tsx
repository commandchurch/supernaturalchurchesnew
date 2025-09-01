import React, { useState } from 'react';
import { Building, Crown, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import FiveFoldPartnershipApplication from './FiveFoldPartnershipApplication';

interface ChurchPartnershipCTAProps {
  variant?: 'default' | 'compact' | 'featured';
  showLearnMore?: boolean;
  showPartnerButton?: boolean;
  className?: string;
}

const ChurchPartnershipCTA: React.FC<ChurchPartnershipCTAProps> = ({ 
  variant = 'default',
  showLearnMore = true,
  showPartnerButton = true,
  className = ''
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const benefits = [
    'Complete church leadership team access',
    'Five-fold ministry office training modules', 
    'Monthly leadership strategy sessions',
    'Church-wide miracle healing protocols',
    'Prophetic ministry development curriculum',
    'Apostolic church planting resources',
    'Evangelistic outreach training programs',
    'Pastoral care excellence frameworks',
    'Teaching ministry anointing development',
    'Priority support & consultation',
    'Custom curriculum development',
    'Quarterly on-site ministry visits (Australia)'
  ];

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-700/50 p-6 rounded ${className}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded">
            <Building className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Partner Your Church</h3>
            <p className="text-blue-300 text-sm">Join our Supernatural Churches Apostolic Partnership</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-4">
          Join our Supernatural Churches Apostolic Partnership and demonstrate Kingdom power through miraculous ministry. We equip churches to be the light of this world, not to look the same as unbelievers.
        </p>
        <div className="flex gap-3">
          {showLearnMore && (
            <Link 
              to="/about#church-partnership"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-300 transform hover:scale-105"
            >
              LEARN MORE
            </Link>
          )}
          {showPartnerButton && (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              PARTNER WITH US
            </button>
          )}
        </div>
        <FiveFoldPartnershipApplication 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`bg-white/5 border border-white/10 backdrop-blur-sm p-8 ${className}`}>
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto mb-4 rounded">
            <Crown className="h-8 w-8 text-purple-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 heading-font">
            SUPERNATURAL CHURCHES PARTNERSHIP
          </h2>
          <div className="text-orange-400 font-bold text-lg mb-4">
            🔥 WE BRING SPIRITUALLY DEAD CHURCHES BACK TO LIFE
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            The Kingdom of God is demonstrated in power, not in words (1 Corinthians 4:20). Through apostolic oversight and 
            supernatural training, we equip churches with proven ministry protocols that manifest the Dunamis power of God.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Ministry Transformation
            </h3>
            <p className="text-gray-400 mb-4">
              We equip churches with biblical protocols for congregational healing, discerning false doctrines, and establishing 
              supernatural ministry foundations. Your church will demonstrate Kingdom power through miraculous signs and wonders, 
              distinguishing you as the light of this world.
            </p>
            <div className="text-2xl font-black text-white">
              $200 AUD <span className="text-gray-400 text-base font-normal">/month</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold mb-3">Partnership Benefits:</h4>
            {benefits.slice(0, 6).map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{benefit}</span>
              </div>
            ))}
            <p className="text-purple-300 text-sm font-semibold pt-2">+ 6 more comprehensive benefits</p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex gap-4 justify-center flex-wrap">
            {showLearnMore && (
              <Link 
                to="/about#church-partnership"
                className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-300 transform hover:scale-105"
              >
                LEARN MORE
              </Link>
            )}
            {showPartnerButton && (
              <button 
                onClick={() => setIsFormOpen(true)}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 transform hover:scale-105"
              >
                PARTNER WITH US
              </button>
            )}
          </div>
          <p className="text-gray-400 text-sm">
            Join our apostolic network of supernatural churches demonstrating Dunamis power and advancing God's Kingdom through biblical accuracy and miraculous ministry.
          </p>
        </div>

        <FiveFoldPartnershipApplication 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-r from-gray-900/30 to-black/30 border border-gray-700/50 p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
          <Building className="h-7 w-7 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">Want to Partner Your Church?</h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            Join our Supernatural Churches Apostolic Partnership and demonstrate the Kingdom of God in power, not just words. 
            We equip churches with biblical protocols to manifest Dunamis power and be the light of this world.
          </p>
          <div className="flex gap-3 flex-wrap">
            {showLearnMore && (
              <Link 
                to="/about#church-partnership"
                className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-300 transform hover:scale-105"
              >
                LEARN MORE
              </Link>
            )}
            {showPartnerButton && (
              <button 
                onClick={() => setIsFormOpen(true)}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 transform hover:scale-105"
              >
                PARTNER WITH US
              </button>
            )}
          </div>
        </div>
      </div>
      <FiveFoldPartnershipApplication 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default ChurchPartnershipCTA;

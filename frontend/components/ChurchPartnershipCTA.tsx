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
          Partner with churches worldwide experiencing supernatural breakthrough. Receive financial support and apostolic training to demonstrate God's Kingdom power through real miracles and ministry transformation.
        </p>
        <div className="flex gap-3">
          {showLearnMore && (
            <Link
              to="/about#church-partnership"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-300 transform hover:scale-105"
              aria-label="Learn more about Supernatural Churches Partnership"
            >
              Learn About Church Partnership
            </Link>
          )}
          {showPartnerButton && (
            <Link
              to="/churchpartnership"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
            >
              BECOME A PARTNER
            </Link>
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
            🔥 Transform Your Ministry Through Supernatural Power
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Experience the "Dunamis power" (Greek: δύναμις - miraculous power, mighty works, strength) that brings spiritually dead churches back to life. We provide both financial support and biblical training so your congregation can demonstrate God's Kingdom power through real miracles, healing, and supernatural ministry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Complete Ministry Transformation
            </h3>
            <div className="text-gray-400 mb-4 space-y-3">
              <p>
                <strong className="text-white">Financial Freedom:</strong> Monthly partnership fees help sustain your ministry while you focus on God's work, not fundraising.
              </p>
              <p>
                <strong className="text-white">Biblical Excellence:</strong> Receive apostolic oversight ensuring doctrinal purity and supernatural ministry training.
              </p>
              <p>
                <strong className="text-white">Kingdom Impact:</strong> Your church becomes a demonstration of God's power, not just another religious institution.
              </p>
            </div>
            <div className="text-2xl font-black text-white">
              $99 AUD <span className="text-gray-400 text-base font-normal">/month</span>
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
                Learn About Church Partnership
              </Link>
            )}
            {showPartnerButton && (
              <Link
                to="/churchpartnership"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                BECOME A PARTNER
              </Link>
            )}
          </div>
          <p className="text-gray-400 text-sm">
            Join churches worldwide that are experiencing supernatural breakthrough, financial provision, and the genuine demonstration of God's Kingdom power through miraculous ministry.
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
            Transform your ministry with supernatural power and apostolic oversight. Receive financial support and biblical training to demonstrate God's Kingdom through real miracles, healing, and breakthrough ministry.
          </p>
          <div className="flex gap-3 flex-wrap">
            {showLearnMore && (
              <Link 
                to="http://localhost:5175/partner"
                className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Learn About Church Partnership
              </Link>
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

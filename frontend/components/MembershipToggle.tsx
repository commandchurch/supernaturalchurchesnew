import React from 'react';
import { Users, Building2 } from 'lucide-react';

interface MembershipToggleProps {
  onToggle: (membershipType: 'individual' | 'church') => void;
  membershipType: 'individual' | 'church';
}

export default function MembershipToggle({ onToggle, membershipType }: MembershipToggleProps) {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-white/5 border border-white/10 p-1 flex rounded-lg">
        <button
          onClick={() => onToggle('individual')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold uppercase tracking-wide transition-all duration-300 rounded-md ${
            membershipType === 'individual'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Users className="w-5 h-5" />
          Individual Ministry
        </button>
        <button
          onClick={() => onToggle('church')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold uppercase tracking-wide transition-all duration-300 rounded-md ${
            membershipType === 'church'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Building2 className="w-5 h-5" />
          Church Partnership
        </button>
      </div>
    </div>
  );
}

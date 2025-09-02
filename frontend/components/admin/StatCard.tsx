import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard = ({ icon, label, value }: StatCardProps) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-3 md:p-6">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <p className="text-[11px] md:text-xs text-gray-400 uppercase tracking-wide">{label}</p>
          <p className="text-lg md:text-2xl font-bold text-white heading-font">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StatCard);

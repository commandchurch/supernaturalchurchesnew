import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  icon?: React.ReactNode;
}

const SliderInput = ({ label, value, onChange, min, max, step = 1, prefix = '', icon }: SliderInputProps) => {
  return (
    <div>
      <label className="block text-white font-semibold mb-2 text-sm flex items-center gap-2">
        {icon} {label}
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer touch-manipulation
                     slider:thumb:bg-blue-500 slider:thumb:h-6 slider:thumb:w-6 slider:thumb:rounded-full slider:thumb:shadow-lg
                     slider:thumb:border-2 slider:thumb:border-white hover:slider:thumb:bg-blue-400
                     active:slider:thumb:bg-blue-600 transition-all duration-150"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(value - min) / (max - min) * 100}%, #374151 ${(value - min) / (max - min) * 100}%, #374151 100%)`
          }}
        />
        <div className="flex items-center justify-center">
          <div className="w-16 sm:w-20 text-center bg-gray-700 border border-gray-600 text-white px-2 sm:px-3 py-2 text-sm rounded-lg">
            {prefix}{value}
          </div>
        </div>
      </div>

      {/* Progress indicators for mobile */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{prefix}{min}</span>
        <span className="sm:hidden">Current: {prefix}{value}</span>
        <span>{prefix}{max}</span>
      </div>
    </div>
  );
};

export default React.memo(SliderInput);

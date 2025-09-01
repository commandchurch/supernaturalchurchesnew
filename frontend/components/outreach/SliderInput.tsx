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
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <div className="w-20 text-center bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm">
          {prefix}{value}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SliderInput);

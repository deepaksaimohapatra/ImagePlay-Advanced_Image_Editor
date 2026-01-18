import React from 'react';

export default function SliderGroup({ label, value, min, max, onChange, unit }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-slate-300 font-medium">{label}</label>
        <span className="text-sm text-cyan-400 font-semibold">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}

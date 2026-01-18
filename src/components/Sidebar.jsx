import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SliderGroup from './SliderGroup';

export default function Sidebar({
  state,
  onSliderChange,
  onImageUpload,
  onApplyPreset,
  onRotate,
  onFlipX,
  onFlipY,
  onStartCrop,
  onApplyCrop,
  onUndo,
  onRedo,
  onCompare,
  onDownload,
  onCompress,
  onReset,
  cropping,
  undoCount,
  redoCount,
}) {
  const fileInputRef = useRef(null);

  const presets = [
    { name: 'Grayscale', id: 'grayscale' },
    { name: 'Sepia', id: 'sepia' },
    { name: 'Vintage', id: 'vintage' },
    { name: 'Cool', id: 'cool' },
    { name: 'Warm', id: 'warm' },
  ];

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="w-80 bg-slate-900/80 backdrop-blur-md border-r border-slate-700/50 overflow-y-auto p-6 space-y-6"
    >
      {/* Upload Button */}
      <motion.label
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="block w-full px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 text-center rounded-lg font-semibold cursor-pointer hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
      >
        <i className="fas fa-folder mr-2"></i>Choose Image
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={onImageUpload}
        />
      </motion.label>

      {/* Adjustments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-bold text-cyan-400 mb-4">Adjustments</h3>
        <div className="space-y-4">
          <SliderGroup
            label="Brightness"
            value={state.brightness}
            min={0}
            max={200}
            onChange={(val) => onSliderChange('brightness', val)}
            unit="%"
          />
          <SliderGroup
            label="Contrast"
            value={state.contrast}
            min={0}
            max={200}
            onChange={(val) => onSliderChange('contrast', val)}
            unit="%"
          />
          <SliderGroup
            label="Saturation"
            value={state.saturate}
            min={0}
            max={200}
            onChange={(val) => onSliderChange('saturate', val)}
            unit="%"
          />
          <SliderGroup
            label="Hue Rotation"
            value={state.hue}
            min={0}
            max={360}
            onChange={(val) => onSliderChange('hue', val)}
            unit="°"
          />
          <SliderGroup
            label="Opacity"
            value={state.opacity}
            min={0}
            max={100}
            onChange={(val) => onSliderChange('opacity', val)}
            unit="%"
          />
        </div>
      </motion.div>

      {/* Presets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-bold text-cyan-400 mb-3">Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          {presets.map(preset => (
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#22d3ee', color: '#0f172a' }}
              whileTap={{ scale: 0.95 }}
              key={preset.id}
              onClick={() => onApplyPreset(preset.id)}
              className="px-3 py-2 bg-slate-700/50 hover:bg-cyan-400 text-white rounded-lg font-medium transition-colors duration-200"
            >
              {preset.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Transform */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-bold text-cyan-400 mb-3">Transform</h3>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onFlipX}
            className="px-3 py-2 bg-slate-700/50 hover:bg-cyan-400 hover:text-slate-900 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <i className="fas fa-arrows-alt-h mr-1"></i>Flip X
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onFlipY}
            className="px-3 py-2 bg-slate-700/50 hover:bg-cyan-400 hover:text-slate-900 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <i className="fas fa-arrows-alt-v mr-1"></i>Flip Y
          </motion.button>
        </div>
      </motion.div>

      {/* Crop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-bold text-cyan-400 mb-3">Crop</h3>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartCrop}
            className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${cropping
              ? 'bg-red-600 text-white'
              : 'bg-slate-700/50 hover:bg-cyan-400 hover:text-slate-900 text-white'
              }`}
          >
            <i className="fas fa-crop mr-1"></i>Start
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onApplyCrop}
            disabled={!cropping}
            className="px-3 py-2 bg-slate-700/50 hover:bg-cyan-400 hover:text-slate-900 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
          >
            <i className="fas fa-check mr-1"></i>Apply
          </motion.button>
        </div>
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-bold text-cyan-400 mb-3">History</h3>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUndo}
            disabled={undoCount === 0}
            className="px-3 py-2 bg-slate-700/50 hover:bg-cyan-400 hover:text-slate-900 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
          >
            <i className="fas fa-undo mr-1"></i>Undo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRedo}
            disabled={redoCount === 0}
            className="px-3 py-2 bg-slate-700/50 hover:bg-cyan-400 hover:text-slate-900 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
          >
            <i className="fas fa-redo mr-1"></i>Redo
          </motion.button>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-2 pt-4 border-t border-slate-700"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCompare}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all duration-200"
        >
          <i className="fas fa-eye mr-2"></i>Compare
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDownload}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-all duration-200"
        >
          <i className="fas fa-download mr-2"></i>Download
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCompress}
          className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-lg font-medium transition-all duration-200"
        >
          <i className="fas fa-compress mr-2"></i>Compress
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-all duration-200"
        >
          <i className="fas fa-redo mr-2"></i>Reset All
        </motion.button>
      </motion.div>
    </motion.aside>
  );
}

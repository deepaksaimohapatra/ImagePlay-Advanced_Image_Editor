import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function PreviewArea({
  currentSrc,
  originalSrc,
  state,
  compareMode,
  cropping,
  cropRect,
  onCropRectChange,
  imageRef,
  originalImageRef,
  onImageLoad,
}) {
  const filterStyle = `
    brightness(${state.brightness}%)
    contrast(${state.contrast}%)
    saturate(${state.saturate}%)
    hue-rotate(${state.hue}deg)
    opacity(${state.opacity}%)
  `;

  const transformStyle = `rotate(${state.rotation}deg) scaleX(${state.flipX}) scaleY(${state.flipY})`;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex gap-5 p-5 overflow-hidden"
    >
      {/* Before Preview */}
      <motion.div
        layout
        className={`flex flex-col transition-all duration-300 ${compareMode ? 'flex-1 opacity-100' : 'hidden'
          }`}
      >
        <motion.h4
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-2 text-cyan-400 font-semibold"
        >
          Before
        </motion.h4>
        <div className="flex-1 bg-slate-900/50 backdrop-blur border border-slate-700 rounded-lg flex justify-center items-center overflow-hidden">
          {originalSrc && (
            <img
              ref={originalImageRef}
              src={originalSrc}
              alt="Original"
              className="max-w-full max-h-full"
            />
          )}
        </div>
      </motion.div>

      {/* After Preview */}
      <motion.div layout className={`flex flex-col ${compareMode ? 'flex-1' : 'flex-1'}`}>
        <motion.h4
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-2 text-cyan-400 font-semibold"
        >
          After
        </motion.h4>
        <div className="flex-1 bg-slate-900/50 backdrop-blur border border-slate-700 rounded-lg flex justify-center items-center overflow-auto relative">
          {currentSrc && (
            cropping ? (
              <ReactCrop
                crop={cropRect}
                onChange={(c) => onCropRectChange(c)}
                className="max-w-full max-h-full"
              >
                <motion.img
                  layoutId="main-image"
                  ref={imageRef}
                  src={currentSrc}
                  alt="Edited"
                  onLoad={onImageLoad}
                  style={{
                    filter: filterStyle,
                    transform: transformStyle,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    display: 'block'
                  }}
                />
              </ReactCrop>
            ) : (
              <motion.img
                layoutId="main-image"
                ref={imageRef}
                src={currentSrc}
                alt="Edited"
                onLoad={onImageLoad}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  filter: filterStyle,
                  transform: transformStyle,
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            )
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}

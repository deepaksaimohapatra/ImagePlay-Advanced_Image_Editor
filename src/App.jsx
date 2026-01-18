import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PreviewArea from './components/PreviewArea';
import CompressModal from './components/CompressModal';

export default function App() {
  const [state, setState] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    hue: 0,
    opacity: 100,
    rotation: 0,
    flipX: 1,
    flipY: 1,
  });

  const [originalSrc, setOriginalSrc] = useState(null);
  const [currentSrc, setCurrentSrc] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [cropping, setCropping] = useState(false);
  const [cropRect, setCropRect] = useState(null);
  const [imageInfo, setImageInfo] = useState('');
  const [compressedData, setCompressedData] = useState(null);
  const [showCompressModal, setShowCompressModal] = useState(false);
  const imageRef = useRef(null);
  const originalImageRef = useRef(null);

  const defaultState = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    hue: 0,
    opacity: 100,
    rotation: 0,
    flipX: 1,
    flipY: 1,
  };

  const saveHistory = (newState, newSrc) => {
    setUndoStack(prev => [...prev, { state, src: currentSrc }]);
    setRedoStack([]);
    setState(newState);
    setCurrentSrc(newSrc);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const src = URL.createObjectURL(file);
    setOriginalSrc(src);
    setCurrentSrc(src);
    setState(defaultState);
    setUndoStack([]);
    setRedoStack([]);
  };

  const handleSliderChange = (key, value) => {
    const newState = { ...state, [key]: Number(value) };
    setState(newState);
  };

  const applyPreset = (type) => {
    const presets = {
      grayscale: { brightness: 100, contrast: 100, saturate: 0 },
      sepia: { brightness: 105, contrast: 110, saturate: 80 },
      vintage: { brightness: 110, contrast: 120, saturate: 90 },
      cool: { brightness: 100, contrast: 105, saturate: 120 },
      warm: { brightness: 110, contrast: 100, saturate: 130 },
    };
    const newState = { ...state, ...presets[type] };
    saveHistory(newState, currentSrc);
  };

  const rotate = (degrees) => {
    const newState = { ...state, rotation: state.rotation + degrees };
    saveHistory(newState, currentSrc);
  };

  const flipX = () => {
    const newState = { ...state, flipX: state.flipX * -1 };
    saveHistory(newState, currentSrc);
  };

  const flipY = () => {
    const newState = { ...state, flipY: state.flipY * -1 };
    saveHistory(newState, currentSrc);
  };

  const resetAll = () => {
    if (!originalSrc) return;
    saveHistory(defaultState, originalSrc);
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const lastEntry = undoStack[undoStack.length - 1];
    setRedoStack(prev => [...prev, { state, src: currentSrc }]);
    setUndoStack(prev => prev.slice(0, -1));
    setState(lastEntry.state);
    setCurrentSrc(lastEntry.src);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextEntry = redoStack[redoStack.length - 1];
    setUndoStack(prev => [...prev, { state, src: currentSrc }]);
    setRedoStack(prev => prev.slice(0, -1));
    setState(nextEntry.state);
    setCurrentSrc(nextEntry.src);
  };

  const startCrop = () => {
    if (!currentSrc) return;
    setCropping(true);
  };

  const applyCrop = () => {
    if (!cropping || !cropRect || !imageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    const imgRect = img.getBoundingClientRect();
    const sx = (cropRect.x * img.naturalWidth) / imgRect.width;
    const sy = (cropRect.y * img.naturalHeight) / imgRect.height;
    const sw = (cropRect.width * img.naturalWidth) / imgRect.width;
    const sh = (cropRect.height * img.naturalHeight) / imgRect.height;

    canvas.width = sw;
    canvas.height = sh;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    const newSrc = canvas.toDataURL();
    saveHistory(state, newSrc);
    setCropping(false);
    setCropRect(null);
  };

  const compressImage = () => {
    if (!imageRef.current) return;

    const canvas = document.createElement('canvas');
    const img = imageRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);

    canvas.toBlob(blob => {
      const originalSize = blob.size;
      canvas.toBlob(compressedBlob => {
        const reduction = (((originalSize - compressedBlob.size) / originalSize) * 100).toFixed(2);
        setCompressedData({
          original: (originalSize / 1024).toFixed(2),
          compressed: (compressedBlob.size / 1024).toFixed(2),
          reduction,
          blob: compressedBlob,
        });
        setShowCompressModal(true);
      }, 'image/jpeg', 0.92);
    });
  };

  const downloadImage = () => {
    if (!currentSrc) return;
    const a = document.createElement('a');
    a.href = currentSrc;
    a.download = 'edited-image.png';
    a.click();
  };

  const downloadCompressed = () => {
    if (!compressedData) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(compressedData.blob);
    a.download = 'compressed.jpg';
    a.click();
    setShowCompressModal(false);
  };

  const updateImageInfo = () => {
    if (imageRef.current && imageRef.current.naturalWidth) {
      setImageInfo(`${imageRef.current.naturalWidth}×${imageRef.current.naturalHeight}px`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          undo();
        } else if (e.key === 'y') {
          e.preventDefault();
          redo();
        } else if (e.key === 's') {
          e.preventDefault();
          downloadImage();
        }
      }
      if (e.key === 'Escape' && cropping) {
        setCropping(false);
        setCropRect(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [cropping, currentSrc]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col h-full"
        >
          <Header imageInfo={imageInfo} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              state={state}
              onSliderChange={handleSliderChange}
              onImageUpload={handleImageUpload}
              onApplyPreset={applyPreset}
              onRotate={rotate}
              onFlipX={flipX}
              onFlipY={flipY}
              onStartCrop={startCrop}
              onApplyCrop={applyCrop}
              onUndo={undo}
              onRedo={redo}
              onCompare={() => setCompareMode(!compareMode)}
              onDownload={downloadImage}
              onCompress={compressImage}
              onReset={resetAll}
              cropping={cropping}
              undoCount={undoStack.length}
              redoCount={redoStack.length}
            />
            <PreviewArea
              currentSrc={currentSrc}
              originalSrc={originalSrc}
              state={state}
              compareMode={compareMode}
              cropping={cropping}
              cropRect={cropRect}
              onCropRectChange={setCropRect}
              imageRef={imageRef}
              originalImageRef={originalImageRef}
              onImageLoad={updateImageInfo}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {showCompressModal && (
        <CompressModal
          data={compressedData}
          onDownload={downloadCompressed}
          onClose={() => setShowCompressModal(false)}
        />
      )}
    </div>
  );
}

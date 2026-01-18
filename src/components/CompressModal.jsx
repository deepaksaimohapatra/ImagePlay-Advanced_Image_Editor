import React from 'react';

export default function CompressModal({ data, onDownload, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900 p-8 rounded-lg w-96 border border-slate-700 shadow-2xl">
        <h3 className="text-2xl font-bold text-cyan-400 mb-6">Compression Result</h3>
        
        <div className="space-y-4 mb-8 text-slate-300">
          <div className="flex justify-between">
            <span>Original Size:</span>
            <span className="font-semibold text-white">{data.original} KB</span>
          </div>
          <div className="flex justify-between">
            <span>Compressed Size:</span>
            <span className="font-semibold text-white">{data.compressed} KB</span>
          </div>
          <div className="flex justify-between">
            <span>Reduction:</span>
            <span className="font-semibold text-green-400">{data.reduction}%</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDownload}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all duration-200"
          >
            <i className="fas fa-download mr-2"></i>Download
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

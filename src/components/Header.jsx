import React from 'react';

export default function Header({ imageInfo }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-cyan-400 shadow-lg px-8 py-4">
      <div className="flex justify-between items-center">
        <h1
          onClick={() => window.location.reload()}
          className="text-2xl font-bold flex items-center gap-3 hover:text-cyan-400 transition-all duration-300 cursor-pointer"
        >
          <i className="fas fa-image text-3xl"></i>
          ImagePlay - Advanced Image Editor
        </h1>
        <div className="text-sm text-slate-400 font-medium">
          {imageInfo}
        </div>
      </div>
    </header>
  );
}

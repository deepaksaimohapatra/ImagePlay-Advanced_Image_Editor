# ImagePlay React - Advanced Image Editor

A modern, feature-rich image editor built with React and Tailwind CSS. This is a React version of the original vanilla JavaScript image editor with the same powerful functionality and an enhanced UI.

## Features

### Image Adjustments
- **Brightness** - Adjust image brightness (0-200%)
- **Contrast** - Control image contrast (0-200%)
- **Saturation** - Modify color saturation (0-200%)
- **Blur** - Apply blur effect (0-20px)
- **Hue Rotation** - Rotate colors (0-360°)
- **Opacity** - Control image transparency (0-100%)

### Presets
- Grayscale
- Sepia
- Vintage
- Cool
- Warm

### Transform Tools
- Rotate left/right (90° increments)
- Flip horizontally
- Flip vertically

### Advanced Features
- **Crop Tool** - Precise image cropping with visual feedback
- **Undo/Redo** - Full history management
- **Compare Mode** - Side-by-side before/after comparison
- **Image Compression** - Compress images with quality preview
- **Download** - Export edited images
- **Reset** - Restore to original image

### Keyboard Shortcuts
- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Y` / `Cmd+Y` - Redo
- `Ctrl+S` / `Cmd+S` - Download
- `Escape` - Cancel crop mode

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Font Awesome** - Icons
- **Vite** - Build tool (optional)

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

The app will open at `http://localhost:3000`

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── index.jsx              # Entry point
├── index.css              # Global styles
└── components/
    ├── Header.jsx         # Header with image info
    ├── Sidebar.jsx        # Control panel
    ├── PreviewArea.jsx    # Image preview and editing
    ├── SliderGroup.jsx    # Reusable slider component
    └── CompressModal.jsx  # Compression results modal
```

## Usage

1. Click "Choose Image" to upload an image
2. Use the adjustment sliders to modify the image
3. Apply presets for quick effects
4. Use transform tools to rotate or flip
5. Use the crop tool for precise cropping
6. Compare before/after with the Compare button
7. Download your edited image
8. Use Undo/Redo to manage your edits

## Features Comparison

This React version maintains all the functionality of the original vanilla JS version while providing:
- Better component organization
- Improved state management
- Enhanced UI with Tailwind CSS
- Better accessibility
- Cleaner code structure

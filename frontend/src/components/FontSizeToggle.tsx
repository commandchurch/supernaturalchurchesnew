import React, { useState, useEffect } from 'react';
import { Type } from 'lucide-react';

export default function FontSizeToggle() {
  const [fontSize, setFontSize] = useState(14); // Default font size
  const fontSizes = [12, 14, 16]; // Cycle through these sizes

  // Load saved font size from localStorage on component mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      const size = parseInt(savedFontSize);
      if (fontSizes.includes(size)) {
        setFontSize(size);
        applyFontSize(size);
      }
    } else {
      // Apply default font size
      applyFontSize(14);
    }
  }, []);

  // Apply font size to the document root
  const applyFontSize = (size: number) => {
    document.documentElement.style.fontSize = `${size}px`;
    localStorage.setItem('fontSize', size.toString());
  };

  // Cycle through font sizes
  const toggleFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % fontSizes.length;
    const nextSize = fontSizes[nextIndex];

    setFontSize(nextSize);
    applyFontSize(nextSize);
  };

  return (
    <button
      onClick={toggleFontSize}
      className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 rounded-lg text-white transition-colors"
      title={`Font Size: ${fontSize}px - Click to change`}
    >
      <Type className="h-4 w-4" />
      <span className="text-sm font-medium">{fontSize}px</span>
    </button>
  );
}
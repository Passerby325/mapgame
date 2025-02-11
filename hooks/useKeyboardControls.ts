import { useEffect, useCallback } from 'react';

interface KeyboardControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  enabled: boolean;
}

export const useKeyboardControls = ({ onMove, enabled }: KeyboardControlsProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        onMove('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        onMove('down');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onMove('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        onMove('right');
        break;
    }
  }, [onMove, enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}; 
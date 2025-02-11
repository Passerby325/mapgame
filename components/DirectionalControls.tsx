import React from 'react';

interface DirectionalControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  disabled: boolean;
}

export const DirectionalControls = ({ onMove, disabled }: DirectionalControlsProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-2">
      {/* 上按钮 */}
      <button
        className="col-start-2 p-4 bg-gray-700/50 rounded-lg active:bg-gray-600"
        onClick={() => onMove('up')}
        disabled={disabled}
        aria-label="向上移动"
      >
        ↑
      </button>
      
      {/* 左按钮 */}
      <button
        className="col-start-1 row-start-2 p-4 bg-gray-700/50 rounded-lg active:bg-gray-600"
        onClick={() => onMove('left')}
        disabled={disabled}
        aria-label="向左移动"
      >
        ←
      </button>
      
      {/* 下按钮 */}
      <button
        className="col-start-2 row-start-2 p-4 bg-gray-700/50 rounded-lg active:bg-gray-600"
        onClick={() => onMove('down')}
        disabled={disabled}
        aria-label="向下移动"
      >
        ↓
      </button>
      
      {/* 右按钮 */}
      <button
        className="col-start-3 row-start-2 p-4 bg-gray-700/50 rounded-lg active:bg-gray-600"
        onClick={() => onMove('right')}
        disabled={disabled}
        aria-label="向右移动"
      >
        →
      </button>
    </div>
  );
}; 
import React from 'react';

interface DirectionalControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  disabled: boolean;
}

export const DirectionalControls = ({ onMove, disabled }: DirectionalControlsProps) => {
  // 触摸事件处理
  const handleTouchStart = (direction: 'up' | 'down' | 'left' | 'right') => (e: React.TouchEvent) => {
    e.preventDefault();
    if (!disabled) onMove(direction);
  };

  return (
    <div className="fixed bottom-4 left-4 touch-none">
      {/* 方向键容器 */}
      <div className="relative w-32 h-32">
        {/* 上方向键 */}
        <button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-700/50 rounded-full active:bg-gray-600 flex items-center justify-center"
          onTouchStart={handleTouchStart('up')}
          disabled={disabled}
          aria-label="向上移动"
        >
          <span className="text-white text-2xl">↑</span>
        </button>

        {/* 左方向键 */}
        <button
          className="absolute top-1/2 left-0 -translate-y-1/2 w-12 h-12 bg-gray-700/50 rounded-full active:bg-gray-600 flex items-center justify-center"
          onTouchStart={handleTouchStart('left')}
          disabled={disabled}
          aria-label="向左移动"
        >
          <span className="text-white text-2xl">←</span>
        </button>

        {/* 下方向键 */}
        <button
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-700/50 rounded-full active:bg-gray-600 flex items-center justify-center"
          onTouchStart={handleTouchStart('down')}
          disabled={disabled}
          aria-label="向下移动"
        >
          <span className="text-white text-2xl">↓</span>
        </button>

        {/* 右方向键 */}
        <button
          className="absolute top-1/2 right-0 -translate-y-1/2 w-12 h-12 bg-gray-700/50 rounded-full active:bg-gray-600 flex items-center justify-center"
          onTouchStart={handleTouchStart('right')}
          disabled={disabled}
          aria-label="向右移动"
        >
          <span className="text-white text-2xl">→</span>
        </button>
      </div>
    </div>
  );
}; 
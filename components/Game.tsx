import { useState, useEffect, useCallback } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { DirectionalControls } from './DirectionalControls';

export const Game = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  
  // 计算画布大小
  const calculateCanvasSize = useCallback(() => {
    const width = Math.min(window.innerWidth * 0.9, 800); // 最大宽度800px
    const height = Math.min(window.innerHeight * 0.6, 600); // 最大高度600px
    setCanvasSize({ width, height });
  }, []);

  // 监听窗口大小变化
  useEffect(() => {
    calculateCanvasSize();
    window.addEventListener('resize', calculateCanvasSize);
    
    // 模拟资源加载
    const timer = setTimeout(() => setIsLoading(false), 1000);
    
    return () => {
      window.removeEventListener('resize', calculateCanvasSize);
      clearTimeout(timer);
    };
  }, [calculateCanvasSize]);

  // 处理移动
  const handleMove = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (!gameStarted) return;
    
    // 这里添加移动逻辑
    console.log(`Moving ${direction}`);
  }, [gameStarted]);

  // 处理开始游戏
  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-900">
      {isLoading && <LoadingSpinner />}
      
      <div 
        className="relative bg-black rounded-lg overflow-hidden"
        style={{ 
          width: canvasSize.width,
          height: canvasSize.height
        }}
      >
        {/* 游戏画布 */}
        <canvas
          width={canvasSize.width}
          height={canvasSize.height}
          className="absolute top-0 left-0"
        />
        
        {/* 开始按钮 */}
        {!gameStarted && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <button
              className="px-8 py-4 bg-green-600 text-white rounded-lg text-xl hover:bg-green-500 transition-colors"
              onClick={handleStartGame}
              aria-label="开始游戏"
            >
              开始游戏
            </button>
          </div>
        )}
      </div>

      {/* 游戏状态 */}
      <div 
        className="mt-4 text-white text-center"
        role="status" 
        aria-live="polite"
      >
        <p>当前关卡: <span>1</span></p>
        <p>得分: <span>0</span></p>
      </div>

      {/* 方向控制按钮 */}
      {gameStarted && !isLoading && (
        <DirectionalControls 
          onMove={handleMove}
          disabled={!gameStarted}
        />
      )}

      {/* 游戏控制说明 */}
      <div 
        role="complementary" 
        aria-label="游戏控制说明"
        className="mt-4 text-white text-sm"
      >
        <h2 className="sr-only">控制说明</h2>
        <ul>
          <li>使用方向键或屏幕按钮移动角色</li>
          <li>按空格键暂停游戏</li>
          <li>按 ESC 键退出游戏</li>
        </ul>
      </div>
    </div>
  );
};
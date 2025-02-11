import { useState, useEffect, useCallback, useRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
// import { DirectionalControls } from './DirectionalControls';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { DirectionalControls } from './DirectionalControls';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export const Game = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 }); // 设置默认尺寸
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Player>({
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    speed: 5
  });
  const animationFrameRef = useRef<number>();
  
  // 计算画布大小
  const calculateCanvasSize = useCallback(() => {
    const width = Math.min(window.innerWidth * 0.9, 800);
    const height = Math.min(window.innerHeight * 0.6, 600);
    setCanvasSize({ width, height });
    
    // 重置玩家位置到中心
    if (playerRef.current) {
      playerRef.current.x = width / 2 - playerRef.current.width / 2;
      playerRef.current.y = height / 2 - playerRef.current.height / 2;
    }
  }, []);

  // 处理移动
  const handleMove = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (!gameStarted || !playerRef.current) return;

    const player = playerRef.current;
    const speed = player.speed;

    switch (direction) {
      case 'up':
        player.y = Math.max(0, player.y - speed);
        break;
      case 'down':
        player.y = Math.min(canvasSize.height - player.height, player.y + speed);
        break;
      case 'left':
        player.x = Math.max(0, player.x - speed);
        break;
      case 'right':
        player.x = Math.min(canvasSize.width - player.width, player.x + speed);
        break;
    }
  }, [gameStarted, canvasSize]);

  // 使用键盘控制
  useKeyboardControls({
    onMove: handleMove,
    enabled: gameStarted
  });

  // 绘制游戏画面
  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !playerRef.current) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制玩家
    const player = playerRef.current;
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 继续动画循环
    animationFrameRef.current = requestAnimationFrame(drawGame);
  }, []);

  // 开始游戏
  const handleStartGame = useCallback(() => {
    setGameStarted(true);
    // 重置玩家位置
    if (playerRef.current && canvasSize.width && canvasSize.height) {
      playerRef.current.x = canvasSize.width / 2 - playerRef.current.width / 2;
      playerRef.current.y = canvasSize.height / 2 - playerRef.current.height / 2;
    }
    // 开始游戏循环
    animationFrameRef.current = requestAnimationFrame(drawGame);
  }, [drawGame, canvasSize]);

  // 初始化和清理
  useEffect(() => {
    calculateCanvasSize(); // 立即执行一次初始化
    window.addEventListener('resize', calculateCanvasSize);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      calculateCanvasSize(); // 加载完成后再次计算尺寸
    }, 1000);
    
    return () => {
      window.removeEventListener('resize', calculateCanvasSize);
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [calculateCanvasSize]);

  useEffect(() => {
    console.log('游戏状态:', {
      gameStarted,
      isLoading,
      shouldShowControls: gameStarted && !isLoading
    });
  }, [gameStarted, isLoading]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-900">
      {/* 加载动画 */}
      {isLoading && <LoadingSpinner />}
      
      {/* 游戏画布容器 */}
      <div 
        className="relative bg-black rounded-lg overflow-hidden"
        style={{ 
          width: canvasSize.width,
          height: canvasSize.height,
          transition: 'all 0.3s ease' // 添加过渡动画
        }}
      >
        <canvas
          ref={canvasRef}
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
      {true && ( // 强制显示
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
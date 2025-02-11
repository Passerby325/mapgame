import { useEffect, useState } from 'react';

interface GameStatusAnnouncerProps {
  gameState: 'loading' | 'playing' | 'paused' | 'gameOver';
  score: number;
  level: number;
}

export const GameStatusAnnouncer = ({ gameState, score, level }: GameStatusAnnouncerProps) => {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    switch (gameState) {
      case 'loading':
        setAnnouncement('游戏加载中，请稍候...');
        break;
      case 'playing':
        setAnnouncement(`正在进行第${level}关，当前得分${score}分`);
        break;
      case 'paused':
        setAnnouncement('游戏已暂停，按空格键继续');
        break;
      case 'gameOver':
        setAnnouncement(`游戏结束，最终得分${score}分，按回车键重新开始`);
        break;
    }
  }, [gameState, score, level]);

  return (
    <div 
      className="sr-only" 
      role="status" 
      aria-live="polite"
    >
      {announcement}
    </div>
  );
}; 
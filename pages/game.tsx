import { useRef } from 'react';
import { Game } from '../components/Game';
import { GameStatusAnnouncer } from '../components/GameStatusAnnouncer';
import { useFocusTrap } from '../hooks/useFocusTrap';

export default function GamePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef);

  return (
    <div ref={containerRef}>
      <h1 className="sr-only">迷宫游戏</h1>
      
      <Game />
      
      <GameStatusAnnouncer 
        gameState="playing"
        score={0}
        level={1}
      />
    </div>
  );
}
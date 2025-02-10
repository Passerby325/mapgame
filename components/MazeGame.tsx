import React, { useState, useEffect } from 'react';
import { MazeType, Position, GameState } from '../types/maze';
import { motion } from 'framer-motion';

type MazeGameProps = {
  maze: MazeType;
  onComplete: (steps: number) => void;
};

export default function MazeGame({ maze, onComplete }: MazeGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentPosition: maze.start,
    steps: 0,
    completed: false,
  });

  const handleMove = (direction: 'up' | 'right' | 'down' | 'left') => {
    const { currentPosition, completed } = gameState;
    if (completed) return;

    const cell = maze.grid[currentPosition.y][currentPosition.x];
    let canMove = false;
    let newPosition = { ...currentPosition };

    switch (direction) {
      case 'up':
        if (!cell.top) {
          newPosition.y -= 1;
          canMove = true;
        }
        break;
      case 'right':
        if (!cell.right) {
          newPosition.x += 1;
          canMove = true;
        }
        break;
      case 'down':
        if (!cell.bottom) {
          newPosition.y += 1;
          canMove = true;
        }
        break;
      case 'left':
        if (!cell.left) {
          newPosition.x -= 1;
          canMove = true;
        }
        break;
    }

    if (canMove) {
      setGameState(prev => {
        const newState = {
          ...prev,
          currentPosition: newPosition,
          steps: prev.steps + 1,
        };

        if (newPosition.x === maze.end.x && newPosition.y === maze.end.y) {
          newState.completed = true;
          onComplete(newState.steps);
        }

        return newState;
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          handleMove('up');
          break;
        case 'ArrowRight':
          handleMove('right');
          break;
        case 'ArrowDown':
          handleMove('down');
          break;
        case 'ArrowLeft':
          handleMove('left');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.currentPosition]);

  return (
    <div className="relative">
      <div className="grid gap-0" style={{ 
        gridTemplateColumns: `repeat(${maze.grid[0].length}, 1fr)` 
      }}>
        {maze.grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-12 h-12 relative ${
                cell.isStart ? 'bg-green-200' :
                cell.isEnd ? 'bg-red-200' :
                'bg-white'
              }`}
              style={{
                borderTop: cell.top ? '2px solid black' : 'none',
                borderRight: cell.right ? '2px solid black' : 'none',
                borderBottom: cell.bottom ? '2px solid black' : 'none',
                borderLeft: cell.left ? '2px solid black' : 'none',
              }}
            >
              {gameState.currentPosition.x === x && gameState.currentPosition.y === y && (
                <motion.div
                  className="absolute inset-0 m-auto w-6 h-6 bg-blue-500 rounded-full"
                  layoutId="player"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          ))
        )}
      </div>
      <div className="mt-4 text-white text-xl">
        步数: {gameState.steps}
      </div>
    </div>
  );
} 
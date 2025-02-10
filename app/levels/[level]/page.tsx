"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import MazeGame from '../../../components/MazeGame';
import { generateMaze } from '../../../utils/mazeGenerator';
import { MazeType } from '../../../types/maze';

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const [maze, setMaze] = useState<MazeType | null>(null);
  const level = Number(params.level);

  useEffect(() => {
    if (level >= 1 && level <= 5) {
      setMaze(generateMaze(10));
    }
  }, [level]);

  const handleComplete = (steps: number) => {
    // 这里可以添加完成关卡的逻辑，比如保存分数等
    alert(`恭喜！你用了 ${steps} 步完成了第 ${level} 关！`);
  };

  if (!maze) return null;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-8"
      >
        第 {level} 关
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <MazeGame maze={maze} onComplete={handleComplete} />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-blue-400 hover:text-blue-300"
        onClick={() => router.push('/levels')}
      >
        返回关卡选择
      </motion.button>
    </div>
  );
} 
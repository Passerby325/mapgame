"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import MazeGame from '../../../components/MazeGame';
import { generateMaze } from '../../../utils/mazeGenerator';
import { MazeType } from '../../../types/maze';
import VolumeControl from '../../../components/VolumeControl'

// 定义关卡配置
const levelConfigs = {
  1: { complexity: 0.8 },  // 简单 - 更多路径
  2: { complexity: 0.85 }, // 较简单
  3: { complexity: 0.9 },  // 中等
  4: { complexity: 0.95 }, // 困难
  5: { complexity: 0.98 }  // 很困难 - 很少额外路径
};

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const [maze, setMaze] = useState<MazeType | null>(null);
  const level = Number(params.level);

  useEffect(() => {
    if (level >= 1 && level <= 5) {
      // 使用固定种子确保每个关卡生成相同的迷宫
      const seed = level * 1000;
      let seedValue = seed;
      const originalRandom = Math.random;
      
      // 替换随机数生成器
      Math.random = () => {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        return seedValue / 233280;
      };

      // 使用关卡配置生成迷宫
      const config = levelConfigs[level as keyof typeof levelConfigs];
      const newMaze = generateMaze(10, config.complexity);
      
      // 恢复原始随机数生成器
      Math.random = originalRandom;
      
      setMaze(newMaze);
    }
  }, [level]);

  const handleComplete = (steps: number) => {
    // 这里可以添加完成关卡的逻辑，比如保存分数等
    alert(`恭喜！你用了 ${steps} 步完成了第 ${level} 关！`);
  };

  if (!maze) return null;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 space-y-2">
        <VolumeControl type="music" initialVolume={0.5} />
        <VolumeControl type="sound" initialVolume={0.5} />
      </div>

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
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import VolumeControl from "../../../components/VolumeControl"

// 迷宫数据（0表示路，1表示墙）
const maze = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
]

const PLAYER = 2
const VISIBLE_RADIUS = 1

export default function Game({ params }: { params: { level: string } }) {
  const [gameState, setGameState] = useState(maze)
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 })
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const newGameState = [...maze]
    newGameState[playerPos.y][playerPos.x] = PLAYER
    setGameState(newGameState)
  }, [playerPos.x, playerPos.y]) // Added playerPos.x and playerPos.y as dependencies

  const startGame = () => {
    setGameStarted(true)
  }

  const updateVisibility = () => {
    const newGameState = maze.map((row) => [...row])
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (Math.abs(y - playerPos.y) <= VISIBLE_RADIUS && Math.abs(x - playerPos.x) <= VISIBLE_RADIUS) {
          newGameState[y][x] = maze[y][x]
        } else {
          newGameState[y][x] = -1 // 表示不可见
        }
      }
    }
    newGameState[playerPos.y][playerPos.x] = PLAYER
    setGameState(newGameState)
  }

  const move = (dx: number, dy: number) => {
    const newX = playerPos.x + dx
    const newY = playerPos.y + dy
    if (maze[newY][newX] === 0) {
      setPlayerPos({ x: newX, y: newY })
    }
  }

  useEffect(() => {
    if (gameStarted) {
      updateVisibility()
    }
  }, [playerPos, gameStarted])

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8"
        >
          关卡 {params.level}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="grid place-items-center mb-8"
        >
          {gameState.map((row, y) => (
            <div key={y} className="flex">
              {row.map((cell, x) => (
                <motion.div
                  key={`${x}-${y}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: (x + y) * 0.02 }}
                  className={`w-10 h-10 border ${
                    cell === 1
                      ? "bg-gray-800"
                      : cell === PLAYER
                        ? "bg-red-500 rounded-full"
                        : cell === -1
                          ? "bg-gray-700"
                          : "bg-gray-200"
                  }`}
                ></motion.div>
              ))}
            </div>
          ))}
        </motion.div>
        {!gameStarted ? (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={startGame}
            className="block mx-auto px-6 py-3 bg-green-500 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            开始
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-4 max-w-xs mx-auto"
          >
            <div></div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => move(0, -1)}
              className="p-4 bg-blue-500 text-white rounded-full shadow-lg"
            >
              上
            </motion.button>
            <div></div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => move(-1, 0)}
              className="p-4 bg-blue-500 text-white rounded-full shadow-lg"
            >
              左
            </motion.button>
            <div></div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => move(1, 0)}
              className="p-4 bg-blue-500 text-white rounded-full shadow-lg"
            >
              右
            </motion.button>
            <div></div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => move(0, 1)}
              className="p-4 bg-blue-500 text-white rounded-full shadow-lg"
            >
              下
            </motion.button>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Link href="/levels" className="text-blue-400 hover:text-blue-300 transition duration-300">
            返回关卡选择
          </Link>
        </motion.div>
      </div>
      <div className="absolute top-4 right-4 space-y-2">
        <VolumeControl type="music" initialVolume={0.5} />
        <VolumeControl type="sound" initialVolume={0.5} />
      </div>
    </div>
  )
}


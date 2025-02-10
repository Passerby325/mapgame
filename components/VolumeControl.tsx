"use client"

import { useState, useEffect } from "react"

interface VolumeControlProps {
  type: "music" | "sound"
  initialVolume: number
}

export default function VolumeControl({ type, initialVolume }: VolumeControlProps) {
  const [volume, setVolume] = useState(initialVolume)

  useEffect(() => {
    localStorage.setItem(`${type}Volume`, volume.toString())
    if (type === "music") {
      const audio = document.getElementById("backgroundMusic") as HTMLAudioElement
      if (audio) {
        audio.volume = volume
      }
    }
    // 不需要在这里设置点击音效的音量，因为ClickSound组件会在每次播放时读取localStorage
  }, [volume, type])

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor={`${type}Volume`} className="text-white text-sm">
        {type === "music" ? "音乐" : "音效"}
      </label>
      <input
        type="range"
        id={`${type}Volume`}
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
        className="w-24"
      />
    </div>
  )
}


"use client"

import { useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent =
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(percent)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = percent * videoRef.current.duration
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="aspect-video w-full"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        title={title}
      />

      {/* Controls Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
        {/* Progress Bar */}
        <div
          className="h-1 cursor-pointer bg-white/30"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-turquoise transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>

          <div className="flex-1" />

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleFullscreen}
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Center Play Button */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="rounded-full bg-white/90 p-4 shadow-lg transition-transform hover:scale-110">
            <Play className="h-8 w-8 text-deep-sea" />
          </div>
        </button>
      )}
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { VIDEO_TYPES, type VideoType } from "@/types/video"

interface VideoTypeSelectorProps {
  value: VideoType
  onChange: (type: VideoType) => void
}

export function VideoTypeSelector({ value, onChange }: VideoTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {VIDEO_TYPES.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onChange(type.id)}
          className={cn(
            "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all",
            value === type.id
              ? "border-turquoise bg-turquoise/5"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <span className="text-3xl">{type.icon}</span>
          <span className="text-sm font-medium text-deep-sea">{type.name}</span>
          <span className="text-xs text-gray-500">{type.description}</span>
        </button>
      ))}
    </div>
  )
}

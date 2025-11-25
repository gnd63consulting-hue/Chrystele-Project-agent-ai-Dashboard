import { Badge } from "@/components/ui/badge"
import type { VideoType } from "@/types/video"

interface VideoTypeBadgeProps {
  type: VideoType
}

const typeConfig: Record<VideoType, { label: string; icon: string }> = {
  "audio-slides-simple": { label: "Audio Slides", icon: "🎵" },
  "audio-slides-enhanced": { label: "Enhanced", icon: "✨" },
  "motion-design": { label: "Motion Design", icon: "🎬" },
  improvement: { label: "Improvement", icon: "🔧" },
  screencast: { label: "Screencast", icon: "🖥️" },
  "long-format": { label: "Long Format", icon: "📺" },
}

export function VideoTypeBadge({ type }: VideoTypeBadgeProps) {
  const config = typeConfig[type] || { label: type, icon: "🎞️" }

  return (
    <Badge variant="secondary" className="gap-1">
      <span>{config.icon}</span>
      {config.label}
    </Badge>
  )
}

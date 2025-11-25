import { Badge } from "@/components/ui/badge"
import { Clock, Loader2, CheckCircle2, XCircle } from "lucide-react"
import type { VideoStatus } from "@/types/video"

interface VideoStatusBadgeProps {
  status: VideoStatus
  showIcon?: boolean
}

const statusConfig: Record<
  VideoStatus,
  {
    label: string
    variant: "pending" | "processing" | "completed" | "error"
    icon: React.ElementType
  }
> = {
  pending: { label: "Pending", variant: "pending", icon: Clock },
  processing: { label: "Processing", variant: "processing", icon: Loader2 },
  completed: { label: "Completed", variant: "completed", icon: CheckCircle2 },
  error: { label: "Error", variant: "error", icon: XCircle },
}

export function VideoStatusBadge({
  status,
  showIcon = true,
}: VideoStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className="gap-1">
      {showIcon && (
        <Icon
          className={`h-3 w-3 ${status === "processing" ? "animate-spin" : ""}`}
        />
      )}
      {config.label}
    </Badge>
  )
}

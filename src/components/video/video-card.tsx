"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { VideoStatusBadge } from "./video-status-badge"
import { VideoTypeBadge } from "./video-type-badge"
import { formatRelativeTime } from "@/lib/utils"
import { Play, Clock } from "lucide-react"
import type { Video } from "@/types/video"

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/video/${video.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-video bg-gray-200">
          {video.thumbnail_url ? (
            <Image
              src={video.thumbnail_url}
              alt={video.titre}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-deep-sea to-deep-sea-700">
              <Play className="h-12 w-12 text-white/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          {video.video_url && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <div className="rounded-full bg-white/90 p-3">
                <Play className="h-6 w-6 text-deep-sea" />
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-medium text-deep-sea">
              {video.titre}
            </h3>
            <VideoStatusBadge status={video.status} showIcon={false} />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <VideoTypeBadge type={video.type} />
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(video.created_at)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

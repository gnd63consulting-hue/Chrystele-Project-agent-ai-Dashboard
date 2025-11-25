"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { VideoStatusBadge } from "@/components/video/video-status-badge"
import { VideoTypeBadge } from "@/components/video/video-type-badge"
import { formatRelativeTime } from "@/lib/utils"
import { ArrowRight, Film } from "lucide-react"
import type { Video } from "@/types/video"

interface RecentVideosProps {
  videos: Video[]
  isLoading?: boolean
}

export function RecentVideos({ videos, isLoading }: RecentVideosProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Videos</CardTitle>
        <Link href="/videos">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Film className="mb-3 h-12 w-12 text-gray-300" />
            <p className="text-sm text-gray-500">No videos yet</p>
            <Link href="/new">
              <Button variant="link" className="mt-2">
                Create your first video
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {videos.map((video) => (
              <Link
                key={video.id}
                href={`/video/${video.id}`}
                className="flex items-center gap-4 py-3 transition-colors hover:bg-gray-50 -mx-6 px-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-deep-sea/10">
                  <Film className="h-6 w-6 text-deep-sea" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-deep-sea">
                    {video.titre}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <VideoTypeBadge type={video.type} />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <VideoStatusBadge status={video.status} />
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(video.created_at)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

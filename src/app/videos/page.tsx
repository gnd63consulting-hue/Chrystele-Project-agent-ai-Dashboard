"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { fetchVideos } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { VideoCard } from "@/components/video/video-card"
import { PlusCircle, Search, Film } from "lucide-react"
import type { VideoStatus, VideoType } from "@/types/video"

export default function VideosPage() {
  const [statusFilter, setStatusFilter] = useState<VideoStatus | "all">("all")
  const [typeFilter, setTypeFilter] = useState<VideoType | "all">("all")
  const [search, setSearch] = useState("")

  const { data: videos, isLoading } = useQuery({
    queryKey: ["videos", { status: statusFilter, type: typeFilter, search }],
    queryFn: () =>
      fetchVideos({
        status: statusFilter === "all" ? undefined : statusFilter,
        type: typeFilter === "all" ? undefined : typeFilter,
        search: search || undefined,
      }),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-deep-sea">
            All Videos
          </h1>
          <p className="text-gray-500">
            Manage and monitor your video generation pipeline
          </p>
        </div>
        <Link href="/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Video
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v as VideoType | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="audio-slides-simple">Audio Slides</SelectItem>
              <SelectItem value="audio-slides-enhanced">Enhanced</SelectItem>
              <SelectItem value="motion-design">Motion Design</SelectItem>
              <SelectItem value="improvement">Improvement</SelectItem>
              <SelectItem value="screencast">Screencast</SelectItem>
              <SelectItem value="long-format">Long Format</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as VideoStatus | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Videos Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      ) : videos && videos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-16">
          <Film className="mb-4 h-16 w-16 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-deep-sea">
            No videos found
          </h3>
          <p className="mb-4 text-gray-500">
            {search || statusFilter !== "all" || typeFilter !== "all"
              ? "Try adjusting your filters"
              : "Get started by creating your first video"}
          </p>
          <Link href="/new">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Video
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}

"use client"

export const dynamic = "force-dynamic"

import { useQuery } from "@tanstack/react-query"
import { fetchVideos, fetchVideoStats } from "@/lib/api"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentVideos } from "@/components/dashboard/recent-videos"

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["video-stats"],
    queryFn: fetchVideoStats,
  })

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ["videos", { limit: 5 }],
    queryFn: () => fetchVideos(),
    select: (data) => data.slice(0, 5),
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-deep-sea">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of your video production pipeline
        </p>
      </div>

      <StatsCards
        stats={stats || { total: 0, pending: 0, processing: 0, completed: 0 }}
        isLoading={statsLoading}
      />

      <RecentVideos videos={videos || []} isLoading={videosLoading} />
    </div>
  )
}

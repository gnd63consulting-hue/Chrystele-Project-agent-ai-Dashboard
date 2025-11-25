"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { fetchVideoById, deleteVideo, subscribeToVideoChanges } from "@/lib/api"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { VideoPlayer } from "@/components/video/video-player"
import { VideoStatusBadge } from "@/components/video/video-status-badge"
import { VideoTypeBadge } from "@/components/video/video-type-badge"
import { formatDate } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Download,
  Trash2,
  Copy,
  Play,
  Calendar,
  Clock,
  Globe,
  Mic,
  Monitor,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const videoId = Number(params.id)

  const {
    data: video,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => fetchVideoById(videoId),
    enabled: !isNaN(videoId),
    refetchInterval: (query) => {
      const data = query.state.data
      return data?.status === "pending" || data?.status === "processing"
        ? 5000
        : false
    },
  })

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel(`video-${videoId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "videos_generation",
          filter: `id=eq.${videoId}`,
        },
        (payload) => {
          queryClient.setQueryData(["video", videoId], payload.new)
          if (payload.new.status === "completed") {
            toast({
              title: "Video completed!",
              description: "Your video is ready to download.",
              variant: "success",
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [videoId, queryClient, toast])

  const handleDelete = async () => {
    const success = await deleteVideo(videoId)
    if (success) {
      toast({
        title: "Video deleted",
        description: "The video has been removed.",
      })
      router.push("/videos")
    } else {
      toast({
        title: "Error",
        description: "Failed to delete video.",
        variant: "destructive",
      })
    }
  }

  const handleCopyScript = () => {
    if (video?.script) {
      navigator.clipboard.writeText(video.script)
      toast({
        title: "Copied!",
        description: "Script copied to clipboard.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="aspect-video w-full rounded-lg" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-48 lg:col-span-2" />
          <Skeleton className="h-48" />
        </div>
      </div>
    )
  }

  if (error || !video) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="mb-4 h-16 w-16 text-coral" />
        <h2 className="mb-2 text-xl font-bold text-deep-sea">Video not found</h2>
        <p className="mb-4 text-gray-500">
          The video you&apos;re looking for doesn&apos;t exist or has been deleted.
        </p>
        <Link href="/videos">
          <Button>Back to Videos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/videos">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-deep-sea">
              {video.titre}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <VideoStatusBadge status={video.status} />
              <VideoTypeBadge type={video.type} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="text-coral">
                <Trash2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Video</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this video? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Video Player */}
      <Card className="overflow-hidden">
        {video.video_url ? (
          <VideoPlayer
            src={video.video_url}
            poster={video.thumbnail_url || undefined}
            title={video.titre}
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-deep-sea to-deep-sea-700">
            {video.status === "processing" ? (
              <div className="text-center text-white">
                <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
                <p className="text-lg font-medium">Processing your video...</p>
                <p className="text-sm text-white/70">This may take a few minutes</p>
              </div>
            ) : video.status === "pending" ? (
              <div className="text-center text-white">
                <Clock className="mx-auto mb-4 h-16 w-16 opacity-50" />
                <p className="text-lg font-medium">Waiting in queue</p>
                <p className="text-sm text-white/70">Your video will be processed soon</p>
              </div>
            ) : video.status === "error" ? (
              <div className="text-center text-white">
                <AlertCircle className="mx-auto mb-4 h-16 w-16 text-coral" />
                <p className="text-lg font-medium">Generation failed</p>
                <p className="text-sm text-white/70">{video.error_message || "An error occurred"}</p>
              </div>
            ) : (
              <div className="text-center text-white">
                <Play className="mx-auto mb-4 h-16 w-16 opacity-50" />
                <p className="text-lg font-medium">Video preview unavailable</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Download Buttons */}
      {video.video_url && (
        <div className="flex gap-3">
          <a href={video.video_url} download target="_blank" rel="noopener noreferrer">
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Video
            </Button>
          </a>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Created</dt>
                  <dd className="font-medium text-deep-sea">
                    {formatDate(video.created_at)}
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Duration</dt>
                  <dd className="font-medium text-deep-sea">
                    {video.duree_cible}
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Globe className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Language</dt>
                  <dd className="font-medium text-deep-sea">
                    {video.langue === "fr" ? "French" : "English"}
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Mic className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Voice</dt>
                  <dd className="font-medium text-deep-sea capitalize">
                    {video.voix_type}
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Monitor className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Aspect Ratio</dt>
                  <dd className="font-medium text-deep-sea">
                    {video.aspect_ratio}
                  </dd>
                </div>
              </div>

              {video.route && (
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-2">
                    <Play className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Route</dt>
                    <dd className="font-medium text-deep-sea">{video.route}</dd>
                  </div>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        {/* Script */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Script</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleCopyScript}>
              <Copy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="max-h-64 overflow-auto whitespace-pre-wrap text-sm text-gray-600">
              {video.script}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Error Message */}
      {video.status === "error" && video.error_message && (
        <Card className="border-coral/20 bg-coral/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-coral">
              <AlertCircle className="h-5 w-5" />
              Error Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{video.error_message}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

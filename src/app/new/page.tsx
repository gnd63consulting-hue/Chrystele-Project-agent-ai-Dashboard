"use client"

export const dynamic = "force-dynamic"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { ArrowLeft, Loader2, Rocket, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoTypeSelector } from "@/components/video/video-type-selector"
import { FileDropzone } from "@/components/upload/file-dropzone"
import { FileList } from "@/components/upload/file-list"
import { submitVideoRequest } from "@/lib/api"
import { uploadFile } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { getFileType } from "@/lib/utils"
import type { VideoType, UploadedFile, VideoRequest } from "@/types/video"

const videoRequestSchema = z.object({
  titre: z.string().min(3, "Title must be at least 3 characters"),
  script: z.string().min(50, "Script must be at least 50 characters"),
  duree_cible: z.string().min(1, "Duration is required"),
  type: z.enum([
    "audio-slides-simple",
    "audio-slides-enhanced",
    "motion-design",
    "improvement",
    "screencast",
    "long-format",
  ]),
  langue: z.enum(["fr", "en"]).default("fr"),
  voix_type: z.enum(["female", "male"]).default("female"),
  aspect_ratio: z.enum(["16:9", "9:16", "1:1"]).default("16:9"),
  email: z.string().email().optional().or(z.literal("")),
  route: z.enum(["A", "B", "hybrid"]).optional(),
  styleframe_id: z.string().optional(),
  improvement_mode: z.enum(["auto", "semi", "rebuild"]).optional(),
})

type FormData = z.infer<typeof videoRequestSchema>

export default function NewVideoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(videoRequestSchema),
    defaultValues: {
      type: "motion-design",
      langue: "fr",
      voix_type: "female",
      aspect_ratio: "16:9",
      duree_cible: "3min",
    },
  })

  const videoType = watch("type")

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      // Upload files first if any
      let assetsPath = ""
      if (files.length > 0) {
        const videoId = `temp-${Date.now()}`
        for (const file of files) {
          if (file.status !== "completed") continue
        }
        assetsPath = files
          .filter((f) => f.url)
          .map((f) => f.url)
          .join(",")
      }

      const requestData: VideoRequest = {
        ...data,
        assets_path: assetsPath || undefined,
      }

      return submitVideoRequest(requestData)
    },
    onSuccess: (result) => {
      if (result.success) {
        toast({
          title: "Video request submitted!",
          description: "Your video is now being processed.",
          variant: "success",
        })
        router.push(result.video_id ? `/video/${result.video_id}` : "/videos")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to submit video request",
          variant: "destructive",
        })
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    },
  })

  const handleFilesAdded = useCallback(async (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: getFileType(file.name),
      progress: 0,
      status: "uploading",
    }))

    setFiles((prev) => [...prev, ...uploadedFiles])

    // Upload each file
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i]
      const uploadedFile = uploadedFiles[i]

      try {
        // Simulate progress (Supabase doesn't provide progress callback)
        const progressInterval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id && f.progress < 90
                ? { ...f, progress: f.progress + 10 }
                : f
            )
          )
        }, 200)

        const result = await uploadFile(file, `upload-${Date.now()}`)
        clearInterval(progressInterval)

        if (result) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id
                ? { ...f, status: "completed", progress: 100, url: result.url, path: result.path }
                : f
            )
          )
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id
                ? { ...f, status: "error", progress: 0 }
                : f
            )
          )
        }
      } catch {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id
              ? { ...f, status: "error", progress: 0 }
              : f
          )
        )
      }
    }
  }, [])

  const handleFileRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const onSubmit = (data: FormData) => {
    submitMutation.mutate(data)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-deep-sea">
            Create New Video
          </h1>
          <p className="text-gray-500">
            Configure and submit a new video generation request
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Video Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Video Type</CardTitle>
          </CardHeader>
          <CardContent>
            <VideoTypeSelector
              value={videoType}
              onChange={(type) => setValue("type", type)}
            />
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titre">Title *</Label>
              <Input
                id="titre"
                placeholder="Module 1 - Why Caribbean Now?"
                {...register("titre")}
              />
              {errors.titre && (
                <p className="text-sm text-coral">{errors.titre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="script">Script *</Label>
              <Textarea
                id="script"
                placeholder="Write your video script here..."
                rows={6}
                {...register("script")}
              />
              {errors.script && (
                <p className="text-sm text-coral">{errors.script.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="duree_cible">Duration</Label>
                <Select
                  value={watch("duree_cible")}
                  onValueChange={(v) => setValue("duree_cible", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1min">1 minute</SelectItem>
                    <SelectItem value="2min">2 minutes</SelectItem>
                    <SelectItem value="3min">3 minutes</SelectItem>
                    <SelectItem value="5min">5 minutes</SelectItem>
                    <SelectItem value="10min">10 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="langue">Language</Label>
                <Select
                  value={watch("langue")}
                  onValueChange={(v) => setValue("langue", v as "fr" | "en")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voix_type">Voice</Label>
                <Select
                  value={watch("voix_type")}
                  onValueChange={(v) =>
                    setValue("voix_type", v as "female" | "male")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Assets (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileDropzone onFilesAdded={handleFilesAdded} />
            <FileList files={files} onRemove={handleFileRemove} />
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Card>
          <CardHeader>
            <button
              type="button"
              className="flex w-full items-center justify-between"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <CardTitle>Advanced Options</CardTitle>
              {showAdvanced ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </CardHeader>
          {showAdvanced && (
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="aspect_ratio">Aspect Ratio</Label>
                  <Select
                    value={watch("aspect_ratio")}
                    onValueChange={(v) =>
                      setValue("aspect_ratio", v as "16:9" | "9:16" | "1:1")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                      <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                      <SelectItem value="1:1">1:1 (Square)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Notification Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    {...register("email")}
                  />
                </div>

                {videoType === "motion-design" && (
                  <div className="space-y-2">
                    <Label htmlFor="route">Route</Label>
                    <Select
                      value={watch("route") || ""}
                      onValueChange={(v) =>
                        setValue("route", v as "A" | "B" | "hybrid")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Route A</SelectItem>
                        <SelectItem value="B">Route B</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {videoType === "improvement" && (
                  <div className="space-y-2">
                    <Label htmlFor="improvement_mode">Improvement Mode</Label>
                    <Select
                      value={watch("improvement_mode") || ""}
                      onValueChange={(v) =>
                        setValue(
                          "improvement_mode",
                          v as "auto" | "semi" | "rebuild"
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="semi">Semi-Auto</SelectItem>
                        <SelectItem value="rebuild">Rebuild</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Link href="/">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="gap-2"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                Generate Video
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

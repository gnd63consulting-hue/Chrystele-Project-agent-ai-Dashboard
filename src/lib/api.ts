import { supabase } from "./supabase"
import type { VideoRequest, Video, VideoStatus, VideoType } from "@/types/video"

// Default webhook URL
const DEFAULT_WEBHOOK_URL = "https://n8n.srv989411.hstgr.cloud/webhook/video-request"

// Get webhook URL from localStorage or environment or default
function getWebhookUrl(): string {
  if (typeof window !== "undefined") {
    const storedUrl = localStorage.getItem("n8n_webhook_url")
    if (storedUrl) return storedUrl
  }
  return process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || DEFAULT_WEBHOOK_URL
}

// Submit video request to N8N webhook
export async function submitVideoRequest(data: VideoRequest): Promise<{
  success: boolean
  message: string
  video_id?: number
  status?: VideoStatus
}> {
  const webhookUrl = getWebhookUrl()

  console.log("📤 Submitting video request to:", webhookUrl)
  console.log("📦 Payload:", JSON.stringify(data, null, 2))

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    })

    console.log("📥 Response status:", response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No error body")
      console.error("❌ HTTP error:", response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const responseData = await response.json()
    console.log("✅ Response data:", responseData)

    return responseData
  } catch (error) {
    // Detailed error logging for debugging
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("❌ Network/CORS error - N8N webhook may be unreachable or CORS not configured")
      console.error("💡 Solutions:")
      console.error("   1. Ensure N8N workflow is ACTIVATED (green toggle)")
      console.error("   2. Check N8N is configured to allow CORS")
      console.error("   3. Verify webhook URL is correct:", webhookUrl)
    } else {
      console.error("❌ Error submitting video request:", error)
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit video request",
    }
  }
}

// Fetch all videos from Supabase
export async function fetchVideos(filters?: {
  status?: VideoStatus
  type?: VideoType
  search?: string
}): Promise<Video[]> {
  let query = supabase
    .from("videos_generation")
    .select("*")
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  if (filters?.type) {
    query = query.eq("type", filters.type)
  }

  if (filters?.search) {
    query = query.ilike("titre", `%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching videos:", error)
    return []
  }

  return data as Video[]
}

// Fetch single video by ID
export async function fetchVideoById(id: number): Promise<Video | null> {
  const { data, error } = await supabase
    .from("videos_generation")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching video:", error)
    return null
  }

  return data as Video
}

// Get video statistics
export async function fetchVideoStats(): Promise<{
  total: number
  pending: number
  processing: number
  completed: number
  error: number
}> {
  const { data, error } = await supabase
    .from("videos_generation")
    .select("status")

  if (error || !data) {
    return { total: 0, pending: 0, processing: 0, completed: 0, error: 0 }
  }

  const videos = data as Array<{ status: string }>

  return {
    total: videos.length,
    pending: videos.filter((v) => v.status === "pending").length,
    processing: videos.filter((v) => v.status === "processing").length,
    completed: videos.filter((v) => v.status === "completed").length,
    error: videos.filter((v) => v.status === "error").length,
  }
}

// Delete video
export async function deleteVideo(id: number): Promise<boolean> {
  const { error } = await supabase.from("videos_generation").delete().eq("id", id)
  return !error
}

// Subscribe to video changes
export function subscribeToVideoChanges(
  callback: (payload: { eventType: string; new: Video; old: Video }) => void
) {
  return supabase
    .channel("videos_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "videos_generation" },
      (payload) => {
        callback(payload as unknown as { eventType: string; new: Video; old: Video })
      }
    )
    .subscribe()
}

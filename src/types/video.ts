export type VideoStatus = "pending" | "processing" | "completed" | "error"

export type VideoType =
  | "audio-slides-simple"
  | "audio-slides-enhanced"
  | "motion-design"
  | "improvement"
  | "screencast"
  | "long-format"

export type Language = "fr" | "en"
export type VoiceType = "female" | "male"
export type AspectRatio = "16:9" | "9:16" | "1:1"
export type Route = "A" | "B" | "hybrid"
export type ImprovementMode = "auto" | "semi" | "rebuild"

// New modular base types
export type BaseType = "generation" | "assets-provided" | "improvement"

// Production options for modular approach
export interface ProductionOptions {
  motion_design: boolean
  ai_slides: boolean
  b_rolls: boolean
  voice_ai: boolean
  subtitles: boolean
  long_format: boolean
}

export interface Video {
  id: number
  status: VideoStatus
  titre: string
  script: string
  instructions?: string
  duree_cible: string
  type: VideoType
  aspect_ratio: AspectRatio
  langue: Language
  voix_type: VoiceType
  voix_id: string | null
  email: string | null
  ai_model: string | null
  video_url: string | null
  thumbnail_url: string | null
  error_message: string | null
  route: Route | null
  styleframe_id: string | null
  texted: boolean
  improvement_mode: ImprovementMode | null
  original_duration: string | null
  assets_path: string | null
  production_options?: ProductionOptions
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface VideoRequest {
  titre: string
  script: string
  instructions?: string
  duree_cible: string
  type: VideoType
  production_options?: ProductionOptions
  langue?: Language
  voix_type?: VoiceType
  voix_id?: string
  email?: string
  aspect_ratio?: AspectRatio
  route?: Route
  styleframe_id?: string
  texted?: boolean
  improvement_mode?: ImprovementMode
  original_duration?: string
  assets_path?: string
}

// Helper function to convert base type + options to VideoType for N8N
export function getVideoTypeFromOptions(
  baseType: BaseType,
  options: ProductionOptions
): VideoType {
  if (baseType === "assets-provided") {
    return options.b_rolls || options.motion_design
      ? "audio-slides-enhanced"
      : "audio-slides-simple"
  }
  if (baseType === "improvement") {
    return "improvement"
  }
  // baseType === 'generation'
  if (options.motion_design) return "motion-design"
  if (options.long_format) return "long-format"
  return "audio-slides-enhanced"
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: "audio" | "image" | "video" | "unknown"
  progress: number
  status: "uploading" | "completed" | "error"
  url?: string
  path?: string
}

export interface VideoTypeConfig {
  id: VideoType
  name: string
  description: string
  icon: string
  fields: string[]
}

export const VIDEO_TYPES: VideoTypeConfig[] = [
  {
    id: "audio-slides-simple",
    name: "Audio + Slides",
    description: "Simple sync of provided audio with slides",
    icon: "🎵",
    fields: ["assets_upload"],
  },
  {
    id: "audio-slides-enhanced",
    name: "Enhanced Slides",
    description: "AI-generated slides + B-rolls between",
    icon: "✨",
    fields: ["script"],
  },
  {
    id: "motion-design",
    name: "Motion Design",
    description: "Premium animated graphics (Remotion)",
    icon: "🎬",
    fields: ["script", "route", "styleframe_id"],
  },
  {
    id: "improvement",
    name: "Improve Existing",
    description: "Enhance an existing video",
    icon: "🔧",
    fields: ["video_upload", "improvement_mode"],
  },
  {
    id: "screencast",
    name: "Screencast",
    description: "Screen recording with voiceover",
    icon: "🖥️",
    fields: ["screen_recording_upload", "script"],
  },
  {
    id: "long-format",
    name: "Long Format",
    description: "Extended video content",
    icon: "📺",
    fields: ["script"],
  },
]

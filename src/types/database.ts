export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      videos_generation: {
        Row: {
          id: number
          status: string
          titre: string
          script: string
          duree_cible: string
          type: string
          aspect_ratio: string
          langue: string
          voix_type: string
          voix_id: string | null
          email: string | null
          ai_model: string | null
          video_url: string | null
          thumbnail_url: string | null
          error_message: string | null
          route: string | null
          styleframe_id: string | null
          texted: boolean
          improvement_mode: string | null
          original_duration: string | null
          assets_path: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          status?: string
          titre: string
          script: string
          duree_cible: string
          type: string
          aspect_ratio?: string
          langue?: string
          voix_type?: string
          voix_id?: string | null
          email?: string | null
          ai_model?: string | null
          video_url?: string | null
          thumbnail_url?: string | null
          error_message?: string | null
          route?: string | null
          styleframe_id?: string | null
          texted?: boolean
          improvement_mode?: string | null
          original_duration?: string | null
          assets_path?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          status?: string
          titre?: string
          script?: string
          duree_cible?: string
          type?: string
          aspect_ratio?: string
          langue?: string
          voix_type?: string
          voix_id?: string | null
          email?: string | null
          ai_model?: string | null
          video_url?: string | null
          thumbnail_url?: string | null
          error_message?: string | null
          route?: string | null
          styleframe_id?: string | null
          texted?: boolean
          improvement_mode?: string | null
          original_duration?: string | null
          assets_path?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

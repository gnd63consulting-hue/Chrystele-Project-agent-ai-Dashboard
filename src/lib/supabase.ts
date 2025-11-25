import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lamdfdcognsyipjjrbww.supabase.co"
// Use placeholder key during build if not provided - real key must be provided at runtime
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key-for-build"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Storage bucket name
export const STORAGE_BUCKET = "videos-generated"

// Upload file to Supabase Storage
export async function uploadFile(
  file: File,
  videoId: string,
  onProgress?: (progress: number) => void
): Promise<{ url: string; path: string } | null> {
  const filePath = `assets/${videoId}/${file.name}`

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    console.error("Upload error:", error)
    return null
  }

  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath)

  return {
    url: urlData.publicUrl,
    path: filePath,
  }
}

// Delete file from Supabase Storage
export async function deleteFile(path: string): Promise<boolean> {
  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path])
  return !error
}

// Get public URL for a file
export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

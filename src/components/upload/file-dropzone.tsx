"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileAudio, FileImage, FileVideo } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  onFilesAdded: (files: File[]) => void
  accept?: Record<string, string[]>
  maxSize?: number
  disabled?: boolean
}

const defaultAccept = {
  "audio/*": [".wav", ".mp3", ".m4a"],
  "image/*": [".png", ".jpg", ".jpeg", ".webp"],
  "video/*": [".mp4", ".mov", ".webm"],
}

export function FileDropzone({
  onFilesAdded,
  accept = defaultAccept,
  maxSize = 500 * 1024 * 1024, // 500MB
  disabled = false,
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles)
    },
    [onFilesAdded]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    disabled,
    multiple: true,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors",
        isDragActive
          ? "border-turquoise bg-turquoise/5"
          : "border-gray-300 hover:border-gray-400",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <div className="rounded-full bg-blue-100 p-2">
            <FileAudio className="h-5 w-5 text-blue-600" />
          </div>
          <div className="rounded-full bg-green-100 p-2">
            <FileImage className="h-5 w-5 text-green-600" />
          </div>
          <div className="rounded-full bg-purple-100 p-2">
            <FileVideo className="h-5 w-5 text-purple-600" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1 text-sm">
            <Upload className="h-4 w-4" />
            <span className="font-medium">
              {isDragActive ? "Drop files here" : "Drop files here or click to upload"}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Audio (WAV, MP3) • Images (PNG, JPG) • Video (MP4, MOV)
          </p>
          <p className="text-xs text-gray-400">Max 500MB per file</p>
        </div>
      </div>
    </div>
  )
}

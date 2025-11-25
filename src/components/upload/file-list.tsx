"use client"

import { FileAudio, FileImage, FileVideo, File, Trash2, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatFileSize } from "@/lib/utils"
import type { UploadedFile } from "@/types/video"

interface FileListProps {
  files: UploadedFile[]
  onRemove: (id: string) => void
}

const fileTypeIcons = {
  audio: FileAudio,
  image: FileImage,
  video: FileVideo,
  unknown: File,
}

const fileTypeColors = {
  audio: "text-blue-600 bg-blue-100",
  image: "text-green-600 bg-green-100",
  video: "text-purple-600 bg-purple-100",
  unknown: "text-gray-600 bg-gray-100",
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
      <div className="space-y-2">
        {files.map((file) => {
          const Icon = fileTypeIcons[file.type]
          const colorClass = fileTypeColors[file.type]

          return (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-lg border bg-white p-3"
            >
              <div className={`rounded-lg p-2 ${colorClass}`}>
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatFileSize(file.size)}</span>
                  {file.status === "uploading" && (
                    <>
                      <span>•</span>
                      <span>{file.progress}%</span>
                    </>
                  )}
                </div>
                {file.status === "uploading" && (
                  <Progress value={file.progress} className="mt-1 h-1" />
                )}
              </div>

              <div className="flex items-center gap-2">
                {file.status === "uploading" && (
                  <Loader2 className="h-4 w-4 animate-spin text-turquoise" />
                )}
                {file.status === "completed" && (
                  <CheckCircle className="h-4 w-4 text-plantain-green" />
                )}
                {file.status === "error" && (
                  <AlertCircle className="h-4 w-4 text-coral" />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-coral"
                  onClick={() => onRemove(file.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

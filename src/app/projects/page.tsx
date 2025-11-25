"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderOpen, PlusCircle } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-deep-sea">
            Projects
          </h1>
          <p className="text-gray-500">
            Organize your videos into projects
          </p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <Card className="flex flex-col items-center justify-center py-16">
        <FolderOpen className="mb-4 h-16 w-16 text-gray-300" />
        <h3 className="mb-2 text-lg font-medium text-deep-sea">
          No projects yet
        </h3>
        <p className="mb-4 text-center text-gray-500 max-w-md">
          Projects help you organize related videos together. This feature is
          coming soon!
        </p>
        <Link href="/videos">
          <Button variant="outline">View All Videos</Button>
        </Link>
      </Card>
    </div>
  )
}

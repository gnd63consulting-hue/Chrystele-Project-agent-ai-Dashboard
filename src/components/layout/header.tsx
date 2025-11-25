"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, User, Bell } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-xl font-semibold text-deep-sea">
          Video Agent
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Video
          </Button>
        </Link>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[10px] text-white">
            3
          </span>
        </Button>

        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

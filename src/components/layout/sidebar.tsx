"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import {
  LayoutDashboard,
  PlusCircle,
  Video,
  FolderOpen,
  Settings,
  Film,
} from "lucide-react"
import type { TranslationKey } from "@/lib/i18n"

interface NavItem {
  nameKey: TranslationKey
  href: string
  icon: typeof LayoutDashboard
}

const navigation: NavItem[] = [
  { nameKey: "dashboard", href: "/", icon: LayoutDashboard },
  { nameKey: "newVideo", href: "/new", icon: PlusCircle },
  { nameKey: "allVideos", href: "/videos", icon: Video },
  { nameKey: "projects", href: "/projects", icon: FolderOpen },
  { nameKey: "settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-deep-sea">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6">
        <Film className="h-8 w-8 text-turquoise" />
        <span className="font-display text-xl font-bold text-white">
          CARIBEquity
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.nameKey}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-turquoise text-white"
                  : "text-gray-300 hover:bg-deep-sea-700 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {t(item.nameKey)}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-deep-sea-700 p-4">
        <p className="text-xs text-gray-400">
          {t("videoAgentDashboard")}
          <br />
          <span className="text-turquoise">v1.0.0</span>
        </p>
      </div>
    </aside>
  )
}

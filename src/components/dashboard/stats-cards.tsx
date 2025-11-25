"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Film, Clock, Loader2, CheckCircle2 } from "lucide-react"

interface StatsCardsProps {
  stats: {
    total: number
    pending: number
    processing: number
    completed: number
  }
  isLoading?: boolean
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Videos",
      value: stats.total,
      icon: Film,
      color: "text-deep-sea",
      bgColor: "bg-deep-sea/10",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Processing",
      value: stats.processing,
      icon: Loader2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-plantain-green",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`rounded-lg p-3 ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <div>
              {isLoading ? (
                <>
                  <Skeleton className="mb-1 h-8 w-12" />
                  <Skeleton className="h-4 w-20" />
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-deep-sea">
                    {card.value}
                  </p>
                  <p className="text-sm text-gray-500">{card.title}</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

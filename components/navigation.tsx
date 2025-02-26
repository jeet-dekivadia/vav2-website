"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileUp, BarChart3, Brain, Star, Settings } from "lucide-react"

const routes = [
  {
    label: "Home",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Task Selection",
    icon: Brain,
    href: "/task-selection",
    color: "text-violet-500",
  },
  {
    label: "Data Selection",
    icon: FileUp,
    href: "/data-selection",
    color: "text-pink-700",
  },
  {
    label: "Visualization",
    icon: BarChart3,
    href: "/visualization",
    color: "text-orange-700",
  },
  {
    label: "Model Training",
    icon: Settings,
    href: "/model-training",
    color: "text-emerald-500",
  },
  {
    label: "Results",
    icon: Star,
    href: "/results",
    color: "text-green-700",
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-screen bg-secondary/50 border-r w-[200px] sticky top-0">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">VAV2</h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


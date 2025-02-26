"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-center h-[calc(100vh-2rem)] max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Welcome to VAV2
        </h1>
        <p className="text-xl text-muted-foreground">
          Your Virtual Assistant for the AI Makerspace at Georgia Tech by NVIDIA, developed under the VIP VP4 Program.
        </p>
        <div className="space-y-4">
          <p className="text-muted-foreground">VAV2 is designed to help you:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Select and define your machine learning tasks</li>
            <li>Process and visualize your data</li>
            <li>Choose and train appropriate models</li>
            <li>Analyze and compare results</li>
          </ul>
        </div>
        <div className="pt-4">
          <Link href="/task-selection">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}


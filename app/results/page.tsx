"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProject } from "@/components/providers/project-provider"
import { ModelResults } from "@/components/model-results"
import { Progress } from "@/components/ui/progress"

export default function Results() {
  const { project, updateProject } = useProject()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (project.trainingStatus === "in_progress") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            updateProject({ trainingStatus: "completed" })
            return 100
          }
          return prev + 10
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [project.trainingStatus, updateProject])

  return (
    <div className="max-w-4xl mx-auto pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl font-bold">Model Results</h1>
          <p className="text-muted-foreground mt-2">View and analyze your model's performance</p>
        </div>

        {project.trainingStatus === "in_progress" ? (
          <Card>
            <CardHeader>
              <CardTitle>Training in Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
              <p className="text-center mt-4">{progress}% complete</p>
            </CardContent>
          </Card>
        ) : (
          <ModelResults />
        )}
      </motion.div>
    </div>
  )
}


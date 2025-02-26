"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface ProjectData {
  task?: string
  dataFile?: File
  targetVariable?: string
  data?: any[] // This would be the processed data
  model?: string
  hyperparameters?: {
    learningRate: number
    epochs: number
    batchSize: number
  }
  trainingStatus?: "not_started" | "in_progress" | "completed"
  results?: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
  }
}

interface ProjectContextType {
  project: ProjectData
  updateProject: (data: Partial<ProjectData>) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<ProjectData>({})

  const updateProject = (data: Partial<ProjectData>) => {
    setProject((prev) => ({ ...prev, ...data }))
  }

  return <ProjectContext.Provider value={{ project, updateProject }}>{children}</ProjectContext.Provider>
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider")
  }
  return context
}


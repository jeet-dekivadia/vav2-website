"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProject } from "@/components/providers/project-provider"
import { useRouter } from "next/navigation"

export default function DataSelection() {
  const [file, setFile] = useState<File | null>(null)
  const [targetVariable, setTargetVariable] = useState("")
  const { updateProject } = useProject()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file && targetVariable) {
      updateProject({ dataFile: file, targetVariable })
      router.push("/visualization")
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl font-bold">Data Selection</h1>
          <p className="text-muted-foreground mt-2">Upload your dataset and select the target variable</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dataset Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload CSV/Excel File</Label>
                <Input id="file-upload" type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-variable">Target Variable</Label>
                <Input
                  id="target-variable"
                  value={targetVariable}
                  onChange={(e) => setTargetVariable(e.target.value)}
                  placeholder="Enter target variable name"
                />
              </div>

              <Button type="submit" className="w-full gap-2" disabled={!file || !targetVariable}>
                Continue to Visualization
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


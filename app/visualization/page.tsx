"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProject } from "@/components/providers/project-provider"
import { DataVisualization } from "@/components/data-visualization"

const visualizationTypes = [
  { value: "scatter", label: "Scatter Plot" },
  { value: "bar", label: "Bar Chart" },
  { value: "line", label: "Line Chart" },
  { value: "histogram", label: "Histogram" },
  { value: "heatmap", label: "Heatmap" },
]

export default function Visualization() {
  const [selectedVisualization, setSelectedVisualization] = useState("scatter")
  const { project } = useProject()

  return (
    <div className="max-w-4xl mx-auto pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl font-bold">Data Visualization</h1>
          <p className="text-muted-foreground mt-2">Explore your data through various visualizations</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Choose Visualization Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Select value={selectedVisualization} onValueChange={setSelectedVisualization}>
              <SelectTrigger>
                <SelectValue placeholder="Select visualization type" />
              </SelectTrigger>
              <SelectContent>
                {visualizationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DataVisualization type={selectedVisualization} data={project.data} />

            <Link href="/model-training">
              <Button className="w-full gap-2">
                Continue to Model Training
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


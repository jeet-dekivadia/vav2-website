"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tasks = [
  {
    value: "classification",
    label: "Classification",
    description: "Predict categorical outcomes",
  },
  {
    value: "regression",
    label: "Regression",
    description: "Predict continuous values",
  },
  {
    value: "clustering",
    label: "Clustering",
    description: "Group similar data points",
  },
  {
    value: "timeseries",
    label: "Time Series",
    description: "Analyze temporal patterns",
  },
]

export default function TaskSelection() {
  const [selectedTask, setSelectedTask] = useState<string>("")

  return (
    <div className="max-w-2xl mx-auto pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl font-bold">Select Your Task</h1>
          <p className="text-muted-foreground mt-2">Choose the type of machine learning task you want to perform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Select value={selectedTask} onValueChange={setSelectedTask}>
              <SelectTrigger>
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                {tasks.map((task) => (
                  <SelectItem key={task.value} value={task.value}>
                    {task.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedTask && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {tasks.find((t) => t.value === selectedTask)?.description}
                </div>
                <Link href={`/data-selection?task=${selectedTask}`}>
                  <Button className="w-full gap-2">
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useProject } from "@/components/providers/project-provider"
import { useRouter } from "next/navigation"

const models = [
  { value: "linearRegression", label: "Linear Regression" },
  { value: "randomForest", label: "Random Forest" },
  { value: "svm", label: "Support Vector Machine" },
  { value: "neuralNetwork", label: "Neural Network" },
]

export default function ModelTraining() {
  const [selectedModel, setSelectedModel] = useState("")
  const [hyperparameters, setHyperparameters] = useState({
    learningRate: 0.01,
    epochs: 100,
    batchSize: 32,
  })
  const { updateProject } = useProject()
  const router = useRouter()

  const handleTraining = () => {
    updateProject({
      model: selectedModel,
      hyperparameters,
      trainingStatus: "in_progress",
    })
    router.push("/results")
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
          <h1 className="text-4xl font-bold">Model Training</h1>
          <p className="text-muted-foreground mt-2">Select a model and configure hyperparameters</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Model Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Learning Rate</Label>
              <Slider
                min={0.0001}
                max={0.1}
                step={0.0001}
                value={[hyperparameters.learningRate]}
                onValueChange={([value]) => setHyperparameters((prev) => ({ ...prev, learningRate: value }))}
              />
              <div className="text-sm text-muted-foreground">Current value: {hyperparameters.learningRate}</div>
            </div>

            <div className="space-y-4">
              <Label>Epochs</Label>
              <Slider
                min={10}
                max={1000}
                step={10}
                value={[hyperparameters.epochs]}
                onValueChange={([value]) => setHyperparameters((prev) => ({ ...prev, epochs: value }))}
              />
              <div className="text-sm text-muted-foreground">Current value: {hyperparameters.epochs}</div>
            </div>

            <div className="space-y-4">
              <Label>Batch Size</Label>
              <Slider
                min={8}
                max={256}
                step={8}
                value={[hyperparameters.batchSize]}
                onValueChange={([value]) => setHyperparameters((prev) => ({ ...prev, batchSize: value }))}
              />
              <div className="text-sm text-muted-foreground">Current value: {hyperparameters.batchSize}</div>
            </div>

            <Button className="w-full gap-2" onClick={handleTraining} disabled={!selectedModel}>
              Start Training
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


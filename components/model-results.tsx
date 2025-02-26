"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProject } from "@/components/providers/project-provider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ModelResults() {
  const { project } = useProject()

  if (!project.results) {
    return <div>No results available</div>
  }

  const { accuracy, precision, recall, f1Score } = project.results
  const data = [
    { name: "Accuracy", value: accuracy },
    { name: "Precision", value: precision },
    { name: "Recall", value: recall },
    { name: "F1 Score", value: f1Score },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.name} className="text-center">
              <h3 className="font-semibold">{item.name}</h3>
              <p>{(item.value * 100).toFixed(2)}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


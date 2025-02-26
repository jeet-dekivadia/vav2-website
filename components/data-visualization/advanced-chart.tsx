"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DataPoint {
  x: number
  y: number
  z?: number
}

interface AdvancedChartProps {
  data: DataPoint[]
  title: string
}

export function AdvancedChart({ data, title }: AdvancedChartProps) {
  const [chartType, setChartType] = useState<"line" | "scatter" | "3d">("line")
  const [animatedData, setAnimatedData] = useState<DataPoint[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data)
    }, 500)

    return () => clearTimeout(timer)
  }, [data])

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={animatedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={{ strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        )
      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis dataKey="y" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter name="Data" data={animatedData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        )
      case "3d":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis dataKey="y" />
              <ZAxis dataKey="z" range={[0, 100]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter name="Data" data={animatedData} fill="#8884d8" shape="circle" />
            </ScatterChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={chartType} onValueChange={(value: any) => setChartType(value)}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="line">Line</TabsTrigger>
                <TabsTrigger value="scatter">Scatter</TabsTrigger>
                <TabsTrigger value="3d">3D</TabsTrigger>
              </TabsList>
              <Button variant="outline" onClick={() => setAnimatedData([])}>
                Reset Animation
              </Button>
            </div>
            <TabsContent value="line">{renderChart()}</TabsContent>
            <TabsContent value="scatter">{renderChart()}</TabsContent>
            <TabsContent value="3d">{renderChart()}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}


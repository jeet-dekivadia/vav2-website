"use client"

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts"

interface DataVisualizationProps {
  type: string
  data: any[]
}

export function DataVisualization({ type, data }: DataVisualizationProps) {
  if (!data || data.length === 0) {
    return <div>No data available for visualization</div>
  }

  const renderChart = () => {
    switch (type) {
      case "scatter":
        return (
          <ScatterChart>
            <CartesianGrid />
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Data" data={data} fill="#8884d8" />
          </ScatterChart>
        )
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        )
      default:
        return <div>Unsupported chart type</div>
    }
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}


"use client"

import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ComponentType } from "@/lib/types"

interface ComponentsProgressChartProps {
  components: ComponentType[]
}

export function ComponentsProgressChart({ components }: ComponentsProgressChartProps) {
  // Handle empty components array
  if (!components || !Array.isArray(components) || components.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No component data available</p>
      </div>
    )
  }

  // Sort components by updated date
  const sortedComponents = [...components].sort((a, b) => {
    const dateA = new Date(a.updatedAt || 0).getTime()
    const dateB = new Date(b.updatedAt || 0).getTime()
    return dateA - dateB
  })

  // Create chart data
  const chartData = sortedComponents.map((component) => {
    const date = new Date(component.updatedAt || new Date())
    return {
      name: component.name,
      date: date.toLocaleDateString(),
      progress: component.progress || 0,
    }
  })

  return (
    <ChartContainer
      config={{
        progress: {
          label: "Progress",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="progress" stroke="var(--color-progress)" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

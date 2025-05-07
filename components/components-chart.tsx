"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ComponentType } from "@/lib/types"

interface ComponentsChartProps {
  components: ComponentType[]
}

export function ComponentsChart({ components }: ComponentsChartProps) {
  // Handle empty components array
  if (!components || !Array.isArray(components) || components.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No component data available</p>
      </div>
    )
  }

  // Group components by month
  const componentsByMonth: Record<string, number> = {}

  components.forEach((component) => {
    const date = new Date(component.createdAt || new Date())
    const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`

    if (!componentsByMonth[monthYear]) {
      componentsByMonth[monthYear] = 0
    }

    componentsByMonth[monthYear]++
  })

  // Convert to array for chart
  const chartData = Object.entries(componentsByMonth).map(([month, count]) => ({
    month,
    count,
  }))

  return (
    <ChartContainer
      config={{
        count: {
          label: "Components",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

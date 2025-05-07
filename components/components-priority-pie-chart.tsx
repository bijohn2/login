"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ComponentType } from "@/lib/types"

interface ComponentsPriorityPieChartProps {
  components: ComponentType[]
}

export function ComponentsPriorityPieChart({ components }: ComponentsPriorityPieChartProps) {
  // Handle empty components array
  if (!components || !Array.isArray(components) || components.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No component data available</p>
      </div>
    )
  }

  // Group components by priority
  const priorityCounts: Record<string, number> = {}

  components.forEach((component) => {
    const priority = component.priority || "Unknown"

    if (!priorityCounts[priority]) {
      priorityCounts[priority] = 0
    }

    priorityCounts[priority]++
  })

  // Convert to array for chart
  const chartData = Object.entries(priorityCounts).map(([priority, count]) => ({
    priority,
    count,
  }))

  // Colors for different priorities
  const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE"]

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
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            nameKey="priority"
            label={({ priority, percent }) => `${priority}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

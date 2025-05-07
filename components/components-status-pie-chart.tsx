"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ComponentType } from "@/lib/types"

interface ComponentsStatusPieChartProps {
  components: ComponentType[]
}

export function ComponentsStatusPieChart({ components }: ComponentsStatusPieChartProps) {
  // Handle empty components array
  if (!components || !Array.isArray(components) || components.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No component data available</p>
      </div>
    )
  }

  // Group components by status
  const statusCounts: Record<string, number> = {}

  components.forEach((component) => {
    const status = component.status || "Unknown"

    if (!statusCounts[status]) {
      statusCounts[status] = 0
    }

    statusCounts[status]++
  })

  // Convert to array for chart
  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }))

  // Colors for different statuses
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

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
            nameKey="status"
            label={({ status, percent }) => `${status}: ${(percent * 100).toFixed(0)}%`}
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

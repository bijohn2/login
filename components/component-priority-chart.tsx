"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartLegend, ChartLegendItem, ChartPie, ChartTooltip } from "@/components/ui/chart"
import { getAllComponents } from "@/lib/data"

export function ComponentPriorityChart() {
  const components = getAllComponents()

  // Count components by priority
  const priorityCounts = components.reduce(
    (acc, component) => {
      acc[component.priority] = (acc[component.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Convert to chart data format
  const data = Object.entries(priorityCounts).map(([name, value]) => ({ name, value }))

  // Define colors for each priority
  const colors = {
    High: "#ef4444", // red
    Medium: "#f59e0b", // amber
    Low: "#22c55e", // green
  }

  return (
    <Card className="w-full p-4">
      <Chart className="h-80">
        <ChartPie
          data={data}
          index="name"
          category="value"
          colors={Object.values(colors).slice(0, data.length)}
          className="h-80"
        />
        <ChartTooltip />
        <ChartContainer className="p-0">
          <ChartLegend className="mt-4 flex flex-wrap justify-center gap-4">
            {data.map((priority, index) => (
              <ChartLegendItem
                key={priority.name}
                className="flex items-center gap-2"
                color={colors[priority.name as keyof typeof colors]}
              >
                {priority.name}: {priority.value}
              </ChartLegendItem>
            ))}
          </ChartLegend>
        </ChartContainer>
      </Chart>
    </Card>
  )
}

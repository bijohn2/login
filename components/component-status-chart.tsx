"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartLegend, ChartLegendItem, ChartPie, ChartTooltip } from "@/components/ui/chart"
import { getAllComponents } from "@/lib/data"

export function ComponentStatusChart() {
  const components = getAllComponents()

  // Count components by status
  const statusCounts = components.reduce(
    (acc, component) => {
      acc[component.status] = (acc[component.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Convert to chart data format
  const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

  // Define colors for each status
  const colors = {
    Complete: "#22c55e", // green
    "In Design": "#3b82f6", // blue
    "Under Review": "#f59e0b", // amber
    "In Development": "#8b5cf6", // purple
    Testing: "#ec4899", // pink
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
            {data.map((status, index) => (
              <ChartLegendItem
                key={status.name}
                className="flex items-center gap-2"
                color={Object.values(colors)[index % Object.values(colors).length]}
              >
                {status.name}: {status.value}
              </ChartLegendItem>
            ))}
          </ChartLegend>
        </ChartContainer>
      </Chart>
    </Card>
  )
}

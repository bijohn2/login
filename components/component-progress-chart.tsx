"use client"

import { Card } from "@/components/ui/card"
import {
  Chart,
  ChartContainer,
  ChartGrid,
  ChartLineSeries,
  ChartTooltip,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

// Sample weekly progress data
const progressData = [
  { week: "Week 1", completed: 1, inProgress: 3 },
  { week: "Week 2", completed: 2, inProgress: 4 },
  { week: "Week 3", completed: 3, inProgress: 3 },
  { week: "Week 4", completed: 4, inProgress: 2 },
  { week: "Week 5", completed: 5, inProgress: 2 },
  { week: "Week 6", completed: 7, inProgress: 1 },
  { week: "Week 7", completed: 8, inProgress: 0 },
]

export function ComponentProgressChart() {
  return (
    <Card className="w-full p-4">
      <Chart className="h-80">
        <ChartContainer className="p-0">
          <ChartGrid x={false} />
          <ChartXAxis />
          <ChartYAxis />
          <ChartLineSeries
            data={progressData}
            xAxis="week"
            categories={["completed", "inProgress"]}
            colors={["#22c55e", "#3b82f6"]}
          />
          <ChartTooltip />
        </ChartContainer>
      </Chart>
      <div className="mt-4 flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
          <span className="text-sm">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#3b82f6]" />
          <span className="text-sm">In Progress</span>
        </div>
      </div>
    </Card>
  )
}

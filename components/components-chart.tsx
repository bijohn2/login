"use client"
import { ComponentProgressChart } from "@/components/component-progress-chart"
import { ComponentsStatusPieChart } from "@/components/components-status-pie-chart"
import { ComponentsPriorityPieChart } from "@/components/components-priority-pie-chart"

export function ComponentsChart() {
  return (
    <div className="col-span-full space-y-4">
      {/* Main Progress Chart - Full Width */}
      <div className="w-full">
        <ComponentProgressChart />
      </div>

      {/* Side by Side Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ComponentsStatusPieChart />
        <ComponentsPriorityPieChart />
      </div>
    </div>
  )
}

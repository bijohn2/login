"use client"

import * as React from "react"
import { ResponsiveContainer, Pie, XAxis, YAxis, CartesianGrid, Legend, Line } from "recharts"

import { cn } from "@/lib/utils"

// Chart Container
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config?: Record<string, any>
  }
>(({ className, children, config, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full h-[350px]", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

// Chart Tooltip
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">{entry.dataKey}</span>
              <span className="font-bold text-muted-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

const ChartTooltipContent = ChartTooltip

// Basic Chart Components
const Chart = ({ children, ...props }: any) => children
const ChartLegend = ({ content, ...props }: any) => <Legend content={content} {...props} />
const ChartLegendItem = ({ children, ...props }: any) => <span {...props}>{children}</span>
const ChartPie = Pie
const ChartGrid = CartesianGrid
const ChartLineSeries = Line
const ChartXAxis = XAxis
const ChartYAxis = YAxis

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Chart,
  ChartLegend,
  ChartLegendItem,
  ChartPie,
  ChartGrid,
  ChartLineSeries,
  ChartXAxis,
  ChartYAxis,
}

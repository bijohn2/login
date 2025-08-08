"use client"

import * as React from "react"
import {
CartesianGrid,
Line,
Pie,
Tooltip as RechartsTooltip,
XAxis as RechartsXAxis,
YAxis as RechartsYAxis,
type TooltipProps as RechartsTooltipProps,
} from "recharts"
import { cn } from "@/lib/utils"

// Types
export type ChartConfig = Record<
string,
{
  label: string
  color?: string
}
>

type ChartContextValue = {
config: ChartConfig | null
}

const ChartContext = React.createContext<ChartContextValue>({
config: null,
})

export function useChart() {
return React.useContext(ChartContext)
}

// Root Chart provider. Applies CSS vars for colors and provides config via context.
export function Chart({
config = null,
className,
style,
children,
}: {
config?: ChartConfig | null
className?: string
style?: React.CSSProperties
children: React.ReactNode
}) {
// Build CSS vars for series colors (e.g. --color-sales)
const colorVars: React.CSSProperties = {}
if (config) {
  for (const [key, value] of Object.entries(config)) {
    if (value?.color) {
      ;(colorVars as any)[`--color-${key}`] = value.color
    }
  }
}

return (
  <ChartContext.Provider value={{ config }}>
    <div
      className={cn("relative w-full", className)}
      style={{ ...colorVars, ...style }}
    >
      {children}
    </div>
  </ChartContext.Provider>
)
}

// Backwards compatibility alias often used in examples
export const ChartContainer = Chart

// Named export for ChartLegend
export function ChartLegend({
className,
...props
}: React.HTMLAttributes<HTMLDivElement>) {
return (
  <div
    className={cn("flex flex-wrap items-center gap-4 text-sm", className)}
    {...props}
  />
)
}

// Grid wrapper with sensible defaults
export function ChartGrid({
className,
...props
}: React.ComponentProps<typeof CartesianGrid>) {
return (
  <CartesianGrid
    strokeDasharray="3 3"
    className={className}
    {...props}
  />
)
}

// XAxis wrapper with common defaults
export function ChartXAxis({
tickLine = false,
axisLine = false,
className,
...props
}: React.ComponentProps<typeof RechartsXAxis>) {
return (
  <RechartsXAxis
    tickLine={tickLine}
    axisLine={axisLine}
    className={className}
    {...props}
  />
)
}

// YAxis wrapper with common defaults
export function ChartYAxis({
tickLine = false,
axisLine = false,
className,
...props
}: React.ComponentProps<typeof RechartsYAxis>) {
return (
  <RechartsYAxis
    tickLine={tickLine}
    axisLine={axisLine}
    className={className}
    {...props}
  />
)
}

// Line series wrapper that auto-applies color from CSS var if not provided
export const ChartLineSeries = React.forwardRef<
any,
React.ComponentProps<typeof Line> & { seriesKey?: string }
>(function ChartLineSeries(
{ stroke, dataKey, seriesKey, ...props },
ref
) {
const key =
  typeof seriesKey === "string"
    ? seriesKey
    : typeof dataKey === "string"
    ? dataKey
    : undefined

const autoStroke = stroke ?? (key ? `var(--color-${key})` : undefined)

return <Line ref={ref} stroke={autoStroke} dataKey={dataKey as any} {...props} />
})

// Pie wrapper that auto-applies color via fill if not provided (slice-level colors usually set on <Cell>)
export const ChartPie = React.forwardRef<
any,
React.ComponentProps<typeof Pie> & { seriesKey?: string }
>(function ChartPie({ fill, seriesKey, ...props }, ref) {
const autoFill =
  fill ?? (typeof seriesKey === "string" ? `var(--color-${seriesKey})` : undefined)
return <Pie ref={ref} fill={autoFill} {...props} />
})

// Minimal legend item for custom legends
export function ChartLegendItem({
color,
label,
value,
marker = "dot",
className,
}: {
color?: string
label: string
value?: string | number
marker?: "dot" | "line"
className?: string
}) {
const markerStyles =
  marker === "line"
    ? "h-0.5 w-4 rounded-full"
    : "h-2 w-2 rounded-full"
return (
  <div className={cn("flex items-center gap-2 text-sm", className)}>
    <span
      className={cn("shrink-0", markerStyles)}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
    <span className="text-muted-foreground">{label}</span>
    {typeof value !== "undefined" ? (
      <span className="ml-1 font-medium text-foreground">{value}</span>
    ) : null}
  </div>
)
}

// Tooltip wrapper for Recharts
export function ChartTooltip(
props: Omit<React.ComponentProps<typeof RechartsTooltip>, "content"> & {
  content?: React.ReactNode
}
) {
// Pass-through so users can provide <ChartTooltipContent />
return <RechartsTooltip {...(props as any)} />
}

// Default tooltip content with shadcn-like styling
export function ChartTooltipContent({
active,
payload,
label,
labelFormatter,
className,
}: (RechartsTooltipProps<number, string> & {
className?: string
}) | any) {
if (!active || !payload || payload.length === 0) return null

const items = Array.isArray(payload) ? payload : [payload]
const formattedLabel =
  typeof labelFormatter === "function" ? labelFormatter(label) : label

return (
  <div className={cn("rounded-md border bg-popover px-3 py-2 shadow-sm", className)}>
    {typeof formattedLabel !== "undefined" && (
      <div className="mb-1 text-xs text-muted-foreground">{String(formattedLabel)}</div>
    )}
    <div className="flex flex-col gap-1">
      {items.map((item: any, idx: number) => {
        const color = item.color ?? item.stroke ?? item.fill
        const name = item.name ?? item.dataKey ?? "value"
        const val = item.value
        return (
          <div key={idx} className="flex items-center gap-2 text-xs">
            <span
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{String(name)}:</span>
            <span className="font-medium text-foreground">{String(val)}</span>
          </div>
        )
      })}
    </div>
  </div>
)
}

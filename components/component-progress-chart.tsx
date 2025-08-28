"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

// Sample weekly progress data
const progressData = [
  {
    week: "Week 1",
    completed: 1,
    inProgress: 3,
    total: 4,
    completionRate: 25,
    trend: "up",
  },
  {
    week: "Week 2",
    completed: 2,
    inProgress: 4,
    total: 6,
    completionRate: 33,
    trend: "up",
  },
  {
    week: "Week 3",
    completed: 3,
    inProgress: 3,
    total: 6,
    completionRate: 50,
    trend: "up",
  },
  {
    week: "Week 4",
    completed: 4,
    inProgress: 2,
    total: 6,
    completionRate: 67,
    trend: "up",
  },
  {
    week: "Week 5",
    completed: 5,
    inProgress: 2,
    total: 7,
    completionRate: 71,
    trend: "up",
  },
  {
    week: "Week 6",
    completed: 7,
    inProgress: 1,
    total: 8,
    completionRate: 88,
    trend: "up",
  },
  {
    week: "Week 7",
    completed: 8,
    inProgress: 0,
    total: 8,
    completionRate: 100,
    trend: "stable",
  },
]

export function ComponentProgressChart() {
  const currentWeek = progressData[progressData.length - 1]
  const previousWeek = progressData[progressData.length - 2]
  const progressChange = currentWeek.completionRate - previousWeek.completionRate

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Component Progress</CardTitle>
            <CardDescription>Weekly completion tracking</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {progressChange > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : progressChange < 0 ? (
              <TrendingDown className="h-4 w-4 text-red-600" />
            ) : (
              <Minus className="h-4 w-4 text-gray-600" />
            )}
            <span
              className={`font-medium ${
                progressChange > 0 ? "text-green-600" : progressChange < 0 ? "text-red-600" : "text-gray-600"
              }`}
            >
              {progressChange > 0 ? "+" : ""}
              {progressChange}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Progress Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{currentWeek.completed}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{currentWeek.inProgress}</div>
            <div className="text-sm text-blue-600">In Progress</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-950 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{currentWeek.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        {/* Weekly Progress Bars */}
        <div className="space-y-3">
          {progressData.slice(-4).map((week, index) => (
            <div key={week.week} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{week.week}</span>
                <span className="text-muted-foreground">{week.completionRate}%</span>
              </div>
              <div className="relative">
                <Progress value={week.completionRate} className="h-2" />
                <div className="absolute inset-0 flex">
                  <div
                    className="bg-green-500 rounded-l-full h-full transition-all duration-500"
                    style={{ width: `${(week.completed / week.total) * 100}%` }}
                  />
                  <div
                    className="bg-blue-500 h-full transition-all duration-500"
                    style={{ width: `${(week.inProgress / week.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">In Progress</span>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-sm">
            <span className="font-medium">This week:</span> {currentWeek.completionRate}% completion rate
            {progressChange > 0 && <span className="text-green-600 ml-2">↗ {progressChange}% improvement</span>}
            {progressChange < 0 && <span className="text-red-600 ml-2">↘ {Math.abs(progressChange)}% decrease</span>}
            {progressChange === 0 && <span className="text-gray-600 ml-2">→ No change from last week</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

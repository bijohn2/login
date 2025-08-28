"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const components = [
  {
    id: 1,
    name: "Navigation Header",
    status: "Completed",
    priority: "High",
    assignee: "Jane Doe",
    dueDate: "2024-01-15",
    progress: 100,
  },
  {
    id: 2,
    name: "Hero Section",
    status: "In Progress",
    priority: "High",
    assignee: "John Smith",
    dueDate: "2024-01-20",
    progress: 75,
  },
  {
    id: 3,
    name: "Footer Component",
    status: "Review",
    priority: "Medium",
    assignee: "Mike Johnson",
    dueDate: "2024-01-25",
    progress: 90,
  },
  {
    id: 4,
    name: "Contact Form",
    status: "In Progress",
    priority: "Medium",
    assignee: "Sarah Wilson",
    dueDate: "2024-01-30",
    progress: 45,
  },
  {
    id: 5,
    name: "Product Card",
    status: "Pending",
    priority: "Low",
    assignee: "Jane Doe",
    dueDate: "2024-02-05",
    progress: 0,
  },
]

interface ComponentsTableProps {
  limit?: number
}

export function ComponentsTable({ limit }: ComponentsTableProps) {
  const displayComponents = limit ? components.slice(0, limit) : components

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Review":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Components</CardTitle>
        <CardDescription>Latest component development progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayComponents.map((component) => (
              <TableRow key={component.id}>
                <TableCell className="font-medium">{component.name}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(component.status)}>{component.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(component.priority)}>{component.priority}</Badge>
                </TableCell>
                <TableCell>{component.assignee}</TableCell>
                <TableCell>{component.dueDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${component.progress}%` }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{component.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit component
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

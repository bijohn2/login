"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpDown, ChevronDown, Filter, MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { getAllComponents, deleteComponent } from "@/lib/data"
import type { ComponentType } from "@/lib/types"

export function ComponentsTable() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ComponentType[]>([])
  const [filteredData, setFilteredData] = useState<ComponentType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL STATUSES")
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL PRIORITIES")
  const [sortColumn, setSortColumn] = useState<keyof ComponentType>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  // Load components on mount
  useEffect(() => {
    const loadComponents = async () => {
      try {
        const components = await getAllComponents()
        setData(components)
        setFilteredData(components)
        setLoading(false)
      } catch (error) {
        console.error("Error loading components:", error)
        toast({
          title: "Error",
          description: "Failed to load components",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    loadComponents()
  }, [])

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    let result = [...data]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (component) =>
          component.name.toLowerCase().includes(query) ||
          (component.description && component.description.toLowerCase().includes(query)) ||
          (component.assignedTo && component.assignedTo.toLowerCase().includes(query)),
      )
    }

    // Apply status filter
    if (statusFilter !== "ALL STATUSES") {
      result = result.filter((component) => component.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== "ALL PRIORITIES") {
      result = result.filter((component) => component.priority === priorityFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    setFilteredData(result)
  }, [data, searchQuery, statusFilter, priorityFilter, sortColumn, sortDirection])

  // Handle sort
  const handleSort = (column: keyof ComponentType) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Handle row selection
  const toggleSelectAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filteredData.map((component) => component.id)))
    }
  }

  const toggleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deleteComponent(id)

      // Refresh the data
      const updatedComponents = await getAllComponents()
      setData(updatedComponents)

      // Remove from selected rows
      const newSelected = new Set(selectedRows)
      newSelected.delete(id)
      setSelectedRows(newSelected)

      toast({
        title: "Component deleted",
        description: "The component has been successfully deleted",
      })
    } catch (error) {
      console.error("Error deleting component:", error)
      toast({
        title: "Error",
        description: "Failed to delete component",
        variant: "destructive",
      })
    }
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "In Progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>
      case "In Review":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{status}</Badge>
      case "Not Started":
        return <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-500 hover:bg-red-600">{priority}</Badge>
      case "Medium":
        return <Badge className="bg-orange-500 hover:bg-orange-600">{priority}</Badge>
      case "Low":
        return <Badge className="bg-green-500 hover:bg-green-600">{priority}</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 py-4">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                {statusFilter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("ALL STATUSES")}>ALL STATUSES</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter("Not Started")}>Not Started</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("In Progress")}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("In Review")}>In Review</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                {priorityFilter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setPriorityFilter("ALL PRIORITIES")}>ALL PRIORITIES</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setPriorityFilter("High")}>High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter("Medium")}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter("Low")}>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter("ALL STATUSES")
              setPriorityFilter("ALL PRIORITIES")
            }}
          >
            Reset Filters
          </Button>
          <Button onClick={() => router.push("/components/new")}>
            <Plus className="mr-2 h-4 w-4" /> Create Component
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={filteredData.length > 0 && selectedRows.size === filteredData.length}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center font-medium">
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("status")} className="flex items-center font-medium">
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("priority")}
                  className="flex items-center font-medium"
                >
                  Priority
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("location")}
                  className="flex items-center font-medium"
                >
                  Location
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("assignedTo")}
                  className="flex items-center font-medium"
                >
                  Assigned To
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("updatedAt")}
                  className="flex items-center font-medium"
                >
                  Last Updated
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Loading components...
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No components found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((component) => (
                <TableRow key={component.id} data-state={selectedRows.has(component.id) ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(component.id)}
                      onCheckedChange={() => toggleSelectRow(component.id)}
                      aria-label={`Select ${component.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={`/components/${component.id}/details`} className="font-medium hover:underline">
                      {component.name}
                    </Link>
                  </TableCell>
                  <TableCell>{getStatusBadge(component.status)}</TableCell>
                  <TableCell>{getPriorityBadge(component.priority)}</TableCell>
                  <TableCell>{component.location || "N/A"}</TableCell>
                  <TableCell>{component.assignedTo || "Unassigned"}</TableCell>
                  <TableCell>
                    {component.updatedAt ? new Date(component.updatedAt).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/components/${component.id}/details`)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/components/${component.id}`)}>
                          Edit Component
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(component.id)} className="text-red-600">
                          Delete Component
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          {selectedRows.size} of {filteredData.length} row(s) selected.
        </div>
        {selectedRows.size > 0 && (
          <Button
            variant="destructive"
            onClick={async () => {
              try {
                for (const id of selectedRows) {
                  await deleteComponent(id)
                }

                // Refresh the data
                const updatedComponents = await getAllComponents()
                setData(updatedComponents)

                // Clear selection
                setSelectedRows(new Set())

                toast({
                  title: "Components deleted",
                  description: `${selectedRows.size} component(s) have been deleted`,
                })
              } catch (error) {
                console.error("Error deleting components:", error)
                toast({
                  title: "Error",
                  description: "Failed to delete components",
                  variant: "destructive",
                })
              }
            }}
          >
            Delete Selected
          </Button>
        )}
      </div>
    </div>
  )
}

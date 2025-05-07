import { v4 as uuidv4 } from "uuid"
import type { ComponentType, TeamMemberType, ComponentStats } from "./types"
import { saveComponentToStorage, loadComponentsFromStorage, deleteComponentFromStorage } from "./storage-utils"

// Initial sample data
const initialComponents: ComponentType[] = [
  {
    id: "1",
    name: "Navigation Bar",
    description: "Main navigation component for the website",
    status: "In Progress",
    priority: "High",
    assignedTo: "John Doe",
    createdAt: new Date("2023-01-15").toISOString(),
    updatedAt: new Date("2023-02-01").toISOString(),
    dueDate: new Date("2023-03-15").toISOString(),
    progress: 65,
    location: "Header",
  },
  {
    id: "2",
    name: "Footer",
    description: "Footer component with links and copyright",
    status: "Completed",
    priority: "Medium",
    assignedTo: "Jane Smith",
    createdAt: new Date("2023-01-20").toISOString(),
    updatedAt: new Date("2023-02-10").toISOString(),
    dueDate: new Date("2023-02-28").toISOString(),
    progress: 100,
    location: "Footer",
  },
  {
    id: "3",
    name: "Hero Section",
    description: "Main hero section with CTA",
    status: "Not Started",
    priority: "High",
    assignedTo: "Mike Johnson",
    createdAt: new Date("2023-02-01").toISOString(),
    updatedAt: new Date("2023-02-01").toISOString(),
    dueDate: new Date("2023-04-01").toISOString(),
    progress: 0,
    location: "Home Page",
  },
  {
    id: "4",
    name: "Product Card",
    description: "Reusable product card component",
    status: "In Review",
    priority: "Medium",
    assignedTo: "Sarah Williams",
    createdAt: new Date("2023-01-25").toISOString(),
    updatedAt: new Date("2023-02-15").toISOString(),
    dueDate: new Date("2023-03-10").toISOString(),
    progress: 85,
    location: "Product Page",
  },
  {
    id: "5",
    name: "Contact Form",
    description: "Form for user inquiries",
    status: "In Progress",
    priority: "Low",
    assignedTo: "John Doe",
    createdAt: new Date("2023-02-05").toISOString(),
    updatedAt: new Date("2023-02-20").toISOString(),
    dueDate: new Date("2023-03-25").toISOString(),
    progress: 40,
    location: "Contact Page",
  },
]

// Team members data
const teamMembers: TeamMemberType[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Frontend Developer",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "UI/UX Designer",
    email: "jane.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    role: "Backend Developer",
    email: "mike.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Away",
  },
  {
    id: "4",
    name: "Sarah Williams",
    role: "Project Manager",
    email: "sarah.williams@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
  },
  {
    id: "5",
    name: "David Brown",
    role: "QA Engineer",
    email: "david.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Offline",
  },
]

// Initialize localStorage with sample data if empty
export function initializeComponentsData() {
  if (typeof window !== "undefined") {
    const storedComponents = loadComponentsFromStorage()
    if (storedComponents.length === 0) {
      saveComponentToStorage(initialComponents)
    }
  }
}

// Get all components
export async function getAllComponents(): Promise<ComponentType[]> {
  // Initialize data if needed
  initializeComponentsData()

  // Return components from storage
  return loadComponentsFromStorage()
}

// Get component by ID
export async function getComponentById(id: string): Promise<ComponentType | null> {
  const components = await getAllComponents()
  return components.find((component) => component.id === id) || null
}

// Save component (create or update)
export async function saveComponent(component: Partial<ComponentType>): Promise<ComponentType> {
  const now = new Date().toISOString()

  // If it's a new component
  if (!component.id) {
    const newComponent: ComponentType = {
      id: uuidv4(),
      name: component.name || "Untitled Component",
      description: component.description || "",
      status: component.status || "Not Started",
      priority: component.priority || "Medium",
      assignedTo: component.assignedTo || "",
      createdAt: now,
      updatedAt: now,
      dueDate: component.dueDate || now,
      progress: component.progress || 0,
      location: component.location || "",
    }

    saveComponentToStorage(newComponent)
    return newComponent
  }
  // If it's an update
  else {
    const existingComponent = await getComponentById(component.id)
    if (!existingComponent) {
      throw new Error(`Component with ID ${component.id} not found`)
    }

    const updatedComponent: ComponentType = {
      ...existingComponent,
      ...component,
      updatedAt: now,
    }

    saveComponentToStorage(updatedComponent)
    return updatedComponent
  }
}

// Delete component
export async function deleteComponent(id: string): Promise<boolean> {
  deleteComponentFromStorage(id)
  return true
}

// Get all team members
export async function getAllTeamMembers(): Promise<TeamMemberType[]> {
  return teamMembers
}

// Get team member by ID
export async function getTeamMemberById(id: string): Promise<TeamMemberType | null> {
  return teamMembers.find((member) => member.id === id) || null
}

// Get component statistics
export async function getComponentStats(): Promise<ComponentStats> {
  const components = await getAllComponents()
  const total = components.length

  // Calculate components created in the last 7 days
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const newThisWeek = components.filter((component) => new Date(component.createdAt) >= oneWeekAgo).length

  // Calculate in-progress components
  const inProgress = components.filter(
    (component) =>
      component.status === "In Progress" || component.status === "In Review" || component.status === "Not Started",
  ).length

  // Calculate completed components
  const completed = components.filter((component) => component.status === "Completed").length

  // Calculate high priority components
  const highPriority = components.filter((component) => component.priority === "High").length

  return {
    total,
    newThisWeek,
    inProgress,
    inProgressPercent: total > 0 ? Math.round((inProgress / total) * 100) : 0,
    completed,
    completedPercent: total > 0 ? Math.round((completed / total) * 100) : 0,
    highPriority,
    highPriorityPercent: total > 0 ? Math.round((highPriority / total) * 100) : 0,
  }
}

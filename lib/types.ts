export interface ComponentType {
  id: string
  name: string
  description?: string
  status: string
  priority: string
  assignedTo: string
  createdAt: string
  updatedAt: string
  dueDate: string
  progress: number
  location: string
}

export interface ComponentStats {
  total: number
  newThisWeek: number
  inProgress: number
  inProgressPercent: number
  completed: number
  completedPercent: number
  highPriority: number
  highPriorityPercent: number
}

export interface TeamMemberType {
  id: string
  name: string
  role: string
  email: string
  avatar: string
  status: string
}

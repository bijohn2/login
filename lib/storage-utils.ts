import type { ComponentType } from "./types"

const STORAGE_KEY = "trackerr_components"

// Save a component to localStorage
export function saveComponentToStorage(component: ComponentType | ComponentType[]): void {
  if (typeof window === "undefined") return

  const components = loadComponentsFromStorage()

  if (Array.isArray(component)) {
    // If we're saving multiple components, replace all
    localStorage.setItem(STORAGE_KEY, JSON.stringify(component))
  } else {
    // If we're saving a single component
    const existingIndex = components.findIndex((c) => c.id === component.id)

    if (existingIndex >= 0) {
      // Update existing component
      components[existingIndex] = component
    } else {
      // Add new component
      components.push(component)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(components))
  }
}

// Load all components from localStorage
export function loadComponentsFromStorage(): ComponentType[] {
  if (typeof window === "undefined") return []

  const storedData = localStorage.getItem(STORAGE_KEY)
  if (!storedData) return []

  try {
    return JSON.parse(storedData)
  } catch (error) {
    console.error("Error parsing components from localStorage:", error)
    return []
  }
}

// Delete a component from localStorage
export function deleteComponentFromStorage(id: string): void {
  if (typeof window === "undefined") return

  const components = loadComponentsFromStorage()
  const updatedComponents = components.filter((component) => component.id !== id)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedComponents))
}

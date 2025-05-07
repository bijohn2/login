"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2, CheckCircle } from "lucide-react"
import { format, isValid } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { ComponentType } from "@/lib/types"
import { saveComponent } from "@/lib/data"
import { VoiceEnabledInput } from "@/components/voice-enabled-input"
import { VoiceEnabledTextarea } from "@/components/voice-enabled-textarea"

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  status: z.enum(["Not Started", "In Progress", "In Review", "Completed"]),
  priority: z.enum(["Low", "Medium", "High"]),
  assignedTo: z.string().optional(),
  dueDate: z.date(),
  progress: z.coerce.number().min(0).max(100),
  location: z.string().optional(),
})

type ComponentFormProps = {
  component?: ComponentType
}

// Helper function to safely parse a date
function parseDate(dateString: string | undefined): Date {
  if (!dateString) return new Date()

  const parsedDate = new Date(dateString)
  return isValid(parsedDate) ? parsedDate : new Date()
}

// Helper function to safely format a date
function formatDate(date: Date | undefined): string {
  if (!date || !isValid(date)) return "Pick a date"
  return format(date, "PPP")
}

export function ComponentForm({ component }: ComponentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [componentName, setComponentName] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Initialize form with default values or existing component data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: component
      ? {
          name: component.name,
          description: component.description,
          status: component.status as any,
          priority: component.priority as any,
          assignedTo: component.assignedTo,
          dueDate: parseDate(component.dueDate),
          progress: component.progress,
          location: component.location,
        }
      : {
          name: "",
          description: "",
          status: "Not Started",
          priority: "Medium",
          assignedTo: "",
          dueDate: new Date(),
          progress: 0,
          location: "",
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSubmitting || isSuccess) return

    try {
      setIsSubmitting(true)
      setError(null)

      // Validate the date before submission
      if (!isValid(values.dueDate)) {
        setError("Please select a valid due date")
        setIsSubmitting(false)
        return
      }

      // Prepare component data
      const componentData: Partial<ComponentType> = {
        ...values,
        id: component?.id,
        // Ensure date is properly formatted as ISO string
        dueDate: values.dueDate.toISOString(),
      }

      // Save component
      await saveComponent(componentData)

      // Store component name for success message
      setComponentName(values.name)

      // Show success state
      setIsSuccess(true)
      setIsSubmitting(false)

      // Show success toast
      toast({
        title: component ? "Component updated" : "Component created",
        description: `Successfully ${component ? "updated" : "created"} ${values.name}`,
      })
    } catch (error) {
      console.error("Error saving component:", error)
      setError("Failed to save component. Please try again.")
      setIsSubmitting(false)
    }
  }

  // If form was successfully submitted, show success message
  if (isSuccess) {
    return (
      <div className="space-y-6">
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success!</AlertTitle>
          <AlertDescription className="text-green-700">
            {component ? "Updated" : "Created"} component "{componentName}" successfully.
          </AlertDescription>
        </Alert>

        <div className="flex gap-4">
          <a
            href="/components"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            View All Components
          </a>
          <a
            href="/components/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Create Another Component
          </a>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <VoiceEnabledInput placeholder="Component name" {...field} />
              </FormControl>
              <FormDescription>The name of your component.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <VoiceEnabledTextarea
                  placeholder="Describe the component"
                  className="resize-none"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>A brief description of the component.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned To</FormLabel>
                <FormControl>
                  <VoiceEnabledInput placeholder="Team member name" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <VoiceEnabledInput placeholder="Component location" {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription>Where this component is used (e.g., Header, Footer, Home Page)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                      >
                        {formatDate(field.value)}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={isValid(field.value) ? field.value : undefined}
                      onSelect={(date) => field.onChange(date || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="progress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Progress (%)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="100" placeholder="0" {...field} />
                </FormControl>
                <FormDescription>Completion percentage (0-100)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <a
            href="/components"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Cancel
          </a>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {component ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{component ? "Update" : "Create"} Component</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

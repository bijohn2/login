"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { AudioUpload } from "@/components/audio-upload"
import { uploadAudio } from "@/lib/audio-storage"
import { getAllComponents } from "@/lib/data"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Audio name must be at least 2 characters.",
  }),
  componentId: z.string().optional(),
})

export function AudioUploadForm() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const components = getAllComponents()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      componentId: "",
    },
  })

  const handleFileUpload = async (file: File) => {
    setSelectedFile(file)

    // Auto-fill the name field with the file name (without extension)
    const fileName = file.name.replace(/\.[^/.]+$/, "")
    form.setValue("name", fileName)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an audio file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await uploadAudio(
        selectedFile,
        values.name,
        values.componentId && values.componentId !== "" ? values.componentId : undefined,
      )

      toast({
        title: "Audio uploaded",
        description: "Your audio file has been uploaded successfully.",
      })

      router.push("/audio")
      router.refresh()
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your audio file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Audio Recording" {...field} />
                  </FormControl>
                  <FormDescription>A descriptive name for your audio file.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="componentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Associated Component (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a component" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {components.map((component) => (
                        <SelectItem key={component.id} value={component.id}>
                          {component.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Associate this audio with a specific component.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Audio File</FormLabel>
              <AudioUpload
                onUpload={handleFileUpload}
                accept="audio/*"
                maxSize={20 * 1024 * 1024} // 20MB
                buttonText="Select Audio File"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected file: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting || !selectedFile}>
          {isSubmitting ? "Uploading..." : "Upload Audio"}
        </Button>
      </CardFooter>
    </Card>
  )
}

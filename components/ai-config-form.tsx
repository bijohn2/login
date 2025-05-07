"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { InfoIcon as InfoCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  enableComponentAnalysis: z.boolean().default(true),
  enableDocGeneration: z.boolean().default(true),
  enableTaskPrioritization: z.boolean().default(false),
})

export function AIConfigForm() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      model: "gpt-4o",
      enableComponentAnalysis: true,
      enableDocGeneration: true,
      enableTaskPrioritization: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsConnecting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsConnecting(false)
    setIsConnected(true)

    toast({
      title: "AI Integration Configured",
      description: "Your AI integration has been successfully configured.",
    })

    console.log(values)
  }

  function onTest() {
    setIsConnecting(true)

    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false)

      toast({
        title: "Connection Successful",
        description: "Successfully connected to AI service.",
      })
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Configuration</CardTitle>
        <CardDescription>Configure AI capabilities for component analysis and suggestions</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">
                    Your AI service API key
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Get this from your AI provider dashboard</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Model</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the AI model to use for analysis</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="enableComponentAnalysis"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Component Analysis</FormLabel>
                      <FormDescription>Analyze components for quality and improvement suggestions</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableDocGeneration"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Documentation Generation</FormLabel>
                      <FormDescription>Automatically generate documentation for components</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableTaskPrioritization"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Task Prioritization</FormLabel>
                      <FormDescription>Use AI to suggest task priorities based on project needs</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onTest} disabled={isConnecting}>
                {isConnecting ? "Testing..." : "Test Connection"}
              </Button>
              <Button type="submit" disabled={isConnecting || isConnected}>
                {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 text-sm text-muted-foreground">
        <div>
          Need help?{" "}
          <a href="https://platform.openai.com/docs" target="_blank" rel="noopener noreferrer" className="underline">
            View AI documentation
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

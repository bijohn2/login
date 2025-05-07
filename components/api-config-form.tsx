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
import { InfoIcon as InfoCircle, Copy, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  enableApiAccess: z.boolean().default(false),
  apiKey: z.string().optional(),
  allowedOrigins: z.string().optional(),
  enableRateLimiting: z.boolean().default(true),
  requestsPerMinute: z.string().optional(),
})

export function APIConfigForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableApiAccess: false,
      apiKey: "",
      allowedOrigins: "*",
      enableRateLimiting: true,
      requestsPerMinute: "60",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)

    toast({
      title: "API Configuration Saved",
      description: "Your API configuration has been successfully saved.",
    })

    console.log(values)
  }

  function generateApiKey() {
    setIsGenerating(true)

    // Simulate API key generation
    setTimeout(() => {
      const apiKey = `ct_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      form.setValue("apiKey", apiKey)
      setIsGenerating(false)

      toast({
        title: "API Key Generated",
        description: "A new API key has been generated. Make sure to save your changes.",
      })
    }, 1000)
  }

  function copyApiKey() {
    const apiKey = form.getValues("apiKey")
    if (apiKey) {
      navigator.clipboard.writeText(apiKey)
      toast({
        title: "API Key Copied",
        description: "The API key has been copied to your clipboard.",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Configuration</CardTitle>
        <CardDescription>Configure API access for external integrations</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="enableApiAccess"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable API Access</FormLabel>
                    <FormDescription>Allow external applications to access your data via API</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("enableApiAccess") && (
              <>
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <div className="flex-1 relative">
                            <Input type="password" {...field} readOnly />
                            {field.value && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-8 top-0"
                                onClick={copyApiKey}
                              >
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy API key</span>
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateApiKey}
                          disabled={isGenerating}
                          className="shrink-0"
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Generating
                            </>
                          ) : field.value ? (
                            "Regenerate"
                          ) : (
                            "Generate"
                          )}
                        </Button>
                      </div>
                      <FormDescription className="flex items-center gap-1">
                        Your API key for authentication
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Keep this secret! Regenerate if compromised.</p>
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
                  name="allowedOrigins"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowed Origins</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="https://example.com, https://app.example.com"
                          className="resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="flex items-center gap-1">
                        Comma-separated list of allowed origins (CORS)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Use * to allow all origins (not recommended for production)</p>
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
                  name="enableRateLimiting"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Rate Limiting</FormLabel>
                        <FormDescription>Limit the number of API requests per minute</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("enableRateLimiting") && (
                  <FormField
                    control={form.control}
                    name="requestsPerMinute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requests Per Minute</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormDescription>Maximum number of API requests allowed per minute</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Configuration"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 text-sm text-muted-foreground">
        <div>
          Need help?{" "}
          <a href="#" className="underline">
            View API documentation
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

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

const formSchema = z.object({
  blobReadWriteToken: z.string().min(1, { message: "Token is required" }),
  enableFileStorage: z.boolean().default(true),
  enableAudioStorage: z.boolean().default(true),
  cacheControl: z.string().optional(),
})

export function BlobConfigForm() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blobReadWriteToken: "",
      enableFileStorage: true,
      enableAudioStorage: true,
      cacheControl: "public, max-age=31536000, immutable",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsConnecting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsConnecting(false)
    setIsConnected(true)

    toast({
      title: "Vercel Blob Integration Configured",
      description: "Your Vercel Blob integration has been successfully configured.",
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
        description: "Successfully connected to Vercel Blob.",
      })
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vercel Blob Configuration</CardTitle>
        <CardDescription>Configure Vercel Blob for enhanced file and audio storage</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="blobReadWriteToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blob Read-Write Token</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">
                    Your Vercel Blob read-write token
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate this token in your Vercel project settings</p>
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
              name="cacheControl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cache Control</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">
                    Cache control header for uploaded files
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Controls how files are cached by browsers and CDNs</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="enableFileStorage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable File Storage</FormLabel>
                      <FormDescription>Use Vercel Blob for document and image storage</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableAudioStorage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Audio Storage</FormLabel>
                      <FormDescription>Use Vercel Blob for audio file storage</FormDescription>
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
          <a
            href="https://vercel.com/docs/storage/vercel-blob"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View Vercel Blob documentation
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

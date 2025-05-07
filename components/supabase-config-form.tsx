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
  supabaseUrl: z.string().url({ message: "Please enter a valid URL" }),
  supabaseAnonKey: z.string().min(1, { message: "Anon key is required" }),
  supabaseServiceKey: z.string().min(1, { message: "Service role key is required" }),
  enableAuth: z.boolean().default(true),
  enableRealtime: z.boolean().default(true),
})

export function SupabaseConfigForm() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supabaseUrl: "",
      supabaseAnonKey: "",
      supabaseServiceKey: "",
      enableAuth: true,
      enableRealtime: true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsConnecting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsConnecting(false)
    setIsConnected(true)

    toast({
      title: "Supabase Integration Configured",
      description: "Your Supabase integration has been successfully configured.",
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
        description: "Successfully connected to Supabase.",
      })
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Supabase Configuration</CardTitle>
        <CardDescription>Enter your Supabase credentials to connect your project</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="supabaseUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supabase URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-project.supabase.co" {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">
                    Your Supabase project URL
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Find this in your Supabase project settings</p>
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
              name="supabaseAnonKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anon Key</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">
                    Your Supabase anon/public key
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Used for client-side authentication</p>
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
              name="supabaseServiceKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Role Key</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">
                    Your Supabase service role key
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Used for server-side operations with full access</p>
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
                name="enableAuth"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Authentication</FormLabel>
                      <FormDescription>Use Supabase for user authentication</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableRealtime"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Realtime</FormLabel>
                      <FormDescription>Enable realtime updates for collaborative features</FormDescription>
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
          <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="underline">
            View Supabase documentation
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

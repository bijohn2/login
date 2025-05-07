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
  googleSheetId: z.string().min(1, { message: "Sheet ID is required" }),
  googleSheetTabName: z.string().min(1, { message: "Tab name is required" }),
  enableAutoSync: z.boolean().default(false),
  syncInterval: z.string().optional(),
})

export function GoogleSheetsConfigForm() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      googleSheetId: "",
      googleSheetTabName: "Components",
      enableAutoSync: false,
      syncInterval: "60",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsConnecting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsConnecting(false)
    setIsConnected(true)

    toast({
      title: "Google Sheets Integration Configured",
      description: "Your Google Sheets integration has been successfully configured.",
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
        description: "Successfully connected to Google Sheets.",
      })
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Google Sheets Configuration</CardTitle>
        <CardDescription>Configure Google Sheets for data import and export</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="googleSheetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Sheet ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">
                    The ID of your Google Sheet
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Found in the URL of your Google Sheet:
                            https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
                          </p>
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
              name="googleSheetTabName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sheet Tab Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">
                    The name of the tab in your Google Sheet
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The name of the tab where data will be stored</p>
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
                name="enableAutoSync"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Auto Sync</FormLabel>
                      <FormDescription>Automatically sync data with Google Sheets</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("enableAutoSync") && (
                <FormField
                  control={form.control}
                  name="syncInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sync Interval (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="5" {...field} />
                      </FormControl>
                      <FormDescription>How often to sync data with Google Sheets</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
            href="https://developers.google.com/sheets/api"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View Google Sheets API documentation
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

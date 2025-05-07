"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { CheckCircle, Star } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

// Google Sheets integration constants
const GOOGLE_SHEET_ENDPOINT =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_ENDPOINT || "https://script.google.com/macros/s/your-google-sheet-id/exec"
const GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || "your-google-sheet-id"
const GOOGLE_SHEET_TAB_NAME = process.env.NEXT_PUBLIC_GOOGLE_SHEET_TAB_NAME || "Feedback"

const formSchema = z.object({
  overallRating: z.string().min(1, {
    message: "Please select an overall rating.",
  }),
  usabilityRating: z.string().min(1, {
    message: "Please select a usability rating.",
  }),
  designRating: z.string().min(1, {
    message: "Please select a design rating.",
  }),
  likeAboutApp: z
    .string()
    .min(10, {
      message: "Please provide at least 10 characters of feedback.",
    })
    .max(500, {
      message: "Feedback must not exceed 500 characters.",
    }),
  improvements: z
    .string()
    .min(10, {
      message: "Please provide at least 10 characters of suggestions.",
    })
    .max(500, {
      message: "Suggestions must not exceed 500 characters.",
    }),
  featureRequest: z.string().optional(),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
})

export function FeedbackForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { user } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      overallRating: "",
      usabilityRating: "",
      designRating: "",
      likeAboutApp: "",
      improvements: "",
      featureRequest: "",
      email: user?.email || "",
    },
  })

  const watchOverallRating = form.watch("overallRating")
  const watchUsabilityRating = form.watch("usabilityRating")
  const watchDesignRating = form.watch("designRating")
  const watchLikeAboutApp = form.watch("likeAboutApp")
  const watchImprovements = form.watch("improvements")

  const canProceedToStep2 = watchOverallRating && watchUsabilityRating && watchDesignRating
  const canProceedToStep3 = watchLikeAboutApp.length >= 10 && watchImprovements.length >= 10

  const nextStep = () => {
    if (step === 1 && !canProceedToStep2) {
      form.trigger(["overallRating", "usabilityRating", "designRating"])
      return
    }

    if (step === 2 && !canProceedToStep3) {
      form.trigger(["likeAboutApp", "improvements"])
      return
    }

    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  // This function will be called when the user manually clicks the submit button
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.handleSubmit(onSubmit)()
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      // Prepare data for Google Sheets
      const formData = new FormData()
      formData.append("sheet_id", GOOGLE_SHEET_ID)
      formData.append("sheet_tab", GOOGLE_SHEET_TAB_NAME)
      formData.append("timestamp", new Date().toISOString())
      formData.append("overall_rating", data.overallRating)
      formData.append("usability_rating", data.usabilityRating)
      formData.append("design_rating", data.designRating)
      formData.append("likes", data.likeAboutApp)
      formData.append("improvements", data.improvements)
      formData.append("feature_request", data.featureRequest || "")
      formData.append("email", data.email || "")
      formData.append("user_id", user?.id || "anonymous")

      // Submit to Google Sheets
      const response = await fetch(GOOGLE_SHEET_ENDPOINT, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })

      // Since we're using no-cors, we can't actually check the response
      // In a real app, you'd use a proper API endpoint that returns JSON

      console.log("Feedback submitted to Google Sheets")

      setIsSubmitted(true)

      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! We appreciate your input.",
      })
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: string) => {
    const stars = []
    const ratingValue = Number.parseInt(rating) || 0

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-6 w-6 ${i <= ratingValue ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />,
      )
    }

    return stars
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold">Thank You!</h2>
            <p className="mt-2 text-muted-foreground">
              Your feedback has been submitted successfully. We appreciate your input and will use it to improve our
              application.
            </p>
            <Button
              className="mt-6"
              onClick={() => {
                setIsSubmitted(false)
                setStep(1)
                form.reset()
              }}
            >
              Submit Another Response
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <CardDescription>
          Help us improve by sharing your experience with the Component Tracker application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "border border-input bg-background"}`}
              >
                1
              </div>
              <div className={`mx-2 h-1 w-12 ${step >= 2 ? "bg-primary" : "bg-border"}`} />
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "border border-input bg-background"}`}
              >
                2
              </div>
              <div className={`mx-2 h-1 w-12 ${step >= 3 ? "bg-primary" : "bg-border"}`} />
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "border border-input bg-background"}`}
              >
                3
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Step {step} of 3</div>
          </div>
        </div>

        <Form {...form}>
          {/* Important: Use onSubmit={handleManualSubmit} instead of form.handleSubmit(onSubmit) */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="overallRating"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>How would you rate your overall experience?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-1"
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <FormItem key={value} className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value={value.toString()} className="sr-only" />
                              </FormControl>
                              <FormLabel className="cursor-pointer">
                                <Star
                                  className={`h-8 w-8 ${Number.parseInt(field.value) >= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"}`}
                                />
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        {field.value ? `You rated ${field.value} out of 5 stars` : "Click on a star to rate"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usabilityRating"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>How easy is the application to use?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-1"
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <FormItem key={value} className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value={value.toString()} className="sr-only" />
                              </FormControl>
                              <FormLabel className="cursor-pointer">
                                <Star
                                  className={`h-8 w-8 ${Number.parseInt(field.value) >= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"}`}
                                />
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        {field.value ? `You rated ${field.value} out of 5 stars` : "Click on a star to rate"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designRating"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>How would you rate the design and visual appeal?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-1"
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <FormItem key={value} className="flex items-center space-x-1">
                              <FormControl>
                                <RadioGroupItem value={value.toString()} className="sr-only" />
                              </FormControl>
                              <FormLabel className="cursor-pointer">
                                <Star
                                  className={`h-8 w-8 ${Number.parseInt(field.value) >= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"}`}
                                />
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        {field.value ? `You rated ${field.value} out of 5 stars` : "Click on a star to rate"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="likeAboutApp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What do you like most about the application?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="I really like..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormDescription>{500 - field.value.length} characters remaining</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="improvements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What could we improve?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="I think you could improve..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormDescription>{500 - field.value.length} characters remaining</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="featureRequest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is there a specific feature you'd like to see added?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="I'd like to see..." className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional: Let us know if there's a specific feature you'd like us to add.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide your email if you'd like us to follow up with you about your feedback.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Review Your Feedback</h3>

                  <div className="rounded-lg border p-4 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Overall Rating</p>
                        <div className="flex mt-1">{renderStars(watchOverallRating)}</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Usability Rating</p>
                        <div className="flex mt-1">{renderStars(watchUsabilityRating)}</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Design Rating</p>
                        <div className="flex mt-1">{renderStars(watchDesignRating)}</div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium">What you like most</p>
                      <p className="mt-1 text-sm text-muted-foreground">{watchLikeAboutApp}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Suggested improvements</p>
                      <p className="mt-1 text-sm text-muted-foreground">{watchImprovements}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="button" onClick={handleManualSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

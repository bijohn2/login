"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Lightbulb, Mic, Volume2 } from "lucide-react"
import { type AudioSuggestion, getAudioSuggestions, getAudioEnhancementTips } from "@/lib/ai-assistant"

export function AudioAIAssistant() {
  const [context, setContext] = useState("")
  const [audioDescription, setAudioDescription] = useState("")
  const [suggestions, setSuggestions] = useState<AudioSuggestion[]>([])
  const [tips, setTips] = useState<string[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [isLoadingTips, setIsLoadingTips] = useState(false)

  const handleGetSuggestions = async () => {
    if (!context.trim()) return

    setIsLoadingSuggestions(true)
    try {
      const result = await getAudioSuggestions(context)
      setSuggestions(result)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  const handleGetTips = async () => {
    if (!audioDescription.trim()) return

    setIsLoadingTips(true)
    try {
      const result = await getAudioEnhancementTips(audioDescription)
      setTips(result)
    } catch (error) {
      console.error("Error fetching tips:", error)
    } finally {
      setIsLoadingTips(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Audio Content Suggestions
          </CardTitle>
          <CardDescription>Get AI-powered suggestions for audio content based on your context</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Textarea
                placeholder="Describe the context or purpose of your audio content..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button
              onClick={handleGetSuggestions}
              disabled={!context.trim() || isLoadingSuggestions}
              className="w-full"
            >
              {isLoadingSuggestions ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Suggestions...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Audio Suggestions
                </>
              )}
            </Button>
          </div>
        </CardContent>
        {suggestions.length > 0 && (
          <CardFooter className="flex-col items-start gap-4">
            <div className="text-sm font-medium">Suggestions:</div>
            <div className="grid gap-4 w-full md:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{suggestion.title}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {suggestion.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                    <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Volume2 className="mr-1 h-3 w-3" />
                        {suggestion.mood}
                      </div>
                      <div className="flex items-center">
                        <Mic className="mr-1 h-3 w-3" />
                        {suggestion.duration}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Audio Enhancement Tips
          </CardTitle>
          <CardDescription>Get AI-powered tips to enhance your audio content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Textarea
                placeholder="Describe your current audio content..."
                value={audioDescription}
                onChange={(e) => setAudioDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button onClick={handleGetTips} disabled={!audioDescription.trim() || isLoadingTips} className="w-full">
              {isLoadingTips ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Tips...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Get Enhancement Tips
                </>
              )}
            </Button>
          </div>
        </CardContent>
        {tips.length > 0 && (
          <CardFooter className="flex-col items-start gap-4">
            <div className="text-sm font-medium">Enhancement Tips:</div>
            <ul className="space-y-2 w-full">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    {index + 1}
                  </span>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

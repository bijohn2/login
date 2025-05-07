"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoiceEnabledInput } from "@/components/voice-enabled-input"
import { VoiceEnabledTextarea } from "@/components/voice-enabled-textarea"
import { AdvancedVoiceInput } from "@/components/advanced-voice-input"
import { Button } from "@/components/ui/button"
import { Mic, Info, Volume2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function VoiceInputDemo() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [advancedText, setAdvancedText] = useState("")
  const [simpleInputValue, setSimpleInputValue] = useState("")
  const [simpleTextareaValue, setSimpleTextareaValue] = useState("")
  const [lastTranscribedInput, setLastTranscribedInput] = useState("")
  const [lastTranscribedTextarea, setLastTranscribedTextarea] = useState("")
  const [isTranscribingInput, setIsTranscribingInput] = useState(false)
  const [isTranscribingTextarea, setIsTranscribingTextarea] = useState(false)

  const handleInfoClick = useCallback(() => {
    toast({
      title: "Voice Input Information",
      description:
        "This demo showcases different ways to use voice input in your application. Try speaking into your microphone to see it in action!",
    })
  }, [])

  const handleAdvancedComplete = useCallback((text: string) => {
    setAdvancedText(text)
    setShowAdvanced(false)
    toast({
      title: "Transcription Complete",
      description: "Your speech has been converted to text successfully.",
    })
  }, [])

  const handleInputTranscriptionStart = useCallback(() => {
    setIsTranscribingInput(true)
  }, [])

  const handleInputTranscriptionEnd = useCallback((transcript: string) => {
    setIsTranscribingInput(false)
    setLastTranscribedInput(transcript)

    toast({
      title: "Input Transcription Added",
      description: `Added: "${transcript}"`,
      duration: 3000,
    })
  }, [])

  const handleTextareaTranscriptionStart = useCallback(() => {
    setIsTranscribingTextarea(true)
  }, [])

  const handleTextareaTranscriptionEnd = useCallback((transcript: string) => {
    setIsTranscribingTextarea(false)
    setLastTranscribedTextarea(transcript)

    toast({
      title: "Textarea Transcription Added",
      description: `Added: "${transcript}"`,
      duration: 3000,
    })
  }, [])

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Voice Input Demo</h1>
        <Button variant="ghost" size="icon" onClick={handleInfoClick}>
          <Info className="h-5 w-5" />
        </Button>
      </div>

      <Alert className="mb-6">
        <Mic className="h-4 w-4" />
        <AlertTitle>Voice Input Capabilities</AlertTitle>
        <AlertDescription>
          This demo showcases the voice input capabilities added to the platform. You can now use your voice to input
          data in various forms and fields.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="simple">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simple">Simple Voice Inputs</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Voice Input</TabsTrigger>
        </TabsList>

        <TabsContent value="simple" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Voice Enabled Input</CardTitle>
              <CardDescription>
                Click the "Record" button to start speaking. Your speech will be converted to text.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Short Text Input</label>
                  {isTranscribingInput && (
                    <Badge variant="outline" className="bg-red-50 text-red-500 animate-pulse">
                      <Volume2 className="h-3 w-3 mr-1" /> Recording...
                    </Badge>
                  )}
                </div>
                <VoiceEnabledInput
                  placeholder="Click 'Record' to enter text with your voice..."
                  value={simpleInputValue}
                  onValueChange={setSimpleInputValue}
                  onTranscriptionStart={handleInputTranscriptionStart}
                  onTranscriptionEnd={handleInputTranscriptionEnd}
                />
                {lastTranscribedInput && (
                  <div className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">Last transcribed:</span> "{lastTranscribedInput}"
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Longer Text Input</label>
                  {isTranscribingTextarea && (
                    <Badge variant="outline" className="bg-red-50 text-red-500 animate-pulse">
                      <Volume2 className="h-3 w-3 mr-1" /> Recording...
                    </Badge>
                  )}
                </div>
                <VoiceEnabledTextarea
                  placeholder="Click 'Record' to enter longer text content with your voice..."
                  value={simpleTextareaValue}
                  onValueChange={setSimpleTextareaValue}
                  onTranscriptionStart={handleTextareaTranscriptionStart}
                  onTranscriptionEnd={handleTextareaTranscriptionEnd}
                />
                {lastTranscribedTextarea && (
                  <div className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">Last transcribed:</span> "{lastTranscribedTextarea}"
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 flex flex-col items-start p-4">
              <h4 className="font-medium mb-2">Transcription History</h4>
              <div className="w-full space-y-2">
                <div className="text-sm">
                  <div className="font-medium">Input Field:</div>
                  <div className="bg-background p-2 rounded border mt-1">
                    {simpleInputValue || "No transcriptions yet"}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Textarea Field:</div>
                  <div className="bg-background p-2 rounded border mt-1 whitespace-pre-wrap">
                    {simpleTextareaValue || "No transcriptions yet"}
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Voice Input</CardTitle>
              <CardDescription>
                A more comprehensive voice input experience with recording time and controls.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showAdvanced ? (
                <AdvancedVoiceInput
                  onTranscriptComplete={handleAdvancedComplete}
                  onCancel={() => setShowAdvanced(false)}
                  maxDuration={120}
                />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Transcribed Text</label>
                    <textarea
                      value={advancedText}
                      onChange={(e) => setAdvancedText(e.target.value)}
                      className="w-full min-h-[150px] p-3 rounded-md border"
                      placeholder="Your transcribed text will appear here..."
                    />
                  </div>

                  <Button onClick={() => setShowAdvanced(true)} className="w-full">
                    <Mic className="mr-2 h-4 w-4" />
                    Start Advanced Voice Input
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

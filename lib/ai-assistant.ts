"use server"

import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export interface AudioSuggestion {
  title: string
  description: string
  tags: string[]
  duration: string
  mood: string
}

export async function getAudioSuggestions(context: string, count = 3): Promise<AudioSuggestion[]> {
  try {
    const prompt = `
      Generate ${count} audio content suggestions based on the following context:
      "${context}"
      
      For each suggestion, provide:
      1. A catchy title
      2. A brief description (1-2 sentences)
      3. 3-5 relevant tags
      4. Recommended duration (e.g., "30 seconds", "2 minutes")
      5. Mood/tone (e.g., "upbeat", "serious", "inspirational")
      
      Format the response as a valid JSON array of objects with the properties: 
      title, description, tags (array), duration, and mood.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return JSON.parse(text) as AudioSuggestion[]
  } catch (error) {
    console.error("Error generating audio suggestions:", error)
    return []
  }
}

export async function getAudioTranscription(audioContent: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Transcribe the following audio content: "${audioContent}"`,
    })

    return text
  } catch (error) {
    console.error("Error generating transcription:", error)
    return "Transcription failed. Please try again."
  }
}

export async function getAudioEnhancementTips(audioDescription: string): Promise<string[]> {
  try {
    const prompt = `
      Based on this audio description: "${audioDescription}"
      
      Provide 5 specific tips to enhance the audio quality and engagement.
      Format the response as a JSON array of strings, with each string being a specific tip.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return JSON.parse(text) as string[]
  } catch (error) {
    console.error("Error generating enhancement tips:", error)
    return ["Failed to generate enhancement tips. Please try again."]
  }
}

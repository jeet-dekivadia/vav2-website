"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "@/components/providers/chat-provider"
import { useProject } from "@/components/providers/project-provider"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"

export function ChatInterface() {
  const [input, setInput] = useState("")
  const { messages, addMessage } = useChat()
  const { project } = useProject()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    addMessage({
      id: Date.now().toString(),
      content: input,
      role: "user",
    })

    // Generate context-aware AI response
    const aiResponse = generateAIResponse(input, project)

    // Add AI response
    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
      })
    }, 1000)

    setInput("")
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 border-b">
        <h2 className="font-semibold">AI Assistant</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 ${message.role === "user" ? "ml-auto" : "mr-auto"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

function generateAIResponse(input: string, project: any): string {
  // This is a simple mock-up of an AI response generator
  // In a real application, this would be connected to an actual AI model

  if (input.toLowerCase().includes("task")) {
    return `You're currently working on a ${project.task || "machine learning"} task. How can I assist you with that?`
  }

  if (input.toLowerCase().includes("data")) {
    return project.dataFile
      ? `You've uploaded a file named ${project.dataFile.name}. The target variable is ${project.targetVariable}. What would you like to know about your data?`
      : "You haven't uploaded any data yet. Would you like help with data selection?"
  }

  if (input.toLowerCase().includes("model")) {
    return project.model
      ? `You're using a ${project.model} model. The current training status is ${project.trainingStatus}. What specific information do you need about the model?`
      : "You haven't selected a model yet. Would you like recommendations for model selection based on your task?"
  }

  if (input.toLowerCase().includes("results")) {
    return project.results
      ? `Your model achieved an accuracy of ${(project.results.accuracy * 100).toFixed(2)}%. Would you like me to explain the other metrics?`
      : "Your model hasn't generated results yet. Let me know when you're ready to interpret the results."
  }

  return "I'm here to help with your machine learning project. What specific aspect would you like assistance with?"
}


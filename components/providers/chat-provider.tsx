"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { ChatMessage } from "@/types/chat"

interface ChatContextType {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hi! I'm VAV2, your AI assistant. How can I help you today?",
      role: "assistant",
    },
  ])

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const clearMessages = () => {
    setMessages([])
  }

  return <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>{children}</ChatContext.Provider>
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}


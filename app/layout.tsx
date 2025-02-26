import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ChatProvider } from "@/components/providers/chat-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ProjectProvider } from "@/components/providers/project-provider"
import { Navigation } from "@/components/navigation"
import { ChatInterface } from "@/components/chat/chat-interface"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ProjectProvider>
            <ChatProvider>
              <div className="min-h-screen flex">
                <Navigation />
                <main className="flex-1 flex">
                  <div className="flex-1 p-8 overflow-y-auto">{children}</div>
                  <div className="w-[400px] border-l h-screen sticky top-0">
                    <ChatInterface />
                  </div>
                </main>
              </div>
            </ChatProvider>
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };

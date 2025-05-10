import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { AnimatedBackground } from "@/components/animated-background"
import { FeedbackButton } from "@/components/feedback-button"
import { PlatformTutorial } from "@/components/platform-tutorial"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Project Component Tracker",
  description: "Track and manage project components efficiently",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <SidebarProvider>
              <AnimatedBackground>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex flex-1">
                    <AppSidebar />
                    <main className="flex-1 p-4 md:p-6">
                      <BreadcrumbNav />
                      {children}
                    </main>
                  </div>
                </div>
                <FeedbackButton />
                <PlatformTutorial />
                <KeyboardShortcuts />
                <ScrollToTop />
              </AnimatedBackground>
            </SidebarProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

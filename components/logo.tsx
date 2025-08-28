"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
  showText?: boolean
  className?: string
  href?: string
}

export function Logo({ size = "md", showText = true, className, href }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-20 w-20",
    "2xl": "h-24 w-24",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
    "2xl": "text-4xl",
  }

  const LogoContent = () => (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative flex-shrink-0 owl-eyes", sizeClasses[size])}>
        <Image src="/owl-logo.png" alt="TRACKERR Logo" fill className="object-contain" priority />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold text-foreground whitespace-nowrap", textSizeClasses[size])}>TRACKERR</span>
          {size !== "sm" && <span className="text-xs text-muted-foreground whitespace-nowrap">Component Tracker</span>}
        </div>
      )}
    </div>
  )

  if (href !== undefined) {
    return (
      <Link href={href || "/"} className="hover:opacity-80 transition-opacity">
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}

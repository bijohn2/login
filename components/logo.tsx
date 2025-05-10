import { ListChecks } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  }

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="rounded-md bg-primary p-1 flex items-center justify-center">
        <ListChecks className={`${sizeClasses[size]} text-primary-foreground`} />
      </div>
      {showText && (
        <span className={`font-semibold ${textSizeClasses[size]} hidden sm:inline-block`}>Component Tracker</span>
      )}
    </Link>
  )
}

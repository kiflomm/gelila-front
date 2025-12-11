"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#181411",
          "--normal-border": "oklch(0.922 0 0)",
          "--success-bg": "#ffffff",
          "--success-text": "#181411",
          "--error-bg": "#ffffff",
          "--error-text": "#181411",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          background: "white",
          color: "#181411",
          border: "1px solid #e5e7eb",
        },
        className: "sonner-toast",
        classNames: {
          toast:
            "bg-white dark:bg-[#23190f] text-[#181411] dark:text-white border border-gray-200 dark:border-white/10 shadow-lg",
          title: "text-[#181411] dark:text-white font-bold text-sm",
          description: "text-[#6C757D] dark:text-white/80 text-sm opacity-100",
          actionButton:
            "bg-primary text-primary-foreground",
          cancelButton:
            "bg-muted text-muted-foreground",
          success:
            "bg-white dark:bg-[#23190f]",
          error:
            "bg-white dark:bg-[#23190f] border-l-4 border-l-red-500",
          info: "bg-white dark:bg-[#23190f] border-l-4 border-l-blue-500",
          warning:
            "bg-white dark:bg-[#23190f] border-l-4 border-l-yellow-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

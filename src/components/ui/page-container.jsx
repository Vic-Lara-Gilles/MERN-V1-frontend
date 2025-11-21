import * as React from "react"
import { cn } from "@/lib/utils"

const PageContainer = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-gray-200 dark:bg-gray-900 min-h-screen", className)}
    {...props}
  />
))
PageContainer.displayName = "PageContainer"

const PageContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 pb-6 space-y-6", className)}
    {...props}
  />
))
PageContent.displayName = "PageContent"

export { PageContainer, PageContent }

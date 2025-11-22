import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const notificationVariants = cva(
  "relative w-full rounded-lg border backdrop-blur-md px-4 py-3 text-sm shadow-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        success: "bg-white/80 dark:bg-gray-800/80 border-green-400/40 dark:border-green-500/40 text-gray-900 dark:text-white",
        info: "bg-white/80 dark:bg-gray-800/80 border-blue-400/40 dark:border-blue-500/40 text-gray-900 dark:text-white",
        warning: "bg-white/80 dark:bg-gray-800/80 border-purple-400/40 dark:border-purple-500/40 text-gray-900 dark:text-white",
        error: "bg-white/80 dark:bg-gray-800/80 border-red-400/40 dark:border-red-500/40 text-gray-900 dark:text-white",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const Notification = React.forwardRef(({ className, variant, isUnread, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      notificationVariants({ variant }), 
      isUnread && "border-2",
      className
    )}
    {...props} 
  />
))
Notification.displayName = "Notification"

const NotificationTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight text-gray-900 dark:text-white", className)}
    {...props} 
  />
))
NotificationTitle.displayName = "NotificationTitle"

const NotificationDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-gray-700 dark:text-gray-300 [&_p]:leading-relaxed", className)}
    {...props} 
  />
))
NotificationDescription.displayName = "NotificationDescription"

export { Notification, NotificationTitle, NotificationDescription }

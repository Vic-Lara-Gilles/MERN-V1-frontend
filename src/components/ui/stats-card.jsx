import * as React from "react"
import { cn } from "@/lib/utils"

const StatsCard = React.forwardRef(({ 
  className,
  title, 
  value, 
  icon: Icon,
  linkText,
  linkHref,
  variant = "blue",
  children,
  ...props 
}, ref) => {
  const variants = {
    blue: {
      icon: "text-blue-500 dark:text-blue-400",
      link: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
    },
    purple: {
      icon: "text-purple-500 dark:text-purple-400",
      link: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
    },
    green: {
      icon: "text-green-500 dark:text-green-400",
      link: "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
    },
    orange: {
      icon: "text-orange-500 dark:text-orange-400",
      link: "text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
    }
  }

  const colors = variants[variant] || variants.blue

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-transparent dark:border-gray-700",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm text-muted-foreground dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        {Icon && <Icon className={cn("h-10 w-10", colors.icon)} />}
      </div>
      {children}
      {linkText && linkHref && (
        <a href={linkHref} className={cn("text-sm flex items-center gap-1 mt-2", colors.link)}>
          {linkText} →
        </a>
      )}
    </div>
  )
})
StatsCard.displayName = "StatsCard"

export { StatsCard }

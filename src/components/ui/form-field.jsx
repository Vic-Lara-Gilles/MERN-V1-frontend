import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const FormField = React.forwardRef(({ 
  className,
  label,
  error,
  type = "text",
  textarea = false,
  required = false,
  ...props 
}, ref) => {
  const InputComponent = textarea ? Textarea : Input

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className="text-slate-900 dark:text-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <InputComponent
        ref={ref}
        type={type}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
})
FormField.displayName = "FormField"

export { FormField }

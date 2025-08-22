"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showStrengthIndicator?: boolean
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrengthIndicator = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [password, setPassword] = React.useState("")

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const getPasswordStrength = (password: string) => {
      let strength = 0
      if (password.length >= 8) strength++
      if (/[a-z]/.test(password)) strength++
      if (/[A-Z]/.test(password)) strength++
      if (/[0-9]/.test(password)) strength++
      if (/[^A-Za-z0-9]/.test(password)) strength++
      return strength
    }

    const getStrengthLabel = (strength: number) => {
      switch (strength) {
        case 0:
        case 1:
          return "Weak"
        case 2:
        case 3:
          return "Medium"
        case 4:
        case 5:
          return "Strong"
        default:
          return "Weak"
      }
    }

    const getStrengthColor = (strength: number) => {
      switch (strength) {
        case 0:
        case 1:
          return "bg-red-500"
        case 2:
        case 3:
          return "bg-yellow-500"
        case 4:
        case 5:
          return "bg-green-500"
        default:
          return "bg-gray-300"
      }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value
      setPassword(newPassword)
      if (props.onChange) {
        props.onChange(e)
      }
    }

    const strength = getPasswordStrength(password)

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className={cn("pr-10", className)}
            ref={ref}
            {...props}
            onChange={handlePasswordChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
          </Button>
        </div>

        {showStrengthIndicator && password && (
          <div className="space-y-1">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-1 w-full rounded-full transition-colors",
                    level <= strength ? getStrengthColor(strength) : "bg-gray-200",
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600">Password strength: {getStrengthLabel(strength)}</p>
          </div>
        )}
      </div>
    )
  },
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }

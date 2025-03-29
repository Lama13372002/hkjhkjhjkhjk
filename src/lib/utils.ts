import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Утилиты для работы с классами
export function combineClasses(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function conditionalClass(condition: boolean, className: string) {
  return condition ? className : ''
}

'use client'

// Простой хук для показа уведомлений
import { useState, useCallback } from 'react'

export type ToastProps = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

type ToastState = ToastProps & {
  id: string
  visible: boolean
}

// Хук для управления уведомлениями
export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([])

  // Функция для добавления нового уведомления
  const toast = useCallback(({ title, description, variant = 'default' }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)

    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, variant, visible: true }
    ])

    // Автоматически скрываем через 5 секунд
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast))
      )

      // Удаляем из DOM через 300мс после скрытия (время для анимации)
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
      }, 300)
    }, 5000)

    return id
  }, [])

  // Функция для удаления уведомления
  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast))
    )

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 300)
  }, [])

  return {
    toast,
    dismiss,
    toasts
  }
}

// Компонент для отображения уведомлений, будет добавлен в layout.tsx
export function Toaster() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-white shadow-lg rounded-lg p-4 border-l-4 transform transition-all duration-300 ${
            toast.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          } ${
            toast.variant === 'destructive' ? 'border-red-500' : 'border-blue-500'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              {toast.title && <h4 className="font-medium">{toast.title}</h4>}
              {toast.description && <p className="text-gray-600 text-sm">{toast.description}</p>}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Провайдер для уведомлений
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

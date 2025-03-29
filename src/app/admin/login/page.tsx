'use client'

import { useState } from 'react'
import { ADMIN_API_KEY } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminLogin() {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (key === ADMIN_API_KEY) {
      // В реальном проекте ключ должен проверяться на сервере
      // А здесь используется только для демонстрации
      Cookies.set('admin_api_key', key, { expires: 1 }) // Истекает через 1 день
      router.push('/admin')
    } else {
      setError('Неверный ключ администратора')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Вход в панель администратора</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API ключ</Label>
              <Input
                id="apiKey"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Введите API ключ администратора"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Войти
            </Button>
            <div className="text-xs text-gray-500 mt-4">
              <p className="text-center">Для демонстрации используйте ключ: 12345-admin-secret-key</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

// Типы для формы настроек футера
interface FooterFormValues {
  footer_company_address: string
  footer_company_phone: string
  footer_company_email: string
  footer_working_hours: string
  footer_social_instagram: string
  footer_social_telegram: string
  footer_social_whatsapp: string
  footer_company_description: string
}

export default function AdminFooter() {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const { toast } = useToast()

  // Настройка формы
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FooterFormValues>({
    defaultValues: {
      footer_company_address: '',
      footer_company_phone: '',
      footer_company_email: '',
      footer_working_hours: '',
      footer_social_instagram: '',
      footer_social_telegram: '',
      footer_social_whatsapp: '',
      footer_company_description: ''
    }
  })

  // Загрузка данных футера при загрузке страницы
  useEffect(() => {
    async function loadFooterSettings() {
      try {
        const response = await fetch('/api/settings')

        if (!response.ok) {
          throw new Error('Не удалось загрузить настройки')
        }

        const data = await response.json()

        // Сбрасываем форму с полученными значениями
        reset({
          footer_company_address: data.footer_company_address || '',
          footer_company_phone: data.footer_company_phone || '',
          footer_company_email: data.footer_company_email || '',
          footer_working_hours: data.footer_working_hours || '',
          footer_social_instagram: data.footer_social_instagram || '',
          footer_social_telegram: data.footer_social_telegram || '',
          footer_social_whatsapp: data.footer_social_whatsapp || '',
          footer_company_description: data.footer_company_description || ''
        })
      } catch (error) {
        console.error('Ошибка загрузки настроек:', error)
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить настройки подвала',
          variant: 'destructive'
        })
      } finally {
        setInitialLoading(false)
      }
    }

    loadFooterSettings()
  }, [reset, toast])

  // Обработка отправки формы
  const onSubmit = async (data: FooterFormValues) => {
    setLoading(true)

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Не удалось сохранить настройки')
      }

      toast({
        title: 'Успешно',
        description: 'Настройки подвала успешно сохранены',
      })
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error)
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить настройки подвала',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Редактирование подвала сайта</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6">
          {/* Контактная информация */}
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>
                Редактирование контактной информации в подвале сайта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="footer_company_address">Адрес компании</Label>
                <Input
                  id="footer_company_address"
                  {...register('footer_company_address', { required: 'Это поле обязательно' })}
                />
                {errors.footer_company_address && (
                  <p className="text-red-500 text-sm mt-1">{errors.footer_company_address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="footer_company_phone">Телефон</Label>
                <Input
                  id="footer_company_phone"
                  {...register('footer_company_phone', { required: 'Это поле обязательно' })}
                />
                {errors.footer_company_phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.footer_company_phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="footer_company_email">Email</Label>
                <Input
                  id="footer_company_email"
                  type="email"
                  {...register('footer_company_email', {
                    required: 'Это поле обязательно',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Неверный формат email'
                    }
                  })}
                />
                {errors.footer_company_email && (
                  <p className="text-red-500 text-sm mt-1">{errors.footer_company_email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="footer_working_hours">Часы работы</Label>
                <Textarea
                  id="footer_working_hours"
                  {...register('footer_working_hours', { required: 'Это поле обязательно' })}
                />
                {errors.footer_working_hours && (
                  <p className="text-red-500 text-sm mt-1">{errors.footer_working_hours.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Социальные сети */}
          <Card>
            <CardHeader>
              <CardTitle>Социальные сети</CardTitle>
              <CardDescription>
                Ссылки на аккаунты в социальных сетях
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="footer_social_instagram">Instagram</Label>
                <Input
                  id="footer_social_instagram"
                  {...register('footer_social_instagram')}
                  placeholder="https://instagram.com/ваш_аккаунт"
                />
              </div>

              <div>
                <Label htmlFor="footer_social_telegram">Telegram</Label>
                <Input
                  id="footer_social_telegram"
                  {...register('footer_social_telegram')}
                  placeholder="https://t.me/ваш_аккаунт"
                />
              </div>

              <div>
                <Label htmlFor="footer_social_whatsapp">WhatsApp</Label>
                <Input
                  id="footer_social_whatsapp"
                  {...register('footer_social_whatsapp')}
                  placeholder="https://wa.me/ваш_номер"
                />
              </div>
            </CardContent>
          </Card>

          {/* Описание компании */}
          <Card>
            <CardHeader>
              <CardTitle>Описание компании</CardTitle>
              <CardDescription>
                Краткая информация о компании для подвала
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="footer_company_description">Описание</Label>
                <Textarea
                  id="footer_company_description"
                  {...register('footer_company_description', { required: 'Это поле обязательно' })}
                  rows={4}
                />
                {errors.footer_company_description && (
                  <p className="text-red-500 text-sm mt-1">{errors.footer_company_description.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading || !isDirty}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

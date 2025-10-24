'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { contactAPI } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'نام الزامی است'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'موضوع الزامی است'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'پیام الزامی است'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'پیام باید حداقل 10 کاراکتر باشد'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await contactAPI.sendMessage(formData)
      toast({
        title: "پیام ارسال شد",
        description: "پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.",
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'ایمیل',
      description: 'info@artisanchat.com',
      value: 'mailto:info@artisanchat.com'
    },
    {
      icon: Phone,
      title: 'تلفن',
      description: '+98 21 1234 5678',
      value: 'tel:+982112345678'
    },
    {
      icon: MapPin,
      title: 'آدرس',
      description: 'تهران، ایران',
      value: '#'
    }
  ]

  const features = [
    {
      icon: MessageCircle,
      title: 'پاسخ سریع',
      description: 'ظرف 24 ساعت پاسخ می‌دهیم'
    },
    {
      icon: Clock,
      title: 'پشتیبانی 24/7',
      description: 'همیشه در کنار شما هستیم'
    },
    {
      icon: CheckCircle,
      title: 'تضمین کیفیت',
      description: 'بهترین خدمات را ارائه می‌دهیم'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              تماس با ما
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              سوالی دارید؟ ما اینجا هستیم تا کمک کنیم
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                پیام خود را ارسال کنید
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm">
                    {errors.general}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      نام *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="نام شما"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      ایمیل *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    موضوع *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="موضوع پیام"
                    className={errors.subject ? 'border-red-500' : ''}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    پیام *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="پیام خود را بنویسید..."
                    rows={6}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.message.length}/1000 کاراکتر
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      در حال ارسال...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 ml-2" />
                      ارسال پیام
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                اطلاعات تماس
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{info.title}</p>
                      <a
                        href={info.value}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.description}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                چرا ما را انتخاب کنید؟
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* FAQ */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                سوالات متداول
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">چگونه ثبت‌نام کنم؟</p>
                  <p className="text-muted-foreground">روی دکمه ثبت‌نام کلیک کنید و اطلاعات خود را وارد کنید.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">آیا رایگان است؟</p>
                  <p className="text-muted-foreground">بله، استفاده از ArtisanChat کاملاً رایگان است.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">چگونه گروه بسازم؟</p>
                  <p className="text-muted-foreground">در صفحه گروه‌ها روی "ایجاد گروه" کلیک کنید.</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
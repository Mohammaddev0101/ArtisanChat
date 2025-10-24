'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Star, Zap, Shield, Users, MessageCircle, Image, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function PricingPage() {
  const plans = [
    {
      name: 'رایگان',
      price: '0',
      period: 'همیشه رایگان',
      description: 'برای شروع و تست کردن',
      icon: Users,
      color: 'from-gray-500 to-gray-600',
      features: [
        'تا 5 گروه',
        '100 نمونه‌کار',
        'چت نامحدود',
        'پشتیبانی ایمیل',
        'فضای ذخیره‌سازی 1GB',
        'تم‌های پایه'
      ],
      limitations: [
        'بدون آمار پیشرفته',
        'بدون API',
        'بدون پشتیبانی اولویت‌دار'
      ],
      popular: false
    },
    {
      name: 'حرفه‌ای',
      price: '29',
      period: 'در ماه',
      description: 'برای فریلنسرها و تیم‌های کوچک',
      icon: Zap,
      color: 'from-primary to-purple-600',
      features: [
        'گروه‌های نامحدود',
        'نمونه‌کار نامحدود',
        'ابزارهای پیشرفته',
        'پشتیبانی اولویت‌دار',
        'آمار و گزارش‌گیری',
        'فضای ذخیره‌سازی 50GB',
        'تم‌های حرفه‌ای',
        'API دسترسی',
        'ادغام با ابزارهای دیگر'
      ],
      limitations: [],
      popular: true
    },
    {
      name: 'سازمانی',
      price: '99',
      period: 'در ماه',
      description: 'برای شرکت‌ها و تیم‌های بزرگ',
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
      features: [
        'همه ویژگی‌های حرفه‌ای',
        'مدیریت کاربران',
        'API اختصاصی',
        'پشتیبانی 24/7',
        'امنیت پیشرفته',
        'فضای ذخیره‌سازی نامحدود',
        'تم‌های سفارشی',
        'ادغام‌های پیشرفته',
        'گزارش‌گیری سفارشی',
        'مدیریت دسترسی پیشرفته'
      ],
      limitations: [],
      popular: false
    }
  ]

  const features = [
    {
      icon: MessageCircle,
      title: 'چت نامحدود',
      description: 'پیام‌رسانی بدون محدودیت'
    },
    {
      icon: Image,
      title: 'نمونه‌کار',
      description: 'نمایش و اشتراک‌گذاری کارها'
    },
    {
      icon: Calendar,
      title: 'مدیریت پروژه',
      description: 'سازماندهی و پیگیری تسک‌ها'
    },
    {
      icon: Users,
      title: 'گروه‌ها',
      description: 'همکاری با تیم‌ها'
    }
  ]

  const faqs = [
    {
      question: 'آیا می‌توانم پلن خود را تغییر دهم؟',
      answer: 'بله، شما می‌توانید در هر زمان پلن خود را ارتقا یا کاهش دهید. تغییرات از دوره بعدی اعمال می‌شود.'
    },
    {
      question: 'آیا پول من بازگردانده می‌شود؟',
      answer: 'ما 30 روز ضمانت بازگشت پول داریم. اگر راضی نبودید، تمام پول شما بازگردانده می‌شود.'
    },
    {
      question: 'آیا قیمت‌ها شامل مالیات است؟',
      answer: 'قیمت‌های نمایش داده شده بدون مالیات است. مالیات بر اساس قوانین کشور شما محاسبه می‌شود.'
    },
    {
      question: 'آیا می‌توانم از تخفیف استفاده کنم؟',
      answer: 'بله، ما تخفیف‌های ویژه برای دانشجویان، سازمان‌های غیرانتفاعی و مشتریان طولانی‌مدت داریم.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-foreground mb-6">
              قیمت‌گذاری
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              پلن مناسب خود را انتخاب کنید. همه پلن‌ها شامل ویژگی‌های اصلی هستند
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1">
                    <Star className="w-3 h-3 ml-1" />
                    محبوب
                  </Badge>
                </div>
              )}
              
              <Card className={`p-8 h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-foreground mb-1">
                    {plan.price === '0' ? 'رایگان' : `$${plan.price}`}
                  </div>
                  <p className="text-muted-foreground">{plan.period}</p>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <p className="text-xs text-muted-foreground font-medium">محدودیت‌ها:</p>
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-muted-foreground rounded-full flex-shrink-0"></div>
                        <span className="text-xs text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Button 
                  className={`w-full py-3 font-medium transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-700' 
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {plan.price === '0' ? 'شروع رایگان' : 'شروع کنید'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">مقایسه ویژگی‌ها</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ببینید کدام پلن برای شما مناسب است
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">سوالات متداول</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              پاسخ سوالات رایج شما
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-primary/10 to-purple-600/10">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              هنوز مطمئن نیستید؟
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              با پلن رایگان شروع کنید و بعداً ارتقا دهید. هیچ ریسکی وجود ندارد!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:from-primary/90 hover:to-purple-700 transition-all duration-200">
                شروع رایگان
              </Button>
              <Button variant="outline" className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200">
                تماس با ما
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
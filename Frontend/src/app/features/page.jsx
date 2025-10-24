'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Users, Image, Calendar, Shield, Globe, Zap, Palette, CheckCircle, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function FeaturesPage() {
  const features = [
    {
      icon: MessageCircle,
      title: 'چت امن و رمزنگاری‌شده',
      description: 'پیام‌رسانی امن با رمزنگاری end-to-end، نمایش وضعیت تایپ و لست سین',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['رمزنگاری کامل', 'وضعیت آنلاین', 'پیام‌های خودتخریب‌شونده', 'تایپ زنده']
    },
    {
      icon: Image,
      title: 'گالری نمونه‌کار',
      description: 'نمایش و اشتراک‌گذاری نمونه‌کارها با امکان لایک، کامنت و حاشیه‌نویسی',
      color: 'from-purple-500 to-pink-500',
      benefits: ['آپلود آسان', 'دسته‌بندی هوشمند', 'نظرات و لایک', 'اشتراک‌گذاری']
    },
    {
      icon: Calendar,
      title: 'مدیریت پروژه',
      description: 'ساخت و مدیریت تسک‌ها، تقویم پروژه و اعلان‌های ددلاین',
      color: 'from-green-500 to-emerald-500',
      benefits: ['تسک‌های هوشمند', 'تقویم پروژه', 'اعلان‌های ددلاین', 'گزارش‌گیری']
    },
    {
      icon: Users,
      title: 'گروه‌های حرفه‌ای',
      description: 'ساخت گروه‌های کاری با مدیریت اعضا و ابزارهای همکاری',
      color: 'from-orange-500 to-red-500',
      benefits: ['گروه‌های خصوصی', 'مدیریت اعضا', 'ابزارهای همکاری', 'چت گروهی']
    },
    {
      icon: Shield,
      title: 'امنیت بالا',
      description: 'احراز هویت دو مرحله‌ای، رمزنگاری پیام‌ها و حفاظت از داده‌ها',
      color: 'from-indigo-500 to-purple-500',
      benefits: ['2FA', 'رمزنگاری', 'حفاظت داده', 'کنترل دسترسی']
    },
    {
      icon: Globe,
      title: 'چند زبانه',
      description: 'پشتیبانی کامل از فارسی و انگلیسی با رابط کاربری RTL',
      color: 'from-teal-500 to-cyan-500',
      benefits: ['پشتیبانی RTL', 'ترجمه خودکار', 'فونت‌های فارسی', 'رابط بومی']
    },
    {
      icon: Zap,
      title: 'سرعت بالا',
      description: 'پیام‌رسانی real-time با Socket.io و بهینه‌سازی کامل',
      color: 'from-yellow-500 to-orange-500',
      benefits: ['Real-time', 'بهینه‌سازی', 'سرعت بالا', 'تجربه روان']
    },
    {
      icon: Palette,
      title: 'طراحی زیبا',
      description: 'رابط کاربری الهام‌گرفته از ابزارهای خلاقانه مثل Figma',
      color: 'from-pink-500 to-rose-500',
      benefits: ['طراحی مدرن', 'رنگ‌بندی هوشمند', 'انیمیشن‌های زیبا', 'تجربه بصری']
    }
  ]

  const pricingPlans = [
    {
      name: 'رایگان',
      price: '0',
      period: 'همیشه رایگان',
      description: 'برای شروع و تست کردن',
      features: [
        'تا 5 گروه',
        '100 نمونه‌کار',
        'چت نامحدود',
        'پشتیبانی ایمیل'
      ],
      popular: false
    },
    {
      name: 'حرفه‌ای',
      price: '29',
      period: 'در ماه',
      description: 'برای فریلنسرها و تیم‌های کوچک',
      features: [
        'گروه‌های نامحدود',
        'نمونه‌کار نامحدود',
        'ابزارهای پیشرفته',
        'پشتیبانی اولویت‌دار',
        'آمار و گزارش‌گیری'
      ],
      popular: true
    },
    {
      name: 'سازمانی',
      price: '99',
      period: 'در ماه',
      description: 'برای شرکت‌ها و تیم‌های بزرگ',
      features: [
        'همه ویژگی‌های حرفه‌ای',
        'مدیریت کاربران',
        'API اختصاصی',
        'پشتیبانی 24/7',
        'امنیت پیشرفته'
      ],
      popular: false
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
              ویژگی‌های منحصر به فرد
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              همه چیزی که یک خلاق حرفه‌ای برای همکاری و اشتراک‌گذاری نیاز دارد
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">قیمت‌گذاری</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              پلن مناسب خود را انتخاب کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 ml-1" />
                      محبوب
                    </Badge>
                  </div>
                )}
                <Card className={`p-8 ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
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

                  <button className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-700' 
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}>
                    {plan.price === '0' ? 'شروع رایگان' : 'شروع کنید'}
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-primary/10 to-purple-600/10">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              آماده شروع هستید؟
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              همین الان عضو جامعه خلاق‌های ArtisanChat شوید و تجربه جدیدی از همکاری را آغاز کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:from-primary/90 hover:to-purple-700 transition-all duration-200">
                شروع رایگان
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200">
                تماس با ما
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
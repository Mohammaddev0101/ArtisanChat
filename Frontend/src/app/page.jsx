'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Users, Image, Calendar, Zap, Shield, Globe, Palette, Moon, Sun, ArrowRight, Star, Play, CheckCircle, Menu, LogIn, UserPlus, LogOut, Info, Book } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const features = [
    {
      icon: MessageCircle,
      title: 'چت امن و رمزنگاری‌شده',
      description: 'پیام‌رسانی امن با رمزنگاری end-to-end، نمایش وضعیت تایپ و لست سین',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Image,
      title: 'گالری نمونه‌کار',
      description: 'نمایش و اشتراک‌گذاری نمونه‌کارها با امکان لایک، کامنت و حاشیه‌نویسی',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calendar,
      title: 'مدیریت پروژه',
      description: 'ساخت و مدیریت تسک‌ها، تقویم پروژه و اعلان‌های ددلاین',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'گروه‌های حرفه‌ای',
      description: 'ساخت گروه‌های کاری با مدیریت اعضا و ابزارهای همکاری',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'امنیت بالا',
      description: 'احراز هویت دو مرحله‌ای، رمزنگاری پیام‌ها و حفاظت از داده‌ها',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Globe,
      title: 'چند زبانه',
      description: 'پشتیبانی کامل از فارسی و انگلیسی با رابط کاربری RTL',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'سرعت بالا',
      description: 'پیام‌رسانی real-time با Socket.io و بهینه‌سازی کامل',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Palette,
      title: 'طراحی زیبا',
      description: 'رابط کاربری الهام‌گرفته از ابزارهای خلاقانه مثل Figma',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  const testimonials = [
    {
      name: 'سارا احمدی',
      role: 'طراح گرافیک',
      content: 'ArtisanChat کاملاً کار من رو تغییر داده. حالا می‌تونم راحت با تیمم همکاری کنم و نمونه‌کارهام رو به اشتراک بذارم.',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5
    },
    {
      name: 'علی رضایی',
      role: 'عکاس',
      content: 'بهترین پلتفرم برای عکاس‌ها! گالری نمونه‌کار و سیستم فیدبک عالی هست.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5
    },
    {
      name: 'مریم کریمی',
      role: 'نویسنده',
      content: 'عاشق مدیریت پروژه‌هاش هستم. همه کارهام رو تو یه جا مدیریت می‌کنم.',
      avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5
    }
  ]

  const stats = [
    { number: '10K+', label: 'خلاق فعال' },
    { number: '50K+', label: 'نمونه‌کار' },
    { number: '1M+', label: 'پیام ارسالی' },
    { number: '500+', label: 'پروژه تکمیل شده' }
  ]

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 md:top-5 z-50 w-full md:w-[80%] shadow-xl  md:rounded-full right-0 md:right-[10%] backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 space-x-reverse"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground moraba flex items-center justify-center min-w-max">ارتیسان چت</h1>
                {/* <p className="text-xs text-muted-foreground">جایی که هنر به خلاقیت تبدیل میشه</p> */}
              </div>
            </motion.div>
            {/* Desktop Nav */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-reverse w-full"
            >
              <div className="flex justify-center w-full">
                <Link href="/" className="flex items-center text-sm text-foreground hover:text-primary font-medium px-3 py-2 rounded transition">
                  <MessageCircle className="h-4 w-4 ml-1" />
                  صفحه اصلی
                </Link>
                <Link href="/features" className="flex items-center text-sm text-foreground hover:text-primary font-medium px-3 py-2 rounded transition">
                  <Star className="h-4 w-4 ml-1" />
                  امکانات
                </Link>
                <Link href="/pricing" className="flex items-center text-sm text-foreground hover:text-primary font-medium px-3 py-2 rounded transition">
                  <Zap className="h-4 w-4 ml-1" />
                  تعرفه‌ها
                </Link>
                <Link href="/about" className="flex items-center text-sm text-foreground hover:text-primary font-medium px-3 py-2 rounded transition">
                  <Info className="h-4 w-4 ml-1" />
                  درباره ما
                </Link>
                <Link href="/blog" className="flex items-center text-sm text-foreground hover:text-primary font-medium px-3 py-2 rounded transition">
                  <Book className="h-4 w-4 ml-1" />
                  وبلاگ
                </Link>
                {isAuthenticated ? (
                  <Link href="/chat" className="flex items-center text-sm text-foreground hover:text-primary font-medium px-3 py-2 rounded transition">
                    <Users className="h-4 w-4 ml-1" />
                    چت
                  </Link>
                ) : (<></>)}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full p-1"
                aria-label="تغییر تم"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="rounded-full p-1"
                  aria-label="خروج از حساب"
                >
                  <LogOut className="w-5 h-5" />

                </Button>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost">ورود</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="bg-gradient-to-r from-primary mr-2 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white">
                      ثبت‌نام رایگان
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-2 space-x-reverse">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="تغییر تم"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              {/* Mobile dropdown menu */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div className="absolute left-0 mt-1 w-44 rounded-md bg-background border border-muted p-2 z-40 hidden group-hover:block group-focus-within:block">
                  <Link href="/" className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted/30 rounded mb-1">
                    <MessageCircle className="w-4 h-4 ml-1" />
                    صفحه اصلی
                  </Link>
                  <Link href="/features" className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted/30 rounded mb-1">
                    <Star className="w-4 h-4 ml-1" />
                    امکانات
                  </Link>
                  <Link href="/pricing" className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted/30 rounded mb-1">
                    <Zap className="w-4 h-4 ml-1" />
                    تعرفه‌ها
                  </Link>
                  {isAuthenticated ? (
                    <button
                      onClick={logout}
                      className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted/30 rounded mb-1 w-full text-right"
                    >
                      <LogOut className="w-4 h-4 ml-1" />
                      خروج
                    </button>
                  ) : (
                    <>
                      <Link href="/auth/login" className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted/30 rounded mb-1">
                        <LogIn className="w-4 h-4 ml-1" />
                        ورود
                      </Link>
                      <Link href="/auth/register" className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-primary/10 rounded from-primary/10 to-purple-100/0 mt-2">
                        <UserPlus className="w-4 h-4 ml-1" />
                        ثبت‌نام رایگان
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Star className="w-4 h-4 ml-2" />
            پیام‌رسان حرفه‌ای خلاق‌ها
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ArtisanChat
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            جایی که هنر به خلاقیت و گفت‌وگو تبدیل میشه!
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            پیام‌رسان حرفه‌ای برای طراحان گرافیک، عکاس‌ها، نویسندگان و فریلنسرها
            با امکانات منحصر به فرد برای همکاری و اشتراک‌گذاری نمونه‌کارها
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-x-4 sm:space-x-reverse mb-12"
          >
            <Link href="/auth/register">
              <Button size="lg" className="text-sm md:text-md px-4 md:px-8 py-4 bg-gradient-to-r text-white from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                <ArrowRight className="w-5 h-5 ml-2" />
                شروع رایگان
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-sm md:text-md px-4 md:px-8 py-4 group">
              <Play className="w-4 h-4 ml-2 group-hover:scale-125 transition-transform" />
              مشاهده دمو
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mt-20 divide-solid md:divide-x-2"
            dir="ltr"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

      {/* Scroll Down Button to Features Section */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            const section = document.querySelector('#features-section');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="رفتن به بخش بعد"
          className="p-2 rounded-full bg-background border shadow-lg animate-bounce hover:bg-primary  transition-colors duration-1000 focus:outline-none"
          style={{ marginTop: "1rem" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 mx-auto text-primary hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {/* Give an id to the features section to scroll to */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce { animation: none; }
        }
      `}</style>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20" id='features-section'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-8 moraba">
            ویژگی‌های منحصر به فرد
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            همه چیزی که یک خلاق حرفه‌ای برای همکاری و اشتراک‌گذاری نیاز دارد.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 mt-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 moraba">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-8 moraba">
            تعرفه سرویس‌ها
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            پلن مناسب خود را انتخاب کنید و از امکانات حرفه‌ای بهره‌مند شوید. همه پلن‌ها برای نیازهای مختلف طراحی شده‌اند، از شروع رایگان تا پیشرفته‌ترین قابلیت‌ها برای تیم‌های بزرگ.
          </p>
        </motion.div>
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
                  className={`w-full py-3 font-medium transition-all duration-200 ${plan.popular
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-700'
                      : 'border border-primary text-primary hover:bg-primary text-white'
                    }`}
                >
                  {plan.price === '0' ? 'شروع رایگان' : 'شروع کنید'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-8 moraba">
            ارسال پیشنهادات و انتقادات
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            خوشحال می‌شویم نظرات، پیشنهادات و انتقادات سازنده خود را با ما در میان بگذارید تا بتوانیم تجربه بهتری برای شما بسازیم.
          </p>
        </motion.div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 rounded-xl p-8 transition-colors duration-300">
          {/* About Us Section */}
          <div className="flex-1 flex flex-col justify-center mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-foreground mb-4 moraba">
              درباره ما
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground text-justify">
              ما یک تیم متعهد از توسعه‌دهندگان و طراحان با هدف ساخت بستری امن، پیشرفته و کاربرمحور برای همکاری و ارتباط حرفه‌ای هستیم. تمرکز ما بر ارائه تجربه‌ای بی‌نقص، پشتیبانی از زبان فارسی، احترام به حریم خصوصی و ارتقای امنیت کاربران است. شفافیت، پیشرفت مستمر و گوش دادن به نیازهای شما ارزش‌هایی هستند که به آن‌ها پایبندیم.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6 mt-14">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-lg shadow-md">
                <Star className="w-8 h-8 ml-5 bg-white/20 p-1 rounded-full text-white" />
                <div className="flex-1">
                  <h4 className="text-lg md:font-semibold text-white moraba">امنیت پیشرفته</h4>
                  <p className="text-white text-sm mt-1 hidden md:block">تمام داده‌ها و پیام‌های شما رمزنگاری و محافظت شده‌اند.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg shadow-md">
                <Globe className="w-8 h-8 ml-5 bg-white/20 p-1 rounded-full text-white" />
                <div className="flex-1">
                  <h4 className="text-lg md:font-semibold text-white moraba">دسترسی جهانی</h4>
                  <p className="text-white text-sm mt-1 hidden md:block">امکان استفاده از خدمات در هر نقطه و پشتیبانی از چند زبان.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-600 to-pink-600 rounded-lg shadow-md">
                <Palette className="w-8 h-8 ml-5 bg-white/20 p-1 rounded-full text-white" />
                <div className="flex-1">
                  <h4 className="text-lg md:font-semibold text-white moraba">طراحی حرفه‌ای و کاربرپسند</h4>
                  <p className="text-white text-sm mt-1 hidden md:block">رابط کاربری مدرن و زیبا با پشتیبانی کامل راست‌چین.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-700 to-emerald-700 rounded-lg shadow-md">
                <Zap className="w-8 h-8 ml-5 bg-white/20 p-1 rounded-full text-white" />
                <div className="flex-1">
                  <h4 className="text-lg md:font-semibold text-white moraba">سرعت و پایداری بالا</h4>
                  <p className="text-white text-sm mt-1 hidden md:block">بارگذاری سریع و تجربه کاربری روان حتی در شرایط ضعیف.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Suggestions Form */}
          <div className="flex-1">
            <p className="mb-6 text-right text-base text-muted-foreground moraba">
              لطفاً پیشنهاد یا انتقاد خود را در فرم زیر برای ما ارسال کنید.
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={e => {
                e.preventDefault()
                // Optionally, implement actual submission logic here
                alert('پیشنهاد شما با موفقیت ارسال شد. متشکریم!')
                e.target.reset()
              }}
            >
              <input
                type="text"
                name="name"
                className="rounded-lg px-4 py-2 bg-white/80 dark:bg-gray-900 mt-2 text-right border border-zinc-200 dark:border-zinc-700 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="نام شما ..."
                dir="rtl"
              />
              <input
                type="text"
                name="name"
                className="rounded-lg px-4 py-2 bg-white/80 dark:bg-gray-900 mt-2 text-right border border-zinc-200 dark:border-zinc-700 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="شماره تلفن  ..."
                dir="rtl"
              />
              <input
                type="email"
                name="email"
                className="rounded-lg px-4 py-2 bg-white/80 dark:bg-gray-900 mt-2 text-right border border-zinc-200 dark:border-zinc-700 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="ایمیل ..."
                dir="rtl"
              />
              <textarea
                required
                name="message"
                rows={4}
                className="rounded-lg px-4 py-2 bg-white/80 dark:bg-gray-900 mt-2 text-right border border-zinc-200 dark:border-zinc-700 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="پیشنهادات یا انتقادات خود را بنویسید..."
                dir="rtl"
              />
              <Button type="submit" className="w-full mt-2 moraba text-lg" variant="default" size="lg">
                ارسال
              </Button>
            </form>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-8 moraba">
            نظرات کاربران
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ببینید خلاق‌های دیگر چه می‌گویند
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-card-foreground mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full ml-3"
                />
                <div>
                  <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              آماده شروع هستید؟
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              همین الان عضو جامعه خلاق‌های ArtisanChat شوید و تجربه جدیدی از همکاری را آغاز کنید
            </p>
            <div className="flex items-center justify-center space-x-4 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground">رایگان برای همیشه</span>
            </div>
            <div className="mt-6">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  <ArrowRight className="w-5 h-5 ml-2" />
                  ثبت‌نام رایگان
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">ArtisanChat</span>
              </div>
              <p className="text-muted-foreground text-sm">
                پیام‌رسان حرفه‌ای برای خلاق‌ها
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">محصول</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">ویژگی‌ها</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">قیمت‌گذاری</Link></li>
                <li><Link href="/demo" className="hover:text-foreground transition-colors">دمو</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">پشتیبانی</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground transition-colors">راهنما</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">تماس با ما</Link></li>
                <li><Link href="/faq" className="hover:text-foreground transition-colors">سوالات متداول</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">شرکت</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">درباره ما</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">بلاگ</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">فرصت‌های شغلی</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ArtisanChat. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Users, Heart, Star, Award, Target, Eye, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
  const team = [
    {
      name: 'علی احمدی',
      role: 'مدیر فنی',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'متخصص در توسعه وب و موبایل'
    },
    {
      name: 'سارا کریمی',
      role: 'طراح UI/UX',
      avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'متخصص در طراحی رابط کاربری'
    },
    {
      name: 'محمد رضایی',
      role: 'توسعه‌دهنده بک‌اند',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'متخصص در Node.js و MongoDB'
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'علاقه',
      description: 'ما عاشق کارمان هستیم و این عشق را در هر خط کد و هر طراحی نشان می‌دهیم'
    },
    {
      icon: Target,
      title: 'هدف‌مندی',
      description: 'همیشه هدف‌های مشخصی داریم و برای رسیدن به آن‌ها تلاش می‌کنیم'
    },
    {
      icon: Users,
      title: 'همکاری',
      description: 'معتقدیم که بهترین نتایج از همکاری تیمی حاصل می‌شود'
    },
    {
      icon: Zap,
      title: 'نوآوری',
      description: 'همیشه به دنبال راه‌های جدید و بهتر برای حل مسائل هستیم'
    }
  ]

  const stats = [
    { number: '10K+', label: 'کاربر فعال' },
    { number: '50K+', label: 'نمونه‌کار' },
    { number: '1M+', label: 'پیام ارسالی' },
    { number: '500+', label: 'پروژه تکمیل شده' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              درباره ArtisanChat
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              ما یک تیم متخصص هستیم که با عشق و علاقه، پلتفرمی برای خلاق‌ها ساخته‌ایم. 
              هدف ما ایجاد فضایی است که هنرمندان، طراحان، عکاس‌ها و فریلنسرها بتوانند 
              راحت با هم ارتباط برقرار کنند و پروژه‌های خود را به اشتراک بگذارند.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <Card className="p-8">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">چشم‌انداز ما</h3>
            <p className="text-muted-foreground leading-relaxed">
              ما می‌خواهیم بزرگ‌ترین پلتفرم ارتباطی برای خلاق‌ها در خاورمیانه باشیم. 
              جایی که هر هنرمند بتواند کارش را به نمایش بگذارد، با همکارانش ارتباط برقرار کند 
              و پروژه‌های جدیدی را شروع کند.
            </p>
          </Card>

          <Card className="p-8">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">ماموریت ما</h3>
            <p className="text-muted-foreground leading-relaxed">
              ماموریت ما این است که با ارائه ابزارهای حرفه‌ای و محیطی امن، 
              به خلاق‌ها کمک کنیم تا بهتر کار کنند، بیشتر یاد بگیرند و 
              در نهایت موفق‌تر باشند.
            </p>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">ارزش‌های ما</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              این ارزش‌ها راهنمای ما در هر تصمیم‌گیری و هر پروژه‌ای هستند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">تیم ما</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              افرادی که این پلتفرم را با عشق و علاقه ساخته‌اند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
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
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              به ما بپیوندید
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              اگر شما هم عاشق خلاقیت هستید و می‌خواهید در ساخت آینده‌ای بهتر مشارکت کنید، 
              به تیم ما بپیوندید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:from-primary/90 hover:to-purple-700 transition-all duration-200">
                مشاهده فرصت‌های شغلی
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
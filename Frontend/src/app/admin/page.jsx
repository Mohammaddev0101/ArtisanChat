'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageCircle, Image, Calendar, TrendingUp, Activity, Shield, Settings } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGroups: 0,
    totalPortfolios: 0,
    totalTasks: 0,
    activeUsers: 0,
    newUsersToday: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    // Mock data for now
    setStats({
      totalUsers: 1250,
      totalGroups: 45,
      totalPortfolios: 320,
      totalTasks: 180,
      activeUsers: 89,
      newUsersToday: 12
    })
  }

  const formatNumber = (num) => {
    return num.toLocaleString('fa-IR')
  }

  const statCards = [
    {
      title: 'کل کاربران',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      title: 'گروه‌های فعال',
      value: stats.totalGroups,
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      change: '+8%'
    },
    {
      title: 'نمونه‌کارها',
      value: stats.totalPortfolios,
      icon: Image,
      color: 'from-purple-500 to-pink-500',
      change: '+15%'
    },
    {
      title: 'تسک‌ها',
      value: stats.totalTasks,
      icon: Calendar,
      color: 'from-orange-500 to-red-500',
      change: '+5%'
    },
    {
      title: 'کاربران آنلاین',
      value: stats.activeUsers,
      icon: Activity,
      color: 'from-teal-500 to-cyan-500',
      change: '+3%'
    },
    {
      title: 'کاربران جدید امروز',
      value: stats.newUsersToday,
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-500',
      change: '+20%'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'کاربر جدید ثبت‌نام کرد',
      time: '2 دقیقه پیش',
      user: 'علی احمدی'
    },
    {
      id: 2,
      type: 'group',
      message: 'گروه جدید ایجاد شد',
      time: '15 دقیقه پیش',
      user: 'سارا کریمی'
    },
    {
      id: 3,
      type: 'portfolio',
      message: 'نمونه‌کار جدید آپلود شد',
      time: '1 ساعت پیش',
      user: 'محمد رضایی'
    },
    {
      id: 4,
      type: 'task',
      message: 'تسک جدید ایجاد شد',
      time: '2 ساعت پیش',
      user: 'فاطمه موسوی'
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
              پنل مدیریت
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              مدیریت و نظارت بر سیستم ArtisanChat
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{formatNumber(stat.value)}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">فعالیت‌های اخیر</h3>
                <Button variant="outline" size="sm">
                  مشاهده همه
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">عملیات سریع</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">مدیریت کاربران</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">مدیریت گروه‌ها</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Image className="w-5 h-5" />
                  <span className="text-sm">مدیریت نمونه‌کارها</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm">تنظیمات سیستم</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">وضعیت سیستم</h3>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Shield className="w-3 h-3 ml-1" />
                همه چیز عادی است
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <p className="text-sm font-medium text-foreground">سرور</p>
                <p className="text-xs text-muted-foreground">آنلاین</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <p className="text-sm font-medium text-foreground">دیتابیس</p>
                <p className="text-xs text-muted-foreground">آنلاین</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <p className="text-sm font-medium text-foreground">Socket.IO</p>
                <p className="text-xs text-muted-foreground">آنلاین</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
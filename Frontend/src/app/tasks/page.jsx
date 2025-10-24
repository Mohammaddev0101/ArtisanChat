'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, AlertCircle, Plus, Filter, Calendar, User, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { tasksAPI, groupsAPI } from '@/lib/api'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'

export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [groups, setGroups] = useState([])
  const [statistics, setStatistics] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedGroup, setSelectedGroup] = useState('all')

  useEffect(() => {
    loadTasks()
    loadGroups()
    loadStatistics()
  }, [filter, selectedGroup])

  const loadTasks = async () => {
    try {
      setIsLoading(true)
      const params = {
        status: filter !== 'all' ? filter : undefined,
        group: selectedGroup !== 'all' ? selectedGroup : undefined
      }

      const response = await tasksAPI.getMyTasks(params)
      setTasks(response.data.tasks || [])
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری تسک‌ها",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadGroups = async () => {
    try {
      const response = await groupsAPI.getGroups()
      setGroups(response.data.groups || [])
    } catch (error) {
      console.error('Error loading groups:', error)
    }
  }

  const loadStatistics = async () => {
    try {
      const response = await tasksAPI.getStatistics()
      setStatistics(response.data.statistics || {})
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await tasksAPI.updateStatus(taskId, newStatus)
      setTasks(prev => prev.map(task =>
        task._id === taskId
          ? { ...task, status: newStatus }
          : task
      ))
      toast({
        title: "وضعیت به‌روزرسانی شد",
        description: "وضعیت تسک با موفقیت تغییر کرد",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در به‌روزرسانی وضعیت",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fa-IR')
  }

  const isOverdue = (dueDate, status) => {
    if (status === 'completed') return false
    return new Date(dueDate) < new Date()
  }

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
              مدیریت تسک‌ها
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              تمام تسک‌های خود را در یک مکان مدیریت کنید
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">کل تسک‌ها</p>
                <p className="text-2xl font-bold text-foreground">{statistics.totalTasks || 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تسک‌های من</p>
                <p className="text-2xl font-bold text-foreground">{statistics.myTasks || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تکمیل شده</p>
                <p className="text-2xl font-bold text-foreground">{statistics.completedTasks || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تأخیر</p>
                <p className="text-2xl font-bold text-foreground">{statistics.overdueTasks || 0}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-background"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="pending">در انتظار</option>
                <option value="in-progress">در حال انجام</option>
                <option value="review">بررسی</option>
                <option value="completed">تکمیل شده</option>
                <option value="cancelled">لغو شده</option>
              </select>
            </div>

            {/* Group Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-background"
              >
                <option value="all">همه گروه‌ها</option>
                {groups.map(group => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Task Button */}
            <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700">
              <Plus className="w-4 h-4 ml-2" />
              تسک جدید
            </Button>
          </div>
        </motion.div>

        {/* Tasks List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {tasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(task.status)}
                        <h3 className="text-lg font-semibold text-foreground">
                          {task.title}
                        </h3>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status === 'pending' ? 'در انتظار' :
                           task.status === 'in-progress' ? 'در حال انجام' :
                           task.status === 'review' ? 'بررسی' :
                           task.status === 'completed' ? 'تکمیل شده' :
                           task.status === 'cancelled' ? 'لغو شده' : task.status}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === 'urgent' ? 'فوری' :
                           task.priority === 'high' ? 'بالا' :
                           task.priority === 'medium' ? 'متوسط' :
                           task.priority === 'low' ? 'پایین' : task.priority}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {task.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {task.dueDate ? formatDate(task.dueDate) : 'بدون تاریخ'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{task.group?.name || 'بدون گروه'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{task.comments?.length || 0} نظر</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {task.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {task.status !== 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(task._id, 'completed')}
                        >
                          <CheckCircle className="w-4 h-4 ml-1" />
                          تکمیل
                        </Button>
                      )}
                      {task.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(task._id, 'in-progress')}
                        >
                          شروع
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              تسکی یافت نشد
            </h3>
            <p className="text-muted-foreground">
              با تغییر فیلترها دوباره تلاش کنید
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus, Search, Filter, Calendar, MessageCircle, Settings, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { groupsAPI } from '@/lib/api'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function GroupsPage() {
  const [groups, setGroups] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    loadGroups()
  }, [searchQuery, selectedCategory])

  const loadGroups = async () => {
    try {
      setIsLoading(true)
      const params = {
        search: searchQuery,
        category: selectedCategory !== 'all' ? selectedCategory : undefined
      }

      const response = await groupsAPI.getGroups(params)
      setGroups(response.data.groups || [])
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری گروه‌ها",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinGroup = async (groupId) => {
    try {
      // API call to join group
      toast({
        title: "عضویت موفق",
        description: "با موفقیت به گروه پیوستید",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در پیوستن به گروه",
        variant: "destructive",
      })
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fa-IR')
  }

  const categories = [
    { value: 'all', label: 'همه دسته‌ها' },
    { value: 'design', label: 'طراحی' },
    { value: 'photography', label: 'عکاسی' },
    { value: 'writing', label: 'نویسندگی' },
    { value: 'development', label: 'برنامه‌نویسی' },
    { value: 'marketing', label: 'بازاریابی' },
    { value: 'other', label: 'سایر' }
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
              گروه‌های حرفه‌ای
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              به گروه‌های خلاق‌ها بپیوندید و با هم همکاری کنید
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="جستجو در گروه‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-background"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Create Group Button */}
            <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700">
              <Plus className="w-4 h-4 ml-2" />
              ایجاد گروه
            </Button>
          </div>
        </motion.div>

        {/* Groups Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {groups.map((group, index) => (
              <motion.div
                key={group._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  {/* Group Header */}
                  <div className="relative p-6 bg-gradient-to-r from-primary/10 to-purple-600/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {group.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {group.admin?.fullName}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {group.category === 'design' ? 'طراحی' :
                         group.category === 'photography' ? 'عکاسی' :
                         group.category === 'writing' ? 'نویسندگی' :
                         group.category === 'development' ? 'برنامه‌نویسی' :
                         group.category === 'marketing' ? 'بازاریابی' :
                         'سایر'}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {group.description}
                    </p>
                  </div>

                  {/* Group Info */}
                  <div className="p-6">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{group.memberCount || 0} عضو</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(group.createdAt)}</span>
                      </div>
                    </div>

                    {/* Members Preview */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        {group.members?.slice(0, 3).map((member, memberIndex) => (
                          <img
                            key={memberIndex}
                            src={member.user?.profilePicture || `https://ui-avatars.com/api/?name=${member.user?.fullName}&background=3b82f6&color=ffffff`}
                            alt={member.user?.fullName}
                            className="w-8 h-8 rounded-full border-2 border-background"
                          />
                        ))}
                        {group.members?.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                            +{group.members.length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {group.members?.length || 0} عضو
                      </span>
                    </div>

                    {/* Tags */}
                    {group.tags && group.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {group.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {group.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{group.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                        onClick={() => handleJoinGroup(group._id)}
                      >
                        <UserPlus className="w-4 h-4 ml-1" />
                        پیوستن
                      </Button>
                      <Link href={`/groups/${group._id}`}>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && groups.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              گروهی یافت نشد
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

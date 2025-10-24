'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Heart, Eye, MessageCircle, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { portfoliosAPI } from '@/lib/api'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadPortfolios()
    loadCategories()
  }, [])

  useEffect(() => {
    loadPortfolios()
  }, [searchQuery, selectedCategory, sortBy])

  const loadPortfolios = async () => {
    try {
      setIsLoading(true)
      const params = {
        page,
        limit: 12,
        search: searchQuery,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        sort: sortBy
      }

      const response = await portfoliosAPI.getAllPortfolios(params)
      setPortfolios(response.data.portfolios || [])
      setHasMore(response.data.pagination?.hasMore || false)
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری نمونه‌کارها",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await portfoliosAPI.getCategories()
      setCategories(response.data.categories || [])
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleLike = async (portfolioId) => {
    try {
      await portfoliosAPI.likePortfolio(portfolioId)
      setPortfolios(prev => prev.map(portfolio =>
        portfolio._id === portfolioId
          ? { ...portfolio, liked: !portfolio.liked, likeCount: portfolio.liked ? portfolio.likeCount - 1 : portfolio.likeCount + 1 }
          : portfolio
      ))
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در لایک کردن",
        variant: "destructive",
      })
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fa-IR')
  }

  const formatNumber = (num) => {
    return num.toLocaleString('fa-IR')
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
              گالری نمونه‌کارها
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              کشف و الهام‌گیری از بهترین نمونه‌کارهای خلاق‌ها
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
                placeholder="جستجو در نمونه‌کارها..."
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
                <option value="all">همه دسته‌ها</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-background"
              >
                <option value="newest">جدیدترین</option>
                <option value="popular">محبوب‌ترین</option>
                <option value="trending">ترند</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Portfolios Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }
          >
            {portfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  {/* Portfolio Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={portfolio.thumbnailUrl || portfolio.fileUrl}
                      alt={portfolio.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleLike(portfolio._id)}
                          className="backdrop-blur-sm"
                        >
                          <Heart className={`w-4 h-4 ${portfolio.liked ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Link href={`/portfolios/${portfolio._id}`}>
                          <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="backdrop-blur-sm">
                        {categories.find(c => c.value === portfolio.category)?.label || portfolio.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Portfolio Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {portfolio.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {portfolio.description}
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={portfolio.user?.profilePicture || `https://ui-avatars.com/api/?name=${portfolio.user?.fullName}&background=3b82f6&color=ffffff`}
                        alt={portfolio.user?.fullName}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">
                        {portfolio.user?.fullName}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{formatNumber(portfolio.analytics?.totalLikes || 0)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{formatNumber(portfolio.analytics?.totalViews || 0)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{formatNumber(portfolio.analytics?.totalComments || 0)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(portfolio.createdAt)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {portfolio.tags && portfolio.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {portfolio.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {portfolio.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{portfolio.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setPage(prev => prev + 1)}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? 'در حال بارگذاری...' : 'بارگذاری بیشتر'}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && portfolios.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              نمونه‌کاری یافت نشد
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

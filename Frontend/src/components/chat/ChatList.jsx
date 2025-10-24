'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  Plus,
  MoreVertical,
  MessageCircle,
  Users,
  Hash,
  Archive,
  Bot,
  Pin,
  PinOff,
  Trash2,
  Settings2,
  Settings,
  Moon,
  Sun,
  LogOut,
  Menu
} from 'lucide-react'
import { usersAPI, groupsAPI, chatsAPI } from '@/lib/api'
import { toast } from '@/hooks/use-toast'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'

const sidebarItems = [
  { icon: MessageCircle, label: 'همه چت‌ها', key: 'all', active: true },
  { icon: Users, label: 'شخصی', key: 'personal', count: 1 },
  { icon: Hash, label: 'دانشگاه', key: 'university', count: 4 },
  { icon: Archive, label: 'ترکی', key: 'turkish', count: 4 },
  { icon: Settings2, label: 'مدرسه', key: 'school', count: 1 },
  { icon: Bot, label: 'وب‌سایت', key: 'website', count: 3 },
  { icon: Settings2, label: 'برنامه‌نویسی', key: 'programming', count: 2 },
  { icon: Archive, label: 'ورزش', key: 'sports', count: 1 },
  { icon: Bot, label: 'ربات', key: 'bot' }
]

export default function ChatList({
  chats = [], // provide default to prevent .map on undefined
  activeChat,
  onChatSelect = () => { },
  onChatPin = () => { },
  onChatDelete = () => { },
  onChatsUpdate = () => { },
  selectedCategory = 'all',
  onCategoryChange = () => { },
  userSettings = { notifications: true, sounds: true },
  onSettingsChange = () => { },
  mobileView = false
}) {
  const { theme = 'light', toggleTheme = () => { } } = useTheme() || {}
  const { logout = () => { } } = useAuth() || {}
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
    type: 'group',
    members: []
  })

  // useCallback for searchUsers to solve strict React warning in useEffect deps
  const searchUsers = useCallback(async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      const response = await usersAPI.search({ query: searchQuery })
      if (response && response.data && Array.isArray(response.data.users)) {
        setSearchResults(response.data.users)
      } else {
        setSearchResults([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
    // eslint-disable-next-line
  }, [searchQuery])

  useEffect(() => {
    if (searchQuery) {
      searchUsers()
    } else {
      setSearchResults([])
    }
  }, [searchQuery, searchUsers])

  const handleSettingsSave = async (newSettings) => {
    try {
      const updatedSettings = { ...userSettings, ...newSettings }
      if (onSettingsChange) onSettingsChange(updatedSettings)
      localStorage.setItem('userSettings', JSON.stringify(updatedSettings))

      toast?.({
        title: "تنظیمات ذخیره شد",
        description: "تنظیمات با موفقیت به‌روزرسانی شد",
      })
    } catch (error) {
      toast?.({
        title: "خطا",
        description: "خطا در ذخیره تنظیمات",
        variant: "destructive",
      })
    }
  }


  const handleCreateGroup = async () => {
    try {
      if (!newGroupData.name.trim()) {
        toast?.({
          title: "خطا",
          description: "نام گروه الزامی است",
          variant: "destructive",
        })
        return
      }

      const response = await groupsAPI.create(newGroupData)

      toast?.({
        title: "گروه ایجاد شد",
        description: "گروه با موفقیت ایجاد شد",
      })

      setShowCreateGroup(false)
      setNewGroupData({ name: '', description: '', type: 'group', members: [] })
      if (onChatsUpdate) onChatsUpdate() // Refresh chats list
    } catch (error) {
      toast?.({
        title: "خطا",
        description: "خطا در ایجاد گروه",
        variant: "destructive",
      })
    }
  }

  const startPrivateChat = async (userId) => {
    try {
      const response = await chatsAPI.createChat({
        type: 'private',
        participants: [userId]
      })

      const newChat = response?.data?.chat
      if (onChatsUpdate) onChatsUpdate() // Refresh chats list
      if (onChatSelect) onChatSelect(newChat)
      setSearchQuery('')
      setSearchResults([])

      toast?.({
        title: "چت جدید",
        description: "چت خصوصی ایجاد شد",
      })
    } catch (error) {
      toast?.({
        title: "خطا",
        description: "خطا در ایجاد چت",
        variant: "destructive",
      })
    }
  }

  const getChannelIcon = (type) => {
    switch (type) {
      case 'channel':
        return <Hash className="w-4 h-4 text-blue-300" />
      case 'group':
        return <Users className="w-4 h-4 text-green-300" />
      case 'bot':
        return <Bot className="w-4 h-4 text-purple-300" />
      case 'saved':
        return <Archive className="w-4 h-4 text-blue-300" />
      default:
        return <MessageCircle className="w-4 h-4 text-blue-100" />
    }
  }

  // Safe render
  return (
    <div className="w-full bg-card flex flex-col rtl" dir="rtl">
      {/* Header */}
      <div className="p-4 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">


            <a href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-lg moraba text-card-foreground">ارتیسان چت</span>
            </a>
          </div>

          <div className="flex items-center gap-2">


            {/* Settings Dialog */}
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-right">تنظیمات</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">اعلان‌ها</Label>
                    <Switch
                      id="notifications"
                      checked={!!userSettings.notifications}
                      onCheckedChange={checked => handleSettingsSave({ notifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sounds">صداها</Label>
                    <Switch
                      id="sounds"
                      checked={!!userSettings.sounds}
                      onCheckedChange={checked => handleSettingsSave({ sounds: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme">حالت تیره</Label>
                    <Switch
                      id="theme"
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={logout}
                      type="button"
                    >
                      <LogOut className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                      خروج از حساب
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Create Group/Channel */}
            <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-right">ایجاد گروه جدید</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="groupName">نام گروه</Label>
                    <Input
                      id="groupName"
                      value={newGroupData.name}
                      onChange={(e) => setNewGroupData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="نام گروه را وارد کنید"
                    />
                  </div>

                  <div>
                    <Label htmlFor="groupDesc">توضیحات</Label>
                    <Textarea
                      id="groupDesc"
                      value={newGroupData.description}
                      onChange={(e) => setNewGroupData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="توضیحات گروه (اختیاری)"
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-2 space-x-reverse">
                    <Button variant="outline" onClick={() => setShowCreateGroup(false)} className="flex-1">
                      لغو
                    </Button>
                    <Button onClick={handleCreateGroup} className="flex-1">
                      ایجاد گروه
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="جست‌وجو..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-background/50"
          />

          {/* Search Results */}
          {Array.isArray(searchResults) && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              {searchResults.map((searchUser) => {
                if (!searchUser || !searchUser._id) return null
                return (
                  <div
                    key={searchUser._id}
                    onClick={() => startPrivateChat(searchUser._id)}
                    className="flex items-center p-3 hover:bg-accent cursor-pointer"
                  >
                    <Avatar className="w-8 h-8 ml-3">
                      <AvatarImage src={searchUser.profilePicture || undefined} />
                      <AvatarFallback>{searchUser.fullName?.charAt(0) || ""}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{searchUser.fullName}</p>
                      <p className="text-xs text-muted-foreground">@{searchUser.username}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Desktop Sidebar Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pt-3" style={{ maxWidth: "100%", whiteSpace: "nowrap" }}>
          {Array.isArray(sidebarItems) &&
            sidebarItems.map((item, index) => (
              <div key={item.key ?? index} className="relative group inline-block align-top my-2">
                <Button
                  variant={selectedCategory === item.key ? "default" : "ghost"}
                  onClick={() => onCategoryChange(item.key)}
                  className={`
                    flex items-center gap-2 w-auto h-8 px-2 rounded-lg transition-colors border
                    ${selectedCategory === item.key ? 'bg-primary text-white border-primary' : 'border-border'}
                    ${typeof item.count !== 'undefined' && item.count !== null ? 'pr-4' : ''}
                  `}
                >
                  {item.icon && React.createElement(item.icon, { className: "w-4 h-4" })}
                  <span className="text-xs whitespace-nowrap">{item.label}</span>
                  {typeof item.count !== 'undefined' && item.count !== null && (
                    <Badge
                      className="ml-2 rtl:mr-2 h-5 w-5 p-0 pt-1 flex items-center justify-center text-xs text-white"
                    >
                      {item.count}
                    </Badge>
                  )}
                </Button>
              </div>
            ))}
        </div>
        <style jsx global>{`
          .scrollbar-hide {
            scrollbar-width: thin;
            scrollbar-color: #bdbdbd #f4f4f4;
          }
          .scrollbar-hide::-webkit-scrollbar {
            width: 4px;
            height: 4px;
            background: #f4f4f4;
            border-radius: 8px;
          }
          .scrollbar-hide::-webkit-scrollbar-thumb {
            background: #bdbdbd;
            border-radius: 8px;
          }
          .scrollbar-hide::-webkit-scrollbar-track {
            background: #f4f4f4;
            border-radius: 8px;
          }

          :root.dark .scrollbar-hide,
          .dark .scrollbar-hide {
            scrollbar-color: #555 #23272f;
          }
          :root.dark .scrollbar-hide::-webkit-scrollbar,
          .dark .scrollbar-hide::-webkit-scrollbar {
            background: #23272f;
          }
          :root.dark .scrollbar-hide::-webkit-scrollbar-thumb,
          .dark .scrollbar-hide::-webkit-scrollbar-thumb {
            background: #555;
          }
          :root.dark .scrollbar-hide::-webkit-scrollbar-track,
          .dark .scrollbar-hide::-webkit-scrollbar-track {
            background: #23272f;
          }
        `}</style>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2 ">
          {Array.isArray(chats) && chats.length > 0 ? (
            chats.map((chat) => {
              if (!chat || !chat._id) return null
              return (
                <div
                dir='rtl'
                  key={chat._id}
                  onClick={() => onChatSelect(chat)}
                  className={`flex items-center p-3 mb-1 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/50 group ${activeChat && activeChat._id === chat._id ? 'bg-accent' : ''
                    }`}
                >
                  <div className="relative ml-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
                        {getChannelIcon(chat.type)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.type === 'channel' && (
                      <div className="absolute -bottom-1 -left-1 bg-blue-500 rounded-full p-1">
                        <Hash className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {chat.isOnline && chat.type === 'private' && (
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <h3 className="font-medium text-card-foreground truncate text-sm">
                          {chat.name}
                        </h3>
                        {chat.isPinned && <Pin className="w-3 h-3 text-primary" />}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {chat.updatedAt
                          ? new Date(chat.updatedAt).toLocaleTimeString('fa-IR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {chat.lastMessage?.content || 'هنوز پیامی ارسال نشده'}
                      </p>
                      {typeof chat.unreadCount === 'number' && chat.unreadCount > 0 && (
                        <Badge variant="secondary" className="bg-muted text-muted-foreground">
                          {chat.unreadCount > 999 ? '999+' : chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Chat Options */}
                  <DropdownMenu dir='rtl'>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onChatPin(chat._id)} className="text-xs">
                        {chat.isPinned ? (
                          <>
                            <PinOff className="w-4 h-4 ml-2" />
                            حذف پین
                          </>
                        ) : (
                          <>
                            <Pin className="w-4 h-4 ml-2" />
                            پین کردن
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">
                        <Archive className="w-4 h-4 ml-2" />
                        آرشیو
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive text-xs"
                        onClick={() => onChatDelete(chat._id)}
                      >
                        <Trash2 className="w-4 h-4 ml-2" />
                        حذف چت
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-8 opacity-80">
              <MessageCircle className="w-10 h-10 mb-2 text-primary animate-bounce" />
              <div className="text-lg font-bold text-primary mb-1">هنوز چتی پیدا نشد</div>
              <div className="text-xs text-muted-foreground">برای شروع یک چت جدید، جستجو کنید یا یکی بسازید!</div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

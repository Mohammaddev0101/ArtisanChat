'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { 
  Phone, 
  Video, 
  MoreVertical,
  MessageCircle,
  Users,
  Hash,
  Archive,
  Bot,
  Search,
  Pin,
  PinOff,
  Trash2,
  UserPlus,
  Settings
} from 'lucide-react'

export default function ChatHeader({ 
  activeChat, 
  typingUsers, 
  messagesCount,
  onChatPin,
  onChatDelete,
  onAddMember,
  onGroupSettings,
  setMobileView
}) {
  const [showGroupInfo, setShowGroupInfo] = useState(false)

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

  const getChatTypeLabel = (type) => {
    switch (type) {
      case 'channel':
        return 'کانال'
      case 'group':
        return 'گروه'
      case 'bot':
        return 'ربات'
      default:
        return 'چت خصوصی'
    }
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm border-b p-4" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Avatar className="w-10 h-10">
            <AvatarImage src={activeChat.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
              {getChannelIcon(activeChat.type)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Dialog open={showGroupInfo} onOpenChange={setShowGroupInfo}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto text-right">
                  <div>
                    <h2 className="font-medium text-card-foreground text-right">
                      {activeChat.name}
                    </h2>
                    <p className="text-sm text-muted-foreground text-right">
                      {typingUsers.length > 0 
                        ? 'در حال تایپ...'
                        : activeChat.type === 'group' || activeChat.type === 'channel'
                          ? `${activeChat.participants?.length || 0} عضو`
                          : activeChat.isOnline ? 'آنلاین' : 'آفلاین'
                      }
                    </p>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-right">{activeChat.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={activeChat.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground text-xl">
                        {getChannelIcon(activeChat.type)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{activeChat.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {getChatTypeLabel(activeChat.type)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-card-foreground">{activeChat.participants?.length || 0}</div>
                      <div className="text-xs text-muted-foreground">عضو</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-card-foreground">{messagesCount}</div>
                      <div className="text-xs text-muted-foreground">پیام</div>
                    </div>
                  </div>

                  {activeChat.type === 'group' && (
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          onAddMember()
                          setShowGroupInfo(false)
                        }}
                      >
                        <UserPlus className="w-4 h-4 ml-2" />
                        افزودن عضو
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          onGroupSettings()
                          setShowGroupInfo(false)
                        }}
                      >
                        <Settings className="w-4 h-4 ml-2" />
                        تنظیمات گروه
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Phone className="w-5 h-5" />
          </Button>
          
          
          <DropdownMenu dir='rtl'>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-xs">
                <Search className="w-5 h-5 ml-2" />
                جست‌وجو در چت
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs" onClick={() => onChatPin(activeChat._id)}>
                {activeChat.isPinned ? (
                  <>
                    <PinOff className="w-5 h-5 ml-2" />
                    حذف پین
                  </>
                ) : (
                  <>
                    <Pin className="w-5 h-5 ml-2" />
                    پین کردن
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive text-xs"
                onClick={() => onChatDelete(activeChat._id)}
              >
                <Trash2 className="w-4 h-4 ml-2" />
                حذف چت
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="md:hidden flex items-center bg-background hover:bg-muted p-2 rounded-md"
            onClick={() => setMobileView('chats')}
            aria-label="برگشت به لیست چت‌ها"
          >
            {/* use an icon for back, e.g., left arrow */}
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">بازگشت</span>
          </button>
        </div>
      </div>
    </div>
  )
}

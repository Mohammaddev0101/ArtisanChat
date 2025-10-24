'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { chatsAPI } from '@/lib/api'
import { socketManager } from '@/lib/socket'
import { toast } from '@/hooks/use-toast'
import { useTheme } from '@/contexts/ThemeContext'

// Import new components
// import ResponsiveSidebar from '@/components/chat/ResponsiveSidebar'
import ChatList from '@/components/chat/ChatList'
import ChatHeader from '@/components/chat/ChatHeader'
import MessagesArea from '@/components/chat/MessagesArea'
import MessageInput from '@/components/chat/MessageInput'
import GroupCreationDialog from '@/components/chat/GroupCreationDialog'
import SettingsDialog from '@/components/chat/SettingsDialog'
import { MessageCircle } from 'lucide-react'

export default function ChatPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { theme } = useTheme()
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [typingUsers, setTypingUsers] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [userSettings, setUserSettings] = useState({
    notifications: true,
    sounds: true,
    theme: 'light',
    language: 'fa',
    timezone: 'Asia/Tehran',
    fontSize: 'medium',
    themeColor: 'blue',
    desktopNotifications: false,
    showOnlineStatus: true,
    readReceipts: true,
    typingIndicator: true
  })
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const typingTimeoutRef = useRef(null)
  // state for mobile UI: show chatList or chat area
  const [mobileView, setMobileView] = useState('chats'); // 'chats' or 'messages'
  // state for message editing
  const [editingMessage, setEditingMessage] = useState(null)

  useEffect(() => {
    if (user) {
      loadChats()
      setupSocketListeners()
      loadUserSettings()
    }
  }, [user])

  const handleMobileChatSelect = (chat) => {
    handleChatSelect(chat);
    setMobileView('messages');
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && !activeChat) {
      setMobileView('chats');
    }
  }, [activeChat]);

  const loadChats = async () => {
    try {
      const response = await chatsAPI.getChats()
      setChats(response.data.chats || [])
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری چت‌ها",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserSettings = async () => {
    try {
      const settings = localStorage.getItem('userSettings')
      if (settings) {
        setUserSettings(JSON.parse(settings))
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const setupSocketListeners = () => {
    if (!user) return

    socketManager.connect(localStorage.getItem('token'))

    socketManager.on('new_message', (data) => {
      if (data.chatId === activeChat?._id) {
        setMessages(prev => [...prev, data.message])
      }

      setChats(prev => prev.map(chat =>
        chat._id === data.chatId
          ? { ...chat, lastMessage: data.message, updatedAt: new Date() }
          : chat
      ))

      if (userSettings.notifications) {
        toast({
          title: "پیام جدید",
          description: `${data.message.sender.fullName}: ${data.message.content}`,
        })
      }
    })

    socketManager.on('user_typing', (data) => {
      if (data.chatId === activeChat?._id) {
        setTypingUsers(prev => [...prev.filter(u => u.userId !== data.userId), data])
      }
    })

    socketManager.on('user_stop_typing', (data) => {
      setTypingUsers(prev => prev.filter(u => u.userId !== data.userId))
    })

    socketManager.on('message_seen', (data) => {
      if (data.chatId === activeChat?._id) {
        setMessages(prev => prev.map(msg =>
          msg._id === data.messageId
            ? { ...msg, seenBy: [...(msg.seenBy || []), data.seenBy] }
            : msg
        ))
      }
    })
  }

  const handleChatSelect = async (chat) => {
    setActiveChat(chat)
    setMessages([])

    try {
      const response = await chatsAPI.getMessages(chat._id)
      setMessages(response.data.messages || [])
      socketManager.joinChat(chat._id)
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری پیام‌ها",
        variant: "destructive",
      })
    }
  }

  const handleSendMessage = async (e, fileUrls = []) => {
    e.preventDefault()
    const messageContent = typeof e === 'string' ? e : newMessage.trim()
    if (!messageContent && fileUrls.length === 0 || !activeChat || isSending) return

    setIsSending(true)
    try {
      const tempMessage = {
        _id: Date.now(),
        content: messageContent,
        sender: user,
        createdAt: new Date(),
        type: fileUrls.length > 0 ? 'file' : 'text',
        attachments: fileUrls,
        seenBy: [{ user: user._id }]
      }

      setMessages(prev => [...prev, tempMessage])
      setNewMessage('')

      await chatsAPI.sendMessage(activeChat._id, {
        content: messageContent,
        type: fileUrls.length > 0 ? 'file' : 'text',
        attachments: fileUrls
      })

    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ارسال پیام",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleTyping = () => {
    if (activeChat) {
      socketManager.startTyping(activeChat._id)

      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        socketManager.stopTyping(activeChat._id)
      }, 3000)
    }
  }

  const handlePinChat = async (chatId) => {
    try {
      // API call to pin/unpin chat
      setChats(prev => prev.map(chat =>
        chat._id === chatId
          ? { ...chat, isPinned: !chat.isPinned }
          : chat
      ))

      toast({
        title: "چت پین شد",
        description: "چت در بالای لیست قرار گرفت",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در پین کردن چت",
        variant: "destructive",
      })
    }
  }

  const handleDeleteChat = async (chatId) => {
    try {
      // API call to delete chat
      setChats(prev => prev.filter(chat => chat._id !== chatId))
      if (activeChat?._id === chatId) {
        setActiveChat(null)
      }

      toast({
        title: "چت حذف شد",
        description: "چت با موفقیت حذف شد",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در حذف چت",
        variant: "destructive",
      })
    }
  }

  const handleAddMember = () => {
    // TODO: Implement add member functionality
    console.log('Add member to group')
  }

  const handleGroupSettings = () => {
    // TODO: Implement group settings functionality
    console.log('Open group settings')
  }

  const handleGroupCreated = (newGroup) => {
    setChats(prev => [newGroup, ...prev])
    setActiveChat(newGroup)
    loadChats() // Refresh the list
  }

  const handleEditMessage = (message) => {
    setEditingMessage(message)
    setNewMessage(message.content)
  }

  const handleUpdateMessage = async (messageId, newContent) => {
    try {
      await chatsAPI.updateMessage(activeChat._id, messageId, { content: newContent })
      
      // Update the message in the local state
      setMessages(prev => prev.map(msg => 
        msg._id === messageId 
          ? { ...msg, content: newContent, edited: true, editedAt: new Date() }
          : msg
      ))
      
      setEditingMessage(null)
      setNewMessage('')

    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ویرایش پیام",
        variant: "destructive",
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingMessage(null)
    setNewMessage('')
  }

  const handleDeleteMessage = async (message) => {
    try {
      await chatsAPI.deleteMessage(activeChat._id, message._id)
      
      // Remove message from local state
      setMessages(prev => prev.filter(msg => msg._id !== message._id))
      
      // Refresh messages from backend to ensure consistency
      const response = await chatsAPI.getMessages(activeChat._id)
      setMessages(response.data.messages || [])

    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در حذف پیام",
        variant: "destructive",
      })
    }
  }

  const filteredChats = chats.filter(chat => {
    if (selectedCategory === 'all') return true
    return chat.category === selectedCategory
  })

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }





  return (
    <div
      className="flex flex-col md:flex-row h-screen bg-background rtl"
      dir="rtl"
    >




      {/* Chat List for both mobile and desktop */}
      <div
        className={`
          w-full md:w-80 lg:w-96 flex-shrink-0 border-b-muted md:border-b-0 md:border-l bg-background
          ${mobileView === 'chats' ? 'block' : 'hidden'} 
          md:block
        `}
        style={{ minHeight: 0, maxHeight: "100dvh", overflow: "auto" }}
      >
        <ChatList
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          chats={filteredChats}
          activeChat={activeChat}
          onChatSelect={window.innerWidth < 768 ? handleMobileChatSelect : handleChatSelect}
          onChatPin={handlePinChat}
          onChatDelete={handleDeleteChat}
          onChatsUpdate={loadChats}
          userSettings={userSettings}
          onSettingsChange={setUserSettings}
          mobileView={mobileView == 'chats' ? true : false}
        />
      </div>

      {/* Main Chat Area */}
      <div
        className={`
          flex-1 flex flex-col min-w-0 h-[calc(100dvh-0rem)]  relative bg-background
          ${mobileView === "messages" && activeChat ? 'block' : 'hidden'}
          md:block
        `}
      >

        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur">
              <ChatHeader
                activeChat={activeChat}
                typingUsers={typingUsers}
                messagesCount={messages.length}
                onChatPin={handlePinChat}
                onChatDelete={handleDeleteChat}
                onAddMember={handleAddMember}
                onGroupSettings={handleGroupSettings}
                setMobileView={setMobileView}
              />
            </div>
            {/* Messages Area */}
            <div className="flex-1 overflow-hidden !h-[91vh]">
              <MessagesArea
                messages={messages}
                activeChat={activeChat}
                currentUser={user}
                typingUsers={typingUsers}
                onEditMessage={handleEditMessage}
                onDeleteMessage={handleDeleteMessage}
              />
            </div>
            {/* Message Input */}
            <MessageInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              isSending={isSending}
              editingMessage={editingMessage}
              onEditMessage={handleUpdateMessage}
              onCancelEdit={handleCancelEdit}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-background min-h-screen">
            <div className="text-center px-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                هیچ چتی وجود ندارد.
              </h2>
              <p className="text-muted-foreground">
                برای شروع گفت‌وگو یک چت انتخاب کنید.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Group Creation Dialog */}
      <GroupCreationDialog
        open={showCreateGroup}
        onOpenChange={setShowCreateGroup}
        onGroupCreated={handleGroupCreated}
      />

      {/* Settings Dialog */}
      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        userSettings={userSettings}
        onSettingsChange={setUserSettings}
      />
    </div>
  )
}
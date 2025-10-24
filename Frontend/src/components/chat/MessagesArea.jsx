'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  MessageCircle,
  Reply,
  Forward,
  Copy,
  Edit,
  Trash2,
  Check,
  CheckCheck,
  Clock,
  ArrowDown
} from 'lucide-react'
import axios from 'axios'
import { chatsAPI } from '@/lib/api'
// Simple Persian date formatter
function getPersianDateString(dateStr) {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fa-IR', {
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return ""
  }
}

// Group messages by date as YYYY-MM-DD string
function groupMessagesByDate(messages) {
  const grouped = {}
  messages.forEach(msg => {
    const d = new Date(msg.createdAt)
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(msg)
  })
  return Object.entries(grouped).sort((a, b) => new Date(a[1][0].createdAt) - new Date(b[1][0].createdAt))
}



export default function MessagesArea({
  messages,
  activeChat,
  currentUser,
  typingUsers,
  onEditMessage = null,
  onDeleteMessage = null
}) {
  const scrollAreaRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)
  const [contextMenu, setContextMenu] = useState({
    open: false,
    message: null,
    x: 0,
    y: 0
  })
  // For textbox edit mode
  const [editingMsgId, setEditingMsgId] = useState(null)
  const [editingMsgValue, setEditingMsgValue] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  // For reply mode (pass up to parent, but show highlight here)
  const [replyingTo, setReplyingTo] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Hide contextMenu on click outside
  useEffect(() => {
    const handle = () => contextMenu.open && setContextMenu({ open: false, message: null, x: 0, y: 0 })
    window.addEventListener('click', handle)
    window.addEventListener('touchstart', handle)
    return () => {
      window.removeEventListener('click', handle)
      window.removeEventListener('touchstart', handle)
    }
  }, [contextMenu.open])

  // Loading on chat switch
  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timeout)
  }, [activeChat?._id])

  // Always scroll to bottom on mount or chat switch
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }, [])

  useEffect(() => {
    if (!loading) scrollToBottom('auto')
  }, [loading, activeChat?._id, scrollToBottom])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (!loading) scrollToBottom()
  }, [messages, loading, scrollToBottom])

  // Handle scroll for showing Scroll to Bottom button
  const handleScroll = useCallback(() => {
    const container = scrollAreaRef.current
    if (container) {
      const isAtBottom =
        Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 8
      setShowScrollToBottom(!isAtBottom)
    }
  }, [])

  // Add event listener on scroll
  useEffect(() => {
    const container = scrollAreaRef.current
    if (!container) return
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [loading, handleScroll])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-100" />
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-100" />
      case 'seen':
        return <CheckCheck className="w-3 h-3 text-blue-500" />
      default:
        return <Clock className="w-3 h-3 text-gray-100" />
    }
  }

  // --- Backend integrated actions ---
  // Copy handled by clipboard API (no backend)
  const handleCopyMessage = async (content) => {
    try {
      await navigator.clipboard.writeText(content)
    } catch (e) {
      alert("خطا در کپی")
    }
  }

  // Reply (pass to parent, show highlight here)
  const handleReplyMessage = (message) => {
    setReplyingTo(message)
    // Normally you'd call a callback prop to parent to set reply-to for upcoming message send
    // e.g. onReply(message)
  }

  // Forward (simulate/send event or call API)
  const handleForwardMessage = async (message) => {
    // Open a modal to pick a chat, then send the message content to that chat.
    alert("پیام فوروارد شد (دکمه پیاده‌سازی شده اما نیاز به UX دارد)")
  }

  // Edit message - use passed handler or fallback to local state
  const handleEditMessage = (message) => {
    if (onEditMessage) {
      onEditMessage(message)
    } else {
      setEditingMsgId(message._id)
      setEditingMsgValue(message.content)
    }
  }

  const submitEditMessage = async (msgId, newVal) => {
    setEditLoading(true)
    try {
      await onEditMessage(msgId, newVal)
      setEditingMsgId(null)
      setEditingMsgValue('')
    } catch (e) {
      alert("ویرایش پیام انجام نشد")
    }
    setEditLoading(false)
  }

  // Delete message - use passed handler or fallback to API
  const handleDeleteMessage = async (message) => {
    if (!window.confirm('آیا از حذف پیام اطمینان دارید؟')) return
    setActionLoading(true)
    try {
      if (onDeleteMessage) {
        await onDeleteMessage(message)
      } else {
        await chatsAPI.deleteMessage(activeChat?._id, message._id)
      }
    } catch (e) {
      alert("حذف پیام انجام نشد")
    }
    setActionLoading(false)
  }

  // --- Handle context menu both on desktop (right-click) and mobile (long press) --- Detect touch long-press
  function messageLongPressHandler(message) {
    let timeoutLong
    return {
      onTouchStart: e => {
        timeoutLong = setTimeout(() => {
          // Center on finger for touch
          setContextMenu({
            open: true,
            message,
            // Do some offset for mobile, fallback to clientY
            x: e.touches?.[0]?.clientX ?? 25,
            y: e.touches?.[0]?.clientY ?? 65,
          })
        }, 400)
        e.target.addEventListener('touchend', () => clearTimeout(timeoutLong), { once: true })
        e.target.addEventListener('touchmove', () => clearTimeout(timeoutLong), { once: true })
      }
    }
  }

  // Group messages by date
  const grouped = groupMessagesByDate(messages)

  return (
    <div
      className={`
        relative h-full flex-1 overflow-hidden
        before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:!z-0
        before:bg-[url('/partbg.png')]
        dark:before:bg-[url('/partdark.png')]
        before:bg-cover before:bg-center
      `}
      style={{minHeight: "100%"}}
      dir="ltr"
    >
      <div
        ref={scrollAreaRef}
        className={`
          h-full w-full overflow-y-auto p-4 scrollbar-hide
        `}
      >
        {loading ? (
          <div className="relative flex items-center justify-center mt-auto">
            <div className="flex flex-col gap-3 w-full mx-auto">
              {/* Placeholder message bubble 1 */}
              <div className="flex justify-end mb-2">
                <div className="rounded-2xl rounded-br-lg bg-blue-100 dark:bg-blue-900/40 px-4 py-3 w-3/4 max-w-sm animate-pulse relative overflow-hidden">
                  <span className="block h-4 w-3/4 bg-blue-200/80 dark:bg-blue-700/30 rounded mb-2 shimmer"></span>
                  <span className="block h-3 w-1/3 bg-blue-200/70 dark:bg-blue-700/20 rounded mb-2 shimmer"></span>
                  <span className="block h-4 w-3/4 bg-blue-200/80 dark:bg-blue-700/30 rounded mb-2 shimmer"></span>
                  <span className="block h-3 w-1/3 bg-blue-200/70 dark:bg-blue-700/20 rounded shimmer"></span>
                </div>
              </div>
              {/* ... Other skeletons ... */}
              <div className="flex justify-start mb-2">
                <div className="rounded-2xl rounded-bl-lg bg-gray-100 dark:bg-gray-800/60 px-4 py-3 w-2/3 max-w-xs animate-pulse relative overflow-hidden">
                  <span className="block h-4 w-1/2 bg-gray-200/80 dark:bg-gray-600/40 rounded mb-2 shimmer"></span>
                  <span className="block h-3 w-5/6 bg-gray-200/80 dark:bg-gray-600/30 rounded shimmer"></span>
                </div>
              </div>
              <div className="flex justify-end mb-2">
                <div className="rounded-2xl rounded-br-lg bg-blue-100 dark:bg-blue-900/40 px-4 py-2 w-2/5 max-w-sm animate-pulse relative overflow-hidden">
                  <span className="block h-3 w-3/4 bg-blue-200/80 dark:bg-blue-700/30 rounded shimmer"></span>
                </div>
              </div>
              <div className="flex justify-start mb-2">
                <div className="rounded-2xl rounded-bl-lg bg-gray-100 dark:bg-gray-800/60 px-4 py-2 w-3/5 max-w-xs animate-pulse relative overflow-hidden">
                  <span className="block h-3 w-2/3 bg-gray-200/80 dark:bg-gray-600/30 rounded shimmer"></span>
                </div>
              </div>
              <div className="flex justify-start mb-2">
                <div className="rounded-2xl rounded-bl-lg bg-gray-100 dark:bg-gray-800/60 px-4 py-3 w-2/3 max-w-xs animate-pulse relative overflow-hidden">
                  <span className="block h-4 w-1/2 bg-gray-200/80 dark:bg-gray-600/40 rounded mb-2 shimmer"></span>
                  <span className="block h-3 w-5/6 bg-gray-200/80 dark:bg-gray-600/30 rounded shimmer"></span>
                </div>
              </div>
              <div className="flex justify-start mb-2">
                <div className="rounded-2xl rounded-bl-lg bg-gray-100 dark:bg-gray-800/60 px-4 py-3 w-2/3 max-w-xs animate-pulse relative overflow-hidden">
                  <span className="block h-4 w-1/2 bg-gray-200/80 dark:bg-gray-600/40 rounded mb-2 shimmer"></span>
                  <span className="block h-3 w-5/6 bg-gray-200/80 dark:bg-gray-600/30 rounded shimmer"></span>
                </div>
              </div>
              <div className="flex justify-end mb-2">
                <div className="rounded-2xl rounded-br-lg bg-blue-100 dark:bg-blue-900/40 px-4 py-3 w-3/4 max-w-sm animate-pulse relative overflow-hidden">
                  <span className="block h-4 w-3/4 bg-blue-200/80 dark:bg-blue-700/30 rounded mb-2 shimmer"></span>
                  <span className="block h-3 w-1/3 bg-blue-200/70 dark:bg-blue-700/20 rounded mb-2 shimmer"></span>
                  <span className="block h-4 w-3/4 bg-blue-200/80 dark:bg-blue-700/30 rounded mb-2 shimmer"></span>
                  <span className="block h-3 w-1/3 bg-blue-200/70 dark:bg-blue-700/20 rounded shimmer"></span>
                </div>
              </div>
            </div>
            <style jsx>{`
              .shimmer {
                position: relative;
                overflow: hidden;
              }
              .shimmer::after {
                content: '';
                position: absolute;
                left: -120px;
                top: 0;
                width: 80px;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
                animation: shimmerMove 1.3s infinite linear;
                z-index: 1;
              }
              @keyframes shimmerMove {
                0% {
                  left: -120px;
                }
                100% {
                  left: 100%;
                }
              }
            `}</style>
          </div>
        ) : messages.length === 0 ? (
          <div className=" relative flex items-center justify-center min-h-full text-gray-500">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-10 h-10 text-blue-100" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">شروع مکالمه</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">اولین پیام خود را ارسال کنید</p>
            </div>
          </div>
        ) : (
          <div className='relative space-y-4 min-h-full'>
            <div className="absolute inset-0 w-full h-full z-0 from-white/80 via-white/10 to-transparent dark:from-[#111827f2] dark:via-[#23272fe6] dark:to-transparent pointer-events-none"></div>
            <div className="relative z-10 pb-16">
              {grouped.map(([dateKey, dayMessages]) => (
                <div key={dateKey}>
                  <div className="flex justify-center my-6">
                    <span className="px-4 py-2 bg-white/30 dark:bg-gray-700/30 text-xs rounded-2xl  text-gray-900 dark:text-blue-100 backdrop-blur-sm" dir='rtl'>
                      {getPersianDateString(dayMessages[0]?.createdAt)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {dayMessages.map((message) => {
                      const isSender = message.sender._id === currentUser?._id

                      // Touch/long-press handlers for mobile menu
                      const touchHandlers = messageLongPressHandler(message)

                      const showEditInput = editingMsgId === message._id

                      return (
                        <div
                          key={message._id}
                          className={`group flex items-end gap-1 mt-2 px-1 relative ${isSender ? 'justify-end' : 'justify-start'}`}
                          onContextMenu={e => {
                            e.preventDefault();
                            setContextMenu({
                              open: true,
                              message,
                              x: e.clientX,
                              y: e.clientY
                            })
                          }}
                          {...touchHandlers}
                        >
                          {!isSender && activeChat.type === 'group' && (
                            <img
                              alt={message.sender.fullName}
                              src={message.sender.profilePicture || '/images/avatar.webp'}
                              className="rounded-full w-6 h-6 ring-2 ring-blue-500 shadow-lg mr-2"
                              title={message.sender.fullName}
                            />
                          )}
                          <div
                            className={`
                              relative px-3 py-1
                              pt-2
                              rounded-xl
                              ${isSender
                                ? 'bg-gradient-to-br from-blue-600 to-fuchsia-700 text-white rounded-br-none backdrop-blur-[2px]'
                                : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-bl-none '
                              }
                              max-w-[90vw] md:max-w-lg
                              ${replyingTo && replyingTo._id === message._id ? 'ring-2 ring-blue-400' : ''}
                            `}
                          >
                            {!isSender && activeChat.type === 'group' && (
                              <div className="flex items-center mb-0.5">
                                <span className="text-xs text-blue-600 dark:text-cyan-300 mb-1 ml-2">
                                  {message.sender.fullName}
                                </span>
                              </div>
                            )}
                            {showEditInput ? (
                              <form
                                className="flex gap-2 items-start"
                                onSubmit={e => {
                                  e.preventDefault()
                                  submitEditMessage(message._id, editingMsgValue)
                                }}
                              >
                                <input
                                  type="text"
                                  value={editingMsgValue}
                                  onChange={e => setEditingMsgValue(e.target.value)}
                                  className="form-input text-sm rounded-md px-2 py-1 w-[160px] md:w-[240px] text-gray-900 dark:text-gray-800"
                                  autoFocus
                                  disabled={editLoading}
                                />
                                <Button
                                  size="sm"
                                  disabled={editLoading}
                                  type="submit"
                                  className="bg-blue-500 text-white rounded-lg h-7 min-w-7 px-2"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingMsgId(null)
                                    setEditingMsgValue('')
                                  }}
                                  className="h-7 min-w-7 px-2"
                                >
                                  ✕
                                </Button>
                              </form>
                            ) : (
                              <div className="text-sm" dir='rtl'>
                                <p>{message.content}</p>
                                {message.edited && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                                    (ویرایش شده)
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="flex items-center justify-between mt-2 w-full">
                              <span className={`text-xs ${isSender ? 'text-white/80' : 'text-blue-700 dark:text-blue-200'}`}>
                                {new Date(message.createdAt).toLocaleTimeString('fa-IR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                              {isSender && (
                                <span className="ml-2">{getStatusIcon(message.status || 'sent')}</span>
                              )}
                            </div>
                          </div>
                          {/* Context menu for each message */}
                          {contextMenu.open && contextMenu.message?._id === message._id && (
                            <div
                              className="fixed !z-[100] min-w-[140px] bg-background/95 backdrop-blur-md rounded-lg shadow-xl border border-blue-200 dark:border-gray-700 overflow-hidden"
                              style={{
                                top: Math.max(0, Math.min(contextMenu.y, window.innerHeight - 300)),
                                left: Math.max(0, Math.min(contextMenu.x, window.innerWidth - 200)),
                                direction: 'rtl'
                              }}
                              onClick={e => e.stopPropagation()}
                            >
                              <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-sm transition"
                                onClick={() => {
                                  handleReplyMessage(message);
                                  setContextMenu({ ...contextMenu, open: false, message: null });
                                }}
                              >
                                <Reply className="w-4 h-4 ml-2 text-blue-700 dark:text-blue-300" />
                                <span className="font-medium">پاسخ</span>
                              </button>
                              <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-sm transition"
                                onClick={() => {
                                  handleForwardMessage(message);
                                  setContextMenu({ ...contextMenu, open: false, message: null });
                                }}
                              >
                                <Forward className="w-4 h-4 ml-2 text-blue-700 dark:text-blue-300" />
                                فوروارد
                              </button>
                              <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-sm transition"
                                onClick={() => {
                                  handleCopyMessage(message.content);
                                  setContextMenu({ ...contextMenu, open: false, message: null });
                                }}
                              >
                                <Copy className="w-4 h-4 ml-2 text-blue-700 dark:text-blue-300" />
                                کپی
                              </button>
                              {isSender && (
                                <>
                                  <div className="border-t my-1 border-blue-100 dark:border-gray-700"></div>
                                  <button
                                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-sm transition"
                                    onClick={() => {
                                      handleEditMessage(message);
                                      setContextMenu({ ...contextMenu, open: false, message: null });
                                    }}
                                  >
                                    <Edit className="w-4 h-4 ml-2 text-blue-700 dark:text-blue-300" />
                                    ویرایش
                                  </button>
                                  <button
                                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-100 dark:hover:bg-red-950/50 text-red-600 transition"
                                    disabled={actionLoading}
                                    onClick={() => {
                                      setContextMenu({ ...contextMenu, open: false, message: null });
                                      handleDeleteMessage(message);
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4 ml-2" />
                                    حذف
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {typingUsers.length > 0 && (
                <div className="flex justify-start pt-2">
                  <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-slate-900/80 px-6 py-3 rounded-full shadow-2xl border border-blue-200 dark:border-blue-950 backdrop-blur-sm animate__animated animate__pulse">
                    <img
                      src="/images/typing.gif"
                      alt="typing"
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-semibold text-blue-700 dark:text-blue-200 text-sm animate-pulse">در حال نوشتن...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>
      {showScrollToBottom && !loading && (
        <Button
          onClick={() => scrollToBottom()}
          className="fixed left-4 md:left-8 bottom-20 md:bottom-6 z-40 bg-blue-500 shadow-md rounded-full p-2 h-10 w-10 flex items-center justify-center animate-in fade-in"
        >
          <ArrowDown className="w-5 h-5 text-white" />
        </Button>
      )}
    </div>
  )
}
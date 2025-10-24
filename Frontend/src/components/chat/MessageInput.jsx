'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Send,
  Paperclip,
  Smile,
  Image,
  FileText,
  Mic,
  X
} from 'lucide-react'
import { uploadAPI } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

export default function MessageInput({
  newMessage,
  setNewMessage,
  onSendMessage,
  onTyping,
  isSending,
  disabled = false,
  editingMessage = null,
  onEditMessage = null,
  onCancelEdit = null
}) {
  const fileInputRef = useRef(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Validate file types and sizes
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['image/*', 'video/*', 'application/pdf', '.doc', '.docx']

    for (const file of files) {
      if (file.size > maxSize) {
        toast({
          title: "خطا",
          description: `فایل ${file.name} خیلی بزرگ است (حداکثر 10MB)`,
          variant: "destructive",
        })
        return
      }
    }

    setSelectedFiles(files)

    // Upload files
    setIsUploading(true)
    try {
      const uploadPromises = files.map(file => uploadAPI.uploadFile(file, 'chat'))
      const uploadResults = await Promise.all(uploadPromises)

      // Send message with file attachments
      const fileUrls = uploadResults.map(result => result.data.url)
      await onSendMessage(newMessage, fileUrls)

      setSelectedFiles([])
      setNewMessage('')
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در آپلود فایل‌ها",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editingMessage || !newMessage.trim()) return

    
    try {
      await onEditMessage(editingMessage._id, newMessage.trim())
      setNewMessage('')
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ویرایش پیام",
        variant: "destructive",
      })
    }
  }

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />
    } else if (file.type.startsWith('video/')) {
      return <FileText className="w-4 h-4" />
    } else {
      return <FileText className="w-4 h-4" />
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div
      className="fixed bottom-0 md:bottom-4 left-1/2 md:left-20 lg:left-1/3 z-30 w-[98vw] md:w-[350px] xl:w-[98vw] max-w-2xl -translate-x-1/2 md:translate-x-0 lg:-translate-x-1/3 px-2 md:px-0"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="flex flex-col gap-2 py-3 md:p-3"
      >
        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mb-2 p-2 bg-muted/40 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">فایل‌های انتخاب شده:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFiles([])}
                className="rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-1 bg-background/70 rounded-lg">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {getFileIcon(file)}
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({formatFileSize(file.size)})
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={editingMessage ? handleEditSubmit : onSendMessage}
          className="flex items-center gap-1"
          style={{ pointerEvents: "auto" }}
        >



          {editingMessage && (
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={onCancelEdit}
              className="h-11 w-11 rounded-full border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/20"
            >
              <X className="w-5 h-5 text-red-600 dark:text-red-400" />
            </Button>
          )}

          <Button
            type="submit"
            size="icon"
            className="h-11 w-11 rounded-full bg-primary hover:bg-primary/90 shadow-md transition"
          >
            {
              editingMessage ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : newMessage.length == 0 ? (
                <Mic className="w-5 h-5" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              )
            }
          </Button>



          {/* Message Input */}
          <div className="flex-1 relative">
            
            <Input
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value)
                onTyping()
              }}
              placeholder={editingMessage ? "ویرایش پیام..." : "پیام خود را بنویسید..."}
              className="bg-background/60 backdrop-blur-xl pl-11 pr-11 h-11 shadow-inner text-sm rounded-lg  rounded-br-none"
              disabled={disabled || isSending || isUploading}
              style={{
                boxShadow: "0 1px 6px rgba(0,0,0,0.05)"
              }}
            />
            {/* File Upload Button */}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-background/30 hover:bg-background/60 transition"
              disabled={disabled || isUploading}
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            

            {/* Emoji Button */}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-background/10 hover:bg-background/40 transition"
              disabled={disabled}
              tabIndex={-1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>

            </Button>
          </div>


        </form>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          onChange={handleFileSelect}
        />
      </div>
    </div >
  )
}

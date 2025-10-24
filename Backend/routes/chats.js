const express = require('express')
const Chat = require('../models/Chat')
const User = require('../models/User')
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator')

const router = express.Router()

// @route   GET /api/chats
// @desc    Get user's chats
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query

    const chats = await Chat.find({
      participants: req.user.userId
    })
      .populate('participants', 'username fullName profilePicture isOnline lastSeen')
      .populate('lastMessage.sender', 'username fullName profilePicture')
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    // Format chats for frontend
    const formattedChats = chats.map(chat => {
      const otherParticipants = chat.participants.filter(
        p => p._id.toString() !== req.user.userId
      )
      
      return {
        _id: chat._id,
        type: chat.type,
        name: chat.type === 'group' 
          ? chat.name 
          : otherParticipants.map(p => p.fullName).join(', '),
        participants: chat.participants,
        lastMessage: chat.lastMessage,
        updatedAt: chat.updatedAt,
        unreadCount: 0, // TODO: Calculate unread messages
        isPinned: false, // TODO: Implement pinning
        avatar: chat.avatar || null
      }
    })

    res.json({
      success: true,
      chats: formattedChats,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(chats.length / limit),
        hasMore: chats.length >= limit
      }
    })

  } catch (error) {
    console.error('Get chats error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// @route   POST /api/chats
// @desc    Create new chat
// @access  Private
router.post('/', auth, [
  body('type').isIn(['private', 'group']).withMessage('Invalid chat type'),
  body('participants').isArray({ min: 1 }).withMessage('At least one participant required'),
  body('name').optional().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { type, participants, name, description } = req.body

    // Add current user to participants if not included
    const allParticipants = [...new Set([req.user.userId, ...participants])]

    // For private chats, check if chat already exists
    if (type === 'private' && allParticipants.length === 2) {
      const existingChat = await Chat.findOne({
        type: 'private',
        participants: { $all: allParticipants, $size: 2 }
      }).populate('participants', 'username fullName profilePicture isOnline lastSeen')

      if (existingChat) {
        return res.json({
          success: true,
          message: 'Chat already exists',
          chat: {
            _id: existingChat._id,
            type: existingChat.type,
            name: existingChat.participants.filter(p => p._id.toString() !== req.user.userId).map(p => p.fullName).join(', '),
            participants: existingChat.participants,
            lastMessage: existingChat.lastMessage,
            updatedAt: existingChat.updatedAt,
            unreadCount: 0
          }
        })
      }
    }

    // Verify all participants exist
    const users = await User.find({ _id: { $in: allParticipants } })
    if (users.length !== allParticipants.length) {
      return res.status(400).json({
        success: false,
        message: 'Some participants not found'
      })
    }

    const chat = new Chat({
      type,
      participants: allParticipants,
      name: type === 'group' ? name : undefined,
      description: type === 'group' ? description : undefined,
      admins: type === 'group' ? [req.user.userId] : undefined
    })

    await chat.save()
    await chat.populate('participants', 'username fullName profilePicture isOnline lastSeen')

    // Format chat for frontend
    const otherParticipants = chat.participants.filter(
      p => p._id.toString() !== req.user.userId
    )
    
    const formattedChat = {
      _id: chat._id,
      type: chat.type,
      name: chat.type === 'group' 
        ? chat.name 
        : otherParticipants.map(p => p.fullName).join(', '),
      participants: chat.participants,
      lastMessage: chat.lastMessage,
      updatedAt: chat.updatedAt,
      unreadCount: 0
    }

    res.status(201).json({
      success: true,
      message: 'Chat created successfully',
      chat: formattedChat
    })

  } catch (error) {
    console.error('Create chat error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// @route   GET /api/chats/:chatId/messages
// @desc    Get chat messages
// @access  Private
router.get('/:chatId/messages', auth, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query
    const { chatId } = req.params

    const chat = await Chat.findById(chatId)
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      })
    }

    // Check if user is participant
    if (!chat.participants.includes(req.user.userId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      })
    }

    // Get messages with pagination
    const messages = chat.messages
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice((page - 1) * limit, page * limit)
      .reverse()

    // Populate sender info
    await chat.populate('messages.sender', 'username fullName profilePicture')

    res.json({
      success: true,
      messages: messages,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(chat.messages.length / limit),
        hasMore: chat.messages.length > page * limit
      }
    })

  } catch (error) {
    console.error('Get messages error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// @route   POST /api/chats/:chatId/messages
// @desc    Send message
// @access  Private
router.post('/:chatId/messages', auth, [
  body('content').optional().isString().withMessage('Content must be a string'),
  body('type').optional().isIn(['text', 'image', 'video', 'file', 'portfolio']).withMessage('Invalid message type'),
  body('attachments').optional().isArray().withMessage('Attachments must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { chatId } = req.params
    const { content = '', type = 'text', attachments = [] } = req.body

    // Validate that either content or attachments are provided
    if (!content.trim() && attachments.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message content or attachments are required'
      })
    }

    const chat = await Chat.findById(chatId)
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      })
    }

    // Check if user is participant
    if (!chat.participants.includes(req.user.userId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      })
    }

    const newMessage = {
      sender: req.user.userId,
      content: content.trim(),
      type,
      attachments,
      seenBy: [{ user: req.user.userId }],
      createdAt: new Date()
    }

    chat.messages.push(newMessage)
    await chat.updateLastMessage(newMessage)
    await chat.populate('messages.sender', 'username fullName profilePicture')

    const message = chat.messages[chat.messages.length - 1]

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    })

  } catch (error) {
    console.error('Send message error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// @route   PUT /api/chats/:chatId/messages/:messageId/seen
// @desc    Mark message as seen
// @access  Private
router.put('/:chatId/messages/:messageId/seen', auth, async (req, res) => {
  try {
    const { chatId, messageId } = req.params

    const chat = await Chat.findById(chatId)
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      })
    }

    // Check if user is participant
    if (!chat.participants.includes(req.user.userId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      })
    }

    const message = chat.messages.id(messageId)
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    // Add user to seenBy if not already there
    const alreadySeen = message.seenBy.some(
      seen => seen.user.toString() === req.user.userId
    )

    if (!alreadySeen) {
      message.seenBy.push({ user: req.user.userId })
      await chat.save()
    }

    res.json({
      success: true,
      message: 'Message marked as seen'
    })

  } catch (error) {
    console.error('Mark seen error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// @route   DELETE /api/chats/:chatId
// @desc    Delete chat
// @access  Private
router.delete('/:chatId', auth, async (req, res) => {
  try {
    const { chatId } = req.params

    const chat = await Chat.findById(chatId)
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      })
    }

    // Check permissions
    if (chat.type === 'group') {
      if (!chat.admins.includes(req.user.userId)) {
        return res.status(403).json({
          success: false,
          message: 'Only group admins can delete the chat'
        })
      }
    } else {
      if (!chat.participants.includes(req.user.userId)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        })
      }
    }

    await Chat.findByIdAndDelete(chatId)

    res.json({
      success: true,
      message: 'Chat deleted successfully'
    })

  } catch (error) {
    console.error('Delete chat error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// @route   PUT /api/chats/:chatId/messages/:messageId
// @desc    Update a message in a chat
// @access  Private
router.put('/:chatId/messages/:messageId', auth, [
  body('content').notEmpty().withMessage('Content is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { chatId, messageId } = req.params
    const { content } = req.body

    const chat = await Chat.findById(chatId)
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      })
    }

    // Check if user is participant
    if (!chat.participants.includes(req.user.userId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      })
    }

    const message = chat.messages.id(messageId)
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    // Only sender can edit their message
    if (message.sender.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own messages'
      })
    }

    // Update message content and mark as edited
    message.content = content.trim()
    message.edited = true
    message.editedAt = new Date()

    await chat.save()
    await chat.populate('messages.sender', 'username fullName profilePicture')

    res.json({
      success: true,
      message: 'Message updated successfully',
      data: message
    })

  } catch (error) {
    console.error('Update message error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// @route   DELETE /api/chats/:chatId/messages/:messageId
// @desc    Delete a message from a chat
// @access  Private
router.delete('/:chatId/messages/:messageId', auth, async (req, res) => {
  try {
    const { chatId, messageId } = req.params

    const chat = await Chat.findById(chatId)
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      })
    }

    const messageIndex = chat.messages.findIndex(
      msg => msg._id.toString() === messageId
    )

    if (messageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    const message = chat.messages[messageIndex]

    // Only sender (or group admin in group chat) can delete
    if (
      message.sender.toString() !== req.user.userId &&
      !(chat.type === 'group' && chat.admins && chat.admins.includes(req.user.userId))
    ) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this message'
      })
    }

    chat.messages.splice(messageIndex, 1)
    // Optionally: update last message if needed
    if (chat.messages.length > 0) {
      const lastMessage = chat.messages[chat.messages.length - 1]
      await chat.updateLastMessage(lastMessage)
    } else {
      chat.lastMessage = undefined
      await chat.save()
    }

    await chat.save()

    res.json({
      success: true,
      message: 'Message deleted successfully'
    })

  } catch (error) {
    console.error('Delete message error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})


module.exports = router
const mongoose = require('mongoose')

const attachmentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  }
}, { _id: false })

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['text', 'image', 'video', 'file', 'portfolio'],
    default: 'text'
  },
  attachments: [attachmentSchema],
  // Legacy fields for backward compatibility
  fileUrl: String,
  fileName: String,
  fileSize: Number,
  seenBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    seenAt: {
      type: Date,
      default: Date.now
    }
  }],
  edited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true
})

const chatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['private', 'group'],
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [messageSchema],
  lastMessage: {
    content: { type: String, default: '' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, default: 'text' }
  },
  // For group chats
  name: String,
  description: String,
  avatar: String,
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // Typing indicators
  typingUsers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  // Chat settings
  settings: {
    muteNotifications: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      until: Date
    }],
    pinned: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }]
  }
}, {
  timestamps: true
})

// Indexes for better performance
chatSchema.index({ participants: 1 })
chatSchema.index({ 'messages.sender': 1 })
chatSchema.index({ 'messages.createdAt': -1 })
chatSchema.index({ updatedAt: -1 })

// Update last message when new message is added
chatSchema.methods.updateLastMessage = function(message) {
  this.lastMessage.content = message.content
  this.lastMessage.sender = message.sender
  this.lastMessage.timestamp = message.createdAt || new Date()
  this.lastMessage.type = message.type
  
  return this.save()
}

// Add typing user
chatSchema.methods.addTypingUser = function(userId) {
  const existingIndex = this.typingUsers.findIndex(
    tu => tu.user.toString() === userId.toString()
  )
  
  if (existingIndex > -1) {
    this.typingUsers[existingIndex].timestamp = new Date()
  } else {
    this.typingUsers.push({ user: userId })
  }
  
  return this.save()
}

// Remove typing user
chatSchema.methods.removeTypingUser = function(userId) {
  this.typingUsers = this.typingUsers.filter(
    tu => tu.user.toString() !== userId.toString()
  )
  return this.save()
}

// Clean old typing indicators (older than 5 seconds)
chatSchema.methods.cleanTypingUsers = function() {
  const fiveSecondsAgo = new Date(Date.now() - 5000)
  this.typingUsers = this.typingUsers.filter(
    tu => tu.timestamp > fiveSecondsAgo
  )
  return this.save()
}

module.exports = mongoose.model('Chat', chatSchema)
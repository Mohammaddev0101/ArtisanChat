# Chat Components

This directory contains all the chat-related components that make up the main chat interface. The components are designed to be modular, reusable, and fully responsive with RTL support.

## Components Overview

### 1. Sidebar.jsx
- **Purpose**: Left sidebar with category navigation and settings
- **Features**:
  - Category filtering (All, Personal, University, etc.)
  - Settings dialog trigger
  - Theme toggle
  - RTL support
  - Responsive design (hidden on mobile)

### 2. ChatList.jsx
- **Purpose**: Main chat list with search and chat items
- **Features**:
  - Search functionality with user suggestions
  - Chat item display with avatars and status
  - Group creation dialog
  - Chat actions (pin, archive, delete)
  - Unread message badges
  - RTL support

### 3. ChatHeader.jsx
- **Purpose**: Chat header with group info and actions
- **Features**:
  - Chat/group information display
  - Member count and message count
  - Call and video buttons
  - Group management options
  - Chat actions menu
  - RTL support

### 4. MessagesArea.jsx
- **Purpose**: Messages display area with typing indicators
- **Features**:
  - Message bubbles with proper alignment
  - Message status indicators (sent, delivered, seen)
  - Message actions (reply, forward, copy, edit, delete)
  - Typing indicators
  - Group message sender names
  - RTL support

### 5. MessageInput.jsx
- **Purpose**: Message input with file upload and emoji support
- **Features**:
  - Text input with emoji picker
  - File upload with preview
  - Voice message support (placeholder)
  - File type validation
  - RTL support

### 6. GroupCreationDialog.jsx
- **Purpose**: Dialog for creating new groups
- **Features**:
  - Basic group information (name, description, type)
  - Member search and selection
  - Privacy settings
  - Tabbed interface
  - RTL support

### 7. SettingsDialog.jsx
- **Purpose**: Comprehensive settings dialog
- **Features**:
  - General settings (language, timezone)
  - Notification preferences
  - Appearance settings (theme, colors, font size)
  - Privacy settings
  - Account management
  - RTL support

### 8. MobileNavigation.jsx
- **Purpose**: Mobile navigation drawer
- **Features**:
  - Category selection for mobile
  - Slide-out drawer
  - RTL support

## Usage

### Main Chat Page Integration

```jsx
import Sidebar from '@/components/chat/Sidebar'
import ChatList from '@/components/chat/ChatList'
import ChatHeader from '@/components/chat/ChatHeader'
import MessagesArea from '@/components/chat/MessagesArea'
import MessageInput from '@/components/chat/MessageInput'
import GroupCreationDialog from '@/components/chat/GroupCreationDialog'
import SettingsDialog from '@/components/chat/SettingsDialog'
import MobileNavigation from '@/components/chat/MobileNavigation'

// In your main component
<div className="flex h-screen bg-background rtl" dir="rtl">
  <Sidebar
    selectedCategory={selectedCategory}
    onCategoryChange={setSelectedCategory}
    userSettings={userSettings}
    onSettingsChange={setUserSettings}
  />
  
  <ChatList
    chats={filteredChats}
    activeChat={activeChat}
    onChatSelect={handleChatSelect}
    onChatPin={handlePinChat}
    onChatDelete={handleDeleteChat}
    onChatsUpdate={loadChats}
  />
  
  <div className="flex-1 flex flex-col min-w-0">
    <ChatHeader
      activeChat={activeChat}
      typingUsers={typingUsers}
      messagesCount={messages.length}
      onChatPin={handlePinChat}
      onChatDelete={handleDeleteChat}
      onAddMember={handleAddMember}
      onGroupSettings={handleGroupSettings}
    />
    
    <MessagesArea
      messages={messages}
      activeChat={activeChat}
      currentUser={user}
      typingUsers={typingUsers}
    />
    
    <MessageInput
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      onSendMessage={handleSendMessage}
      onTyping={handleTyping}
      isSending={isSending}
    />
  </div>
</div>
```

## Features

### RTL Support
All components include proper RTL support with:
- `dir="rtl"` attributes
- Proper spacing classes (`space-x-reverse`)
- Right-to-left text alignment
- Mirrored layouts

### Responsive Design
- Mobile-first approach
- Responsive breakpoints (md:, lg:)
- Mobile navigation drawer
- Adaptive layouts

### Theme Support
- Dark/light mode support
- Custom color themes
- Consistent styling with design system

### Backend Integration
- API calls for all operations
- Socket.io integration for real-time features
- Error handling with toast notifications
- Loading states

## Styling

All components use Tailwind CSS with the following design tokens:
- `bg-background` - Main background
- `bg-card` - Card backgrounds
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `border` - Borders
- `rounded-lg` - Border radius
- `shadow-lg` - Shadows

## Dependencies

- React 18+
- Tailwind CSS
- Lucide React (icons)
- Radix UI components
- Socket.io client
- Axios for API calls

## Backend Requirements

The components expect the following API endpoints:
- `GET /api/chats` - Get user's chats
- `POST /api/chats` - Create new chat
- `GET /api/chats/:id/messages` - Get chat messages
- `POST /api/chats/:id/messages` - Send message
- `POST /api/groups` - Create group
- `GET /api/users/search` - Search users
- `PUT /api/users/settings` - Update user settings

## Socket Events

The components listen for these socket events:
- `new_message` - New message received
- `user_typing` - User typing indicator
- `user_stop_typing` - User stopped typing
- `message_seen` - Message seen confirmation

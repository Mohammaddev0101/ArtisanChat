# ArtisanChat Backend

Backend API for ArtisanChat - Professional messenger for creatives.

## Features

- **Authentication & Authorization**: JWT-based auth with user management
- **Real-time Messaging**: Socket.io for instant messaging
- **File Uploads**: Support for images, videos, and documents
- **Group Management**: Create and manage groups with roles
- **User Search**: Find users by skills, location, and interests
- **Settings Management**: User preferences and theme customization
- **Portfolio Integration**: Showcase creative work
- **Task Management**: Collaborative project management

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/resend-otp` - Resend OTP

### Users
- `GET /api/users/search` - Search users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/settings` - Update settings
- `POST /api/users/:userId/follow` - Follow/unfollow user
- `GET /api/users/suggestions` - Get user suggestions

### Chats
- `GET /api/chats` - Get user's chats
- `POST /api/chats` - Create new chat
- `GET /api/chats/:chatId/messages` - Get chat messages
- `POST /api/chats/:chatId/messages` - Send message
- `PUT /api/chats/:chatId/messages/:messageId/seen` - Mark message as seen
- `DELETE /api/chats/:chatId` - Delete chat

### Groups
- `POST /api/groups` - Create group
- `GET /api/groups/:groupId` - Get group details
- `PUT /api/groups/:groupId` - Update group
- `POST /api/groups/:groupId/members` - Add member
- `DELETE /api/groups/:groupId/members/:userId` - Remove member
- `PUT /api/groups/:groupId/members/:userId` - Update member role
- `GET /api/groups/search` - Search groups

### Upload
- `POST /api/upload` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files

## Socket Events

### Client to Server
- `join_chat` - Join a chat room
- `leave_chat` - Leave a chat room
- `send_message` - Send a message
- `typing_start` - Start typing indicator
- `typing_stop` - Stop typing indicator
- `mark_seen` - Mark message as seen

### Server to Client
- `new_message` - New message received
- `user_typing` - User is typing
- `user_stop_typing` - User stopped typing
- `message_seen` - Message seen confirmation
- `user_online` - User came online
- `user_offline` - User went offline

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/artisanchat
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:3000
SOCKET_URL=http://localhost:5000
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Database Schema

### User
- Basic profile information
- Skills and location
- Settings and preferences
- Followers/following relationships

### Chat
- Private and group chats
- Messages with attachments
- Typing indicators
- Message seen status

### Group
- Group information and settings
- Member management with roles
- Task integration

## Error Handling

All API responses follow this format:

```json
{
  "success": boolean,
  "message": string,
  "data": object,
  "error": string (development only)
}
```

## Security

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation
- File upload restrictions

## Development

The server runs on port 5000 by default. Socket.io is configured for real-time communication with the frontend.

## Recent Updates

- ✅ Fixed message sending validation
- ✅ Added attachments support
- ✅ Improved error handling
- ✅ Enhanced user settings
- ✅ Added file upload functionality
- ✅ Fixed group creation response format
- ✅ Improved socket message handling
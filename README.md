# ArtisanChat - Professional Messenger for Creatives

**"Where art transforms into creativity and conversation!"**

ArtisanChat is a modern, feature-rich messaging platform specifically designed for creative professionals including graphic designers, photographers, writers, and freelancers. It combines the functionality of a modern messenger with specialized tools for creative collaboration.

## 🎨 Features

### 💬 **Secure Messaging**
- End-to-end encrypted private and group chats
- Real-time messaging with Socket.IO
- Typing indicators and message status (sent, delivered, seen)
- File sharing (images, videos, documents, design files)
- Emoji support and rich text formatting

### 🖼️ **Portfolio Gallery**
- Upload and showcase creative work
- Like and comment system
- Category and tag-based filtering
- View tracking and analytics
- Professional portfolio presentation

### 📋 **Project Management**
- Task creation and assignment
- Status tracking (pending, in-progress, completed)
- Due date notifications
- Group-based project organization
- Time tracking and progress monitoring

### 👥 **Professional Networking**
- User profiles with skills and bio
- Follow/unfollow system
- Search users by skills and location
- Professional recommendations

### 🏢 **Group Collaboration**
- Create and manage creative groups
- Role-based permissions (admin, moderator, member)
- Group chat with all messaging features
- Shared project management

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Socket.IO Client** - Real-time communication
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### Additional Tools
- **Cloudinary** - Media management and optimization
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/artisan-chat.git
   cd artisan-chat
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../Backend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the Backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   
   MONGODB_URI=mongodb://localhost:27017/artisanchat
   JWT_SECRET=your-super-secret-jwt-key-here
   
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

5. **Start the Development Servers**
   
   Backend (Terminal 1):
   ```bash
   cd Backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd Frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
artisan-chat/
├── Frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts
│   │   ├── lib/            # Utility functions and API
│   │   └── styles/         # Global styles
│   ├── public/             # Static assets
│   └── package.json
├── Backend/                 # Node.js backend application
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── socket/             # Socket.IO handlers
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/search` - Search users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/:userId/follow` - Follow/unfollow user

### Chats
- `GET /api/chats` - Get user chats
- `POST /api/chats` - Create new chat
- `GET /api/chats/:chatId/messages` - Get chat messages
- `POST /api/chats/:chatId/messages` - Send message

### Groups
- `POST /api/groups` - Create group
- `GET /api/groups/:groupId` - Get group details
- `PUT /api/groups/:groupId` - Update group
- `POST /api/groups/:groupId/members` - Add member

### Portfolios
- `POST /api/portfolios` - Create portfolio
- `GET /api/portfolios/:userId` - Get user portfolios
- `POST /api/portfolios/:portfolioId/like` - Like portfolio
- `POST /api/portfolios/:portfolioId/comment` - Add comment

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/group/:groupId` - Get group tasks
- `PUT /api/tasks/:taskId` - Update task
- `PUT /api/tasks/:taskId/status` - Update task status

## 🎨 Design Features

- **Glassmorphism UI** - Modern glass-like design elements
- **Responsive Design** - Works on all device sizes
- **RTL Support** - Full Persian language support
- **Dark/Light Themes** - User preference themes
- **Smooth Animations** - Framer Motion powered transitions
- **Modern Typography** - Vazirmatn font for Persian text

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet security headers

## 📱 Progressive Web App

- Service worker for offline functionality
- App manifest for installation
- Optimized for mobile devices
- Push notifications support

## 🌐 SEO Optimization

- Server-side rendering with Next.js
- Optimized meta tags and Open Graph
- Structured data markup
- Sitemap generation
- Robots.txt configuration

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd Frontend
npm run build
# Deploy to Vercel
```

### Backend (Heroku/Railway)
```bash
cd Backend
# Set environment variables
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development** - Next.js, React, Tailwind CSS
- **Backend Development** - Node.js, Express, MongoDB
- **UI/UX Design** - Modern glassmorphism design
- **DevOps** - Deployment and optimization

## 📞 Support

For support, email support@artisanchat.com or join our community chat.

## 🙏 Acknowledgments

- Thanks to all creative professionals who inspired this project
- Open source community for amazing tools and libraries
- Beta testers for valuable feedback

---

**ArtisanChat** - Empowering creative professionals with modern communication tools.
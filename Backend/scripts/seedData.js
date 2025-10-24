const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Group = require('../models/Group')
const Chat = require('../models/Chat')
const Portfolio = require('../models/Portfolio')
const Task = require('../models/Task')

// Connect to MongoDB
mongoose.connect('mongodb+srv://ebn1d_db_user:jh30Nd1x6ghMYuBu@artisan.d4mianx.mongodb.net/?appName=Artisan', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const skills = [
  'طراحی گرافیک', 'عکاسی', 'نقاشی', 'طراحی وب', 'UI/UX', 'برنامه‌نویسی',
  'نویسندگی', 'تدوین ویدیو', 'انیمیشن', 'طراحی لوگو', 'فتوشاپ', 'ایلاستریتور',
  'فیگما', 'ادوبی پریمیر', 'آفتر افکت', 'سینما 4D', 'بلندر', 'طراحی داخلی',
  'معماری', 'طراحی لباس', 'صنایع دستی', 'خوشنویسی', 'طراحی کارت ویزیت',
  'طراحی پوستر', 'طراحی اپلیکیشن', 'React', 'Vue.js', 'Node.js', 'Python'
]

const locations = [
  'تهران', 'اصفهان', 'شیراز', 'مشهد', 'تبریز', 'کرج', 'اهواز', 'قم',
  'کرمانشاه', 'ارومیه', 'زاهدان', 'رشت', 'یزد', 'کرمان', 'همدان', 'اردبیل'
]

const categories = [
  'طراحی گرافیک', 'عکاسی', 'نقاشی', 'طراحی وب', 'برنامه‌نویسی', 'نویسندگی',
  'تدوین ویدیو', 'انیمیشن', 'طراحی داخلی', 'معماری', 'صنایع دستی'
]

const portfolioCategories = [
  'graphic-design', 'photography', 'illustration', 'web-design', 
  'ui-ux', 'branding', 'animation', 'video', 'writing', 'other'
]

const taskCategories = [
  'design', 'development', 'content', 'review', 'meeting', 'other'
]

const priorities = ['low', 'medium', 'high', 'urgent']
const statuses = ['pending', 'in-progress', 'review', 'completed', 'cancelled']

// Generate random Persian names
const firstNames = [
  'Ali', 'Mohammad', 'Hassan', 'Hossein', 'Ahmad', 'Mahmoud', 'Reza', 'Abdullah', 'Mahdi', 'Amir',
  'Fatemeh', 'Zahra', 'Maryam', 'Aisha', 'Narges', 'Sara', 'Nazanin', 'Mahsa', 'Niloofar', 'Roya'
]

const lastNames = [
  'Ahmadi', 'Mohammadi', 'Hosseini', 'Rezaei', 'Karimi', 'Noori', 'Sadeghi', 'Ghasemi', 'Mousavi', 'Jafari',
  'Kazemi', 'Taheri', 'Nazari', 'Bagheri', 'Sharifi', 'Mahdavi', 'Heydari', 'Alizadeh', 'Rahmani', 'Salehi'
]

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomElements(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function generateRandomName() {
  const firstName = getRandomElement(firstNames)
  const lastName = getRandomElement(lastNames)
  return `${firstName} ${lastName}`
}

function generateRandomUsername(fullName) {
  const nameParts = fullName.split(' ')
  const randomNum = Math.floor(Math.random() * 1000)
  return `${nameParts[0].toLowerCase()}${randomNum}`
}

function generateRandomEmail(username) {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com']
  const domain = getRandomElement(domains)
  return `${username}@${domain}`
}

async function seedUsers() {
  console.log('🌱 Seeding users...')
  
  // Clear existing users
  await User.deleteMany({})
  
  const users = []
  
  for (let i = 0; i < 30; i++) {
    const fullName = generateRandomName()
    const username = generateRandomUsername(fullName)
    const email = generateRandomEmail(username)
    
    const hashedPassword = await bcrypt.hash('1234', 10)
    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      bio: `من ${getRandomElements(skills, 3).join('، ')} کار می‌کنم و علاقه‌مند به ${getRandomElement(categories)} هستم.`,
      skills: getRandomElements(skills, Math.floor(Math.random() * 5) + 2),
      location: getRandomElement(locations),
      profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=3b82f6&color=ffffff&size=200`,
      isVerified: true,
      isOnline: Math.random() > 0.7, // 30% chance of being online
      lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last week
      settings: {
        theme: getRandomElement(['light', 'dark']),
        themeColor: getRandomElement(['blue', 'green', 'purple', 'red', 'orange']),
        language: 'fa',
        timezone: 'Asia/Tehran',
        fontSize: getRandomElement(['small', 'medium', 'large']),
        notifications: {
          email: Math.random() > 0.3,
          push: Math.random() > 0.2,
          messages: Math.random() > 0.1,
          tasks: Math.random() > 0.1
        },
        sounds: Math.random() > 0.2,
        desktopNotifications: Math.random() > 0.5,
        showOnlineStatus: Math.random() > 0.1,
        readReceipts: Math.random() > 0.1,
        typingIndicator: Math.random() > 0.1
      }
    })
    
    users.push(user)
  }
  
  await User.insertMany(users)
  console.log(`✅ Created ${users.length} users`)
  return users
}

async function seedGroups(users) {
  console.log('🌱 Seeding groups...')
  
  await Group.deleteMany({})
  await Chat.deleteMany({})
  
  const groups = []
  const chats = []
  
  const groupCategories = ['design', 'photography', 'writing', 'development', 'marketing', 'other']

  for (let i = 0; i < 15; i++) {
    const admin = getRandomElement(users)
    const members = getRandomElements(users.filter(u => u._id.toString() !== admin._id.toString()), Math.floor(Math.random() * 8) + 2)
    
    // Pick a category for this group
    const category = getRandomElement(groupCategories)

    // Create group chat
    const chat = new Chat({
      type: 'group',
      participants: [admin._id, ...members.map(m => m._id)],
      name: `گروه ${category} ${i + 1}`,
      description: `گروهی برای ${category} کاران و علاقه‌مندان`,
      admins: [admin._id]
    })
    
    await chat.save()
    chats.push(chat)
    
    // Create group
    const group = new Group({
      name: chat.name,
      description: chat.description,
      admin: admin._id,
      members: [
        { user: admin._id, role: 'admin' },
        ...members.map(member => ({ 
          user: member._id, 
          role: Math.random() > 0.8 ? 'moderator' : 'member' 
        }))
      ],
      chat: chat._id,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=10b981&color=ffffff&size=200`,
      category: category,
      tags: getRandomElements(skills, Math.floor(Math.random() * 4) + 1),
      settings: {
        isPrivate: Math.random() > 0.7,
        allowMemberInvite: Math.random() > 0.3,
        allowFileSharing: Math.random() > 0.1,
        maxMembers: Math.floor(Math.random() * 50) + 20
      }
    })
    
    await group.save()
    groups.push(group)
  }
  
  console.log(`✅ Created ${groups.length} groups`)
  return { groups, chats }
}

async function seedPortfolios(users) {
  console.log('🌱 Seeding portfolios...')
  
  await Portfolio.deleteMany({})
  
  const portfolios = []
  
  for (let i = 0; i < 50; i++) {
    const user = getRandomElement(users)
    const category = getRandomElement(portfolioCategories)
    
    const portfolio = new Portfolio({
      user: user._id,
      title: `کار ${getRandomElement(categories)} ${i + 1}`,
      description: `توضیحات کامل پروژه ${getRandomElement(categories)} که با دقت و مهارت انجام شده است.`,
      fileUrl: `https://picsum.photos/800/600?random=${i}`,
      fileName: `portfolio_${i + 1}.jpg`,
      fileSize: Math.floor(Math.random() * 5000000) + 100000, // 100KB to 5MB
      fileType: getRandomElement(['image', 'video', 'document', 'design']),
      thumbnailUrl: `https://picsum.photos/400/300?random=${i}`,
      tags: getRandomElements(skills, Math.floor(Math.random() * 4) + 1),
      category,
      metadata: {
        dimensions: {
          width: Math.floor(Math.random() * 2000) + 800,
          height: Math.floor(Math.random() * 2000) + 600
        },
        software: getRandomElement(['Photoshop', 'Illustrator', 'Figma', 'After Effects', 'Cinema 4D', 'Blender']),
        client: `مشتری ${i + 1}`,
        projectDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      },
      visibility: getRandomElement(['public', 'private', 'followers']),
      allowComments: Math.random() > 0.1,
      allowDownload: Math.random() > 0.7,
      isFeatured: Math.random() > 0.8,
      analytics: {
        totalViews: Math.floor(Math.random() * 1000),
        uniqueViews: Math.floor(Math.random() * 500),
        totalLikes: Math.floor(Math.random() * 100),
        totalComments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 10)
      }
    })
    
    // Add some likes
    const likeCount = Math.floor(Math.random() * 20)
    for (let j = 0; j < likeCount; j++) {
      const liker = getRandomElement(users)
      if (liker._id.toString() !== user._id.toString()) {
        portfolio.likes.push({
          user: liker._id,
          likedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        })
      }
    }
    
    // Add some comments
    const commentCount = Math.floor(Math.random() * 10)
    for (let j = 0; j < commentCount; j++) {
      const commenter = getRandomElement(users)
      portfolio.comments.push({
        user: commenter._id,
        content: `نظر ${j + 1}: کار بسیار زیبا و حرفه‌ای است! 👏`,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      })
    }
    
    await portfolio.save()
    portfolios.push(portfolio)
  }
  
  // Update user portfolios
  for (const user of users) {
    const userPortfolios = portfolios.filter(p => p.user.toString() === user._id.toString())
    user.portfolio = userPortfolios.map(p => p._id)
    await user.save()
  }
  
  console.log(`✅ Created ${portfolios.length} portfolios`)
  return portfolios
}

async function seedTasks(groups) {
  console.log('🌱 Seeding tasks...')
  
  await Task.deleteMany({})
  
  const tasks = []
  
  for (let i = 0; i < 100; i++) {
    const group = getRandomElement(groups)
    const createdBy = getRandomElement(group.members).user
    const assignedTo = Math.random() > 0.3 ? getRandomElement(group.members).user : null
    
    const task = new Task({
      title: `تسک ${getRandomElement(categories)} ${i + 1}`,
      description: `توضیحات کامل تسک ${getRandomElement(categories)} که باید با دقت انجام شود.`,
      group: group._id,
      assignedTo,
      createdBy,
      status: getRandomElement(statuses),
      priority: getRandomElement(priorities),
      dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date in next 30 days
      startDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date in last week
      category: getRandomElement(taskCategories),
      tags: getRandomElements(skills, Math.floor(Math.random() * 3) + 1),
      timeTracking: {
        estimatedHours: Math.floor(Math.random() * 20) + 1,
        actualHours: Math.floor(Math.random() * 15)
      },
      subtasks: Array.from({ length: Math.floor(Math.random() * 5) }, (_, j) => ({
        title: `زیرتسک ${j + 1}`,
        completed: Math.random() > 0.5,
        completedBy: Math.random() > 0.5 ? getRandomElement(group.members).user : null,
        completedAt: Math.random() > 0.5 ? new Date() : null
      }))
    })
    
    // Add some comments
    const commentCount = Math.floor(Math.random() * 5)
    for (let j = 0; j < commentCount; j++) {
      const commenter = getRandomElement(group.members).user
      task.comments.push({
        user: commenter,
        content: `نظر ${j + 1}: پیشرفت خوبی داریم! 👍`,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      })
    }
    
    // Add activity log
    task.activities.push({
      user: createdBy,
      action: 'created',
      details: 'تسک ایجاد شد',
      timestamp: new Date()
    })
    
    if (assignedTo) {
      task.activities.push({
        user: createdBy,
        action: 'assigned',
        details: 'تسک به کاربر اختصاص داده شد',
        timestamp: new Date()
      })
    }
    
    await task.save()
    tasks.push(task)
    
    // Add task to group
    group.tasks.push(task._id)
    await group.save()
  }
  
  console.log(`✅ Created ${tasks.length} tasks`)
  return tasks
}

async function seedChats(users, groups) {
  console.log('🌱 Seeding private chats...')
  
  const privateChats = []
  
  // Create some private chats between users
  for (let i = 0; i < 20; i++) {
    const participants = getRandomElements(users, 2)
    
    const chat = new Chat({
      type: 'private',
      participants: participants.map(p => p._id),
      lastMessage: {
        content: `پیام نمونه ${i + 1}`,
        sender: participants[0]._id,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        type: 'text'
      }
    })
    
    // Add some messages
    const messageCount = Math.floor(Math.random() * 20) + 5
    for (let j = 0; j < messageCount; j++) {
      const sender = getRandomElement(participants)
      chat.messages.push({
        sender: sender._id,
        content: `پیام ${j + 1} از ${sender.fullName}`,
        type: 'text',
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      })
    }
    
    await chat.save()
    privateChats.push(chat)
  }
  
  console.log(`✅ Created ${privateChats.length} private chats`)
  return privateChats
}

async function seedData() {
  try {
    console.log('🚀 Starting database seeding...')
    
    // Seed users
    const users = await seedUsers()
    
    // Seed groups and their chats
    const { groups, chats } = await seedGroups(users)
    
    // Seed portfolios
    const portfolios = await seedPortfolios(users)
    
    // Seed tasks
    const tasks = await seedTasks(groups)
    
    // Seed private chats
    const privateChats = await seedChats(users, groups)
    
    console.log('🎉 Database seeding completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - Users: ${users.length}`)
    console.log(`   - Groups: ${groups.length}`)
    console.log(`   - Group Chats: ${chats.length}`)
    console.log(`   - Private Chats: ${privateChats.length}`)
    console.log(`   - Portfolios: ${portfolios.length}`)
    console.log(`   - Tasks: ${tasks.length}`)
    console.log('\n🔑 All users have password: 1234')
    
  } catch (error) {
    console.error('❌ Seeding failed:', error)
  } finally {
    mongoose.connection.close()
  }
}

// Run seeding
seedData()

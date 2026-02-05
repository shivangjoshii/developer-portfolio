# Project Setup & Deployment Guide

This guide covers the complete setup of your full-stack portfolio application with Express backend, MongoDB, admin panel, and enhanced features.

## 📋 Table of Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Running Locally](#running-locally)
4. [Features](#features)
5. [API Documentation](#api-documentation)
6. [Admin Panel Guide](#admin-panel-guide)
7. [Deployment](#deployment)

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Clone and Install
```bash
git clone <your-repo-url>
cd developer-portfolio
npm install
```

### Additional Backend Setup
```bash
# Install backend dependencies (if needed separately)
npm install express cors mongoose nodemailer dotenv
```

---

## ⚙️ Configuration

### 1. Environment Variables
Create a `.env.local` file in the project root with the following variables:

```env
# Frontend
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Backend Server
BACKEND_PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com

# Admin Authentication
ADMIN_KEY=your-secure-admin-key-change-this

# Optional: Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

### 2. Gmail Configuration for Emails

To send emails using Gmail:

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable "Less secure app access" OR use Google App Passwords:
   - Go to [Security Settings](https://myaccount.google.com/security)
   - Select "App passwords"
   - Choose Mail and Windows Computer
   - Copy the generated password
   - Use this in `EMAIL_PASSWORD`

### 3. MongoDB Setup

**Local Installation:**
```bash
# On Windows, download MongoDB Community Server
# Then start MongoDB service:
mongod
```

**Or use MongoDB Atlas (Cloud):**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`

---

## ▶️ Running Locally

### Development Mode
```bash
npm run dev
```

This runs both the Next.js frontend and Express backend concurrently:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

### Separate Terminal Mode (Optional)
```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend
```

---

## ✨ Features

### 1. **Project Management (Admin Panel)**
- Create, Read, Update, Delete projects
- Mark projects as featured
- Organize with custom ordering
- Draft/Archive status management
- **Access:** `http://localhost:3000/admin/login`

### 2. **Redesigned Project Cards**
- Modern glass-morphism design
- Smooth hover animations
- Tech stack badges
- Direct links to code and demo
- Responsive grid layout
- Image optimization

### 3. **Enhanced Contact Form**
- **Spline 3D** element integration
- SMTP email notifications
- Two-way email communication
  - Confirmation email to user
  - Admin notification
- Real-time form validation
- Character count feedback
- Better UI with form groups

### 4. **Admin Dashboard**
- Project management
- Contact message viewer
- Mark messages as read/replied
- Delete old messages
- Admin authentication with API key
- Mobile responsive sidebar

### 5. **API Endpoints**

#### Public Endpoints
```
GET /api/projects                    - Get all active projects
GET /api/projects/:id                - Get single project
GET /api/projects/featured/projects  - Get featured projects only
POST /api/contact                    - Submit contact form
```

#### Admin Endpoints (Require x-admin-key header)
```
GET /api/admin/projects              - Get all projects (including drafts)
POST /api/admin/projects             - Create new project
PUT /api/admin/projects/:id          - Update project
DELETE /api/admin/projects/:id       - Delete project
PATCH /api/admin/projects/reorder    - Reorder projects

GET /api/contact                     - Get all contact messages
PATCH /api/contact/:id/read          - Mark as read
DELETE /api/contact/:id              - Delete message
```

---

## 🔐 Admin Panel Guide

### Login
1. Navigate to `http://localhost:3000/admin/login`
2. Enter your `ADMIN_KEY` from `.env.local`
3. Click "Login"

### Managing Projects
1. Click "Add Project" button
2. Fill in project details:
   - **Name:** Project title
   - **Description:** Detailed description (max 2000 characters)
   - **Role:** Your role (e.g., "Full Stack Developer")
   - **Tools:** Technologies used (comma-separated)
   - **Image URL:** Project screenshot/thumbnail
   - **Code URL:** GitHub repository link
   - **Demo URL:** Live project link
   - **Featured:** Toggle for featured projects
   - **Status:** Active, Draft, or Archived

### Viewing Contact Messages
1. Click "Contact Messages" in sidebar
2. See all visitor messages
3. Mark as read/delete messages
4. View timestamps and status

---

## 📦 Deployment

### Frontend (Netlify)
1. Push to GitHub
2. Connect Netlify to your repo
3. Set environment variables:
   ```
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   NEXT_PUBLIC_BACKEND_URL=https://api.your-domain.com
   ```
4. Deploy

### Backend (Heroku/Railway/Render)

#### Using Heroku:
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
git push heroku main
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set EMAIL_USER="your_email"
heroku config:set EMAIL_PASSWORD="your_password"
heroku config:set ADMIN_KEY="your_secure_key"
```

#### Using Railway:
1. Push to GitHub
2. Connect Railway to your repo
3. Set environment variables in Railway dashboard
4. Auto-deploys on push

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: Cannot connect to MongoDB
```
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` is correct
- If using Atlas, ensure IP is whitelisted

### Email Not Sending
```
Error: Failed to send email
```
**Solution:**
- Verify Gmail credentials
- Use App Password instead of regular password
- Enable "Less secure app access"
- Check `EMAIL_USER` and `EMAIL_PASSWORD`

### Admin Key Invalid
```
Unauthorized - Invalid admin key
```
**Solution:**
- Ensure `ADMIN_KEY` is set in `.env.local`
- Check key matches between login and API calls
- Restart server after updating env variables

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Kill process on port 5000
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

---

## 📝 File Structure

```
developer-portfolio/
├── app/
│   ├── admin/
│   │   ├── login/page.js
│   │   └── dashboard/page.js
│   │   └── contacts/page.js
│   └── components/
│       ├── admin/
│       │   ├── admin-sidebar.jsx
│       │   ├── add-project-modal.jsx
│       │   ├── edit-project-modal.jsx
│       │   └── projects-list.jsx
│       └── homepage/
│           ├── contact/
│           │   └── contact-form.jsx
│           └── projects/
│               └── project-card.jsx
├── server/
│   ├── models/
│   │   ├── ProjectModel.js
│   │   └── ContactModel.js
│   └── routes/
│       ├── projectRoutes.js
│       ├── contactRoutes.js
│       └── adminRoutes.js
├── utils/
│   └── contact-service.js
├── server.js
├── package.json
└── .env.local
```

---

## 🎨 Design Consistency

All components follow this design system:
- **Primary Color:** `#16f2b3` (Cyan/Teal)
- **Accent:** Pink `#FF006E` → Violet `#6366F1`
- **Background:** Dark blue gradient
- **Border:** `#1b2c68a0` → Hover: `#16f2b3`
- **Text:** Light gray `#d3d8e8`

---

## 📞 Support

For issues or questions:
1. Check MongoDB connection
2. Verify environment variables
3. Review API endpoints
4. Check browser console for errors

---

## 🎉 You're All Set!

Your portfolio is now fully functional with:
✅ Project API integration
✅ Admin panel for CRUD operations
✅ Redesigned project cards
✅ Enhanced contact form with Spline 3D
✅ SMTP email notifications
✅ Complete design consistency

Happy coding! 🚀

# 🔐 Admin Panel Setup Guide

## Quick Start

### 1. **Generate Your Super Admin Key**

Run this command in your terminal to generate a secure admin key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This will output something like:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

**Copy this value and save it somewhere safe!**

---

### 2. **Configure Environment Variables**

Edit your `.env.local` file and update these sections:

#### **MongoDB Setup**

**Option A: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```
[Download MongoDB Community](https://www.mongodb.com/try/download/community)

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

#### **Gmail SMTP Setup**

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Select **Security** from the left menu
3. Scroll down to **App passwords** (only visible if 2-Step Verification is enabled)
   - If not visible, enable **2-Step Verification** first
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Update `.env.local`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
ADMIN_EMAIL=your-email@gmail.com
```

#### **Cloudinary Setup**

1. Sign up at [cloudinary.com](https://cloudinary.com) (Free tier = 25GB/month)
2. Go to **Dashboard**
3. Copy your **Cloud Name** from the top
4. Go to **Settings > API Keys**
5. Copy your **API Key**
6. Go to **Settings > Upload > Add upload preset**
   - Name: `portfolio`
   - Mode: `Unsigned`
7. Update `.env.local`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=portfolio
```

#### **Admin Key Setup**

Paste your generated secure key:
```env
ADMIN_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

---

### 3. **Install Dependencies**

```bash
npm install
```

---

### 4. **Start the Application**

This command starts both frontend and backend simultaneously:

```bash
npm run dev
```

You'll see output like:
```
> portfolio@1.0.0 dev
> concurrently "npm run dev:frontend" "npm run dev:backend"

[1] > next dev
[2] > node server.js
[2] Server running on http://localhost:5000
[1] ▲ Next.js 15.2.2
[1] - Local:        http://localhost:3000
```

---

## 🚪 Accessing the Admin Panel

### Login URL
```
http://localhost:3000/admin/login
```

### Credentials
- **Admin Key**: The value you set in `ADMIN_KEY` in `.env.local`

### What You Can Do

#### **Projects Dashboard**
- ✅ Create new projects
- ✅ Edit existing projects
- ✅ Upload project images to Cloudinary
- ✅ Delete projects
- ✅ Mark projects as featured
- ✅ Set project status (active/draft/archived)
- ✅ Reorder projects (drag & drop coming soon)

**URL**: `http://localhost:3000/admin/dashboard`

#### **Contact Messages**
- ✅ View all contact form submissions
- ✅ Mark messages as read
- ✅ Reply to messages (opens email)
- ✅ Delete messages
- ✅ Filter by status

**URL**: `http://localhost:3000/admin/contacts`

---

## 🔒 Security Features

### What's Protected?

✅ **Login Page** - Requires valid ADMIN_KEY  
✅ **Dashboard** - Requires authentication  
✅ **All Admin API Endpoints** - Server-side key validation  
✅ **Database Operations** - Only verified admins can modify  
✅ **Image Uploads** - Secured through Cloudinary  

### How It Works

1. You enter your ADMIN_KEY on the login page
2. System verifies it by making an API call to the backend
3. If valid, your key is stored in **localStorage** (browser only)
4. Every admin action sends your key to verify authenticity
5. If you close the browser, you'll need to login again

### Security Best Practices

- ⚠️ **Never share your ADMIN_KEY** with anyone
- ⚠️ **Never commit `.env.local`** to git (already in .gitignore)
- ⚠️ **Use a strong, random key** (use the generator above)
- ✅ **Change your key regularly** if you suspect it's compromised
- ✅ **Use HTTPS in production** for secure communication
- ✅ **Keep your Gmail App Password safe**
- ✅ **Rotate Cloudinary API keys** periodically

---

## 📝 Admin Panel Features

### Create/Edit Project

**Fields:**
- **Name**: Project title (max 100 characters)
- **Description**: Project details (max 2000 characters)
- **Role**: Your role in the project (e.g., "Full Stack Developer")
- **Tools**: Technologies used (comma-separated, e.g., "React, Node.js, MongoDB")
- **Code URL**: Link to GitHub repository
- **Demo URL**: Link to live project demo
- **Image**: Upload to Cloudinary (recommended) or use direct URL
- **Featured**: Mark as featured project (shows in special section)
- **Status**: Active, Draft, or Archived

### Project Status Explained

- **Active** (Green) - Visible on your portfolio
- **Draft** (Yellow) - Hidden from portfolio, visible only in admin
- **Archived** (Red) - Hidden from portfolio and inactive

### Featured Projects

Projects marked as "Featured":
- Show up in a special featured section
- Get a ⭐ badge on the card
- Have higher visibility on your portfolio

---

## ✉️ Contact Form Integration

### How It Works

1. Visitor fills contact form on your portfolio
2. Message is saved to MongoDB
3. **Two emails are sent:**
   - ✉️ **To visitor**: "Thank you for contacting me"
   - ✉️ **To admin (you)**: New message notification

### Viewing Messages

1. Go to `/admin/contacts`
2. See all messages with:
   - Visitor's name and email
   - Message content
   - Timestamp
   - Status (New, Read, Replied)

### Replying to Messages

1. Click the message
2. Click "Reply" button
3. Your default email client opens
4. Mark as replied in admin panel

---

## 🖼️ Cloudinary Image Upload

### Why Cloudinary?

- ✅ Free tier (25GB/month)
- ✅ Automatic image optimization
- ✅ CDN delivery (fast everywhere)
- ✅ No server storage needed
- ✅ Easy image manipulation

### How to Use

1. In admin panel, click "Add Project"
2. Click "Upload Image" button
3. Cloudinary widget opens
4. Select image from your computer
5. Click "Upload"
6. Image is automatically saved to Cloudinary
7. Link is added to your form

---

## 🛠️ Available Commands

```bash
# Start both frontend and backend
npm run dev

# Start only frontend (Next.js)
npm run dev:frontend

# Start only backend (Express)
npm run dev:backend

# Build for production
npm run build

# Start production build
npm run start
```

---

## 🐛 Troubleshooting

### "Invalid admin key" error

**Solution**: Make sure your ADMIN_KEY in `.env.local` is exactly correct. Copy-paste it again to be sure.

### "Cannot connect to MongoDB"

**Solution**: 
- If local: Make sure MongoDB server is running (`mongod` command)
- If Atlas: Check your connection string has correct username/password

### "Email not sending"

**Solution**:
- Verify 2-Step Verification is enabled on Gmail
- Check App Password was generated correctly
- Check ADMIN_EMAIL is valid
- Check EMAIL_PASSWORD is exactly correct (no extra spaces)

### "Cloudinary upload not working"

**Solution**:
- Verify CLOUDINARY_CLOUD_NAME is correct
- Make sure upload preset is named "portfolio" (case-sensitive)
- Check that upload preset is set to "Unsigned" mode

### "Backend not connecting"

**Solution**:
- Make sure `npm run dev:backend` is running (check terminal)
- Check NEXT_PUBLIC_BACKEND_URL is correct (`http://localhost:5000`)
- Check port 5000 is not in use by another app

---

## 📊 API Endpoints

### Public Endpoints (No Auth Required)

```
GET  /api/projects              → Get all active projects
GET  /api/projects/:id          → Get specific project
GET  /api/projects/featured     → Get featured projects
POST /api/contact               → Submit contact form
```

### Admin Endpoints (Requires ADMIN_KEY header)

```
Header: x-admin-key: your-admin-key

GET    /api/admin/projects              → Get all projects (including drafts)
POST   /api/admin/projects              → Create new project
PUT    /api/admin/projects/:id          → Update project
DELETE /api/admin/projects/:id          → Delete project
PATCH  /api/admin/projects/reorder      → Reorder projects
```

---

## 🚀 Production Deployment

### Before Deploying

1. **Change ADMIN_KEY** to a new secure value
2. **Use MongoDB Atlas** (not local MongoDB)
3. **Update NEXT_PUBLIC_BACKEND_URL** to your domain
4. **Generate HTTPS certificates** for your domain
5. **Keep .env.local in .gitignore** (never commit)
6. **Set strong, random keys** for all secrets

### Environment for Production

Update `.env.local` on your production server:

```env
# Production URLs
NEXT_PUBLIC_APP_URL=https://yourportfolio.com
NEXT_PUBLIC_BACKEND_URL=https://yourportfolio.com/api

# Production Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio

# Strong Admin Key (generate new one!)
ADMIN_KEY=generate-new-secure-key-for-production

# Other configs stay the same
NODE_ENV=production
```

---

## 📞 Support

If you encounter issues:

1. Check the error message carefully
2. Review this guide's troubleshooting section
3. Check terminal/console for error logs
4. Verify all environment variables are set correctly
5. Make sure all services (MongoDB, email, Cloudinary) are connected

---

## ✨ Features Summary

- ✅ Admin login with secure key authentication
- ✅ Project management (CRUD operations)
- ✅ Cloudinary image uploads
- ✅ Contact form integration
- ✅ Email notifications (SMTP)
- ✅ Responsive design
- ✅ Protected API endpoints
- ✅ MongoDB data persistence
- ✅ Project status management
- ✅ Featured projects
- ✅ Visitor message tracking

---

**Made with ❤️ for your portfolio**

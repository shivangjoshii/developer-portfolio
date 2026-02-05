# 🚀 Quick Start Guide

## First Time Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env.local`
Copy the example and update with your values:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:
- MongoDB URI
- Email credentials
- Admin key

### 3. Start Services
```bash
# Ensure MongoDB is running
mongod

# In another terminal, start the app
npm run dev
```

### 4. Access the Application
- **Portfolio:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
- **API:** http://localhost:5000/api

---

## 🔑 Default Admin Setup

1. Set `ADMIN_KEY` in `.env.local` (e.g., `super-secret-key-123`)
2. Go to http://localhost:3000/admin/login
3. Enter the key to access dashboard

---

## 📧 Email Setup (Gmail)

1. [Create Google App Password](https://myaccount.google.com/apppasswords)
2. Copy the generated password
3. Update `.env.local`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=where-to-send-admin-notifications@gmail.com
   ```

---

## 🎯 Key Features Access

| Feature | URL | Description |
|---------|-----|-------------|
| Homepage | http://localhost:3000 | Your portfolio site |
| Admin Login | http://localhost:3000/admin/login | Admin authentication |
| Admin Dashboard | http://localhost:3000/admin/dashboard | Manage projects |
| Admin Contacts | http://localhost:3000/admin/contacts | View messages |
| API Docs | See `SETUP_GUIDE.md` | Full API reference |

---

## ✨ What's New

### API Endpoints for Projects
- Fetch projects from database
- Admin CRUD operations
- Featured projects filtering

### Admin Panel Features
- Create/Edit/Delete projects
- View contact messages
- Manage project visibility and order
- Admin authentication

### Redesigned Components
- Modern project cards with hover effects
- Enhanced contact form with Spline 3D
- Responsive design with Tailwind CSS
- Glass-morphism effects

### Email Integration
- SMTP-based contact form
- Auto-reply to visitors
- Admin notifications
- Error handling

---

## 📚 Full Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:
- Detailed configuration
- API documentation
- Deployment instructions
- Troubleshooting guide
- File structure

---

## 🆘 Common Issues

**Backend not running?**
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000
```

**MongoDB connection error?**
```bash
# Start MongoDB
mongod
```

**Email not sending?**
- Verify app password (not regular password)
- Check email credentials in `.env.local`
- See SETUP_GUIDE.md for detailed steps

---

## 🎓 Next Steps

1. **Add Your Projects:**
   - Go to Admin Dashboard
   - Click "Add Project"
   - Fill in details and save

2. **Customize Spline 3D:**
   - Visit https://spline.design
   - Create your own 3D scene
   - Replace URL in contact form

3. **Set Up Emails:**
   - Configure SMTP credentials
   - Test contact form

4. **Deploy:**
   - Frontend to Netlify/Vercel
   - Backend to Heroku/Railway
   - See SETUP_GUIDE.md for details

---

**Questions?** Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) or review the API documentation.

Happy building! 🎉

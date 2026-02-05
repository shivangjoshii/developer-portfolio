# 🎯 Complete Admin Panel Documentation

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Admin Key Generation & Setup](#admin-key-generation--setup)
3. [Environment Variables](#environment-variables)
4. [Accessing Admin Panel](#accessing-admin-panel)
5. [Features & Usage](#features--usage)
6. [API Reference](#api-reference)
7. [Security](#security)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

**The fastest way to get your admin panel running:**

```bash
# 1. Generate admin key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Edit .env.local and fill in:
#    - ADMIN_KEY (paste generated key above)
#    - MONGODB_URI 
#    - EMAIL credentials
#    - CLOUDINARY credentials

# 3. Install dependencies
npm install

# 4. Start everything
npm run dev

# 5. Login at http://localhost:3000/admin/login
```

---

## Admin Key Generation & Setup

### What is an Admin Key?

An **Admin Key** is your password to the admin panel. It's:
- ✅ A long, random, secure string
- ✅ Stored in your `.env.local` file (never shared)
- ✅ Used to login and protect all admin operations
- ✅ Sent with every admin request to verify authenticity

### How to Generate It

**Option 1: Using Node.js (Recommended)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Output example:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

**Option 2: Using an Online Generator**
Go to: https://www.uuidgenerator.net/ (use hex format)

**Option 3: Manual String** (less secure, but works)
Use a long combination like: `myPortfolio2024!@#$SecureKey999`

### Where to Put It

Edit `.env.local`:
```env
ADMIN_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

---

## Environment Variables

### Complete .env.local Template

```env
# ========== FRONTEND ==========
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# ========== BACKEND ==========
BACKEND_PORT=5000
NODE_ENV=development

# ========== DATABASE ==========
# Local: mongodb://localhost:27017/portfolio
# Cloud: mongodb+srv://user:password@cluster.mongodb.net/portfolio
MONGODB_URI=mongodb://localhost:27017/portfolio

# ========== EMAIL (Gmail) ==========
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
ADMIN_EMAIL=your-email@gmail.com

# ========== CLOUDINARY ==========
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=portfolio

# ========== ADMIN ==========
ADMIN_KEY=your-secure-admin-key
```

### Detailed Setup for Each Variable

#### **MONGODB_URI**

**Local MongoDB:**
1. Install from https://www.mongodb.com/try/download/community
2. Run `mongod` in terminal
3. Use: `mongodb://localhost:27017/portfolio`

**MongoDB Atlas (Cloud - Recommended):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Replace `<username>` and `<password>` with your credentials
6. Use: `mongodb+srv://user:password@cluster.mongodb.net/portfolio`

#### **Email (Gmail SMTP)**

**Important:** Don't use your regular Gmail password!

1. Go to https://myaccount.google.com
2. Select **Security** → **2-Step Verification** (enable if not already)
3. Go back to **Security** → **App passwords**
4. Select: **Mail** + **Windows Computer**
5. Google generates a 16-character password
6. Copy and paste into `EMAIL_PASSWORD`
7. Use your Gmail address for `EMAIL_USER`
8. Use same address for `ADMIN_EMAIL`

#### **Cloudinary (Image Upload)**

**Free tier:** 25GB/month + image optimization

1. Sign up at https://cloudinary.com
2. **Cloud Name:** Dashboard → top of page
3. **API Key:** Settings → API Keys
4. **Upload Preset:** Settings → Upload → Create unsigned preset named "portfolio"
5. **API Secret:** Settings → API Keys (keep private!)

#### **Admin Key**

Use the generated key from earlier:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Paste the output into `ADMIN_KEY`

---

## Accessing Admin Panel

### Login URL
```
http://localhost:3000/admin/login
```

### Login Steps

1. **Open Browser:** Navigate to `http://localhost:3000/admin/login`
2. **Enter Admin Key:** Paste your `ADMIN_KEY` from `.env.local`
3. **Click Login:** System verifies your key
4. **View Dashboard:** You're now in the admin panel

### Dashboard URLs

- **Main Dashboard:** `http://localhost:3000/admin/dashboard`
- **Projects:** `http://localhost:3000/admin/dashboard`
- **Contacts:** `http://localhost:3000/admin/contacts`

### Session Management

- **Login:** Key is stored in browser localStorage
- **Logout:** Click logout button to remove key
- **Session:** Persists until you logout or clear browser data
- **Timeout:** No automatic timeout (manual logout only)

---

## Features & Usage

### Projects Management

#### Create New Project

**Steps:**
1. Go to Admin Dashboard
2. Click "Add Project" button
3. Fill in the form:
   - **Name:** Project title (max 100 chars)
   - **Description:** Details about project (max 2000 chars)
   - **Role:** Your position (e.g., "Full Stack Developer")
   - **Tools:** Technologies used (comma-separated)
   - **Code URL:** GitHub link
   - **Demo URL:** Live project link
   - **Image:** Click upload button and select from computer
   - **Featured:** Check to highlight on portfolio
   - **Status:** Choose Active/Draft/Archived
4. Click "Create Project"
5. Success! Project appears in list

**Status Explained:**
- **Active** (Green) - Visible on public portfolio
- **Draft** (Yellow) - Hidden from public, visible in admin only
- **Archived** (Red) - Hidden from public, marked as old

#### Edit Project

1. Find project in list
2. Click the pencil icon (✏️)
3. Update any field
4. Click "Update Project"
5. Changes are saved immediately

#### Delete Project

1. Find project in list
2. Click trash icon (🗑️)
3. Confirm deletion
4. Project is permanently removed

**Note:** Deletion is permanent and cannot be undone!

#### Featured Projects

**What are Featured Projects?**
- Special highlight section on portfolio
- Get a ⭐ star badge
- Higher visibility

**How to Mark as Featured:**
1. Edit project
2. Check the "Featured" checkbox
3. Save changes
4. Project now shows with special badge

### Contact Messages

#### View Messages

1. Go to **Admin Dashboard** → **Contact Messages**
2. See all visitor messages with:
   - Visitor's name
   - Email address
   - Message preview
   - Timestamp
   - Status badge

#### Message Status

- **New** (Green) - Not yet read
- **Read** (Yellow) - You've read it
- **Replied** (Blue) - You've sent a reply

#### Mark as Read

1. Find message in list
2. Click "Mark as Read" button
3. Status changes to "Read"

#### Reply to Message

1. Click the message
2. Click "Reply" button
3. Your email client opens
4. Write reply and send
5. Manually mark as "Replied" when done

#### Delete Message

1. Find message in list
2. Click delete button
3. Confirm deletion
4. Message is permanently removed

---

## API Reference

### Public API (No Authentication)

#### Get All Projects
```
GET /api/projects
Response: { success: true, data: [...projects] }
```

#### Get Single Project
```
GET /api/projects/:id
Response: { success: true, data: {...project} }
```

#### Get Featured Projects
```
GET /api/projects/featured
Response: { success: true, data: [...featured projects] }
```

#### Submit Contact Form
```
POST /api/contact
Body: {
  name: string,
  email: string,
  message: string
}
Response: { success: true, message: "Email sent!" }
```

### Protected API (Requires Admin Key)

**Header Required:**
```
x-admin-key: your-admin-key
```

#### Get All Projects (Including Drafts)
```
GET /api/admin/projects
```

#### Create Project
```
POST /api/admin/projects
Body: {
  name: string,
  description: string,
  role: string,
  tools: [string],
  code: string (URL),
  demo: string (URL),
  image: string (URL),
  featured: boolean,
  status: "active" | "draft" | "archived"
}
```

#### Update Project
```
PUT /api/admin/projects/:id
Body: { ...fields to update }
```

#### Delete Project
```
DELETE /api/admin/projects/:id
```

#### Reorder Projects
```
PATCH /api/admin/projects/reorder
Body: {
  projectIds: [id1, id2, id3, ...]
}
```

---

## Security

### What's Protected?

✅ **Login Page** - Requires admin key verification
✅ **Dashboard** - Automatically redirects if not authenticated
✅ **All Admin Operations** - Server validates key on every request
✅ **Database Access** - Only authenticated admins can modify
✅ **API Endpoints** - Protected with header validation

### How Security Works

1. **Login:**
   - You enter admin key on login page
   - Frontend sends key to `/api/admin/projects` for verification
   - Backend checks if key matches `ADMIN_KEY` in `.env.local`
   - If valid, key stored in browser localStorage

2. **Admin Actions:**
   - Every request includes `x-admin-key` header
   - Backend validates header before processing
   - Invalid key = 401 Unauthorized response
   - Automatically redirects to login

3. **Key Storage:**
   - Stored in browser's **localStorage** (not cookies)
   - Only accessible on your local machine
   - Cleared if you logout or clear browser data
   - Not sent to any third-party services

### Best Practices

**DO:**
✅ Use a strong, random admin key (use the generator)
✅ Keep `.env.local` private (already in .gitignore)
✅ Change admin key if you suspect it's compromised
✅ Use HTTPS in production
✅ Keep admin password safe

**DON'T:**
⚠️ Don't share your admin key with anyone
⚠️ Don't commit `.env.local` to git
⚠️ Don't use simple, easy-to-guess keys
⚠️ Don't expose `.env.local` in public repositories
⚠️ Don't share email passwords or API keys

### Changing Your Admin Key

**To change your admin key:**

1. Generate new key:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. Update `.env.local`:
   ```env
   ADMIN_KEY=new-generated-key
   ```

3. Restart server:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

4. Login with new key
5. Old key no longer works

---

## Troubleshooting

### Login Issues

#### "Invalid admin key" message

**Cause:** Admin key doesn't match

**Fix:**
1. Check `.env.local` for your `ADMIN_KEY`
2. Verify you copied it exactly (no spaces at start/end)
3. Make sure you're not using the example key from template
4. Try generating a new key and updating `.env.local`
5. Restart server with `npm run dev`

#### Can't see login page at all

**Cause:** Frontend not running or wrong URL

**Fix:**
1. Check terminal shows "Local: http://localhost:3000"
2. Try URL: `http://localhost:3000/admin/login`
3. Make sure `npm run dev` is running
4. Check for error messages in terminal

### Admin Dashboard Issues

#### "Cannot fetch projects" error

**Cause:** Backend not running or key invalid

**Fix:**
1. Check terminal shows backend running on port 5000
2. Verify `NEXT_PUBLIC_BACKEND_URL=http://localhost:5000` in `.env.local`
3. Check admin key is correct
4. Restart both frontend and backend

#### "Unauthorized" on admin operations

**Cause:** Admin key not sent or doesn't match

**Fix:**
1. Login again
2. Check `.env.local` admin key matches
3. Clear localStorage:
   ```javascript
   // Run in browser console (F12)
   localStorage.clear()
   ```
4. Reload and login again

### Database Issues

#### "Cannot connect to MongoDB"

**Cause:** MongoDB not running or wrong connection string

**Fix - Local MongoDB:**
1. Check MongoDB is installed
2. Run `mongod` in another terminal window
3. Check `MONGODB_URI=mongodb://localhost:27017/portfolio`
4. Restart server

**Fix - MongoDB Atlas:**
1. Check connection string in `.env.local`
2. Verify username and password are correct
3. Check IP whitelist allows your connection
4. Verify database name in connection string

#### Projects not saving

**Cause:** MongoDB connection issue

**Fix:**
1. Check MongoDB is running
2. Check connection string is correct
3. Look for error in server terminal
4. Try restarting server

### Email Issues

#### "Email not sending" from contact form

**Cause:** Gmail credentials incorrect

**Fix:**
1. Go to https://myaccount.google.com
2. Enable 2-Step Verification if not enabled
3. Go to Security → App passwords
4. Generate new App Password (select Mail + Windows Computer)
5. Copy exact 16-character password (no hyphens in `.env.local`)
6. Update:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=exact-16-character-password
   ```
7. Restart server

**Tips:**
- Don't use your regular Gmail password
- Make sure to copy the exact app password
- No spaces at start/end
- ADMIN_EMAIL should be valid email

### Image Upload Issues

#### Cloudinary upload not working

**Cause:** Missing or incorrect Cloudinary credentials

**Fix:**
1. Go to https://cloudinary.com
2. Dashboard → copy Cloud Name
3. Settings → API Keys → copy API Key
4. Settings → Upload → create unsigned upload preset named "portfolio"
5. Update `.env.local`:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=portfolio
   ```
6. Restart server (F5 to refresh browser)

#### "Upload preset not found" error

**Cause:** Upload preset not created or wrong name

**Fix:**
1. Go to Cloudinary Dashboard
2. Settings → Upload → scroll to "Upload presets"
3. Click "Add upload preset"
4. Name: `portfolio` (exact match, lowercase)
5. Mode: `Unsigned`
6. Save
7. Refresh admin page

### Backend Connection Issues

#### Frontend can't reach backend

**Cause:** Wrong URL or backend not running

**Fix:**
1. Check backend is running: `npm run dev:backend`
2. Verify `NEXT_PUBLIC_BACKEND_URL=http://localhost:5000` in `.env.local`
3. Check BACKEND_PORT=5000 in `.env.local`
4. Make sure nothing else is using port 5000
5. Restart both frontend and backend

#### Port already in use error

**Cause:** Another app using same port

**Fix:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process by PID
taskkill /PID <PID> /F
```

Or change `BACKEND_PORT` in `.env.local` to different port (e.g., 5001)

---

## Complete Setup Checklist

```
MongoDB Setup:
[ ] Install MongoDB or create Atlas cluster
[ ] Get connection string
[ ] Update MONGODB_URI in .env.local
[ ] Test connection

Email Setup:
[ ] Enable 2-Step Verification on Gmail
[ ] Generate App Password
[ ] Update EMAIL_USER and EMAIL_PASSWORD
[ ] Update ADMIN_EMAIL (where to receive messages)

Cloudinary Setup:
[ ] Sign up at cloudinary.com
[ ] Copy Cloud Name
[ ] Get API Key
[ ] Create unsigned upload preset named "portfolio"
[ ] Update all Cloudinary variables in .env.local

Admin Key Setup:
[ ] Generate secure admin key
[ ] Update ADMIN_KEY in .env.local
[ ] Save key somewhere safe

Final Steps:
[ ] Run npm install
[ ] Run npm run dev
[ ] Visit http://localhost:3000/admin/login
[ ] Login with your ADMIN_KEY
[ ] Create first project
[ ] Test contact form
[ ] Verify emails are sent
```

---

## Production Deployment

### Before Going Live

1. **Security:**
   - Generate NEW admin key (don't reuse development key)
   - Use HTTPS (not HTTP)
   - Set NODE_ENV=production
   - Disable debug logging

2. **Database:**
   - Use MongoDB Atlas (not local)
   - Enable backups
   - Set strong database password

3. **Environment:**
   - Never commit `.env.local`
   - Use production credentials
   - Update all URLs to production domain

4. **Testing:**
   - Test all admin functions
   - Test contact form and emails
   - Test image uploads
   - Test on multiple browsers

### Production .env.local Example

```env
NEXT_PUBLIC_APP_URL=https://yourportfolio.com
NEXT_PUBLIC_BACKEND_URL=https://yourportfolio.com/api
BACKEND_PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password
ADMIN_EMAIL=admin@yourportfolio.com
ADMIN_KEY=new-secure-production-key
# ... rest of Cloudinary config
```

### Deployment Platforms

**Recommended:**
- **Frontend:** Vercel, Netlify
- **Backend:** Railway, Render, Heroku
- **Database:** MongoDB Atlas
- **Images:** Cloudinary

---

## Support & Next Steps

### You're All Set! 🎉

1. Your admin panel is ready
2. Configure `.env.local` with your credentials
3. Run `npm run dev`
4. Login at `http://localhost:3000/admin/login`
5. Start managing your portfolio!

### Common Next Steps

- [ ] Create your first project
- [ ] Upload project images
- [ ] Mark some as featured
- [ ] Test contact form
- [ ] Verify emails are received
- [ ] Configure for production (if ready)

---

**Questions?** Check the troubleshooting section or review the setup guide!

**Made with ❤️ for your portfolio**

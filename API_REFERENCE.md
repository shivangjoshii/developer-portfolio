# API Configuration Reference

## Base URL
```
Development: http://localhost:5000
Production: https://your-api-domain.com
```

## Authentication
Admin endpoints require the `x-admin-key` header:
```
Headers: {
  'x-admin-key': 'your-admin-key'
}
```

---

## Projects API

### Get All Active Projects
```
GET /api/projects
```

**Response:**
```json
{
  "success": true,
  "count": 9,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Project Name",
      "description": "Project description",
      "tools": ["React", "Node.js"],
      "role": "Full Stack Developer",
      "code": "https://github.com/...",
      "demo": "https://demo.com",
      "image": "https://image-url.com/img.jpg",
      "featured": true,
      "status": "active",
      "order": 0,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Get Project by ID
```
GET /api/projects/:id
```

### Get Featured Projects
```
GET /api/projects/featured/projects
```

---

## Contact API

### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Your message here",
    "status": "new",
    "replied": false,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Admin API (Requires Authentication)

### Get All Projects
```
GET /api/admin/projects
Headers: {
  'x-admin-key': 'your-key'
}
```

### Create Project
```
POST /api/admin/projects
Headers: {
  'x-admin-key': 'your-key'
}
Content-Type: application/json

{
  "name": "Project Name",
  "description": "Detailed description",
  "tools": ["React", "Node.js", "MongoDB"],
  "role": "Full Stack Developer",
  "code": "https://github.com/...",
  "demo": "https://demo.com",
  "image": "https://image-url.com/img.jpg",
  "featured": true
}
```

### Update Project
```
PUT /api/admin/projects/:id
Headers: {
  'x-admin-key': 'your-key'
}
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  ...same fields as create...
}
```

### Delete Project
```
DELETE /api/admin/projects/:id
Headers: {
  'x-admin-key': 'your-key'
}
```

### Reorder Projects
```
PATCH /api/admin/projects/reorder
Headers: {
  'x-admin-key': 'your-key'
}
Content-Type: application/json

{
  "projects": [
    { "_id": "id1" },
    { "_id": "id2" },
    { "_id": "id3" }
  ]
}
```

### Get All Contacts
```
GET /api/contact
Headers: {
  'x-admin-key': 'your-key'
}
```

### Mark Contact as Read
```
PATCH /api/contact/:id/read
Headers: {
  'x-admin-key': 'your-key'
}
```

### Delete Contact
```
DELETE /api/contact/:id
Headers: {
  'x-admin-key': 'your-key'
}
```

---

## Error Responses

### Validation Error
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details (only in development)"
}
```

---

## Using the API Client

```javascript
import { projectsAPI, contactAPI, adminAPI } from '@/utils/api-service';

// Get all projects
const projects = await projectsAPI.getAll();

// Submit contact
const result = await contactAPI.submit({
  name: 'John',
  email: 'john@example.com',
  message: 'Hello!'
});

// Admin: Create project
const newProject = await adminAPI.createProject(
  {
    name: 'New Project',
    description: 'Description',
    tools: ['React', 'Node.js'],
    role: 'Developer',
    image: 'https://...',
    featured: false
  },
  'your-admin-key'
);

// Admin: Get contacts
const contacts = await adminAPI.getContacts('your-admin-key');
```

---

## Testing with cURL

### Get Projects
```bash
curl http://localhost:5000/api/projects
```

### Submit Contact
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "Test message"
  }'
```

### Admin: Create Project
```bash
curl -X POST http://localhost:5000/api/admin/projects \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your-admin-key" \
  -d '{
    "name": "Test Project",
    "description": "Test",
    "tools": ["React"],
    "role": "Developer",
    "image": "https://...",
    "featured": false
  }'
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid admin key |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Environment Variables Required

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@example.com
ADMIN_KEY=your-secure-admin-key
NODE_ENV=development
BACKEND_PORT=5000
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding:
- Request throttling
- IP-based limits
- API key rate limits

---

## CORS Configuration

Default CORS is enabled for:
```
Origin: http://localhost:3000 (or NEXT_PUBLIC_APP_URL)
```

Update in `server.js` for production domains.

---

For more details, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

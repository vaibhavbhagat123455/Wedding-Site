# 💍 Eternally Yours — Wedding Services Platform

<div align="center">

![Eternally Yours](https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=400&fit=crop&q=80)

**India's Premier Wedding Vendor Discovery Platform**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Firebase-orange?style=for-the-badge)](https://wedding-50cf9.web.app/)
[![Backend API](https://img.shields.io/badge/⚙️_Backend_API-Render-green?style=for-the-badge)](https://wedding-site-pd4c.onrender.com/api/health)
[![GitHub](https://img.shields.io/badge/📁_Repository-GitHub-black?style=for-the-badge)](https://github.com/vaibhavbhagat123455/Wedding-Site)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat&logo=three.js)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=flat&logo=firebase)

</div>

---

## 📌 About The Project

**Eternally Yours** is a full-stack wedding vendor discovery platform inspired by [The Weddings Chapter](https://www.theweddingschapter.com). It allows couples to discover, browse, and connect with verified wedding professionals across India — photographers, caterers, decorators, venues, makeup artists, and more.

Built as part of the **AppDost Complete IT Solution — Full Stack Developer Internship Assignment**.

### 🌐 Live Links

| Resource | URL |
|---|---|
| 🖥️ Frontend (Firebase) | https://wedding-50cf9.web.app/ |
| ⚙️ Backend API (Render) | https://wedding-site-pd4c.onrender.com/api/health |
| 📁 GitHub Repository | https://github.com/vaibhavbhagat123455/Wedding-Site |

> ⚠️ **Note:** Backend is on Render's free tier — first request may take 30–40 seconds to wake up.

---

## ✨ Features

### 👤 User
- ✅ Signup & Login with JWT Authentication
- ✅ Protected routes & persistent sessions
- ✅ User Dashboard with inquiry history
- ✅ Profile editing

### 🏪 Vendors
- ✅ Vendor listing with search, category filter & price filter
- ✅ Sort by rating, price (low/high), newest
- ✅ Pagination
- ✅ Detailed vendor profile page
- ✅ Send inquiry directly to vendor

### 🎨 UI/UX
- ✅ 3D animated hanging flower garlands (Three.js + WebGL)
- ✅ Arch-shaped photo layout on hero
- ✅ Scroll animations (Framer Motion)
- ✅ Responsive design (mobile + desktop)
- ✅ Shimmer loading skeletons
- ✅ Toast notifications

### 📩 Other
- ✅ Contact / General Inquiry form
- ✅ Auto-seeded vendor data on first run
- ✅ Rate limiting & security headers (Helmet)
- ✅ CORS configured for production

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| TanStack Router | Client-side routing |
| Tailwind CSS | Styling |
| Framer Motion | Animations & transitions |
| Three.js + R3F | 3D flower garland animation |
| Zustand | Global state (auth) |
| Axios | HTTP client |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server & REST API |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT + bcryptjs | Authentication |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |
| Cloudinary | Image uploads (optional) |
| Multer | File handling |

### Deployment
| Service | Purpose |
|---|---|
| Firebase Hosting | Frontend |
| Render | Backend |
| MongoDB Atlas | Database |

---

## 📁 Project Structure

```
Wedding-Site/
├── frontend/                   # React + Vite app
│   ├── src/
│   │   ├── api/                # Axios client
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── VendorCard.jsx
│   │   │   ├── TestimonialSlider.jsx
│   │   │   ├── AnimatedSection.jsx
│   │   │   └── HangingGarlands3D.jsx  # Three.js animation
│   │   ├── hooks/              # Zustand auth store
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── VendorListing.jsx
│   │   │   ├── VendorDetails.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   └── router/             # TanStack Router config
│   ├── firebase.json
│   └── .firebaserc
│
└── backend/                    # Node.js + Express API
    └── src/
        ├── db/
        │   ├── index.js        # MongoDB connection
        │   └── seed.js         # Vendor seed data (12 vendors)
        ├── middleware/
        │   └── auth.js         # JWT middleware
        ├── models/
        │   ├── User.js
        │   ├── Vendor.js
        │   └── Inquiry.js      # Inquiry + Contact models
        └── routes/
            ├── auth.js         # /api/auth/*
            ├── vendors.js      # /api/vendors/*
            ├── inquiries.js    # /api/inquiries/* + /api/contact
            └── upload.js       # /api/upload (Cloudinary)
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)

### 1. Clone the repository

```bash
git clone https://github.com/vaibhavbhagat123455/Wedding-Site.git
cd Wedding-Site
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/wedding_db
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
# ✅ MongoDB connected
# 🚀 Server on port 5000
# ✅ Seeded 12 vendors
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api

npm run dev
# → http://localhost:5173
```

---

## 🌐 Deployment

### Backend → Render
1. New Web Service → connect GitHub repo
2. Root Directory: `backend`
3. Build: `npm install` | Start: `node src/index.js`
4. Add environment variables (same as `.env`)

### Frontend → Firebase Hosting
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | Login & get token | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |
| GET | `/api/vendors` | List vendors (search/filter/paginate) | ❌ |
| GET | `/api/vendors/:id` | Get vendor details | ❌ |
| POST | `/api/inquiries` | Send vendor inquiry | Optional |
| GET | `/api/inquiries/my` | Get my inquiries | ✅ |
| POST | `/api/contact` | General contact form | ❌ |
| POST | `/api/upload` | Upload image (Cloudinary) | ✅ |
| GET | `/api/health` | Health check | ❌ |


## 👨‍💻 Developer

**Vaibhav Bhalchandra Bhagat**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/vaibhav-bhagat-545600346)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/vaibhavbhagat123455)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-orange?style=flat)](https://vaibhav-portfolio-18fa1.web.app)

- 📧 vaibhav.1252130039@vit.edu
- 📱 +91 8600297659
- 🎓 B.Tech Information Technology | VIT Pune | CGPA: 9.0

---

## 📄 License

This project was built as part of an internship assignment for **AppDost Complete IT Solution Pvt. Ltd.**

---

<div align="center">
  Made with ❤️ for love stories
</div>

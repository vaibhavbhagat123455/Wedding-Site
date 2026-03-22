# 💍 Eternally Yours — Wedding Services Platform

> Full-stack wedding vendor discovery platform.
> **Frontend:** React + Vite + TanStack Router + Tailwind CSS → **Firebase Hosting**
> **Backend:** Node.js + Express + MongoDB Atlas → **Render**
> **Images:** Unsplash URLs (seeded) + Cloudinary (optional uploads)

---

## 🗂️ Project Structure

```
wedding/
├── frontend/               # React + Vite
│   ├── firebase.json       # Firebase hosting config
│   ├── .firebaserc         # Firebase project ID
│   └── src/
│       ├── api/            # Axios client
│       ├── components/     # Navbar, Footer, VendorCard, HeroScene...
│       ├── hooks/          # Zustand auth store
│       ├── pages/          # Home, VendorListing, VendorDetails, Dashboard...
│       └── router/         # TanStack Router
└── backend/                # Node.js + Express
    └── src/
        ├── db/             # MongoDB connection + seed
        ├── middleware/     # JWT auth
        ├── models/         # Mongoose: User, Vendor, Inquiry, Contact
        └── routes/         # auth, vendors, inquiries, contact, upload
```

---

## ✅ Features

- 🔐 **Auth** — JWT signup/login, bcrypt password hashing
- 🏠 **Home** — 3D animated hero (Three.js), categories, featured vendors, testimonials
- 📋 **Vendor Listing** — search, category tabs, price filter, sort, pagination
- 🔍 **Vendor Details** — full profile, inquiry form
- 📩 **Contact Form** — saved to MongoDB
- 👤 **Dashboard** — inquiry history, profile editing
- 📸 **Image Storage** — seeded vendors use Unsplash URLs (no cost). Optional Cloudinary upload route included.

---

## 🖥️ Local Setup

### Prerequisites
- Node.js 18+
- A free MongoDB Atlas account → https://cloud.mongodb.com

---

### Step 1 — MongoDB Atlas (Free Tier)

1. Go to https://cloud.mongodb.com → Create free account
2. Create a **Free M0 cluster** (512MB free)
3. Under **Database Access** → Add a DB User (username + password)
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all, fine for dev)
5. Click **Connect** → **Drivers** → Copy the connection string
   It looks like: `mongodb+srv://vaibhav:<password>@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority`
6. Replace `<password>` with your actual password and add the DB name:
   `mongodb+srv://vaibhav:mypassword@cluster0.abc12.mongodb.net/wedding_db?retryWrites=true&w=majority`

---

### Step 2 — Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://vaibhav:yourpassword@cluster0.abc12.mongodb.net/wedding_db?retryWrites=true&w=majority
JWT_SECRET=any_long_random_string_like_this_abc123xyz789
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
# → Connects to MongoDB, seeds 12 vendors automatically, starts on port 5000
# Test: http://localhost:5000/api/health
```

---

### Step 3 — Frontend

```bash
cd frontend
npm install
cp .env.example .env
# .env already has VITE_API_URL=http://localhost:5000/api for local dev

npm run dev
# → http://localhost:5173
```

---

## 🌐 Deployment (100% Free)

---

### 🔵 Deploy Backend to Render

1. Push your code to GitHub first (see Git Commit Guide below)
2. Go to https://render.com → Sign up free → **New Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
   - **Node Version:** 18
5. Under **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your Atlas connection string |
| `JWT_SECRET` | Your secret string |
| `JWT_EXPIRES_IN` | `7d` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://your-app.web.app` (add after Firebase deploy) |

6. Click **Deploy** — Render gives you a URL like `https://wedding-backend.onrender.com`
7. Test: `https://wedding-backend.onrender.com/api/health`

> ⚠️ Free Render services sleep after 15 min of inactivity. First request after sleep takes ~30s. This is fine for an internship demo.

---

### 🔴 Deploy Frontend to Firebase Hosting

```bash
# Install Firebase CLI (once)
npm install -g firebase-tools

# Login
firebase login

# In your frontend folder, create .env for production
cd frontend
```

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

```bash
# Build the app
npm run build

# Initialize Firebase (first time only)
firebase init hosting
# → Select "Use an existing project" or create new
# → Public directory: dist
# → Single-page app: YES
# → Don't overwrite index.html: NO

# Deploy
firebase deploy --only hosting
```

You'll get a URL like: `https://your-project.web.app` 🎉

---

### 📸 Image Storage — Cloudinary (Optional)

All seeded vendors use Unsplash URLs so **no image storage is needed for the demo**.

If you want real image upload functionality later:
1. Free account at https://cloudinary.com (25GB free)
2. Add to backend `.env`:
   ```
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```
3. The `/api/upload` route is already coded — just send a `multipart/form-data` POST with field `image`.

---

## 📦 Git Commit Guide

```bash
# Setup (do once)
git init
git remote add origin https://github.com/vaibhavbhagat123455/eternally-yours.git

# ── Commit 1 ─────────────────────────────────────────────────────
git add README.md .gitignore
git commit -m "chore: initial project setup with README"

# ── Commit 2 ─────────────────────────────────────────────────────
git add backend/package.json backend/src/db/ backend/src/models/
git commit -m "feat(backend): MongoDB connection, Mongoose models (User, Vendor, Inquiry, Contact) and seed data"

# ── Commit 3 ─────────────────────────────────────────────────────
git add backend/src/middleware/ backend/src/routes/auth.js
git commit -m "feat(backend): JWT authentication — signup, login, profile update"

# ── Commit 4 ─────────────────────────────────────────────────────
git add backend/src/routes/
git commit -m "feat(backend): vendor listing with search/filter/pagination, inquiries, contact, Cloudinary upload route"

# ── Commit 5 ─────────────────────────────────────────────────────
git add backend/src/index.js backend/.env.example
git commit -m "feat(backend): Express server setup with CORS, Helmet, rate limiting"

# ── Commit 6 ─────────────────────────────────────────────────────
git add frontend/package.json frontend/vite.config.js frontend/tailwind.config.js frontend/postcss.config.js frontend/index.html frontend/.env.example
git commit -m "chore(frontend): Vite + React + TanStack Router + Tailwind scaffold"

# ── Commit 7 ─────────────────────────────────────────────────────
git add frontend/src/index.css frontend/src/api/ frontend/src/hooks/
git commit -m "feat(frontend): global design system CSS, axios API client, Zustand auth store"

# ── Commit 8 ─────────────────────────────────────────────────────
git add frontend/src/App.jsx frontend/src/main.jsx frontend/src/router/
git commit -m "feat(frontend): App shell and TanStack Router configuration"

# ── Commit 9 ─────────────────────────────────────────────────────
git add frontend/src/components/
git commit -m "feat(frontend): Navbar, Footer, VendorCard, AnimatedSection, TestimonialSlider, 3D HeroScene (Three.js)"

# ── Commit 10 ────────────────────────────────────────────────────
git add frontend/src/pages/Home.jsx
git commit -m "feat(frontend): Home page — 3D hero, stats, categories, featured vendors, testimonials, CTA"

# ── Commit 11 ────────────────────────────────────────────────────
git add frontend/src/pages/VendorListing.jsx frontend/src/pages/VendorDetails.jsx
git commit -m "feat(frontend): Vendor Listing (search/filter/pagination) and Vendor Details with inquiry form"

# ── Commit 12 ────────────────────────────────────────────────────
git add frontend/src/pages/Login.jsx frontend/src/pages/Signup.jsx
git commit -m "feat(frontend): Login and Signup pages with JWT auth integration"

# ── Commit 13 ────────────────────────────────────────────────────
git add frontend/src/pages/Dashboard.jsx frontend/src/pages/Contact.jsx
git commit -m "feat(frontend): User Dashboard with inquiry history and Contact page"

# ── Commit 14 ────────────────────────────────────────────────────
git add frontend/firebase.json frontend/.firebaserc
git commit -m "chore(frontend): Firebase hosting config"

# ── Commit 15 (final) ────────────────────────────────────────────
git add .
git commit -m "chore: final cleanup, env examples, deployment ready"
git push -u origin main
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TanStack Router, Tailwind CSS |
| 3D / Animation | Three.js, React Three Fiber, Framer Motion |
| State | Zustand |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT + bcryptjs |
| Images | Unsplash URLs (seeded) + Cloudinary (optional) |
| Hosting | Firebase (frontend) + Render (backend) |

---

## 📬 Submission

Send to **hr@appdost.in** and **hrd@appdost.com**:
- ✅ GitHub Repository Link
- ✅ Frontend Live Link (Firebase)
- ✅ Backend API Link (Render)

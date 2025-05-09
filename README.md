# Video Manager

## Project Overview
**Video Manager** is a single-page web application that lets authenticated users upload, organize, stream, and manage video content in a secure, easy-to-use interface. It provides:

- **User authentication** (register, login, JWT-backed sessions)
- **Video uploads** (drag-and-drop or file-picker)
- **Video browsing** (list, filter, search, paginate)
- **Video playback** (embedded player with multiple resolutions)
- **User-specific controls** (only the uploader can edit or delete their videos)
- **Responsive UI** (mobile-first, built with Mantine)
- **Robust API integration** (React front end ↔ Node/Express/MongoDB back end)

The goal is to demonstrate mastery of Vite + React for the front end, plus API-driven state management, and tooling such as npm, VSCode, React DevTools, and browser dev-tools.

---

## Core Functional Areas

### 1. Authentication & Authorization
- **Register & Login** pages  
- JWT stored in `localStorage` for session persistence  
- Protected routes (e.g., Upload, My Videos)  

### 2. Video Catalog
- **“All Videos”** page listing video thumbnails, titles, upload dates  
- Query filtering (by title, uploader) and pagination  

### 3. Video Upload & Management
- Upload form with drag-and-drop, progress indicator  
- Store metadata (title, description, file URL) in MongoDB  
- **“My Videos”** page for editing or deleting owned uploads  

### 4. Video Playback
- Embedded HTML5 video player component  
- Supports multiple resolutions (if available)  
- Full-screen toggle, seek bar, volume controls  

### 5. UI/UX & Navigation
- Landing Page with Register/Login calls-to-action  
- Navbar showing links based on auth state  
- Responsive layout using Mantine’s Grid, Stack, and components  

---

## Tech Stack & Tooling

### Front End
- **Vite** (fast bundling, HMR)  
- **React** (component-based UI)  
- **Mantine** (UI component library & theming)  
- **React Router** (client-side routing)  
- **Axios** (HTTP client)  
- **JWT** (auth tokens)  

### Back End (REST API)
- **Node.js + Express.js**  
- **MongoDB** with Mongoose ODM  
- JSON Web Tokens for auth  
- Multer (file upload middleware)  
- CORS and helmet for security  

### Development Tools
- npm for package management  
- VSCode with extensions (Prettier, ESLint)  
- React DevTools & Browser DevTools for debugging  
- Git & GitHub for version control  

---

## Architecture

Client (React/Vite)
├─ /src
│ ├─ components/ ← buttons, cards, player, forms
│ ├─ pages/ ← Landing, Register, Login, AllVideos, MyVideos, Upload
│ ├─ services/ ← axios instance, auth & video API wrappers
│ ├─ contexts/ ← AuthContext for user state
│ └─ main.jsx ← mount App → Router → Pages
└─ public/
└─ favicon.svg

Server (Node/Express)
├─ controllers/ ← business logic for users & videos
├─ models/ ← Mongoose schemas (User, Video)
├─ routes/ ← /api/auth, /api/videos
└─ middleware/ ← auth guard, error handler, file upload

Database
└─ MongoDB Atlas ← hosted video metadata and user records


---

## Key User Flows

1. **First Visit / Landing**  
   - Redirect to `/` → LandingPage  
   - Click “Register” → `/register`  

2. **On Registration**  
   - Fill form → `POST /api/auth/register`  
   - On success, store token & redirect to `/all-videos`  

3. **Browsing Videos**  
   - `GET /api/videos?search=&page=` → display cards  
   - Click a card → `/videos/:id` → plays video  

4. **Uploading**  
   - Click “Upload” → `/upload`  
   - Select file, enter metadata → `POST /api/videos`  
   - Show progress, then redirect to “My Videos”  

5. **Managing Own Videos**  
   - `/my-videos` lists only user’s uploads  
   - “Edit” opens metadata form; “Delete” issues `DELETE /api/videos/:id`  

# Modern Music Player Web Application

A modern, responsive React music player web application with Tailwind CSS that integrates with FastAPI microservices backend. Currently implemented with comprehensive dummy data for development and testing.

![Music Player Dashboard](https://github.com/user-attachments/assets/c4de9d93-4d3a-4f74-9b99-797d6d6819fb)

## 🎵 Features

### ✅ Implemented
- **Authentication System** - Mock login with JWT token simulation
- **Responsive Layout** - Modern Spotify-like interface with dark theme
- **Music Library** - Browse 30+ dummy tracks with metadata
- **Explore Page** - **NEW!** Comprehensive track listing with search and filtering
- **Navigation** - Route-based navigation between Home and Explore pages
- **Playlist Management** - Create and manage playlists
- **Audio Player Controls** - Play/pause, skip, volume, progress (UI complete)
- **Search & Filter** - Search tracks by title, artist, album, or genre
- **User Management** - Profile display, preferences, and statistics
- **Dark Theme** - Glass morphism design with purple/blue accents

### 🚧 Ready for API Integration
- Auth Service integration (`POST /auth/login`)
- User Service integration (user management)
- Song Service integration (music file management)
- JWT Authentication for protected routes

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx          # Login form with demo credentials
│   │   └── AuthProvider.jsx       # Protected routes and auth utilities
│   ├── layout/
│   │   ├── Header.jsx             # Navigation header with search
│   │   ├── Sidebar.jsx            # Navigation sidebar with playlists
│   │   └── PlayerControls.jsx     # Bottom audio player controls
│   ├── music/
│   │   ├── TrackList.jsx          # Track listing with sort/filter
│   │   ├── TrackItem.jsx          # Individual track component
│   │   ├── NowPlaying.jsx         # Currently playing track display
│   │   └── VolumeControl.jsx      # Volume control component
│   ├── pages/                     # NEW! Page components for routing
│   │   ├── Home.jsx               # Dashboard/home page
│   │   └── Explore.jsx            # Track exploration page with filters
│   └── playlist/
│       ├── PlaylistView.jsx       # Playlist viewing (TODO)
│       └── PlaylistCreator.jsx    # Playlist creation (TODO)
├── data/
│   ├── dummyTracks.js            # 30 sample tracks with metadata
│   ├── dummyPlaylists.js         # 5 sample playlists
│   └── dummyUser.jsx             # Mock user data and auth functions
├── hooks/
│   ├── useAuth.jsx               # Authentication state management
│   ├── useAudioPlayer.jsx        # Audio player state management
│   └── useDummyData.js           # Dummy data management
└── utils/
    ├── audioUtils.js             # Audio management utilities
    └── formatters.js             # Data formatting utilities
```

### Backend Integration Points
```
backend/
├── auth_service/          # JWT authentication
├── user_service/          # User management
├── song_service/          # Music file management
└── database/
    └── models/            # SQLAlchemy models
        ├── user_model.py
        ├── song_model.py
        └── album_model.py
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed on your system
- npm package manager (comes with Node.js)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Matthew-Hughes3488/MusicPlayer.git
   cd MusicPlayer
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload when you make changes

### Quick Start Demo
1. On the login page, click "Fill demo credentials" 
2. Click "Sign in" to access the application
3. Navigate between **Home** and **Explore** pages using the sidebar
4. Use the **Explore** page to browse all tracks with search and filtering

### Available Scripts
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (`#7c3aed`) - Main accent color
- **Secondary**: Blue (`#2563eb`) - Secondary accent
- **Background**: Slate 900 (`#0f172a`) - Main background
- **Cards**: Glass morphism with backdrop blur

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

### Components
- **Buttons**: Primary, secondary, and ghost variants
- **Cards**: Glass morphism with rounded corners
- **Inputs**: Dark theme with focus states
- **Icons**: Lucide React icon library

## 🔧 Technical Stack

### Frontend
- **React 18** - UI framework with hooks
- **TypeScript** - Type safety (partial implementation)
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

### State Management
- **React Context** - Auth and player state
- **useState/useEffect** - Local component state
- **Custom Hooks** - Shared logic

### Styling Approach
- **Mobile-first** responsive design
- **Dark theme** with glass morphism
- **Consistent spacing** scale (4, 6, 8, 12, 16, 24, 32)
- **Smooth transitions** and hover states

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Stack layout, collapsible sidebar
- **Tablet**: 768px - 1024px - Adjusted grid layouts
- **Desktop**: > 1024px - Full sidebar, expanded features

### Mobile Features
- Collapsible sidebar with overlay
- Touch-friendly controls
- Optimized track layouts
- Bottom navigation tabs

## 🎵 Audio Features

### Player Controls
- Play/pause, skip forward/backward
- Volume control with slider
- Progress bar with seek functionality
- Shuffle and repeat modes

### Track Management
- Add to queue
- Like/unlike tracks
- Add to playlists
- Sort by title, artist, duration, date

### Playlist Features
- Create custom playlists
- Add/remove tracks
- Playlist metadata display
- System playlists (Liked Songs, Recently Played)

## 🔌 API Integration (Ready)

### Authentication
```javascript
// Login endpoint
POST /auth/login
Body: { email, password }
Response: { token, user_id, username, email }

// Protected routes require:
Authorization: Bearer <jwt_token>
```

### User Management
```javascript
// User endpoints (examples)
GET /users/profile
PUT /users/profile
GET /users/preferences
PUT /users/preferences
```

### Music Management
```javascript
// Song endpoints (examples)  
GET /songs
GET /songs/{id}
POST /songs (upload)
PUT /songs/{id}
DELETE /songs/{id}
```

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Organization
- **Components** - Reusable UI components
- **Hooks** - Custom React hooks for shared logic
- **Utils** - Helper functions and utilities
- **Data** - Mock data and API interfaces

### Adding New Features
1. Create component in appropriate folder
2. Add routing if needed
3. Connect to state management hooks
4. Add proper TypeScript types
5. Test responsiveness

## 🎯 Next Steps

### Phase 1: Core Features (Complete)
- [x] Authentication system
- [x] Layout components  
- [x] Music player interface
- [x] Dummy data integration
- [x] **Explore page with track listing**
- [x] **React Router navigation setup**

### Phase 2: Enhanced Features
- [ ] Playlist management UI
- [ ] File upload interface
- [ ] Advanced search filters
- [ ] User preferences settings

### Phase 3: API Integration
- [ ] Replace dummy data with real API calls
- [ ] Implement JWT authentication
- [ ] Add file upload functionality
- [ ] Error handling and loading states

### Phase 4: Advanced Features
- [ ] Audio visualization
- [ ] Keyboard shortcuts
- [ ] Offline mode
- [ ] Social features

## 📄 License

This project is developed for educational and portfolio purposes.

## 👨‍💻 Developer

**Matthew Hughes**
- Designed for integration with FastAPI microservices
- Modern React patterns and best practices
- Responsive design with Tailwind CSS
- Ready for production API integration
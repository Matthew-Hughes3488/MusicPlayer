import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// @ts-ignore
import { AuthProvider, ProtectedRoute } from './components/auth/AuthProvider.jsx';
// @ts-ignore
import { Header } from './components/layout/Header.jsx';
// @ts-ignore
import { Sidebar } from './components/layout/Sidebar.jsx';
// @ts-ignore
import { PlayerControls } from './components/layout/PlayerControls.jsx';
// @ts-ignore
import { Home } from './components/pages/Home.jsx';
// @ts-ignore
import { Explore } from './components/pages/Explore.jsx';
import './App.css';

// Main App Layout
const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex bg-dark-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<Explore />} />
            <Route path="/library" element={<Explore />} />
          </Routes>
        </main>
      </div>

      {/* Player controls */}
      <PlayerControls />
    </div>
  );
};

// Root App component
function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;

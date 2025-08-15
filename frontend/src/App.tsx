import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import PlayPage from './pages/PlayPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/search" 
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/play" 
              element={
                <ProtectedRoute>
                  <PlayPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/search" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

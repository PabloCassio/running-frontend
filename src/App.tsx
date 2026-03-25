import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './components/common/ThemeProvider'
import { AuthProvider } from './components/common/AuthProvider'
import Layout from './components/layout/Layout'

// Pages
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import RacesList from './pages/Races/RacesList'
import RaceDetails from './pages/Races/RaceDetails'
import RaceCreate from './pages/Races/RaceCreate'
import Tracking from './pages/Tracking/Tracking'
import Profile from './pages/Profile/Profile'
import Settings from './pages/Settings/Settings'

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token') !== null
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes with Layout */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/races"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <RacesList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/races/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <RaceDetails />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/races/create"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <RaceCreate />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tracking/:raceId"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Tracking />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Settings />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
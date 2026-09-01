import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import WebinarPage from './pages/WebinarPage.jsx'
import BestPracticePage from './pages/BestPracticePage.jsx'
import BestPracticeDetailPage from './pages/BestPracticeDetailPage.jsx'
import CreateBestPracticePage from './pages/CreateBestPracticePage.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import UserProfilePage from './pages/UserProfilePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import CheckEmailPage from './pages/CheckEmailPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ModerationPage from './pages/ModerationPage.jsx'
import UserManagementPage from './pages/UserManagementPage.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import { useAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import Chatbot from './components/Chatbot.jsx'

function SuperAdminRoute({ children }) {
  const { user } = useAuth();
  if (user?.role !== 'superadmin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AdminOrModeratorRoute({ children }) {
  const { user } = useAuth();
  const isStaff = user?.role === 'admin' || user?.role === 'superadmin' || user?.role === 'moderator';
  if (!isStaff) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/*" element={
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/webinar" element={<WebinarPage />} />
              <Route path="/best-practice" element={<BestPracticePage />} />
              <Route path="/best-practice/create" element={<CreateBestPracticePage />} />
              <Route path="/best-practice/:id" element={<BestPracticeDetailPage />} />
              <Route path="/moderation" element={<AdminOrModeratorRoute><ModerationPage /></AdminOrModeratorRoute>} />
              <Route path="/admin/dashboard" element={<AdminOrModeratorRoute><AdminDashboardPage /></AdminOrModeratorRoute>} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/settings" element={<SuperAdminRoute><UserManagementPage /></SuperAdminRoute>} />
            </Routes>
          </DashboardLayout>
        } />
      </Routes>
      <Chatbot />
    </>
  )
}

export default App

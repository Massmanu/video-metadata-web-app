import { Navigate, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupForm from './pages/SignupForm';
import { LoginForm } from './pages/LoginForm';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import UploadVideoMetadata from './pages/UploadVideoMetadata';
import AllVideos from './pages/AllVideos';
import VideoDetail from './pages/VideoDetail';

export default function App() {
  return (

    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadVideoMetadata />} />
        <Route path="/videos" element={<AllVideos />} />
        <Route path="/videos/:id" element={<VideoDetail />} />

      </Route>
    </Routes>

  );
}

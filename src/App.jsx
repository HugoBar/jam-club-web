import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import MusicRoom from './components/MusicRoom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import { AuthProvider } from './components/auth/AuthProvider';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import AppFrame from './components/frame/AppFrame'; // Import the AppFrame component

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppFrame />}>
              <Route path="/" element={<Home />} />
              <Route path="/:groupName" element={<MusicRoom />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
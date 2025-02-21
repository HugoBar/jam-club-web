import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider } from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AppFrame from './components/AppFrame'; // Import the AppFrame component

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
              <Route path="/about" element={<About />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DiaryProvider } from './context/DiaryContext';
import DiaryLayout from './components/layout/DiaryLayout';
import LoginSignup from './components/LoginSignup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // TODO: Replace with real auth logic

  return (
    <DiaryProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/diary" /> : <LoginSignup onAuth={() => setIsAuthenticated(true)} />
          } />
          <Route path="/diary" element={
            isAuthenticated ? <DiaryLayout isAuthenticated={isAuthenticated} /> : <Navigate to="/" />
          } />
        </Routes>
      </Router>
    </DiaryProvider>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/signin" />}
        />
        <Route 
          path="/signin" 
          element={<SignIn onLogin={() => setIsAuthenticated(true)} />} 
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

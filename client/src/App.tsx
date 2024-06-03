import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import Passwords from './pages/Passwords';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/generated-password" element={
          <Results />
        } />
        <Route path="/create-account" element={
          <Signup />
        } />
        <Route path="/user-login" element={
          <Login />
        } />
        <Route path="/generated-passwords" element={
          <Passwords />
        } />
      </Routes>
    </Router>
  )
}

export default App

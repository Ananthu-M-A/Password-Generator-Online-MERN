import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Results = lazy(() => import('./pages/Results'));
const Passwords = lazy(() => import('./pages/Passwords'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generated-password" element={<Results />} />
          <Route path="/create-account" element={<Signup />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/generated-passwords" element={<Passwords />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

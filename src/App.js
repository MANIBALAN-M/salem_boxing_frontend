import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Public Components
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import JoinUs from './Components/JoinUs';
import Contact from './Components/Contact';
import UpcomingMatches from './Components/UpcomingMatches';
import Achievements from './Components/Achievements';
import Programs from './Components/Programs';
import Schedule from './Components/Schedule';
import Pricing from './Components/Pricing';
import Footer from './Components/Footer';

// Admin Suite
import AdminPortal from './Admin/AdminPortal';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<div style={{ paddingTop: '80px' }}><JoinUs /></div>} />
        <Route path="/contact" element={<div style={{ paddingTop: '80px' }}><Contact /></div>} />
        <Route path="/matches" element={<div style={{ paddingTop: '80px' }}><UpcomingMatches /></div>} />
        <Route path="/achievements" element={<div style={{ paddingTop: '80px' }}><Achievements /></div>} />
        <Route path="/programs" element={<div style={{ paddingTop: '80px' }}><Programs /></div>} />
        <Route path="/schedule" element={<div style={{ paddingTop: '80px' }}><Schedule /></div>} />
        <Route path="/pricing" element={<div style={{ paddingTop: '80px' }}><Pricing /></div>} />
        
        {/* Supabase-backed Admin Management Portal */}
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

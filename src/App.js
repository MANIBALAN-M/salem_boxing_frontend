import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import JoinUs from './Components/JoinUs';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<div style={{ paddingTop: '80px' }}><JoinUs /></div>} />
          <Route path="/contact" element={<div style={{ paddingTop: '80px' }}><Contact /></div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StaffManaging from './components/StaffManaging';
import HotelManaging from './components/HotelManaging';
import './App.css';
import ClientMenu from './components/ClientMenu';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<StaffManaging />} />
          <Route path="/client-menu" element={<ClientMenu />} />
          <Route path="/hotel-menu" element={<HotelManaging />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

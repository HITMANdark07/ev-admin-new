import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Devices from './pages/Devices/Devices';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Users from './pages/Users/Users';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home  />} />
        {/* <Route path='/dashboard' element={<Dashboard  />}  /> */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path='/devices' element={<Devices />} />
        <Route path='/users' element={<Users  />} />
        <Route path='/products' element={<Products  />} />
      </Routes>
    </Router>
  );
}

export default App;

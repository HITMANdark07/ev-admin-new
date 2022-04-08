import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Devices from './pages/Devices/Devices';
import History from './pages/History/History';
import Home from './pages/Home/Home';
import Transaction from './pages/Transaction/Transaction';
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
        <Route path='/transactions' element={<Transaction  />} />
        <Route path='/history' element={<History  />} />
      </Routes>
    </Router>
  );
}

export default App;

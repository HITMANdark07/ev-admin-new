import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import NotFound from './pages/404';
import Dashboard from './pages/Dashboard/Dashboard';
import Devices from './pages/Devices/Devices';
import History from './pages/History/History';
import Home from './pages/Home/Home';
import Transaction from './pages/Transaction/Transaction';
import Users from './pages/Users/Users';
import VerifyUser from './pages/VerifyUsers/VerifyUsers';
import Withdrawls from './pages/Withdrawls/Withdrawls';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home  />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path='/devices' element={<Devices />} />
        <Route path='/users' element={<Users  />} />
        <Route path='/transactions' element={<Transaction  />} />
        <Route path='/history' element={<History  />} />
        <Route path='/withdrawls' element={<Withdrawls  />} />
        <Route path='/verify-users' element={<VerifyUser  />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

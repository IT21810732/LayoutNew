import React from 'react';
import Header from './components/Header'
import AddLocation from './components/AddLocation';
import AllLocations from './components/AllLocations';
import UpdateLocation from './components/UpdateLocation';
import AddDevice from './components/AddDevice';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Header/>
      <div>
        <Routes>
         
          <Route path="/" element={<AllLocations />}/>
          <Route path="/add" element={<AddLocation />} />
          <Route path='/update/:id' element={<UpdateLocation/>}/>

          <Route path="/add-device" element={<AddDevice />} />
         
        </Routes>
      </div>
     
    </Router>
  );
}

export default App;
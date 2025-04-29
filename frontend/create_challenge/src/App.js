import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotographyComponent from './components/PhotographyComponent';
import ListPhotographyComponent from './components/ListPhotographyComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/add-challenge/photography" />} />
        <Route path="/add-challenge/photography" element={<PhotographyComponent />} />
        <Route path="/photography" element={<ListPhotographyComponent />} />
        <Route path='/edit-photography/:id' element = {<PhotographyComponent />} />
      </Routes>
    </Router>
  );
}

export default App;

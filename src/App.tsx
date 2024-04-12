import React from 'react';
import './App.css';
import ProcessForm from './components/ProcessForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayJsonFormDialog from './components/form/DisplayJsonFormDialog';
import HelloComponent from './components/hello/HelloComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/builder" element={<ProcessForm />} />
        <Route path="/builder/form" element={<DisplayJsonFormDialog />} />
        <Route path="/" element={<HelloComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

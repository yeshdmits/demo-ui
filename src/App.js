import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Drools from "./component/drools/Drools"
import Second from "./component/Second"
import Home from "./component/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/drools" element={<Drools/>} />
        <Route path="/second" element={<Second/>} />
      </Routes>
  </Router>
  );
}

export default App;

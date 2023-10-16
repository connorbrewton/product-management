import React from 'react';
import './App.css';
import Form from './components/Form';
import Products from './components/Products'; // Import the Products component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/products" element={<Products />} /> {/* Route to the Products component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

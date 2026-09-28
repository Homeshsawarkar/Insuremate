import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InsureMateWorkflow } from './components/workflow/InsureMateWorkflow';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The entire product is the continuous linear workflow */}
        <Route path="/" element={<InsureMateWorkflow />} />
        <Route path="/workflow" element={<InsureMateWorkflow />} />
        
        {/* Redirect any other path directly to the master workflow */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ScenarioSelect from './pages/ScenarioSelect';
import SimulationPage from './pages/SimulationPage';
import SummaryPage from './pages/SummaryPage';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/time-machine" element={<ScenarioSelect />} />
        <Route path="/simulate/:scenarioId" element={<SimulationPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />

      </Routes>
    </>
  );
}

export default App;

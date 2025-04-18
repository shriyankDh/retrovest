import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ScenarioSelect from './pages/ScenarioSelect';
import SimulationPage from './pages/SimulationPage';
import SummaryPage from './pages/SummaryPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';
import MarketAnalysis from './components/MarketAnalysis';
import Login from './pages/Login';

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
        <Route path="/market-analysis" element={<MarketAnalysis />} />
        <Route path="/market-analysis" element={<MarketAnalysis />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user-profile" element={<userprofile/>} />
      </Routes>
    </>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import SymptomChecker from './components/SymptomChecker';
import FacilityFinder from './components/FacilityFinder';
import AboutMe from './components/AboutMe';
import Resources from './components/Resources';
import Footer from './components/Footer'; 
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <NavigationBar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/symptom-checker" element={<SymptomChecker />} />
                    <Route path="/facility-finder" element={<FacilityFinder />} />
                    <Route path="/about" element={<AboutMe />} />
                    <Route path="/resources" element={<Resources />} />
                </Routes>
                <Footer /> 
            </div>
        </Router>
    );
}

export default App;

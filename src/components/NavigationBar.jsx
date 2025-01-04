import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../assets/logo.png';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu's open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle('menu-open', !isOpen); // Add/remove class to prevent scrolling
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove('menu-open'); // Ensure scrolling is allowed
  };

  useEffect(() => {
    return () => {
      // Cleanup: Ensure menu is closed on unmount
      document.body.classList.remove('menu-open');
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><NavLink exact to="/" onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/symptom-checker" onClick={closeMenu}>Symptom Checker</NavLink></li>
        <li><NavLink to="/facility-finder" onClick={closeMenu}>Facility Finder</NavLink></li>
        <li><NavLink to="/about" onClick={closeMenu}>About Me</NavLink></li>
        <li><NavLink to="/resources" onClick={closeMenu}>Resources</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;

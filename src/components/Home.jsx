import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import elderlyMainPic from '../assets/elderly1.jpeg';
import disparityIcon from '../assets/disparity.png';
import enhancedIcon from '../assets/enhanced.png';
import communityIcon from '../assets/community.png';
import stethoscopeIcon from '../assets/stethoscope.png';
import resourcesIcon from '../assets/resources.png';
import mapMarkerIcon from '../assets/mapmarker.png';


const Home = () => {
  // useRef to keep a reference to the card elements
  const cardsRef = useRef([]);
  // useState to manage the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // IntersectionObserver to add/remove 'visible' class to/from cards when they enter/exit the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (index + 1) * 150);
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.5 });

    // Observe each card
    cardsRef.current.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  //Slide deck array
  const slides = [
    {
      title: "Symptom Checker",
      content: "Our innovative Symptom Checker allows you to describe your symptoms through voice input. Based on your description, we recommend appropriate specialists, ensuring you receive targeted medical advice quickly and efficiently.",
      link: "/symptom-checker",
      buttonText: "Try Now",
      imgSrc: stethoscopeIcon
    },
    {
      title: "Facility Finder",
      content: "Navigate healthcare options with ease using our Facility Finder. Specify your medical needs, distance preferences, and location to discover nearby healthcare facilities and specialists. We provide detailed information to help you make informed decisions about your healthcare.",
      link: "/facility-finder",
      buttonText: "Find Facilities",
      imgSrc: mapMarkerIcon
    },
    {
      title: "Resources",
      content: "Access a comprehensive range of resources tailored to rural healthcare challenges. From educational materials on preventive care to updates on local healthcare initiatives, we empower you with knowledge to make informed healthcare choices.",
      link: "/resources",
      buttonText: "Explore Resources",
      imgSrc: resourcesIcon
    }
  ];
  
  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="main-content">
      {/* Intro section with title, description, and button */}
      <div className="home-container">
        <div className="intro-section">
          <h1>We are Heartland Health</h1>
          <p>Your dedicated guide to improving healthcare access and equity in rural communities!</p>
          <Link to="/symptom-checker">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
        {/* Image section */}
        <div className="image-section">
          <img src={elderlyMainPic} alt="Healthcare" />
        </div>
      </div>
      
      {/* Why We Care section with cards */}
      <div className="why-we-care-container">
        <h2>Why We Care</h2>
        <div className="cards-container">
          <div ref={(el) => cardsRef.current.push(el)} className="card">
            <img src={disparityIcon} alt="Card 1" />
            <h3>Addressing Disparities</h3>
            <p>Rural areas often experience significant healthcare disparities, such as fewer healthcare providers, increased travel times to access care, and limited availability of specialized services. Enhancing rural healthcare access and equity ensures universal access to essential medical care, regardless of geographic location.</p>
          </div>
          <div ref={(el) => cardsRef.current.push(el)} className="card">
            <img src={enhancedIcon} alt="Card 2" />
            <h3>Enhancing Health Outcomes</h3>
            <p>Timely and appropriate medical care can significantly improve health outcomes. By facilitating easier access to healthcare facilities and specialists, we can help reduce the prevalence of untreated or poorly managed conditions.</p>
          </div>
          <div ref={(el) => cardsRef.current.push(el)} className="card">
            <img src={communityIcon} alt="Card 3" />
            <h3>Promoting Community Well-being</h3>
            <p>By ensuring that rural communities have access to necessary healthcare services, we contribute to the economic and social stability of these areas. Healthy individuals are more likely to contribute positively to their communities, fostering growth and resilience.</p>
          </div>
        </div>
      </div>
      
      {/* How We Help section with slideshow */}
      <div className="how-we-help-container">
        <h2>How We Help</h2>
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'visible' : ''}`}
            >
              <div className="text">
                <h3>{slide.title}</h3>
                <p>{slide.content}</p>
                <Link to={slide.link}>
                  <button className="get-started-btn">{slide.buttonText}</button>
                </Link>
              </div>
              <img src={slide.imgSrc} alt={slide.title} />
            </div>
          ))}
          
          {/* Navigation buttons */}
          <div className="navigation">
            <button className="prev" onClick={prevSlide}>&#10094;</button>
            <button className="next" onClick={nextSlide}>&#10095;</button>
          </div>
          
          {/* Dots for slide navigation */}
          <div className="dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

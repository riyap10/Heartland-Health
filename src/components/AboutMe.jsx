import React from 'react';
import './AboutMe.css';
import riyaImage from '../assets/riya.jpeg';

const AboutMe = () => {
  return (
    /* Main container for the About Me page */
    <div className="about-me-container">

      {/* Main heading section */}
      <h1 className="main-heading">More About Me</h1>

      {/* Wrapper for profile picture and basic info, aligned with content sections */}
      <div className="about-me-content-wrapper">

        {/* Profile picture and basic information section */}
        <div className="profile-picture">
          <img src={riyaImage} alt="Riya" />
          <div className="basic-info">
            <p><strong>Name:</strong> Riya</p>
            <p><strong>School:</strong> Texas A&M University</p>
            <p><strong>Program:</strong> General Engineering</p>
          </div>
        </div>

        {/* Container for the detailed content sections */}
        <div className="about-me-content-container">

          {/* Content section: Addressing Rural Healthcare Challenges */}
          <div className="about-me-content slide-in">
            <h2>Addressing Rural Healthcare Challenges</h2>
            <p>
              My website is dedicated to improving healthcare access in rural areas, a cause close to my heart. Growing up in Branson, MO, I experienced the significant challenges faced by those in remote areas when seeking specialized medical care. For instance, I had to travel long distances to Dallas for dermatology and orthodontist appointments. This experience highlighted the barriers that many in rural communities face, including the strain of long-distance travel and the difficulty in finding quality healthcare resources.
            </p>
          </div>

          {/* Content section: How Our Tools Make a Difference */}
          <div className="about-me-content slide-in">
            <h2>How Our Tools Make a Difference</h2>
            <p>
              Our website offers two key tools designed to address these challenges: the Symptom Checker and the Facility Finder. The Symptom Checker uses advanced audio recognition technology to help users identify potential health issues and recommend specialists based on their symptoms. This tool reduces the need for multiple appointments and long journeys by providing preliminary guidance from home while also helping those who may not be technologically literate.
            </p>
            <br />
            <p>
              The Facility Finder helps users locate nearby healthcare facilities that offer the specific services they need. By entering their zip code, users can quickly find local clinics, hospitals, and specialists, making it easier to access quality care without the burden of extensive travel. These tools aim to bridge the gap between rural residents and the healthcare they need.
            </p>
          </div>

          {/* Content section: Inspiration and Impact */}
          <div className="about-me-content slide-in">
            <h2>Inspiration and Impact</h2>
            <p>
              The difficulties I witnessed in my own community—such as friends and family struggling to find appropriate medical care—motivated me to develop this website. My goal is to leverage technology to simplify access to healthcare services and reduce the stress associated with finding and traveling to medical appointments. Through this project, I hope to make a tangible difference in the lives of those living in rural areas by providing them with the tools they need to manage their health more effectively.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutMe;

import React, { useState } from 'react';
import './Resources.css';

const ResourceSection = ({ title, description, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function for opening/closing section
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="resource-section">
      <div className="resource-header" onClick={toggleOpen}>
        <h3>{title}</h3>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {/* Content displayed when section is open */}
      {isOpen && (
        <div className="resource-content">
          <p>{description}</p>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Resources = () => {
  // Data for resources
  const resourceData = [
    {
      title: 'Telehealth Services',
      description: 'Access telehealth services for remote consultations and treatment.',
      links: [
        { text: 'Teladoc', url: 'https://www.teladoc.com' },
        { text: 'Amwell', url: 'https://www.amwell.com' },
        { text: 'Doctor on Demand', url: 'https://www.doctorondemand.com' },
      ],
    },
    {
      title: 'Financial Assistance Programs',
      description: 'Explore financial assistance programs for healthcare costs.',
      links: [
        { text: 'Health Resources and Services Administration (HRSA)', url: 'https://www.hrsa.gov/get-health-care' },
        { text: 'NeedyMeds', url: 'https://www.needymeds.org' },
        { text: 'Patient Advocate Foundation', url: 'https://www.patientadvocate.org' },
      ],
    },
    {
      title: 'Health Insurance Information',
      description: 'Understand your health insurance options and how to apply for coverage.',
      links: [
        { text: 'Healthcare.gov', url: 'https://www.healthcare.gov' },
        { text: 'Medicare', url: 'https://www.medicare.gov' },
        { text: 'Medicaid', url: 'https://www.medicaid.gov' },
      ],
    },
    {
      title: 'Preventive Care and Wellness Tips',
      description: 'Read articles and guides on preventive care and healthy living.',
      links: [
        { text: 'CDC Prevention', url: 'https://www.cdc.gov/prevention' },
        { text: 'Harvard Health - Preventive Care', url: 'https://www.health.harvard.edu/topics/preventive-care' },
        { text: 'Mayo Clinic - Healthy Lifestyle', url: 'https://www.mayoclinic.org/healthy-lifestyle' },
      ],
    },
    {
      title: 'Mental Health Resources',
      description: 'Find mental health services and support in your area.',
      links: [
        { text: 'MentalHealth.gov', url: 'https://www.mentalhealth.gov' },
        { text: 'National Institute of Mental Health (NIMH)', url: 'https://www.nimh.nih.gov' },
        { text: 'Substance Abuse and Mental Health Services Administration (SAMHSA)', url: 'https://www.samhsa.gov' },
      ],
    },
    {
      title: 'Chronic Disease Management',
      description: 'Get support for managing chronic diseases like diabetes and hypertension.',
      links: [
        { text: 'CDC Chronic Disease', url: 'https://www.cdc.gov/chronicdisease' },
        { text: 'American Diabetes Association', url: 'https://www.diabetes.org' },
        { text: 'American Heart Association', url: 'https://www.heart.org' },
      ],
    },
    {
      title: 'Maternal and Child Health',
      description: 'Access resources for maternal and child health, including prenatal care.',
      links: [
        { text: 'Maternal and Child Health Bureau', url: 'https://mchb.hrsa.gov' },
        { text: 'Office on Women\'s Health', url: 'https://www.womenshealth.gov/pregnancy' },
        { text: 'CDC - Maternal and Child Health', url: 'https://www.cdc.gov/ncbddd' },
      ],
    },
    {
      title: 'Substance Abuse and Addiction Support',
      description: 'Find treatment options and support for substance abuse and addiction.',
      links: [
        { text: 'SAMHSA National Helpline', url: 'https://www.samhsa.gov/find-help/national-helpline' },
        { text: 'Narcotics Anonymous', url: 'https://www.na.org' },
        { text: 'Alcoholics Anonymous', url: 'https://www.alcoholics-anonymous.org' },
      ],
    },
    {
      title: 'Emergency Preparedness',
      description: 'Prepare for medical emergencies and natural disasters.',
      links: [
        { text: 'Ready.gov', url: 'https://www.ready.gov' },
        { text: 'Red Cross - Emergency Preparedness', url: 'https://www.redcross.org/get-help/how-to-prepare-for-emergencies.html' },
        { text: 'CDC - Prep Your Health', url: 'https://www.cdc.gov/prepyourhealth' },
      ],
    },
    {
      title: 'Health Education Materials',
      description: 'Browse educational materials on various health topics.',
      links: [
        { text: 'MedlinePlus', url: 'https://www.medlineplus.gov' },
        { text: 'Mayo Clinic - Patient Care & Health Information', url: 'https://www.mayoclinic.org/patient-care-and-health-information' },
        { text: 'CDC - Health Communication', url: 'https://www.cdc.gov/healthcommunication' },
      ],
    },
    {
      title: 'Community Health Programs',
      description: 'Participate in community health initiatives and wellness programs.',
      links: [
        { text: 'National Association of County and City Health Officials (NACCHO)', url: 'https://www.naccho.org' },
        { text: 'American Public Health Association (APHA)', url: 'https://www.apha.org' },
        { text: 'Healthy Communities', url: 'https://www.healthycommunities.org' },
      ],
    },
    {
      title: 'Legal and Advocacy Resources',
      description: 'Understand your patient rights and find legal assistance.',
      links: [
        { text: 'Patient Advocate Foundation', url: 'https://www.patientadvocate.org' },
        { text: 'National Health Law Program', url: 'https://www.healthlaw.org' },
        { text: 'AARP Health Care Advocacy', url: 'https://www.aarp.org/ppi/issues/health-care' },
      ],
    },
    {
      title: 'Transportation Services',
      description: 'Find transportation options for accessing healthcare services.',
      links: [
        { text: 'Uber Health', url: 'https://www.uber.com/us/en/ride/uber-health' },
        { text: 'Lyft Healthcare', url: 'https://www.lyft.com/business/healthcare' },
        { text: 'MTM Transportation', url: 'https://www.mtm-inc.net/transportation-management' },
      ],
    },
  ];

  return (
    <div className="resources-container">
      <h2>Resources</h2>
      <p>Need some extra help? We got you covered.</p>
      <div className="resources-box">
        {resourceData.map((resource, index) => (
          <ResourceSection
            key={index}
            title={resource.title}
            description={resource.description}
            links={resource.links}
          />
        ))}
      </div>
    </div>
  );
};

export default Resources;

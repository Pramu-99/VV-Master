import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from './assets/features.jpg';

function AboutUs() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    // Smooth scroll effect
    const handleScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    };

    document.querySelectorAll('a.scroll-link').forEach(anchor => {
      anchor.addEventListener('click', handleScroll);
    });

    // Cleanup event listeners on component unmount
    return () => {
      document.querySelectorAll('a.scroll-link').forEach(anchor => {
        anchor.removeEventListener('click', handleScroll);
      });
    };
  }, []);

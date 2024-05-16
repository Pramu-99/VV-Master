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

return (
    <div>
      <style>
        {`
          body {
            scroll-behavior: smooth;
          }

          .card {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
          }

          .card-title {
            font-family: 'Arial', sans-serif;
            color: #333;
          }

          .card-text {
            font-family: 'Verdana', sans-serif;
            color: #555;
          }

          .btn {
            transition: all 0.3s ease;
          }

          .btn:hover {
            transform: scale(1.05);
          }

          .list-group-item {
            border: none;
            padding-left: 0;
          }

          .list-group-item strong {
            font-size: 1.1em;
          }

          .text-center {
            text-align: center;
          }

          .card-img-top {
            width: 100%;
            height: auto;
          }
        `}
      </style> 

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
<div className="container mt-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="card">
              <img
                src={image}
                alt="Campus Life"
                className="card-img-top"
              />
              <div className="card-body">
                <h1 id="who-we-are" className="card-title text-center mb-4">WHO WE ARE</h1>
                <p className="card-text">
                  <strong>Through the Lens: Exploring Campus Life with the University of Vavuniya's Official Camera Club</strong>
                  is an invitation to discover the university experience from a unique perspective.
                  As the official camera club of the University of Vavuniya, this club covers all major events on campus and captures the diverse aspects of university life.
                  With their photos, readers will get an inside look into campus life, and gain a deeper understanding of what it means to be a part of this vibrant community.
                </p>
                <div className="text-center mt-4">
                  <button className="btn btn-primary" onClick={toggleShowMore}>
                    {showMore ? 'Show Less' : 'Read More'}
                  </button>
                </div>
                {showMore && (
                  <div>
                    <p className="card-text mt-4">
                      Our talented photographers are dedicated to showcasing the beauty and vibrancy of our university.
                      Whether it's a sports event, a cultural festival, or a quiet moment in the library, we aim to capture the essence of university life in every shot.
                    </p>
                    <p className="card-text">
                      Join us as we explore the stories and moments that make the University of Vavuniya unique.
                      Through our lens, you will see the university as never before, experiencing the excitement, diversity, and spirit of our community.
                    </p>
                    <h2 id="our-team" className="card-title mt-5">Our Team</h2>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Pramudith Jayasekara</strong><br />
                        <br />
                        Information and Communication Technology, Faculty of Applied Science
                      </li>
                      <li className="list-group-item">
                        <strong>Roshni Angelin</strong><br />
                        <br />
                        Information and Communication Technology, Faculty of Applied Science
                      </li>
                      <li className="list-group-item">
                        <strong>Masma Sajahan</strong><br />
                        <br />
                        Information and Communication Technology, Faculty of Applied Science
                      </li>
                      <li className="list-group-item">
                        <strong>Tenura Pasandul</strong><br />
                        <br />
                        Information and Communication Technology, Faculty of Applied Science
                      </li>
                      <li className="list-group-item">
                        <strong>Jeevana Thiruchelvam</strong><br />
                        <br />
                        Information and Communication Technology, Faculty of Applied Science
                      </li>
                      <li className="list-group-item">
                        <strong>Sithruby Manoranjan</strong><br />
                        <br />
                        Information and Communication Technology, Faculty of Applied Science
                      </li>
                      <li className="list-group-item">
                        <strong>Elitchelvan Thujeerathan</strong><br />
                        <br />
                        Information and Communication Technology, Faculty of Applied Science
                      </li>
                      <li className="list-group-item">
                        <strong>Jasmini Srinivaskaran</strong><br />
                        <br />
                        Information and Communication Technology, Faculty of Applied Science
                      </li>
                    </ul>
                    <div className="text-center mt-4">
                      <a href="#who-we-are" className="btn btn-primary scroll-link mx-2">Who We Are</a>
                      <a href="#our-team" className="btn btn-secondary scroll-link mx-2">Our Team</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

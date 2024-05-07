import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = (props) => {
  
    const memreg=props.memreg;
    console.log(props.memreg);
    
    const [review,setReview]=useState([]);
    const [ratedavg,setRatedavg]=useState(0);
    
    
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <span key={i} style={{ color: i <= rating ? 'gold' : 'gray' }}>
            &#9733;
          </span>
        );
      }
      return stars;
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
        
          
          const response = await axios.get('http://localhost:8000/review');
          
          console.log('API Response:', response.data);
          setReview(response.data);
          console.log(review);
        } catch (error) {
          console.error('Error fetching members:', error.message);
        }
      };
  
      fetchData();
      
    }, []);
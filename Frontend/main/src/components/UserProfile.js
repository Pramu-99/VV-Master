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

    const styles = {
  
        reviewBox: {
          backgroundColor: '#f5f5f5',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
          padding: '5px',
          marginTop: '50px',
          marginBottom: '0px',
          display: 'flex',
          alignItems: 'center',
          width: '72%',
       
    
        },
        popup:{
          position:"fixed",
          top:'0px',
          left:'0px',
          width:'100%',
          height:'100vh',
          backgroundColor:'rgba(0,0,0,0.2)',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
        },
    
        popupinner:{
          position:'relative',
          padding:'32px',
          width:'100%',
          maxWidth:'640px',
          backgroundColor:'#fff',
          overflow:'scroll',
          height:'60vh',
        },
        closebtn:{
          position:'sticky',
          float:'right',
          top:'0px',
          right:'16px',
          padding:'5px 10px',
        },
        circle: {
          backgroundColor: '#ccc',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          marginRight: '10px',
          marginBottom: '50px',
          
        },
        reviewContent: {
          flex: '1',
          margin:'30px',
        },
        ratingStars: {
          color: 'gold',
        },
        messageLink: {
          color: 'black',
          cursor: 'pointer',
          marginLeft:'0px',
        },
        heading: {
          paddingTop: '50px'
        }
      };
    
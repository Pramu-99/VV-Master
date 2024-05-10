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
      return (props.trigger)?(
        <div style={styles.popup}>
            <div style={styles.popupinner}>
                <button style={styles.closebtn} onClick={()=>props.setTrigger(false)}>Close</button>
            
    
                <h2>As A Cameraman</h2>
            {Array.isArray(review.existingPosts) ? (
      review.existingPosts.map((item, key) => {
        if (memreg === item.regno && item.role=="Cameraman") {
          
          console.log(item.regno);
          
          return (
            <div key={key} style={styles.reviewBox}>
              <div style={styles.circle}></div>
              <div style={styles.reviewContent}>
                <b>
                  <p>{item.userregno}</p>
                  <p>CURRENT DATE: {new Date().toLocaleDateString()} </p>
                  <div style={styles.ratingStars}>{renderStars(item.rate)}</div>
                </b>
                <p style={styles.messageLink}><b>{item.reviewmsg}</b></p>
              </div>
            </div>
          );
          
        }
      })
    ) : (
      <p>error</p>
    )}
    
    <h2 style={styles.heading}>As A Editor</h2>
            {Array.isArray(review.existingPosts) ? (
      review.existingPosts.map((item, key) => {
        if (memreg === item.regno && item.role=="Editor") {
          
          console.log(item.regno);
          
          return (
            <div key={key} style={styles.reviewBox}>
              <div style={styles.circle}></div>
              <div style={styles.reviewContent}>
                <b>
                  <p>{item.userregno}</p>
                  <p>CURRENT DATE: {new Date().toLocaleDateString()} </p>
                  <div style={styles.ratingStars}>{renderStars(item.rate)}</div>
                </b>
                <p style={styles.messageLink}><b>{item.reviewmsg}</b></p>
              </div>
            </div>
          );
          
        }
        
      })
    ) : (
      <p>error</p>
    )}
    <div style={{ flex: '1', padding: '20px' }} >
        
        </div>
        </div>
      </div>
    ):""
  }
  
  export default UserProfile;
      
import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import UserNavbar from "./UserNavbar";
import axios from 'axios';
const colors = {
  orange: "#FFBA5A",
  grey: "#a2a2a2",
  lightGreen: "#afdd37",
  lightPink: "#f3f1ff",
};
const Swal = require('sweetalert2');

function UserReview() {

  const memRegNo=localStorage.getItem('username');
  localStorage.setItem('username', memRegNo);
  console.log(memRegNo);

  const [formData, setFormData] = useState({
    userregno:memRegNo,
    regno:'',
    role:'',
    rate:'',
    reviewmsg:'',
  });

  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [reviewMsg,setReviewMsg] = useState();
  const [regNo,setRegNo]= useState();
  const [members, setMembers] = useState(["nimal"]); // Corrected the initialization here
  
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts');
        // Assuming response.data is an array or has an array property
        console.log('API Response:', response.data);
        setMembers(response.data);
        
      } catch (error) {
        console.error('Error fetching members:', error.message);
      }
    };

    fetchData();
    console.log(members.status);
  }, []);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.regno);
    console.log(formData.rate);
    console.log(currentValue);
    console.log(formData.reviewmsg);
  };

  const savePostToMongo = async () => {
    try {
      
      await axios.post('http://localhost:8000/review/save', formData);
      Swal.fire({
        title: 'Review Successfully',
        text: 'Thank you for Reviewing',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setFormData({
        userregno:memRegNo,
        regno:'',
        role:'',
        rate:'',
        reviewmsg:'',
      });
      //navigate('/login');
      /*console.log('Post saved successfully');*/
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Please check your internet Connection',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error saving post:', error.message);
    }
  };
  const onSubmit = () => {
    //console.log(formData);
    console.log(regNo);
    console.log(currentValue);
    savePostToMongo();
  };

  return (
    <div style={styles.Review}>
      <UserNavbar/>
    <form style={styles.container} >
      <h2>REVIEW</h2>
      
      <select style={styles.boxBack}  name="regno" onChange={handleChange}>
      {Array.isArray(members.existingPosts) ? (
            members.existingPosts.map((res, index) => (
              
        <option value={res.regno}>{res.fname} {res.lname}</option>
            ))
      ):(
        <option>no any records</option>
      )
          }
      </select>
      <select style={styles.boxBack} name='role' onChange={handleChange}>
        <option value={"Cameraman"}>As A Cameraman</option>
        <option value={"Editor"}>As A Editor</option>
      </select>
     <p></p>
      <h2>Rate Us</h2>
      <div style={StyleSheet.stars}>
      {stars.map((_key, index) => {
          return (
        <FaStar
        key={index}
        size={20}
        styles={{
          marginRight: 10,
          cursor: "hand",
        }}
        color={
          (formData.rate)>index  
          ? colors.orange
          : colors.grey
        }

        
        />
          )})
      }     
        {/*{stars.map((_key, index) => {
          return (
            <FaStar
              key={index}
              size={20}
              styles={{
                marginRight: 10,
                cursor: "hand",
              }}
              color={
                (hoverValue || currentValue) > index &&
                (currentValue > 2 || hoverValue > 2)
                  ? colors.lightGreen
                  : (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              //onMouseMove={console.log(hoverValue, currentValue, index)}
              onClick={() => handleClick(index + 1)}
              
              
              onChange={handleChange}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}*/}
        <input type="number" max={"5"} min={"1"} name="rate" style={styles.ratingBox} value={formData.rate} onChange={handleChange} title={"can be review by 1 to 5 rates"}/>
      </div>
      <textarea
        placeholder="Review Here" name="reviewmsg"
        style={Object.assign({}, styles.textarea, styles.boxBack)}
        onChange={handleChange}
        value={formData.reviewmsg}
      />
      <br />
      <input type="button" style={styles.button} onClick={onSubmit} value={"Post"}/>
    </form>
    </div>
  );
}

const styles = {
  Review:{
    height:"100vh",
 // backgroundColor:"rgba(128, 128, 128, 0.281)",
  },
  container: {
    boxShadow: "2px 2px 10px #222",
    backgroundColor: "#FFF",
  //  border: "1px solid black",
    borderRadius: 15,
    width: "400px",
    padding: "50px",
    flexDirection: "column",
    alignItems: "start",
    
    marginTop:"3%",
    marginLeft:"35%",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 400,
    margin: "20px 0",
    minHeight: 100,
    padding: 10,
  },
  button: {
    boxShadow: "2px 2px 10px #2222228e",
    border: "0px",
    borderRadius: 5,
    backgroundImage: "linear-gradient(#dddc68, #67d965)",
    width: 100,
    padding: 10,
  },
  boxBack: {
    backgroundColor: colors.lightPink,
    padding: 10,
    width:200,
    border: "0px",
    boxShadow: "2px 2px 10px #2222228e",
    borderRadius: 5,
  },
  ratingBox: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    margin: "0px 20px",
    padding:1,
    boxShadow: "2px 2px 10px #2222228e",
  }
};

export default UserReview;

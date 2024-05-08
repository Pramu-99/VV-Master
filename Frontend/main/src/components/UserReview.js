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

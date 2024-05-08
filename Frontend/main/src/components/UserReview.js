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

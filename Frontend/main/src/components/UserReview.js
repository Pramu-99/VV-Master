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

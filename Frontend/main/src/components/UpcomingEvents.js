import React, { useEffect,useState } from 'react';

import "../css/UpcomingEvents.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Event from "../img/apply.jpg";

import UserNavbar from "./UserNavbar";

import axios from 'axios';


function UpcomingEvents() {



  const memRegNo=localStorage.getItem('username');

  localStorage.setItem('username', memRegNo);

  console.log(memRegNo);

  const Swal = require('sweetalert2');

  const [eventDetails, setEventDetails] = useState(["nimal"]);

  const [formData, setFormData] = useState({

    userregno: memRegNo,

    event: '',

    roleapply: '',

    status: false,

    marks:0,
  });

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get('http://localhost:8000/events');

        

        console.log('API Response:', response.data);

        setEventDetails(response.data);

        

      } catch (error) {

        console.error('Error fetching members:', error.message);

      }

    };

    fetchData();

    console.log(eventDetails.status);

  }, []);



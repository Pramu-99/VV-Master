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

   const savePostToMongo = async () => {

    try {

      console.log(formData);

      await axios.post('http://localhost:8000/apply/save', formData);

      Swal.fire({

        title: 'Registration Successful',

        text: 'Admin will accept your request',

        icon: 'success',

        confirmButtonText: 'OK'

      });

      setFormData({

        userregno: memRegNo,

        event: '',

        roleapply: '',

        status: false,

        marks:0,

      });

      

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

const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

  };



  const onSubmit = () => {

    console.log(formData.userregno);

    console.log(formData.event);

    console.log(formData.roleapply);

    console.log(formData.status);

    savePostToMongo();

  };



  return (

    <div className="Container_1">

      <UserNavbar/>  

      <div className="form_container">

        <div className="left_form_container p-3">

          <h1 style={{textAlign:"center"}}>Appilication Form</h1>



          <form className="event_form">

            <div className="form-group">

              <h2 style={{fontSize:"1rem"}}>Up Comming Events</h2>

              <select className="inline-select" placeholder="Select Event" name='event' onChange={handleChange} value={formData.event}>

              <option disabled={true} value={"Select Event"}>Select Event</option>

              {Array.isArray(eventDetails.existingPosts) ? (

                eventDetails.existingPosts.map((res, index) => (

              

                  <option >{res.eventname}</option>

                ))

              ):(

                  <option>no any records</option>

                )

              }

                

              </select>

            </div>



            <div className="form-group mt-5">

              <p className="inline-label">I like to contribute as</p>

              <select className="inline-select" name="roleapply" onChange={handleChange} value={formData.roleapply}>

                <option disabled={true} >Select Role</option>

                <option >Cameraman</option>

                <option >Designer</option>

              </select>

            </div>



            <input className="submit_But mt-5" type="button" onClick={onSubmit} value={"Confirm"}/>

              

          </form>

        </div>

        <div className="right_form_container d-flex ">

          <img src={Event} alt="Event" className="form_img" />

        </div>

      </div>

    </div>

  );

}

export default UpcomingEvents;




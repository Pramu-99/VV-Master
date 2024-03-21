import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import '../css/registration.css';
import KenBurnsEffect from './KenBurnsEffect';
import UserNavbar from './UserNavbar';




export default function UserRegistration() {
  const [step, setStep] = useState(1);

  const Swal = require('sweetalert2');

  const props = useSpring({
    opacity: 1,
    transform: 'translateX(0%)',
    from: { opacity: 0, transform: 'translateX(50%)' },
  });

  

  const [formData, setFormData] = useState({
    regno: '',
    currentyear: '',
    pass: '',
    cpass: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    fname: '',
    lname: '',
    phone: '',
    email: '',
  });

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const savePostToMongo = async () => {
    try {
      await axios.post('http://localhost:8000/post/save', formData);
      Swal.fire({
        title: 'Registration Successful',
        text: 'Admin will accept your request',
        icon: 'success',
        confirmButtonText: 'OK'
      });
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    savePostToMongo();
  };

  return (
    <div className='reg'>
      <UserNavbar/>
      <form id="msform">
        {/* Progressbar */}
      <ul id="progressbar">
        <li className={step === 1 ? 'active' : ''}>Account Setup</li>
        <li className={step === 2 ? 'active' : ''}>Social Profiles</li>
        <li className={step === 3 ? 'active' : ''}>Personal Details</li>
      </ul>

      {/* Fieldsets */}
        <animated.fieldset style={props} >
          {step === 1 && (
            <>
                <h2 className="fs-title">Create your account</h2>
            <h3 className="fs-subtitle">This is step 1</h3>
            <input type="text" name="regno" placeholder="Registration No" onChange={handleChange}/>
            <select placeholder='Choose Your Year' name="currentyear" onChange={handleChange}>
              <option value="1st year">I'm 1st Year Student</option>
              <option value="2nd year">I'm 2nd Year Student</option>
              <option value="3rd year">I'm 3rd Year Student</option>
              <option value="4th year">I'm 4th Year Student</option>
            </select>
            <input type="password" name="pass" placeholder="Password" onChange={handleChange}/>
            <input type="password" name="cpass" placeholder="Confirm Password" onChange={handleChange}/>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="fs-title">Social Profiles</h2>
            <h3 className="fs-subtitle">Your presence on the social network</h3>
            <input type="text" name="linkedin" placeholder="LinkedIn" onChange={handleChange}/>
            <input type="text" name="facebook" placeholder="Facebook" onChange={handleChange}/>
            <input type="text" name="instagram" placeholder="Instagram" onChange={handleChange}/>
            </>
          )}
          {step === 3 && (
            <>
                <h2 className="fs-title">Personal Details</h2>
            <h3 className="fs-subtitle">We will never sell it</h3>
            <input type="text" name="fname" placeholder="First Name" onChange={handleChange}/>
            <input type="text" name="lname" placeholder="Last Name" onChange={handleChange}/>
            <input type="number" name="phone" placeholder="Phone" onChange={handleChange}/>
            <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
            </>
          )}

          {/* Buttons */}
          {step !== 1 && (
            <input
              type="button"
              name="previous"
              className="previous action-button"
              value="Previous"
              onClick={previousStep}
            />
          )}
          {step !== 3 ? (
            <input
              type="button"
              name="next"
              className="next action-button"
              value="Next"
              onClick={nextStep}
            />
          ) : (
            <a href="#" className="submit action-button" onClick={onSubmit}>
              Submit
            </a>
          )}
        </animated.fieldset>
      </form>
    </div>
  );
};



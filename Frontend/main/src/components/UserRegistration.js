import React, { useState,useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import '../css/registration.css';
import KenBurnsEffect from './KenBurnsEffect';
import UserNavbar from './UserNavbar';
import { useNavigate } from 'react-router-dom';



export default function UserRegistration() {

  

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts');
        console.log('API Response:', response.data);
        setMembers(response.data.existingPosts.filter(mem => mem.regno === storeRegno));
        
      } catch (error) {
        console.error('Error fetching members:', error.message);
      }
    };

    fetchData();
    console.log(members.status);
  }, []);*/
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const Swal = require('sweetalert2');

  const props = useSpring({
    opacity: 1,
    transform: 'translateX(0%)',
    from: { opacity: 0, transform: 'translateX(50%)' },
  });

  

  const [formData, setFormData] = useState({
    regno: '',
    pass: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    fname: '',
    lname: '',
    phone: '',
    email: '',
    approval:false,
    role:'member',
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
      // Hash the password
      const hashedPassword = hashPassword(formData.pass);
  
      // Update formData with hashed password
      const updatedFormData = { ...formData, pass: hashedPassword };
  
      // Save the updated form data to MongoDB
      await axios.post('http://localhost:8000/post/save', updatedFormData);
  
      // Reset form data and navigate to login page
      setFormData({
        regno: '',
        pass: '',
        linkedin: '',
        facebook: '',
        instagram: '',
        fname: '',
        lname: '',
        phone: '',
        email: '',
        approval: false,
        role: 'member',
      });
      setConfirmPass("");
      navigate('/');
      
      // Show success message
      Swal.fire({
        title: 'Registration Successful',
        text: 'Admin will accept your request',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      // Show error message
      Swal.fire({
        title: 'Error',
        text: 'All fields are must require',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error saving post:', error.message);
    }
  };
  
  // Simple hash function for demonstration (not secure for production)
  const hashPassword = (password) => {
    // This is a simple hash function. Replace it with a secure hash function in production.
    let hash = 0;
    if (password.length == 0) {
      return hash;
    }
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  };
  
  const [confirmPass,setConfirmPass] = useState();
  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeRegNo = (e) => {
    const inputValue = e.target.value;

      if (/^[a-z0-9]*$/.test(inputValue)) {
        setFormData({...formData, [e.target.name]: inputValue });
      }else{
        Swal.fire({
          title: 'Error',
          text: 'do not use capital letters and any symbol',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    
  };

  const handleChangePhone = (e) => {
    if(e.target.value>999999999){
      Swal.fire({
        title: 'Error',
        text: 'do not use more than 10 numbers',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }else{
      setFormData({...formData, [e.target.name]: e.target.value });
    }
  }

  const onSubmit = async () => {
    try {
      const response = await axios.get('http://localhost:8000/posts');
      console.log('API Response:', response.data);
      const existingMember = response.data.existingPosts.find(mem => mem.regno === formData.regno);
      
      if (existingMember) {
        Swal.fire({
          title: 'Already Registered',
          text: 'Check your Registration No again',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        if (formData.pass === confirmPass) {
          savePostToMongo();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Not matching Password and Confirm Password',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching members:', error.message);
    }
  };
  

  return (
    <div className='reg'>
      
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
            <input type="text" name="regno" value={formData.regno} placeholder="Registration No (ex-: 2019ictxx) *" onChange={handleChangeRegNo} maxLength={10} required/>
            
            
            <input type="password" name="pass" placeholder="Password*" value={formData.pass} onChange={handleChange} required/>
            <input type="password" name="cpass" placeholder="Confirm Password*" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}  required/>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="fs-title">Social Profiles</h2>
            <h3 className="fs-subtitle">Your presence on the social network</h3>
            <input type="text" name="linkedin" placeholder="LinkedIn*" value={formData.linkedin} onChange={handleChange} required/>
            <input type="text" name="facebook" placeholder="Facebook*" value={formData.facebook} onChange={handleChange} required/>
            <input type="text" name="instagram" placeholder="Instagram*" value={formData.instagram} onChange={handleChange} required/>
            </>
          )}
          {step === 3 && (
            <>
                <h2 className="fs-title">Personal Details</h2>
            <h3 className="fs-subtitle">We will never sell it</h3>
            <input type="text" name="fname" placeholder="First Name*" value={formData.fname} onChange={handleChange} required/>
            <input type="text" name="lname" placeholder="Last Name*" value={formData.lname} onChange={handleChange} required/>
            <input type="number" name="phone" placeholder="Phone*" value={formData.phone} onChange={handleChangePhone}   required/>
            <input type="text" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required/>
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



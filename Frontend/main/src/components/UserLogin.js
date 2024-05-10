import React, { useState } from 'react';
import axios from 'axios';
import '../css/UserLogin.css'; 
import logo1 from '../img/logo1.png';
import KenBurnsEffect from './KenBurnsEffect';
import '../css/font-awesome-4.7.0/css/font-awesome.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserNavbar from './UserNavbar';


const UserLogin = () => {
  const [regno, setRegno] = useState("");
    const [pass, setPass] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();

     try {
            const user={ regno, pass };
            const response = await axios.post('http://localhost:8000/post/login',user);
            console.log('suc:',response.data);
            
            if (response.data.success === "success") {
              localStorage.setItem('username', regno);
                
                console.log(localStorage.getItem('username'));
                Swal.fire({
                    title: 'Success',
                    text: 'Login Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate('/');
            } else {
              
              Swal.fire({
                  title: 'Error',
                  text: 'Incorrect Username or Password',
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'Incorrect Username or Password',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

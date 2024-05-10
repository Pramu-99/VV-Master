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

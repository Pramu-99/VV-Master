{/*
import './css/login.css';
import  backImg from  '../assets/img/back.png';
import logo from '../assets/img/logo.png';
export default function Login()
{
    const backStyle={
              "color":"lightgreen",
              "flex":1,
              "flexDirection":"column",
              "justifyContent":"center"
    }
    const backimage={
      "backgroundImage":{backImg}
    }
    
    return(
        <div className='row' >
       
         
           <div className="column1">
           <br></br>
           <br></br>
             <h3>LOGIN HERE</h3>
             <h4>Vanni Vogue Digitalize System</h4>
             <input type="text" placeholder="Username" name="uname" required />
            <input type="password" name="psw" placeholder="Password" required/>
            <input type="submit" name="" value="Login" />
            </div>

            <div className='column1'>
                <div className='column2'  >
                  <img src={logo}></img>
                </div>
               
            </div>
            </div>
            
         
       
       
    )
}
*/}

import React, { useState } from 'react';

import './css/login.css'; 
import logo1 from '../assets/img/logo.png';

import '../../node_modules/font-awesome/css/font-awesome.min.css'

const Login = () => {
  
  return (
    <div className='loginBack'>
      {/*<UserNavbar/>*/}
      <div className='outlineBorder'>
        <form className='loginForm'>
          <h1>LOGIN</h1>
          <p>Vanni Vogue Digitalize System</p>
          <input type='text' className='fa' placeholder='&#xf007; Username'/><br/>
          <input type='password' className='fa' placeholder='&#xf023; Password'/><br/>
          <button className='loginButton'>Login Now</button>
          <a href='/register' className='labelLogin'><p><label>SignUp</label>  Here</p></a>
        </form>
        <span className='logoareaLogin'>
          <div className='blurArea'>
              
          </div>
          <img src={logo1} className='logoVanni'/>
        </span>
      </div>
    </div>
  );
};

export default Login;

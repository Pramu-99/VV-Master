import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import BackGround from "../../assets/images/background.png";
import ContactImg from "../../assets/images/contactus.png";
import LogoImg from "../../assets/images/logo.png";
import "..css/contact.css";

const Contactus = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!message.trim()) {
      errors.message = "Message is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Handle form submission when there are no errors
      alert("Form submitted successfully!");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <section className="root">
        
      <div className="logo-container">
        <img style={{ height: 200 }} src={LogoImg} />
      </div>

      <div className = "mainBox-container" >

        <div className = "form-view">
          <form onSubmit={handleSubmit}>
            
            <h1 className = "form-title"> Contact Us </h1>
            <h2 className = "form-subtitle">Please feel free to reach out to us using the information below</h2>

            <div
              className = ""
              style={{
                width: "100%",
                paddingTop: '10px',
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
                <div className = "input-container">
                  <label htmlFor = "name"> Name: </label> <br />
                  <div className = "relative" >
                    <FaUser className = "icon" />
                    <input
                      className = 'input-box'
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Thujeerathan"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {/* {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>} */}
                  </div>

                  <label htmlFor="email"> Email: </label>
                  <div className="relative">
                    <MdEmail className = "icon" />
                    <input
                      className = 'input-box'
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      required
                    />
                    {/* {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>} */}
                  </div>
               

                  <label htmlFor="message">Message:</label> <br />
                  <textarea
                    className = 'inputMessage-box'
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="5"
                    cols="30"
                    placeholder="Enter your message here..."
                    required
                  >

                  </textarea>
                  {/* {errors.message && <span className="text-red-500 text-xs"> {errors.message} </span>} */}

                  <div className = "button-container">
                    <button
                      type="submit"
                      className = "submit-button"
                    >
                      {" "}
                       Submit{" "}
                    </button>
                  </div>

                </div>

              <div>
                <div className = "image-container">
                  <img
                    className = "contact-image"
                    src={ContactImg}
                    alt="contact"
                  />
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contactus;

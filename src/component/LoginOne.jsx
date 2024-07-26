import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/Logo.png";
import Eye from "../assets/Eye.png";
import { Link, useNavigate } from 'react-router-dom';

function LoginOne() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage("Please enter your email to reset your password.");
      return;
    }
    setErrorMessage(""); // Clear any previous error messages

    try {
      const token = localStorage.getItem('jwtToken'); // Get the JWT token from localStorage
      const response = await axios.post(
        'https://project-rof.vercel.app/api/login/forgot-password',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Password reset link has been sent to your email.");
      } else {
        setErrorMessage(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Failed to send password reset link. Please try again later.");
      } else if (error.request) {
        setErrorMessage("No response received from server. Please try again later.");
      } else {
        setErrorMessage("Error in setting up the request. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }
    setErrorMessage(""); // Clear any previous error messages
    console.log("Email:",email);
    console.log("Password:",password);
  
    }
  return (
    <div className="bg-[#F7F3E8] flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-md rounded-lg py-[40px] px-[20px] text-center w-[555px] h-auto max-w-lg hero">
        <img
          src={Logo}
          alt="ROF Logo"
          className="mx-auto mb-4 w-[188px] h-[131px] max-w-xs"
        />
        <p
          style={{
            fontFamily: "Poppins",
            fontSize: "32px",
            fontWeight: "600",
            lineHeight: "36px",
            textAlign: "center",
          }}
          className="text-[#353535] mb-2"
        >
          Welcome to ROF Team Portal
        </p>

        <p
          style={{
            fontFamily: "Manrope",
            fontSize: "18px",
            fontWeight: "500",
            lineHeight: "24.59px",
            textAlign: "center",
          }}
          className="text-[#747474] mb-8"
        >
          Use your work email to log in your team workspace
        </p>

        <form onSubmit={handleSubmit}>
          <div className="text-left mb-4 mx-auto" style={{ maxWidth: '426px' }}>
            <label
              style={{
                fontFamily: "Manrope",
                fontSize: "18px",
                fontWeight: "500",
              }}
              className="block text-[#353535] text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full h-[49px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '426px',
                borderWidth: '1.5px',
                borderColor: '#353535',
                fontFamily: "Manrope",
                fontSize: '18px',
                fontWeight: '500',
                borderRadius: '8px'
              }}
            />
          </div>

          <div className="text-left mb-6 mx-auto" style={{ maxWidth: '426px' }}>
            <div className="flex justify-between items-center mb-2">
              <label
                style={{
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                className="text-[#353535] text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <Link to ="/login-two">
              <span
                className="text-[#632E04] text-sm font-medium cursor-pointer"
                style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </span>
              </Link>
            </div>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full h-[49px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={10} // Set maxLength to 10
                style={{
                  width: '426px',
                  borderWidth: '1.5px',
                  borderColor: '#353535',
                  fontFamily: "Manrope",
                  fontSize: '18px',
                  fontWeight: '500',
                  borderRadius: '8px'
                }}
              />
              <img
                src={Eye}
                alt="Toggle Password Visibility"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 mb-4" style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}>
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-green-500 mb-4" style={{ fontFamily: "Manrope", fontSize: "14px", fontWeight: "500" }}>
              {successMessage}
            </p>
          )}

          <button type="submit" className="bg-[#632E04] shadow-xl text-white font-bold py-2 px-4 rounded w-full h-[45px] mx-auto" style={{ maxWidth: '426px', fontFamily: 'Manrope', fontSize: '18px', fontWeight: '500', borderRadius: '8px' }}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginOne;

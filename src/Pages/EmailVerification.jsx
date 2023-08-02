import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";

export const EmailVerification = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const url = searchParams.get('url')
  const signature = searchParams.get('signature')
  const [isVerified, setIsVerified] = useState(false)
  const [errorPage, setErrorPage] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')

  useEffect(() => {
    verifyEmail()
  }, [])

  const verifyEmail = async () => {
    try {
      const response = await axios.post(`${url}&signature=${signature}`)
      setIsVerified(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    } catch(error) {
      console.log(error.message)
      
    }
  }

  return (
    <div 
      className="email-verification" 
      style={{
        height: '100vh', 
        width: '100vw', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '2rem'
      }}
    >
      {isVerified ? 
          <>
            <BsCheckCircle style={{color: 'green', width: '5rem', height: '5rem'}}/>
            <h1 style={{fontSize: '3rem', margin: '0'}}>Verified</h1>
          </>
        :
          <>
          {/* Icon */}
            <Spinner color="dark" style={{
              height: '5rem',
              width: '5rem'
            }}></Spinner>
            <h1>Verifying...</h1>
          </>
      }
      {errorPage && 
        <div>
          <h1>{errorMessage}</h1>
        </div>
      }
    </div>
  )
}
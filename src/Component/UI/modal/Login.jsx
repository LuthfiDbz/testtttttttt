import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Alert, Button } from "reactstrap";
import "../../../styles/login/login.scss";
import { AiOutlineClose } from "react-icons/ai";
import ConfirmIcon from '../../../assets/img/img-state-confirmation.png'
import GoogleIcon from '../../../assets/icon/ic-google.png'
import Swal from "sweetalert2";
import axios from 'axios'
import { AuthContext } from "../../authContext/AuthContext";
import { fetchToken } from "../../firebaseNotification/firebase";
import { toast } from "react-hot-toast";
import { LoadingScreen } from "../../loadingScreen/loadingScreen";
import { set } from "date-fns/esm";
import { errorPopup, networkErrorPopup } from "./PopUp/ErrorPopUp";
import { useTranslation } from "react-i18next";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { sendPostRequest } from "../../../services/request-adapter";

export const Login = ({ open, onClose, notifToken }) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [passwordShown, setPasswordShown] = useState("")
  let navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [loadingScreen, setLoadingScreen] = useState(false)

  const [error, setError] = useState(false);

  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const url = process.env.REACT_APP_DEV_URL

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
    } else {
      setLoadingScreen(true)
      try {
        // const response = await sendPostRequest("/login", {
        //   email,
        //   password,
        //   client_id: process.env.REACT_APP_CLIENT_ID,
        //   client_secret: process.env.REACT_APP_CLIENT_SERVICE,
        //   grant_type: 'password'
        // });
        const response = await axios.post(`${url}/login`, {
          email,
          password,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SERVICE,
          grant_type: 'password'
        })

        const token = response.data.response_content.access_token
        
        try {
          const verification = await axios.get(`${url}/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          // console.log(verification.data.data[0])
          if(verification.data.data[0].email_verified_at !== null) {
            
            // localStorage.setItem("ACCESS_TOKEN", token)
            sessionStorage.setItem("token", token)
            setError(false);
            try {
              const tokenFcm = {
                device_key: notifToken
              }
              
              const response = await axios.post(`${url}/user-devices`, tokenFcm, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              const data = response.data.data
              
              toast.success(t('loggedSuccess'))
              setTimeout(() => {
                // auth.setAllProfile('test');
                auth.login()
                navigate('/delivery')
                window.location.reload()
              }, 2000);
            } catch(error) {
              // Still login without push notif
              toast.success(t('loggedSuccess'))
              setTimeout(() => {
                auth.login()
                navigate('/delivery')
                window.location.reload()
              }, 2000);
            }
          } else {
            setLoadingScreen(false)
            errorPopup(t('emailNotVerif'),'', t('close'))
          }
        } catch(error) {
          console.log(error.message);
          setLoadingScreen(false)
          
          if(error.message === 'Network Error') {
            networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
          } else {
            toast.error(t('somethingWrongLogin'))
          }
        }
      } catch(errors) {
        setError(true)
        console.log(errors.response.data.message)
        setLoadingScreen(false)
        if(errors.message === 'Network Error') {
          networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
        } else {
          errorPopup(t('error'),errors.response.data.message, t('close'))
        }
      }
    }
  }

  const handleForgot = () => {
    Swal.fire({
      title: t('forgotPassword'),
      text: t('enterEmailForgotPass'),
      icon: 'info',
      input: 'email',
      inputPlaceholder: t('yourEmail'),
      showCancelButton: true,
      confirmButtonText: t('submit'),
      cancelButtonText: t('cancel'),
      showConfirmButton: true,
      reverseButtons: true,
      customClass: {
        popup: 'popup-swal',
        title: 'title-swal',
        htmlContainer: 'text-swal',
        confirmButton:'confirm-swal',
        cancelButton: 'cancel-swal'
      },
      preConfirm: (email) => {
        return axios.post(`${url}/password/forgot`, {
          email: email
        })
        .then((response) => {
          console.log(response)
        })
        .catch((errors) => {
          Swal.showValidationMessage(JSON.parse(errors.request.response).message)
        })
      }
      
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire({
          title: t('updatePassRequest'),
          icon: 'success',
          text: t('updatePassCheckInbox'),
          showConfirmButton:true,
          confirmButtonText: t('checkEmail'),
          customClass: {
            popup: 'popup-swal',
            title: 'title-swal',
            htmlContainer: 'text-swal',
            confirmButton:'confirm-swal',
            cancelButton: 'cancel-swal'
          },
        })
      }
    })
  }

  // const loginWithGoogle = useGoogleLogin({
  //   onSuccess: (codeResponse) => getDataGoogle(codeResponse),
  //   onError: (error) => console.log('Login Failed:', error)
  // });

  // const getDataGoogle = async (user) => {
  //   console.log(user)
  //   try {
  //     const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //                                   headers: {
  //                                       Authorization: `Bearer ${user.access_token}`,
  //                                       Accept: 'application/json'
  //                                   }
  //                                 })
  //     console.log(res.data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // const responseMessage = async (response) => {
  //   console.log('Berhasil')
  //   console.log(response);

  //   try {
  //     const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.credential}`, {
  //                                   headers: {
  //                                       Authorization: `Bearer ${response.credential}`,
  //                                       Accept: 'application/json'
  //                                   }
  //                                 })
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // };
  // const errorMessage = (error) => {
  //   console.log('Gagal')
  //   console.log(error);
  // };

  if (!open) return null;
  return (
    <div className="overlay">
      {loadingScreen && <LoadingScreen />}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <AiOutlineClose className="closeBtn" onClick={onClose} />
        <div className="header-login">
          <h4>{t('welcomeBack')}</h4>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-wrapper">
            <label className="label-input" htmlFor="first">
              {t('email')}
            </label>
            <input
              className="input-text"
              type="email"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label className="label-input" htmlFor="first">
              {t('password')}
            </label>
            <input
              className="input-text"
              type={passwordShown ? "text" : "password"}
              required
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordShown ? 
              <BsEyeSlash className="show-password" onClick={togglePassword} />
              :
              <BsEye className="show-password" onClick={togglePassword} />
            }
          </div>
          <a className="forgot-password" href="#" onClick={handleForgot}>
          {t('forgotPassword')}
          </a>
          <Button className="btn-submit-login" type="submit">
          {t('login')}
          </Button>
          {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} theme='filled_blue'/> */}
          {/* <h6>or</h6>
          <button onClick={() => loginWithGoogle()} className="btn btn-light btn-google"> <img src={GoogleIcon} alt="" /> Masuk dengan Google</button> */}
          <span className="direct-signup">
            <p>
            {t('dontHaveAcc')} <a href="/register">{t('signUp')}</a>
            </p>
          </span>
          {/* {error && (
            <Alert color="primary" variant="warning">
              Fill correct Info else keep trying.
            </Alert>
          )} */}
        </form>
      </div>
    </div>
  );
};

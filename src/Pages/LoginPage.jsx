import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Alert, Button } from "reactstrap";
import "../styles/loginPage/loginPage.scss";
import { AiOutlineClose } from "react-icons/ai";
import ConfirmIcon from '../assets/img/img-state-confirmation.png'
import GoogleIcon from '../assets/icon/ic-google.png'
import BgBanner from '../assets/img/bg-banner-4.png'
import Swal from "sweetalert2";
import axios from 'axios'
import { AuthContext } from "../Component/authContext/AuthContext";
import { fetchToken } from "../Component/firebaseNotification/firebase";
import { toast } from "react-hot-toast";
import { LoadingScreen } from "../Component/loadingScreen/loadingScreen";
import { set } from "date-fns/esm";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { useTranslation } from "react-i18next";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { sendPostRequest } from "../services/request-adapter";
import { Helmet } from 'react-helmet';
import { isMobile } from "react-device-detect";
import ReactGA from "react-ga4";

export const LoginPage = ({ open, onClose, notifToken }) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [passwordShown, setPasswordShown] = useState("")
  let navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const islog = sessionStorage.getItem("token");

  const [error, setError] = useState(false);

  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const url = process.env.REACT_APP_DEV_URL

  const handleLogin = async (e) => {
    e.preventDefault();

    ReactGA.event({
      category: "auth_category",
      action: "login_button",
      // label: "start_delivery_label", 
      // value: 99
    });

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
        const response = await axios.post(`${url}/oauth/token`, {
          email,
          password,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SERVICE,
          grant_type: 'password',
          username: email
        })

        const token = response.data.access_token

        try {
          const verification = await axios.get(`${url}/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          console.log(verification?.data?.data[0]?.type)
          if (verification?.data?.data[0]?.type != 2 && verification?.data?.data[0]?.type != 3) {
            setLoadingScreen(false)
            errorPopup(t('userNotAuthorized'), t('loginWithCustomer'), t('close'))
            return
          }
          // console.log(verification.data.data[0])
          if (verification.data.data[0].email_verified_at !== null) {

            // localStorage.setItem("ACCESS_TOKEN", token)

            setError(false);
            try {
              const tokenFcm = {
                device_key: auth.tokenFcm
              }

              const response = await axios.post(`${url}/user-devices`, tokenFcm, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              const data = response.data.data

              toast.success(t('loggedSuccess'))
              setTimeout(() => {
                auth.setAllProfile(verification.data.data[0]);
                sessionStorage.setItem("token", token)
                auth.login()
                navigate('/delivery')
              }, 2000);
            } catch (error) {
              // Still login without push notif
              toast.success(t('loggedSuccess'))
              setTimeout(() => {
                auth.setAllProfile(verification.data.data[0]);
                sessionStorage.setItem("token", token)
                auth.login()
                navigate('/delivery')
              }, 2000);
            }
          } else {
            setLoadingScreen(false)
            errorPopup(t('emailNotVerif'), '', t('close'))
          }
        } catch (error) {
          console.log(error.message);
          setLoadingScreen(false)

          if (error.message === 'Network Error') {
            networkErrorPopup(t('networkErrorTitle'), t('networkErrorText'), t('reload'), t('cancel'))
          } else {
            toast.error(t('somethingWrongLogin'))
          }
        }
      } catch (errors) {
        setError(true)
        console.log(errors.message)
        setLoadingScreen(false)
        if (error.message === 'Network Error') {
          networkErrorPopup(t('networkErrorTitle'), t('networkErrorText'), t('reload'), t('cancel'))
        } else {
          errorPopup(t('error'), errors.response.data.message, t('close'))
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
        confirmButton: 'confirm-swal',
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
      if (result.isConfirmed) {
        Swal.fire({
          title: t('updatePassRequest'),
          icon: 'success',
          text: t('updatePassCheckInbox'),
          showConfirmButton: true,
          confirmButtonText: t('checkEmail'),
          customClass: {
            popup: 'popup-swal',
            title: 'title-swal',
            htmlContainer: 'text-swal',
            confirmButton: 'confirm-swal',
            cancelButton: 'cancel-swal'
          },
        })
      }
    })
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      // console.log(codeResponse)
      ReactGA.event({
        category: "auth_category",
        action: "login_google_button",
        // label: "start_delivery_label", 
        // value: 99
      });

      setLoadingScreen(true)
      try {
        const response = await axios.post(`${url}/login/google`, { oauth_token: codeResponse.access_token })
        // console.log(response.data.meta.custom.access_token)
        toast.success(t('loggedSuccess'))
        // console.log(response.data.data)
        setTimeout(() => {
          if (response.data.data.profile.phone_number === null) {
            const dataGoogle = {
              id: response.data.data.id,
              first_name: response.data.data.profile.first_name,
              last_name: response.data.data.profile.last_name,
              phone_number: response.data.data.profile.phone_number,
              token: response.data.meta.custom.access_token,
            }
            setLoadingScreen(false)
            navigate('/login/profile-data', { state: dataGoogle })
          } else {
            setLoadingScreen(false)
            sessionStorage.setItem("token", response.data.meta.custom.access_token)
            auth.login()
            navigate('/delivery')
          }
        }, 2000);
      } catch (error) {
        setLoadingScreen(false)
        console.log(error.message)
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  if (islog || isMobile) return navigate('/')

  return (
    <div className="login-page">
      <Helmet>
        <title>Superkul | Login</title>
        <meta
          name="description"
          content="Masuk ke Superkul untuk memulai order"
          data-react-helmet="true" />
        <link rel="canonical" href="https://superkul.id/login" />
      </Helmet>
      {loadingScreen && <LoadingScreen />}
      <div className="register-bg" style={{ backgroundImage: `url(${BgBanner})` }}>
        <div className="text-container">
          <h1>{t('login')}</h1>
          <span>
            <a href="/">{t('home')}</a> /<a href="/register"> {t('login')}</a>
          </span>
        </div>
      </div>
      <div className="login-page-content">
        <div className="header-login-page">
          <h4>{t('welcomeBack')}</h4>
        </div>
        <form onSubmit={handleLogin} className="login-page-form">
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
          <h6>or</h6>
          <div onClick={() => loginWithGoogle()} className="btn btn-light btn-google"> <img src={GoogleIcon} alt="" /> Masuk dengan Google</div>
          {/* {error && (
              <Alert color="primary" variant="warning">
              Fill correct Info else keep trying.
              </Alert>
            )} */}
        </form>
        <p className="signup">
          {t('dontHaveAcc')} <a href="/register">{t('signUp')}</a>
        </p>
      </div>
    </div>
  );
};

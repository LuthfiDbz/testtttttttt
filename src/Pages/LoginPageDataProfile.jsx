import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Alert, Button } from "reactstrap";
import "../styles/loginPage/loginPage.scss";
import { AiOutlineClose } from "react-icons/ai";
import ConfirmIcon from '../assets/img/img-state-confirmation.png'
import GoogleIcon from '../assets/icon/ic-google.png'
import BgBanner from '../assets/img/bg-banner-4.png'
import SuccessIcon from '../assets/img/img-state-success.png'
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
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { isMobile } from "react-device-detect";

export const LoginPageDataProfile = ({ open, onClose, notifToken }) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [passwordShown, setPasswordShown] = useState("")
  let navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const islog = sessionStorage.getItem("token");
  const locState = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm();

  const [error, setError] = useState(false);

  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const url = process.env.REACT_APP_URL_CUST
  const headers2 = {
    'Authorization': `${locState.state.token}`
  }

  const onSubmit = async (inputdata) => {
    const data = {
      first_name: inputdata.firstName,
      last_name: inputdata.lastName,
      phone_number: `62${inputdata.phoneNumber}`
    }
    setLoadingScreen(true)
    try {
      const response = await axios.post(`${url}/api/update-profile/${locState.state.id}`, data, {headers: headers2})
      
      setLoadingScreen(false)

      
      Swal.fire({
        title: t('congrats'),
        text: t('editProfileSuccess'),
        imageUrl: SuccessIcon,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal',
          htmlContainer: 'text-swal',
          confirmButton:'confirm-swal',
          cancelButton: 'cancel-swal'
        }
      })

      setTimeout(() => {
        sessionStorage.setItem("token", locState.state.token)
        auth.login()
        navigate('/delivery')
      }, 1500);
    } catch(error) {
      console.log(error.message)
      setLoadingScreen(false)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  };

  useEffect(() => {
    setValue("firstName", locState.state.first_name)
    setValue("lastName", locState.state.last_name === null ? '' : locState.state.last_name)
    setValue("phoneNumber", locState.state.phone_number === null ? '' : locState.state.phone_number)
  }, [])

  const isFirstCapital = (value) => {
    const uppercase = /[A-Z]/g
    if(!value[0].match(uppercase)) return t('firstCapital')
  }



  if(islog || isMobile) return navigate('/')

  return (
    <div className="login-page">
      {loadingScreen && <LoadingScreen />}
      <Helmet>
        <title>Superkul | Login</title>
      </Helmet>
      <div className="register-bg" style={{backgroundImage: `url(${BgBanner})`}}>
        <div className="text-container">
          <h1>{t('login')}</h1>
          <span>
            <a href="/">{t('home')}</a> /<a href="/register"> {t('login')}</a>
          </span>
        </div>
      </div>
      <div className="login-page-content" style={{width: '30vw'}}>
        <div className="header-login-page">
            <h4>{t('personalInfo')}</h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="login-page-form">
            <div className="input-fill">
                <div className="input-wrapper" style={{marginBottom: '0.7rem'}}>
                    <label className="label-input" htmlFor="first">
                    {t('firstName')}
                    </label>
                    <input
                    className={`input-text ${errors.firstName ? 'error': ''}`}
                    type="text"
                    name="first-name"
                    {...register("firstName", {
                        required: true,
                        pattern: /^[A-Za-z ]+$/i,
                        // validate: isFirstCapital
                    })}
                    
                    />
                    {errors?.firstName?.type === "required" && <p>{t('fieldRequired')}</p>}
                    {errors?.firstName?.type === "pattern" && (
                    <p>{t('alphabetical')}</p>
                    )}
                    {/* {errors?.firstName?.type === "validate" && <p>{errors.firstName.message}</p>} */}
                </div>
                <div className="input-wrapper" style={{marginBottom: '0.7rem'}}>
                    <label className="label-input" htmlFor="first">
                    {t('lastName')}
                    </label>
                    <input
                    className={`input-text ${errors.lastName ? 'error': ''}`}
                    type="text"
                    name="last-name"
                    {...register("lastName", {
                        required: true,
                        pattern: /^[A-Za-z ]+$/i,
                        // validate: isFirstCapital
                    })}
                    
                    />
                    {errors?.lastName?.type === "required" && <p>{t('fieldRequired')}</p>}
                    {errors?.lastName?.type === "pattern" && (
                    <p>{t('alphabetical')}</p>
                    )}
                    {/* {errors?.lastName?.type === "validate" && <p>{errors.lastName.message}</p>} */}
                </div>
                <div className="input-wrapper" style={{marginBottom: '1rem'}}>
                    <label className="label-input" htmlFor="first">
                    {t('phoneNumber')}
                    </label>
                    <h6 className="phone-62">62</h6>
                    <input 
                    id="phoneNumber"
                    className={`input-text ${errors.phoneNumber ? 'error': ''}`}
                    type="tel"
                    {...register("phoneNumber", {
                        required: true,
                        maxLength: 13,
                        minLength: 8,
                        pattern: /^\d+$/,
                        validate: value => !value[0].match(0) 
                    })}
                    
                    />
                    {errors?.phoneNumber?.type === "required" && <p>{t('fieldRequired')}</p>}
                    {errors?.phoneNumber?.type === "pattern" && (
                    <p>{t('numbersOnly')}</p>
                    )}
                    {errors?.phoneNumber?.type === "minLength" && (
                    <p>{t('minPhoneNum')}</p>
                    )}
                    {errors?.phoneNumber?.type === "maxLength" && (
                    <p>{t('maxPhoneNum')}</p>
                    )}
                    {errors?.phoneNumber?.type === "validate" && (
                    <p>{t('firstNumber0')}</p>
                    )}
                </div>
                <div className="container-checkbox" style={{display: "flex", gap: '1rem'}}>
                  <input 
                    type="checkbox" 
                    id="agreement" 
                    name="agreement"  
                    // onChange={handlePrivacy}
                    required
                  />
                  <label className="label-checkbox" htmlFor="agreement">
                    <span>
                    {t('aggreement')} <a href="privacy-policy" target='_blank'>{t('privacyPolicy')}</a>{" "}
                      {t('and')} <a href="terms-conditions" target='_blank'>{t('termConditions')}</a>
                    </span>
                  </label>
                </div>
            </div>
            <Button className="btn-submit-login" type="submit">
            {t('save')}
            </Button>
        </form>
      </div>
    </div>
  );
};

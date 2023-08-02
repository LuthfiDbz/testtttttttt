import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import "../../src//styles/register/register.scss";
import Swal from "sweetalert2";
import axios from 'axios'
import verificationIcon from "../assets/img/img-state-verification-email.png"
import RegistIcon from "../assets/img/img-registration.png"
import BgBanner from '../assets/img/bg-banner-4.png'
import GoogleIcon from '../assets/icon/ic-google.png'
import { Header } from '../Component/header/Header'
import { Footer } from '../Component/footer/Footer'
import { useNavigate } from "react-router-dom";
import { BiTrendingUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ImCross, ImCheckmark } from "react-icons/im";
import { LoadingScreen } from "../Component/loadingScreen/loadingScreen";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Component/authContext/AuthContext";
import { Helmet } from "react-helmet";
import { isMobile } from "react-device-detect";
import ReactGA from "react-ga4";

export const Register = ({ saveData }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passStrength, setPassStrength] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [privacy, setPrivacy] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)

  // States htmlFor checking the errors
  const [error, setError] = useState(false);
  const auth_context = useContext(AuthContext)
  const auth = sessionStorage.getItem("token");

  const url = process.env.REACT_APP_DEV_URL

  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [retypeNewPasswordShown, setRetypeNewPasswordShown] = useState(false);

  const toggleNewPassword = () => {
    setNewPasswordShown(newPasswordShown ? false : true);
  };
  const toggleRetypeNewPassword = () => {
    setRetypeNewPasswordShown(retypeNewPasswordShown ? false : true);
  };


  const handlePrivacy = (e) => {
    e.target.checked ? setPrivacy(true) : setPrivacy(false)
  }



  const isTrue = (value) => {
    const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
    const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
    const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
    if (!value.match(atLeastOneUppercase)) return t('requireOneUppercase')
    if (!value.match(atLeastOneLowercase)) return t('requireOneLowercase')
    if (!value.match(atLeastOneNumeric)) return t('requireOneNumeric')
    // if(!value.match(atLeastOneSpecialChar)) return t('requireOneSpesialChar')
  }

  const isMatch = (value) => {
    const { newPass } = getValues()
    if (newPass !== value) return t('passMatch')
  }

  // const isFirstCapital = (value) => {
  //   const uppercase = /[A-Z]/g
  //   if(!value[0].match(uppercase)) return t('firstCapital')
  // }

  const formSubmit = async (formData) => {
    // console.log(getValues())
    saveData(formData)
    if (!privacy) {
      errorPopup(t('error'), t('agreePrivacy'), t('close'))
      return
    }

    ReactGA.event({
      category: "auth_category",
      action: "register_button",
      // label: "start_delivery_label", 
      // value: 99
    });

    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.newPass,
      phone_number: `62${formData.phoneNumber}`,
      type: 2,
      verification_url: `${process.env.REACT_APP_WEB_URL}/email/verify`
    }
    setLoadingScreen(true)
    try {
      const response = await axios.post(`${url}/register`, data)
      setLoadingScreen(false)
      Swal.fire({
        title: t('emailVerif'),
        imageUrl: verificationIcon,
        html: `${t('emailVerif1')} <b>${formData.email}</b>. ${t('emailVerif2')}`,
        showConfirmButton: true,
        confirmButtonColor: '#1F83BB',
        confirmButtonText: t('close'),
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal',
          htmlContainer: 'text-swal',
          confirmButton: 'confirm-swal',
        }
      }).then((result) => {
        navigate('/')
      })
    } catch (error) {
      console.log(error.message);
      setLoadingScreen(false)
      if (error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'), t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'), `${JSON.parse(error.request.response).message}`, t('close'))
      }
    }
  }


  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
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
        console.log(response.data.meta.custom.access_token)
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
            auth_context.login()
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
  return (
    <>
      {auth || isMobile ? (navigate('/home')) : (
        <>
          {/* <Header /> */}
          <Helmet>
            <title>Superkul | Register</title>
            <meta
              name="description"
              content="Buat akun ke Superkul untuk memulai order"
              data-react-helmet="true" />
            <link rel="canonical" href="https://superkul.id/register" />
          </Helmet>
          <div className="container-register">
            {loadingScreen && <div className="loading-screen-register"></div>}
            <div className="register-bg" style={{ backgroundImage: `url(${BgBanner})` }}>
              <div className="text-container">
                <h1>{t('signUp')}</h1>
                <span>
                  <a href="/">{t('home')}</a> /<a href="/register"> {t('register')}</a>
                </span>
              </div>
            </div>
            <div className="container-form">
              <div className="form-header">
                <div>
                  {/* <img src={RegistIcon} alt="" onClick={testTrigger} /> */}
                  <div>
                    <h5>{t('newAccount')}</h5>
                    <p>{t('fillRegister')}</p>
                  </div>
                </div>
                <h5>{t('personalInfo')}</h5>
              </div>
              <div className="form-body">
                <form
                  action=""
                  className="form-register-container"
                  onSubmit={handleSubmit(formSubmit)}
                >
                  <div className="input-wrapper">
                    <label className="label-input" htmlFor="first">
                      {t('firstName')}
                    </label>
                    <input
                      className={`input-text ${errors.firstName ? 'error' : ''}`}
                      type="text"
                      placeholder={t('firstNamePlaceholder')}
                      name="first-name"
                      data-testid="first-name"
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
                  <div className="input-wrapper">
                    <label className="label-input" htmlFor="first">
                      {t('lastName')}
                    </label>
                    <input
                      className={`input-text ${errors.lastName ? 'error' : ''}`}
                      type="text"
                      placeholder={t('lastNamePlaceholder')}
                      name="last-name"
                      data-testid="last-name"
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
                  <div className="input-wrapper">
                    <label className="label-input" htmlFor="first">
                      {t('yourEmail')}
                    </label>
                    <input
                      className={`input-text ${errors.email ? 'error' : ''}`}
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      data-testid="email"
                      {...register("email", {
                        required: true,
                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                      })}
                    />
                    {errors?.email?.type === "required" && <p>{t('fieldRequired')}</p>}
                    {errors?.email?.type === "pattern" && <p>{t('validEmail')}</p>}
                  </div>
                  <div className="input-wrapper">
                    <label className="label-input" htmlFor="first">
                      {t('phoneNumber')}
                    </label>
                    <h6 className="phone-62">62</h6>
                    <input
                      id="phoneNumber"
                      className={`input-text ${errors.phoneNumber ? 'error' : ''}`}
                      type="tel"
                      placeholder={t('phoneNumberPlaceholder')}
                      data-testid="phone-number"
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


                  <div className="input-wrapper">
                    <label className="label-input" htmlFor="first">
                      {t('newPass')}
                    </label>
                    <input
                      className={`input-text ${errors.newPass ? 'error' : ''}`}
                      name="newPass"
                      onInput={(e) => { setPassword(e.target.value); setPassStrength(true) }}
                      onClick={() => setPassStrength(true)}
                      placeholder={t('newPassPlaceholder')}
                      data-testid="new-pass"
                      type={newPasswordShown ? "text" : "password"}
                      {...register("newPass", {
                        required: true,
                        minLength: 6,
                        validate: isTrue
                      })}
                    />
                    {newPasswordShown ?
                      <BsEyeSlash className="show-password" onClick={toggleNewPassword} />
                      :
                      <BsEye className="show-password" onClick={toggleNewPassword} />
                    }
                    {/* {errors?.newPass?.type === "required" && <p>{t('fieldRequired')}</p>}
                      {errors?.newPass?.type === "minLength" && (
                        <p>{t('minPasswordLength')}</p>
                      )}
                      {errors?.newPass?.type === "validate" && <p>{errors.newPass.message}</p>} */}
                  </div>
                  <div className="input-wrapper">
                    <label className="label-input" htmlFor="first">
                      {t('retypeNewPass')}
                    </label>
                    <input
                      className={`input-text ${errors.retypeNewPass ? 'error' : ''}`}
                      name="retypeNewPass"
                      placeholder={t('confirmPassPlaceholder')}
                      data-testid="retype-pass"
                      type={retypeNewPasswordShown ? "text" : "password"}
                      {...register("retypeNewPass", {
                        required: true,
                        validate: isMatch
                      })}
                    />
                    {retypeNewPasswordShown ?
                      <BsEyeSlash className="show-password" onClick={toggleRetypeNewPassword} />
                      :
                      <BsEye className="show-password" onClick={toggleRetypeNewPassword} />
                    }
                    {errors?.retypeNewPass?.type === "required" && <p>{t('fieldRequired')}</p>}
                    {errors?.retypeNewPass?.type === "validate" && <p>{errors.retypeNewPass.message}</p>}
                  </div>
                  {passStrength &&
                    <div className="container-validation">
                      {/* <h6>Password Strength</h6> */}
                      <div className="validator">
                        {password.length >= 6 ?
                          <ImCheckmark className="valid" />
                          :
                          <ImCross className="not-valid" />
                        }
                        <p className="validator-text">{t('minPasswordLength')}</p>
                      </div>
                      <div className="validator">
                        {password.match(/[A-Z]/g) ?
                          <ImCheckmark className="valid" />
                          :
                          <ImCross className="not-valid" />
                        }
                        <p className="validator-text">{t('requireOneUppercase')}</p>
                      </div>
                      <div className="validator">
                        {password.match(/[a-z]/g) ?
                          <ImCheckmark className="valid" />
                          :
                          <ImCross className="not-valid" />
                        }
                        <p className="validator-text">{t('requireOneLowercase')}</p>
                      </div>
                      <div className="validator">
                        {password.match(/[0-9]/g) ?
                          <ImCheckmark className="valid" />
                          :
                          <ImCross className="not-valid" />
                        }
                        <p className="validator-text">{t('requireOneNumeric')}</p>
                      </div>
                      {/* <div className="validator">
                          {password.match(/[#?!@$%^&*-]/g) ? 
                            <ImCheckmark className="valid"/>
                            :
                            <ImCross className="not-valid"/>
                          }
                          <p className="validator-text">{t('requireOneSpesialChar')}</p>
                        </div> */}
                    </div>
                  }
                  <div className="container-checkbox">
                    <input
                      type="checkbox"
                      id="agreement"
                      name="agreement"
                      onChange={handlePrivacy}
                      data-testid="privacy"
                      required
                    />
                    <label className="label-checkbox" htmlFor="agreement">
                      <span>
                        {t('aggreement')} <a href="privacy-policy" target='_blank'>{t('privacyPolicy')}</a>{" "}
                        {t('and')} <a href="terms-conditions" target='_blank'>{t('termConditions')}</a>
                      </span>
                    </label>
                  </div>
                  <div className="form-footer">
                    <Button
                      className="btn-submit-register"
                      type="submit"
                      data-testid="submit-btn"
                    >
                      {t('register')}
                    </Button>
                    <h6>or</h6>
                    <div onClick={() => loginWithGoogle()} className="btn btn-light btn-google"> <img src={GoogleIcon} alt="" /> Masuk dengan Google</div>
                  </div>
                  {error && (
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
                    })
                  )}
                </form>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </>
      )
      }
    </>
  );
};

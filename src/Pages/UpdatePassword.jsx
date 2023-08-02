import React, { useState } from "react";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { Footer } from "../Component/footer/Footer";
import { Header } from "../Component/header/Header";
import "../styles/updatePassword/updatePassword.scss";
import RequestIcon from "../assets/img/img-state-waiting.png"
import ConfirmIcon from '../assets/img/img-state-confirmation.png'
import SuccessUpdateIcon from '../assets/img/img-update-pass-success.png'
import BgBanner from '../assets/img/bg-banner-4.png'
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { isMatch } from "date-fns";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { LoadingScreen } from "../Component/loadingScreen/loadingScreen";
import { ImCheckmark, ImCross } from "react-icons/im";

export const UpdatePassword = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  const [password, setPassword] = useState("")
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [retypeNewPasswordShown, setRetypeNewPasswordShown] = useState(false);
  const [passStrength, setPassStrength] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)

  // States htmlFor checking the errors
  const [error, setError] = useState(false);
  const { t } = useTranslation()

  const url = process.env.REACT_APP_URL_CUST
  const url_auth = process.env.REACT_APP_DEV_URL
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `Bearer ${access_token}`
  }

  const toggleNewPassword = () => {
    setNewPasswordShown(newPasswordShown ? false : true);
  };
  const toggleRetypeNewPassword = () => {
    setRetypeNewPasswordShown(retypeNewPasswordShown ? false : true);
  };

  const isTrue = (value) => {
    const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
    const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
    const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
    if(!value.match(atLeastOneUppercase)) return t('requireOneUppercase')
    if(!value.match(atLeastOneLowercase)) return t('requireOneLowercase')
    if(!value.match(atLeastOneNumeric)) return t('requireOneNumeric')
    // if(!value.match(atLeastOneSpecialChar)) return t('requireOneSpesialChar')
  }

  const isMatch = (value) => {
    const { newPass } = getValues()
    if(newPass !== value) return t('passMatch')
  }

  const handleFormSubmit = async (data) => {
    setLoadingScreen(true)
    const urlQuery = `${url_auth}/update-password?email=${email}&token=${token}&password=${data.newPass}&password_confirmation=${data.retypeNewPass}`

    
    try {
      const response = await axios.post(urlQuery, {}, {headers})

      setLoadingScreen(false)
      Swal.fire({
        title: t('passUpdated'),
        text: t('passUpdatedText'),
        imageUrl: SuccessUpdateIcon,
        showConfirmButton: true,
        confirmButtonColor: '#1F83BB',
        confirmButtonText: t('backHome'),
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal',
          htmlContainer: 'text-swal',
          confirmButton:'confirm-swal',
        }
      }).then((result) => {
        if(result.isConfirmed) {
          window.location.href = `${response.data.url}`
        }
      })
    } catch(error) {
      console.log(error.message)
      setLoadingScreen(false)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),error.response.data.message, t('close'))
      }
    }
  }
  
  return (
    <>
      {loadingScreen && <LoadingScreen />}
      <Header />
      <div className="update-password">
        <div className="update-password-bg" style={{backgroundImage: `url(${BgBanner})`}}>
          <div className="text-container">
            <h1>{t('passRecovery')}</h1>
            <span>
              <a href="/">{t('home')}</a> /
              <a href="#">{t('passRecovery')}</a>
            </span>
          </div>
        </div>
        <div className="container-form">
          <div className="form-header">
            <h5>{t('updatePassword')}</h5>
          </div>
          <div className="form-body">
            <form
              action=""
              className="form-request-container"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className="input-wrapper">
                <label className="label-input" htmlFor="first">
                {t('newPass')}
                </label>
                <input
                  className={`input-text ${errors.newPass ? 'error': ''}`}
                  name="newPass"
                  onInput={(e) => {setPassword(e.target.value);setPassStrength(true)}}
                  onClick={() => setPassStrength(true)}
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
                  className={`input-text ${errors.retypeNewPass ? 'error': ''}`}
                  name="retypeNewPass"
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
                      <ImCheckmark className="valid"/>
                      :
                      <ImCross className="not-valid"/>
                    }
                    <p className="validator-text">{t('minPasswordLength')}</p>
                  </div>
                  <div className="validator">
                    {password.match(/[A-Z]/g) ? 
                      <ImCheckmark className="valid"/>
                      :
                      <ImCross className="not-valid"/>
                    }
                  <p className="validator-text">{t('requireOneUppercase')}</p>
                  </div>
                  <div className="validator">
                    {password.match(/[a-z]/g) ? 
                      <ImCheckmark className="valid"/>
                      :
                      <ImCross className="not-valid"/>
                    }
                    <p className="validator-text">{t('requireOneLowercase')}</p>
                  </div>
                  <div className="validator">
                    {password.match(/[0-9]/g) ? 
                      <ImCheckmark className="valid"/>
                      :
                      <ImCross className="not-valid"/>
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
              <div className="form-footer">
                <Button className="btn-submit-request" type="submit">
                  {t('update')}
                </Button>
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
  );
};

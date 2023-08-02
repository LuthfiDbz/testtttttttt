import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfilePict from "../../../assets/img/img-default-avatar.png";
import SuccessIcon from '../../../assets/img/img-state-success.png'
import '../../../styles/editprofile/editprofile.scss'
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { LoadingScreen } from "../../loadingScreen/loadingScreen";
import { errorPopup, networkErrorPopup } from "../modal/PopUp/ErrorPopUp";

export const EditProfile = () => {
  const [profileData, setProfileData] = useState("")
  const [profile_img, setProfile_img] = useState("")
  const [id, setId] = useState("")
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm();
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [placeholder, setPlaceholder] = useState(true)


  
  const url = process.env.REACT_APP_DEV_URL
  const url2 = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `Bearer ${access_token}`
  }
  const headers2 = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    getProfileData()
  },[])

  const getProfileData = async () => {
    try {
      const response = await axios.get(`${url}/profile`, {headers})
      const data = response.data.data[0]
      setProfileData(data)
      // setFirst_name(data.profile.first_name)
      // setLast_name(data.profile.last_name)
      // setPhone_number(data.profile.phone_number)
      setId(data.id)
      setValue('firstName', data.profile.first_name)
      setValue('lastName', data.profile.last_name)
      setValue('phoneNumber', data.profile.phone_number.substring(2))
      setPlaceholder(false)
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
    
  }

  const isFirstCapital = (value) => {
    const uppercase = /[A-Z]/g
    if(!value[0].match(uppercase)) return t('firstCapital')
  }

  const onSubmit = async (inputdata) => {
    const data = {
      first_name: inputdata.firstName,
      last_name: inputdata.lastName,
      phone_number: `62${inputdata.phoneNumber}`
    }
    setLoadingScreen(true)
    try {
      const response = await axios.post(`${url2}/api/update-profile/${id}`, data, {headers: headers2})
      
      setLoadingScreen(false)

      
      Swal.fire({
        title: t('congrats'),
        text: t('editProfileSuccess'),
        imageUrl: SuccessIcon,
        showConfirmButton: false,
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal',
          htmlContainer: 'text-swal',
          confirmButton:'confirm-swal',
          cancelButton: 'cancel-swal'
        }
      })

      setTimeout(() => {
        window.location.reload();
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

  return (
    
    <div className="edit-profile">
      {loadingScreen && <LoadingScreen />}
      <div className="header-edit-profile">{t('editProfile')}</div>
      <form className="body-edit-profile" onSubmit={handleSubmit(onSubmit)}>
        <div className="change-picture placeholder-glow">
          {placeholder ?
            <div class="placeholder col-12 "></div>
            :
            <img src={profileData?.profile?.profile_image_link || profileData?.profile?.profile_img_link} alt="avatar" />
          }
        </div>
        <div className="input-fill">
          <div className="input-wrapper">
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
          <div className="input-wrapper">
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
          <div className="input-wrapper">
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
        </div>
        <div className="footer-edit-profile">
          <button className="btn-submit-profile" type="submit">
          {t('update')}
          </button>
        </div>
      </form>
    </div>
  );
};

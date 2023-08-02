import React from "react";
import "../../../styles/editpassword/editpassword.scss";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
// import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { errorPopup, networkErrorPopup } from "../modal/PopUp/ErrorPopUp";
import SuccessIcon from '../../../assets/img/img-state-success.png'
import SuccessUpdateIcon from '../../../assets/img/img-update-pass-success.png'
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { LoadingScreen } from "../../loadingScreen/loadingScreen";
import { ImCheckmark, ImCross } from "react-icons/im";

export const EditPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();
  const { t } = useTranslation()
  const auth_context = useContext(AuthContext)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [OldPasswordShown, setOldPasswordShown] = useState(false);
  const [passStrength, setPassStrength] = useState(false)

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

  const toggleNewPassword = () => {
    setNewPasswordShown(newPasswordShown ? false : true);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };
  const toggleOldPassword = () => {
    setOldPasswordShown(OldPasswordShown ? false : true);
  };

  const url = process.env.REACT_APP_DEV_URL
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `Bearer ${access_token}`
  }

  const isTrue = (value) => {
    const { oldPass } = getValues()
    const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
    const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
    const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
    if(!value.match(atLeastOneUppercase)) return t('requireOneUppercase')
    if(!value.match(atLeastOneLowercase)) return t('requireOneLowercase')
    if(!value.match(atLeastOneNumeric)) return t('requireOneNumeric')
    // if(!value.match(atLeastOneSpecialChar)) return t('requireOneSpesialChar')
    
    if(oldPass === value && auth_context.isPassEmpty === 0) return 'Berbeda dengan password lama'
  }

  const isMatch = (value) => {
    const { newPass } = getValues()
    if(newPass !== value) return t('passMatch')
  }

  const handleUpdate = async (formData) => {
    const data = {
      old_password : formData.oldPass,
      new_password : formData.newPass,
      new_password_confirmation : formData.retypeNewPass
    }

    const dataGoogle = {
      new_password : formData.newPass,
      new_password_confirmation : formData.retypeNewPass
    }

    let fullURL = ''
    let fullData = ''
    if(auth_context.isPassEmpty === 0) {
      fullURL = `${url}/users/password`
      fullData = data
    } else {
      fullURL = `${url}/password/reset`
      fullData = dataGoogle
    }

    setLoadingScreen(true)
    try {
      const response = await axios.patch(fullURL , fullData, {headers})
      
      setLoadingScreen(false)

      Swal.fire({
        title: t('congrats'),
        text: t('editPasswordSuccess'),
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
      } if(error.response.status === 417) {
        errorPopup(t('oldPasswordWrong'), '', t('close'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }

  return (
    <div className="edit-password">
      {loadingScreen && <LoadingScreen />}
      <div className="header-edit-password">{t('editPassword')}</div>
      <form className="body-edit-password" onSubmit={handleSubmit(handleUpdate)}>
        <div className="input-fill">
          {auth_context.isPassEmpty === 0 &&
            <div className="input-wrapper old-pass">
              <label className="label-input" htmlFor="first">
              {t('oldPassword')}
              </label>
              <input
                className={`input-text ${errors.oldPass ? 'error': ''}`}
                type={OldPasswordShown ? "text" : "password"}
                // onChange={(e) => setOldPassword(e.target.value)}
                {...register("oldPass", {
                  required: true,
                })}
              />
              {OldPasswordShown ? 
                <BsEyeSlash className="show-password" onClick={toggleOldPassword} />
                :
                <BsEye className="show-password" onClick={toggleOldPassword} />
              }
              {errors?.oldPass?.type === "required" && <p>{t('fieldRequired')}</p>}
              {errors?.oldPass?.type === "validate" && <p>{errors.oldPass.message}</p>}
            </div>
          }
          <div className="input-wrapper">
            <label className="label-input" htmlFor="first">
            {t('newPassword')}
            </label>
            <input
              className={`input-text ${errors.newPass ? 'error': ''}`}
              onInput={(e) => {setNewPassword(e.target.value); setPassStrength(true)}}
              onClick={() => setPassStrength(true)}
              type={newPasswordShown ? "text" : "password"}
              // onChange={(e) => setNewPassword(e.target.value)}
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
              <p>Kata sandi minimal 6 karakter</p>
            )} */}
            {/* {errors?.newPass?.type === "validate" && <p>{errors.newPass.message}</p>} */}
          </div>
          <div className="input-wrapper">
            <label className="label-input" htmlFor="first">
            {t('retypeNewPassWord')}
            </label>
            <input
              className={`input-text ${errors.retypeNewPass ? 'error': ''}`}
              type={confirmPasswordShown ? "text" : "password"}
              // onChange={(e) => setretypeNewPasswordConfirm(e.target.value)}
              {...register("retypeNewPass", {
                required: true,
                validate: isMatch
              })}
            />
            {confirmPasswordShown ? 
              <BsEyeSlash className="show-password" onClick={toggleConfirmPassword} />
              :
              <BsEye className="show-password" onClick={toggleConfirmPassword} />
            }
            {errors?.retypeNewPass?.type === "required" && <p>{t('fieldRequired')}</p>}
            {errors?.retypeNewPass?.type === "validate" && <p>{errors.retypeNewPass.message}</p>}
          </div>
          {passStrength && 
            <div className="container-validation">
              {/* <h6>Password Strength</h6> */}
              {auth_context.isPassEmpty === 0 &&
                <div className="validator">
                  {newPassword === getValues().oldPass ? 
                    <ImCross className="not-valid"/>
                    :
                    <ImCheckmark className="valid"/>
                  }
                  <p className="validator-text">Berbeda dengan password lama</p>
                </div>
              }
              <div className="validator">
                {newPassword.length >= 6 ? 
                  <ImCheckmark className="valid"/>
                  :
                  <ImCross className="not-valid"/>
                }
                <p className="validator-text">{t('minPasswordLength')}</p>
              </div>
              <div className="validator">
                {newPassword.match(/[A-Z]/g) ? 
                  <ImCheckmark className="valid"/>
                  :
                  <ImCross className="not-valid"/>
                }
              <p className="validator-text">{t('requireOneUppercase')}</p>
              </div>
              <div className="validator">
                {newPassword.match(/[a-z]/g) ? 
                  <ImCheckmark className="valid"/>
                  :
                  <ImCross className="not-valid"/>
                }
                <p className="validator-text">{t('requireOneLowercase')}</p>
              </div>
              <div className="validator">
                {newPassword.match(/[0-9]/g) ? 
                  <ImCheckmark className="valid"/>
                  :
                  <ImCross className="not-valid"/>
                }
                <p className="validator-text">{t('requireOneNumeric')}</p>
              </div>
              {/* <div className="validator">
                {newPassword.match(/[#?!@$%^&*-]/g) ? 
                  <ImCheckmark className="valid"/>
                  :
                  <ImCross className="not-valid"/>
                }
                <p className="validator-text">{t('requireOneSpesialChar')}</p>
              </div> */}
            </div>
          }
        </div>
        <div className="footer-edit-password">
          <button className="btn-submit-password" type="submit">
          {t('update')}
          </button>
        </div>
      </form>
    </div>
  );
};

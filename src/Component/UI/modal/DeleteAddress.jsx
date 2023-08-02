import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import '../../../styles/deleteAddress/deleteAddress.scss'
import DeleteImg from "../../../assets/img/img-delete-address.png"
import { LoadingScreen } from "../../loadingScreen/loadingScreen";
import { errorPopup, networkErrorPopup } from "./PopUp/ErrorPopUp";

export const DeleteAddress = ({ openDelete, closeDelete, item, reload }) => {
  const { t } = useTranslation()
  const [loadingScreen, setLoadingScreen] = useState(false)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  const handleDelete = async () => {
    setLoadingScreen(true)
    try {
      const response = await axios.delete(`${url}/api/bookmark/${item.id}`, {headers})
      
      setLoadingScreen(false)
      closeDelete()
      reload()
    } catch(error) {
      console.log(error.message)
      closeDelete()
      setLoadingScreen(false)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }
  if (!openDelete) return null;
  return (
    <div className="overlay">
      {loadingScreen && <LoadingScreen />}
      <div className="main-content-delete">
        <img src={DeleteImg} alt="" />
        <p className="title">{t('deleteAddress')}</p>
        <p className="warning">{t('deleteAddressConfirm')}</p>
        <div className="btn-container-delete">
            <button className="close-btn" onClick={closeDelete}>{t('cancel')}</button>
            <button className="btn-save" onClick={handleDelete}>{t('delete')}</button>
        </div>
      </div>
    </div>
  );
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import "../../../styles/addAddressModal/addAddressModal.scss";
import { LoadingScreen } from "../../loadingScreen/loadingScreen";
import BookmarkMaps from "../../maps/BookmarkMaps";
import { errorPopup, networkErrorPopup } from "./PopUp/ErrorPopUp";

export const EditAddress = ({ openEdit, closeEdit, item, reload}) => {
  const { id } = useParams()
  const [address, setAddress] = useState('')
  const [addressName, setAddressName] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [isChange, setIsChange] = useState(false)
  const { t } = useTranslation()
  const [loadingScreen, setLoadingScreen] = useState(false)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    setAddress(item.address)
    setAddressName(item.label)
    setNotes(item.notes === null ? '' : item.notes)
    setName(item.name === null ? '' : item.name)
    setPhone(item.phone === null ? '' : item.phone)
    setLatitude(item.lan)
    setLongitude(item.lon)
  }, [openEdit,item])

  const handleEditAddress = async (e) => {
    // Delete Address
    e.preventDefault()
     // Add Address
    const addData = {
      address,
      label: addressName,
      lan: latitude,
      lon: longitude,
      name,
      phone: phone[0] == 0 ? '62' + phone.substring(1) : '62' + phone,
      notes
    }

    setLoadingScreen(true)
    try {
      const response = await axios.patch(`${url}/api/bookmark/${item.id}`, addData , {headers})
      setLoadingScreen(false)
      setAddress('')
      setLatitude('')
      setLongitude('')
      setAddressName('')
      setNotes('')
      closeEdit()
      reload()
    } catch(error) {
      setLoadingScreen(false)
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }
  
  const childData = (e) => {
    setAddress(e.formattedAddress)
    setLatitude(e.latitude)
    setLongitude(e.longitude)
  }

  const handleClose = () => {
    // setAddress('')
    // setLatitude('')
    // setLongitude('')
    // setAddressName('')
    // setNotes('')
    closeEdit()
  }

  const triggerChange = () => {
    setAddress(item.address)
    setAddressName(item.label)
    setLatitude(item.lan)
    setLongitude(item.lon)
    setIsChange(true)
  }

  if (!openEdit) return null;
  return (
    <div className="overlay"  >
      {loadingScreen && <LoadingScreen />}
      <div className="main-content" >
        <p className="title">{t('updateAddress')}</p>
        
        <form  className="form-add-address" onSubmit={handleEditAddress}>
          

          <div className="input-wrapper-location label">
            <label className="label-input-location" htmlFor="address-name">
            {t('label')}
            </label>
            <input
              className="input-text-location"
              type="text"
              name="address-name"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
              required
            />
          </div>

          <div className="map-view">
            <BookmarkMaps dataFromChild={childData} latlng={{lat:parseFloat(latitude),lng:parseFloat(longitude)}} />
          </div>

          <div className="input-wrapper-address">
            <h1 className="label-address">{t('address')}</h1>
            <div className="text-address">{address}</div> 
          </div>

          <div className="input-wrapper-location">
            <label className="label-input-location" htmlFor="address-data-name">
            Nama
            </label>
            <input
              className="input-text-location"
              type="text"
              name="address-data-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-wrapper-location">
            <label className="label-input-location" htmlFor="address-data-phone">
            {t('phoneNumber')}
            </label>
            <h6 className="phone-62">62</h6>
            <input
              id="phoneNumber"
              className="input-text-location"
              type="number"
              name="address-data-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-wrapper-location notes">
            <label className="label-input-location" htmlFor="address-notes">
            {t('notes')}
            </label>
            <input
              className="input-text-location"
              type="text"
              name="address-data-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="btn-container">
              <button className="close-btn" onClick={handleClose}>{t('close')}</button>
              <button className="btn-save" >{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

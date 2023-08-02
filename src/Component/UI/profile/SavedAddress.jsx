import React, { useContext, useEffect } from "react";
import "../../../styles/addAddress/addAddress.scss";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { AddAddress } from "../modal/AddAddress";
import { EditAddress } from "../modal/EditAddress";
import { DeleteAddress } from "../modal/DeleteAddress";
import DeleteIcon from "../../../assets/icon/ic-delete.png"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { EmptyData } from "../../emptyData/EmptyData";
import { errorPopup, networkErrorPopup } from "../modal/PopUp/ErrorPopUp";
import { AuthContext } from "../../authContext/AuthContext";

export const SavedAddress = () => {
  // const { id } = useParams()
  const auth = useContext(AuthContext)
  const id = auth.id
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [dataAddress, setDataAddress] = useState([])
  const [selectedAddress, setSelectedAddress] = useState({})
  const [placeholder, setPlaceholder] = useState(true)
  const { t } = useTranslation()
  const [loadingScreen, setLoadingScreen] = useState(false)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    getDataAddress()
  }, [])
  

  const getDataAddress = async () => {
    setPlaceholder(true)
    setDataAddress([])
    try {
      const response = await axios.get(`${url}/api/bookmark/${id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setDataAddress(data)
    } catch(error) {
      console.log(error.message)
      // if(error.message === 'Network Error') {
      //   networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      // } 
    }
  }

  const handleEdit = (item) => {
    setSelectedAddress(item)
    setEditAddress(true)
  }

  const handleDelete = (item) => {
    setSelectedAddress(item)
    setDeleteAddress(true)
  }
  return (
    <div className="saved-address">
      <div className="header-saved-address">
        <p className="title">{t('savedAddress')}</p>
        <button className="add-address"  onClick={() => setAddAddress(true)}>{t('addAddress')}</button>
      </div>
      <div className="body-saved-address">
        {placeholder && 
          <div className="item-address">
            <div className="icon-list">
              <BsFillRecordCircleFill className="list-icon" />
            </div>
            <div className="text-list">
              <p class="placeholder-glow col-8">
                <span class="placeholder col-6 placeholder rounded-1"></span>
                <span class="placeholder col-12  placeholder-xs rounded-2"></span>
              </p>
            </div>
            <div className="btn-container">
              <button className="edit-btn">{t('edit')}</button>
              <button className="delete-btn">
                <img src={DeleteIcon} className="icon-delete"/>{t('delete')}
              </button>
            </div>
          </div>
        }
        {
          dataAddress.length !== 0 ?
            dataAddress.map((item, index) => (
            <div className="item-address" key={item.id}>
              <div className="icon-list">
                <BsFillRecordCircleFill className="list-icon" />
              </div>
              <div className="text-list">
                <p className="text-place">{item.label}</p>
                <p className="text-street">
                  {item.address}
                </p>
                {item.name === null && item.phone === null && item.notes === null ? null :
                  <p className="text-street">
                  {item.name || '-'}  |  {item.phone === null ? '-' : item.phone}  |  {item.notes || '-'}
                  </p>
                }
                {/* <p className="text-note">Note</p>
                <p className="text-detail">{item.detail}</p> */}
              </div>
              <div className="btn-container">
                <button className="edit-btn" onClick={() => handleEdit(item)}>{t('edit')}</button>
                <button className="delete-btn" onClick={() => handleDelete(item)}>
                  <img src={DeleteIcon} className="icon-delete"/>{t('delete')}
                </button>
              </div>
            </div>
            ))
          :
            !placeholder && <EmptyData />
        }
      </div>
      <AddAddress open={addAddress} onClose={() => setAddAddress(false)} reload={getDataAddress}/>
      <EditAddress openEdit={editAddress} closeEdit={() => setEditAddress(false)} item={selectedAddress} reload={getDataAddress}/>
      <DeleteAddress openDelete={deleteAddress} closeDelete={() => setDeleteAddress(false)} item={selectedAddress} reload={getDataAddress}/>
    </div>
    
  );
};

import React, { useContext, useEffect } from "react";
import "../../styles/addAddress/addAddress.scss";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { AddAddress } from "./modal/AddAddress";
import { EditAddress } from "./modal/EditAddress";
import { DeleteAddress } from "./modal/DeleteAddress";
import DeleteIcon from "../../assets/icon/ic-delete.png"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { EmptyData } from "../emptyData/EmptyData";
import { errorPopup, networkErrorPopup } from "./modal/PopUp/ErrorPopUp";
import { AuthContext } from "../authContext/AuthContext";
import { AddPackagesModal } from "./modal/AddPackages";
import { EditPackagesModal } from "./modal/EditPackages";

export const SavedPackages = () => {
  const auth = useContext(AuthContext)
  const id = auth.id
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [dataPackages, setDataPackages] = useState([])
  const [selectedPackages, setSelectedPackages] = useState({})
  const [placeholder, setPlaceholder] = useState(true)
  const { t } = useTranslation()
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [openModalPackages, setOpenModalPackages] = useState(false);
  const toggleOpenModalPackages = () => {
    setOpenModalPackages(!openModalPackages)
  }
  const [openModalEditPackages, setOpenModalEditPackages] = useState(false);
  const toggleOpenModalEditPackages = () => {
    setOpenModalEditPackages(!openModalEditPackages)
  }

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    getDataPackages()
  }, [])
  

  const getDataPackages = async () => {
    setPlaceholder(true)
    setDataPackages([])
    try {
      const response = await axios.get(`${url}/api/template-package/${id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setDataPackages(data)
    } catch(error) {
      console.log(error.message)
      // if(error.message === 'Network Error') {
      //   networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      // } 
    }
  }

  const handleEdit = (item) => {
    toggleOpenModalEditPackages()
    setSelectedPackages(item)
    setEditAddress(true)
  }

  const handleDelete = (item) => {
    setSelectedPackages(item)
    setDeleteAddress(true)
  }
  return (
    <div className="saved-address">
      <div className="header-saved-address">
        <p className="title">Paket Tersimpan</p>
        <button className="add-address"  onClick={toggleOpenModalPackages}>{t('addAddress')}</button>
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
          dataPackages.length !== 0 ?
            dataPackages.map((item, index) => (
            <div className="item-address" key={item.id}>
              <div className="icon-list">
                <BsFillRecordCircleFill className="list-icon" />
              </div>
              <div className="text-list">
                <p className="text-place">{item.label}</p>
                <p className="text-street">
                  {item.item_category} | {item.weight} kg | {item.lenght}; {item.width}; {item.height} | {item.item_tmp}&deg;C
                </p>
                {/* <p className="text-street">
                Faisal Kusuma Aji  |  6282210860366  |  Yang ada papan nama superkulnya
                </p> */}
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
      {/* <AddAddress open={addAddress} onClose={() => setAddAddress(false)}/>
      <EditAddress openEdit={editAddress} closeEdit={() => setEditAddress(false)} item={selectedAddress}/> */}
      {/* <DeleteAddress openDelete={deleteAddress} closeDelete={() => setDeleteAddress(false)} item={selectedAddress}/> */}
      <AddPackagesModal isOpen={openModalPackages} toggle={toggleOpenModalPackages} reload={getDataPackages}/>
      <EditPackagesModal isOpen={openModalEditPackages} toggle={toggleOpenModalEditPackages} data={selectedPackages} reload={getDataPackages}/>
    </div>
    
  );
};

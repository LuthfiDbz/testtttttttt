import React, { useRef, useState, useEffect, useContext } from "react";
import Avatar from "../../assets/img/img-default-avatar.png";
import "../../styles/userModal/userModal.scss";

import { MdArrowForwardIos } from "react-icons/md";
import { RiGroupFill, RiHome6Fill } from "react-icons/ri";

import UserIcon from "../../assets/icon/ic-edit-profile.png";
import PassIcon from "../../assets/icon/ic-edit-password.png";
import AddressIcon from "../../assets/icon/ic-saved-address.png";
import ContactIcon from "../../assets/icon/ic-contact.png";
import ChatIcon from "../../assets/icon/ic-complaint.png";
import ChangeIcon from "../../assets/icon/ic-language.png";
import ApiIcon from "../../assets/icon/ic-api-key.png";
import LogoutIcon from "../../assets/icon/ic-logout.png";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"
import { AuthContext } from "../authContext/AuthContext";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";
import { errorPopup, networkErrorPopup } from "./modal/PopUp/ErrorPopUp";

export const UserModal = ({data, dedicated}) => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const [profileData, setProfileData] = useState(data)
  const menuRef = useRef();
  const btnRef = useRef();
  const { t } = useTranslation()

  const url_auth = process.env.REACT_APP_DEV_URL
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `Bearer ${access_token}`
  }


  const userMenu = [
    {
      path: "/profile/edit-profile",
      icon: UserIcon,
      text: t('editProfile'),
    },
    {
      path: "/profile/edit-password",
      icon: PassIcon,
      text: t('editPassword'),
    },
    {
      path: `/profile/${profileData.id}/saved-address`,
      icon: AddressIcon,
      text: t('savedAddress'),
    },
    // {
    //   path: `/profile/saved-packages`,
    //   icon: AddressIcon,
    //   text: 'Saved Packages',
    // },
    {
      path: "/profile/contact",
      icon: ContactIcon,
      text: t('superkulContact'),
    },
    {
      path: `/profile/${profileData.id}/ticket-complain`,
      icon: ChatIcon,
      text: t('ticketComplaint'),
    },
    {
      path: `/profile/change-language`,
      icon: ChangeIcon,
      text: t('changeLanguage'),
    },
    {
      path: `/profile/api-key`,
      icon: ApiIcon, 
      text: 'Api Key',
    },
  ];

  window.addEventListener("click", (e) => {
    // if (e.target !== menuRef.current || e.target !== btnRef.current) {
    if (e.target !== btnRef.current) {
      setModalOpen(false)
    }
  });

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  const hadleClick= () => {
    Swal.fire({
      title: t('logoutConfirmTitle'),
      text: t('logoutConfirmText'),
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: t('logout'),
      confirmButtonColor: 'red',
      cancelButtonText: t('cancel'),
      reverseButtons: true,
      customClass: {
        popup: 'popup-swal',
        title: 'title-swal',
        htmlContainer: 'text-swal',
        confirmButton:'logout-swal',
        cancelButton: 'cancel-swal'
      }
    }).then(async (result) => {
      if(result.isConfirmed) {
        try {
          const response = await axios.delete(`${url_auth}/user-devices/${profileData.id}`, {headers})
          
          try {
            const response = await axios.delete(`${url_auth}/logout`, {headers})
            
            auth.logout()
            localStorage.clear();
            sessionStorage.clear()
            window.location.reload()
            navigate('/');
          } catch(error) {
            console.log(error.message)
            if(error.message === 'Network Error') {
              networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
            } else {
              errorPopup(t('error'),t('somethingError'), t('close'))
            }
          }
        } catch(error) {
          console.log(error.message);
          if(error.message === 'Network Error') {
            networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
          } else {
            errorPopup(t('error'),t('somethingError'), t('close'))
          }
        }
      }
    })
  }

  return (
    <div>
      <span
        className="user-profile"
        ref={btnRef}
        onClick={handleModal}
      >
        {/* ADA ERROR DISINI */}
        
        <div className="userMenu" style={{display: 'flex', alignItems: 'center'}} >
          {/* <img src={profileData.profile?.profile_image_link} alt="user" /> */}
          <img src={profileData?.profile?.profile_image_link || profileData?.profile?.profile_img_link} alt="user" />
          <h2 style={{fontSize: '1rem', margin: 0}}>{profileData.profile === undefined ? '' : profileData.profile.full_name ? profileData.profile.full_name : `${profileData.profile.first_name} ${profileData.profile.last_name}`}</h2>
          {/* <p class="placeholder-glow col-8">
            <h2 style={{fontSize: '1rem', margin: 0}}>
                <span class="placeholder col-12 rounded-2"></span>
            </h2>
          </p> */}
        </div>
          
      </span>
      {modalOpen && (
        <div className={`modal-user-container ${auth.userType == 3 ? 'corp' : ''}`} >
          <div className="header-user">
            <div className="container-img">
              {/* <img src={profileData.profile?.profile_image_link} alt="avatar-icon" className="avatar-icon" /> */}
              <img src={profileData?.profile?.profile_image_link || profileData?.profile?.profile_img_link} alt="avatar-icon" className="avatar-icon" />
            </div>
            <div className="container-text">
              <p className="username" >{profileData.profile.full_name ? profileData.profile.full_name : `${profileData.profile.first_name} ${profileData.profile.last_name}`}</p>
              <p className="customer-id">Customer ID : {profileData.profile.customer_seq_id || profileData.profile.corporate_seq_id}</p>
              <p className="contact">{profileData.profile.phone_number} | <span>{profileData.email}</span></p>
            </div>
          </div>
          {profileData.type === 3 ?
            <Link className="request-coorporate">
              <p className="text-coorporate">{t('accountStatus')}</p>
              <Badge className="corporate-badge">Corporate</Badge>
            </Link>
            :
            <Link to={`/request-coorporate/${profileData.id}`} className="request-coorporate">
              <p className="text-coorporate">{t('requestCorporate')}</p>
              <RiGroupFill className="icon-coorporate" />
            </Link>
          }
          {userMenu.map((item,index) => {
              if(item.text === 'Api Key') {
                if(auth.userType == 3) {
                  return (
                    <Link 
                      className="list-menu" 
                      key={index} 
                      to={item.path} 
                      onClick={() => 
                        window.innerWidth < 767 ?
                          document.getElementById('main-profile').scrollIntoView({ behavior: 'smooth' })
                          : null
                      }
                    >
                      <div className="icon-container">
                        <img src={item.icon} alt="icon-menu" className="icon-menu" />
                      </div>
                      <div className="title-button">{item.text}</div>
                      <div className="arrow-icon">
                        <MdArrowForwardIos className="icon-arrow" />
                      </div>
                    </Link>
                  )
                }
              } else {
                return (
                  <Link 
                    className="list-menu" 
                    key={index} 
                    to={item.path} 
                    onClick={() => 
                      window.innerWidth < 767 ?
                        document.getElementById('main-profile').scrollIntoView({ behavior: 'smooth' })
                        : null
                    }
                  >
                    <div className="icon-container">
                      <img src={item.icon} alt="icon-menu" className="icon-menu" />
                    </div>
                    <div className="title-button">{item.text}</div>
                    <div className="arrow-icon">
                      <MdArrowForwardIos className="icon-arrow" />
                    </div>
                  </Link>
                )
              }
            })}
          <div className="list-menu-logout" onClick={hadleClick} style={{cursor: 'pointer'}}>
            <div className="icon-container">
              <img src={LogoutIcon} alt="icon-menu" className="icon-menu" />
            </div>
            <div className="title-button" >{t('logout')}</div>
            <div className="arrow-icon">
              <MdArrowForwardIos className="icon-arrow" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

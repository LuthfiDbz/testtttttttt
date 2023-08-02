import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/profile/profile.scss";
import Avatar from "../assets/img/img-default-avatar.png";
import { RiGroupFill } from "react-icons/ri";

import { Header } from '../Component/header/Header'
import { Footer } from '../Component/footer/Footer'
import UserIcon from "../assets/icon/ic-edit-profile.png";
import PassIcon from "../assets/icon/ic-edit-password.png";
import AddressIcon from "../assets/icon/ic-saved-address.png";
import ContactIcon from "../assets/icon/ic-contact.png";
import ChatIcon from "../assets/icon/ic-complaint.png";
import ChangeIcon from "../assets/icon/ic-language.png";
import ApiIcon from "../assets/icon/ic-api-key.png";
import PackageIcon from "../assets/icon/ic-save-packages.png";
import LogoutIcon from "../assets/icon/ic-logout.png";
import BgBanner from '../assets/img/bg-banner-4.png'
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { AuthContext } from "../Component/authContext/AuthContext";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";



export const Profile = () => {
  const [profileData, setProfileData] = useState("")
  const [placeholder, setPlaceholder] = useState(true)
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const url_auth = process.env.REACT_APP_DEV_URL
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `Bearer ${access_token}`
  }

  useEffect(() => {
    getProfileData()
  },[])

  const getProfileData = async () => {
    try {
      const response = await axios.get(`${url_auth}/profile`, {headers})
      const data = response.data.data[0]
      setPlaceholder(false)
      setProfileData(data)
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        // setLoadingScreen(false)
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
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
    //   icon: PackageIcon,
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
    <>
      {/* <Header /> */}
      <div className="container-profile">
        <div className="container-title-profile" style={{backgroundImage: `url(${BgBanner})`}}>
          <div className="content-title-profile">
            <h3>{t('profile')}</h3>
            <ul className="link">
              <li>
                <Link className="link-to" to="/">
                  {t('home')} /
                </Link>
              </li>
              <li>
                <Link className="link-to" to="/profile">
                  &nbsp; {t('profile')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-profile">
          <div className="sidebar-profile">
            <div className="header-sidebar">
              <div className="img-container placeholder-glow">
                {/* <img src={profileData.profile?.profile_image_link} alt="avatar" /> */}
                
                {placeholder ?
                  <div class="placeholder col-12 "></div>
                  :
                  <img src={profileData?.profile?.profile_image_link || profileData?.profile?.profile_img_link} alt="avatar" />
                }
              </div>
              <div className="detail-profile">
                {placeholder ? 
                <p class="placeholder-glow col-12">
                  <span class="placeholder col-12 rounded-1 placeholder-lg"></span>
                  <span class="placeholder col-12 rounded-1 placeholder-xs"></span>
                  <span class="placeholder col-12 rounded-1 placeholder-xs"></span>
                </p> : 
                <>
                  <p className="name">{profileData.profile.first_name} {profileData.profile.last_name}</p>
                  <p className="customer-id">Customer ID: {profileData.profile.customer_seq_id || profileData.profile.corporate_seq_id}</p>
                  <p className="contact">{profileData.profile.phone_number} | {profileData.email}</p>
                </>
                }
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
            <div className="list-menu-logout" onClick={hadleClick}>
              <div className="icon-container">
                <img src={LogoutIcon} alt="icon-menu" className="icon-menu" />
              </div>
              <div className="title-button" >
                {t('logout')}
              </div>
              <div className="arrow-icon">
                <MdArrowForwardIos className="icon-arrow" />
              </div>
            </div>
          </div>
          <div className="main-profile" id="main-profile">
            <Outlet/>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

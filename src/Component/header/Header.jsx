import React, { useContext, useEffect, useRef, useState } from "react";
import "../../styles/Header/headerStyles.scss";
import Logo from "../../assets/img/logo.png";
import { Button } from "reactstrap";
import { isMobile } from 'react-device-detect';
import ManageIcon from "../../assets/icon/ic-manage-dedicated.png";
import UserIcon from "../../assets/icon/ic-edit-profile.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../authContext/AuthContext";
import Notification from "../firebaseNotification/Notification";
import Swal from "sweetalert2";
import { useSSR, useTranslation } from "react-i18next";
import { networkErrorPopup } from "../UI/modal/PopUp/ErrorPopUp";
import { GrClose } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { sendGetRequest } from "../../services/request-adapter";
import { RedirectApp } from "../UI/modal/RedirectApp";

export const Header = ({ notifToken }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = sessionStorage.getItem("token");
  const locationUrl = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [profileData, setProfileData] = useState("");
  const [isDedicated, setIsDedicated] = useState("not dedicated");
  const [placeholder, setPlaceholder] = useState(true);
  const [mobileNav, setMobileNav] = useState(false)
  const auth_context = useContext(AuthContext);

  const [openRedirectApp, setOpenRedirectApp] = useState(false);
  const toggleRedirectApp = () => {
    setOpenRedirectApp(!openRedirectApp)
  }

  const url = process.env.REACT_APP_URL_CUST;
  const url_auth = process.env.REACT_APP_DEV_URL;
  const access_token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  useEffect(() => {
    if (locationUrl.pathname.includes("home") || locationUrl.pathname.includes("/profile") || locationUrl.pathname.includes("/request-coorporate") || locationUrl.pathname.includes("/invoice")) {
      if (access_token !== null) {
        getProfileData();
      }
    }
    setMobileNav(false)
  }, [locationUrl]);

  useEffect(() => {
    if (access_token !== null) {
      getProfileData();
    }
  }, []);

  const getProfileData = async () => {
    try {
      const response = await sendGetRequest('/profile')
      // const response = await axios.get(`${url_auth}/profile`, { headers });
      const data = response.data.data[0];
      setProfileData(data);
      auth_context.storePass(data.is_password_empty)
      auth_context.storeId(data.id);
      auth_context.storeUserType(data.type);
      auth_context.storeApiKey(data.api_token)

      // Check dedicated
      try {
        const response = await axios.get(
          `${url}/api/check-dedicated/${data.id}`,
          {
            headers: {
              Authorization: `${access_token}`,
            },
          }
        );
        setIsDedicated(response.data.message);
        setPlaceholder(false);
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
      if (error.message === "Network Error") {
        networkErrorPopup(
          t("networkErrorTitle"),
          t("networkErrorText"),
          t("reload"),
          t("cancel")
        );
      }
    }
  };



  if (locationUrl.pathname === "/email/verify") {
    return (
      <div className="navbar fixed-top">
        <div className="logo-container ">
          <a href="/home">
            <img className="logo" src={Logo} alt="logo"></img>
          </a>
        </div>
      </div>
    )
  }


  return (
    <div className="navbar fixed-top">
      <div className="logo-container">
        <a href="/home">
          <img className="logo" src={Logo} alt="logo"></img>
        </a>
      </div>

      <div className="item-container d-none d-md-flex">
        <div className="before-login">
          {locationUrl.pathname === "/login" || locationUrl.pathname === "/login/profile-data" ? null :
            <Button
              className="btn-login"
              // href={`/login`}
              href={`${process.env.REACT_APP_SUBWEB_URL}/login`}
              target="_blank"
              style={{
                marginRight: '2rem'
              }}
            >
              {t("login")}
            </Button>
          }
          {/* {locationUrl.pathname === "/register" ||
            locationUrl.pathname === "/privacy-policy" ||
            locationUrl.pathname === "/update-password" || locationUrl.pathname === "/terms-conditions" ? null : (
            <Button className="btn-register" href="/register">
              {t("register")}
            </Button>
          )} */}
        </div>
      </div>

      {/* Hamburger Button */}
      <div className="d-block d-md-none pe-4 hamburger" onClick={() => setMobileNav(true)}>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Overlay Mobile Menu */}
      <div
        className={`d-block d-md-none black-screen ${mobileNav ? 'active' : ''}`}
        onClick={() => setMobileNav(false)}
      ></div>

      {/* Mobile Menu */}
      <div className={`d-block d-md-none hamburger-container ${mobileNav ? 'active' : ''}`} >
        <div className="header-mobile">
          <img className="logo" src={Logo} alt="logo"></img>
          <GrClose className="close-mobile" onClick={() => setMobileNav(false)} />
        </div>
        <div className="before-login">
          {locationUrl.pathname === "/login" || locationUrl.pathname === "/login/profile-data" ? null :
            isMobile || window.innerWidth <= 768 ?
              <Button className="btn-login" onClick={toggleRedirectApp}>
                {t('login')}
              </Button>
              :
              <Button className="btn-login" href="/login">
                {t('login')}
              </Button>
          }
          {locationUrl.pathname === "/register" ||
            locationUrl.pathname === "/privacy-policy" ||
            locationUrl.pathname === "/update-password" || locationUrl.pathname === "/terms-conditions" ? null :
            isMobile || window.innerWidth <= 768 ?
              <Button className="btn-register" onClick={toggleRedirectApp}>
                {t("register")}
              </Button>
              :
              <Button className="btn-register" href="/register">
                {t("register")}
              </Button>
          }
        </div>
      </div>
      <RedirectApp isOpen={openRedirectApp} toggle={toggleRedirectApp} />
    </div>

  )
};

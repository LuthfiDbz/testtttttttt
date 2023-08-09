import { Button, Col, Container, Row } from "reactstrap";
import "../../../styles/hero/hero.scss";
import heroImg from "../../../assets/img/heroimg.png";
import ConfirmIcon from "../../../assets/img/img-state-confirmation.png";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../authContext/AuthContext";
import { RedirectApp } from "../modal/RedirectApp";
import { isMobile } from "react-device-detect";
import ReactGA from "react-ga4";

export const Hero = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [userType, setUserType] = useState(2);
  // const [isTokenFound, setTokenFound] = useState(false);
  const { t, i18n } = useTranslation();
  const auth_context = useContext(AuthContext)

  const [openRedirectApp, setOpenRedirectApp] = useState(false);
  const toggleRedirectApp = () => {
    setOpenRedirectApp(!openRedirectApp)
  }

  const url_auth = process.env.REACT_APP_DEV_URL;
  const access_token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  // useEffect(() => {
  //   if(access_token !== null) {
  //     getProfileData();
  //   }
  // }, []);

  // const getProfileData = async () => {
  //   try {
  //     const response = await axios.get(`${url_auth}/profile`, { headers });
  //     const data = response.data.data[0];
  //     setUserType(data.type);
  //     // fetchToken(setTokenFound, access_token);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const authDedicated = () => {
    if (isMobile || window.innerWidth <= 768) return toggleRedirectApp()

    if (!sessionStorage.getItem("token")) {
      Swal.fire({
        title: `${t("loginFirst")}!`,
        imageUrl: ConfirmIcon,
        showConfirmButton: true,
        confirmButtonColor: "#1F83BB",
        confirmButtonText: t("close"),
        customClass: {
          popup: "popup-swal",
          title: "title-swal",
          htmlContainer: "text-swal",
          confirmButton: "confirm-swal",
        },
      });
      return;
    }
    auth_context.userType === 3
      ? setOpenModal(true)
      : Swal.fire({
        title: t("notCorporateAccount"),
        // Maaf, akun kamu belum terdaftar sebagai akun corporate
        imageUrl: ConfirmIcon,
        showConfirmButton: true,
        confirmButtonColor: "#1F83BB",
        confirmButtonText: t("close"),
        customClass: {
          popup: "popup-swal",
          title: "title-swal",
          htmlContainer: "text-swal",
          confirmButton: "confirm-swal",
        },
      });
  };

  const handleDelivery = () => {
    ReactGA.event({
      category: "delivery_category",
      action: "start_delivery_action",
      label: "start_delivery_label", // optional
      // value: 99
    });

    if (isMobile || window.innerWidth <= 768) return toggleRedirectApp()

    if (!sessionStorage.getItem("token")) {
      Swal.fire({
        title: `${t("loginFirst")}!`,
        imageUrl: ConfirmIcon,
        showConfirmButton: true,
        confirmButtonColor: "#1F83BB",
        confirmButtonText: t("close"),
        customClass: {
          popup: "popup-swal",
          title: "title-swal",
          htmlContainer: "text-swal",
          confirmButton: "confirm-swal",
        },
      });
      return;
    } else {
      navigate("/delivery");
    }
  };

  const handleDeliverNow = () => {
    if (isMobile || window.innerWidth <= 768) return toggleRedirectApp()

    window.open(`${process.env.REACT_APP_SUBWEB_URL}/login`, '_blank');
  }

  return (
    <div className="hero-container">
      <Container>
        <Row>
          <Col lg="6" className="hero-text" data-aos="fade-right">
            <div className="hero_content">
              <div className="d-flex justify-content-center d-md-none mb-5">
                <img src={heroImg} alt="hero-img" className="hero-img" />
              </div>
              <h1 className="mb-4 hero_title">{t("homeSection.heroTitle")}</h1>

              <p className="hero-paragraf">{t("homeSection.heroDesc")}</p>

              <div className="d-flex align-items-center gap-2 mt-4 justify-content-center justify-content-md-start">
                <Button
                  className="btn-start-delevery d-flex"
                  onClick={handleDeliverNow}
                // href={`${process.env.REACT_APP_WEB_URL}/login`}
                // target="_blank"
                >
                  {t("homeSection.startDelivery")}
                </Button>
              </div>
            </div>
          </Col>

          <Col lg="3" md="6" className="d-none d-md-block" data-aos="fade-left">
            <div className="ms-5">
              <img src={heroImg} alt="hero-img" className="hero-img" />
            </div>
          </Col>
        </Row>
      </Container>
      <RedirectApp isOpen={openRedirectApp} toggle={toggleRedirectApp} />
    </div>
  );
};

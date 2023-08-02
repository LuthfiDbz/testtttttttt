import React, { useState } from "react";
import "../styles/privacyPolicy/privacyPolicy.scss";
import Swal from "sweetalert2";
import axios from "axios";
import BgBanner from '../assets/img/bg-banner-4.png'
import { Footer } from "../Component/footer/Footer";
import { useEffect } from "react";
import header from "../assets/img/header-about-us.svg";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export const AboutUs = () => {
  const { t } = useTranslation()
  const [privacyData, setPrivacyData] = useState({});
  const [loading, setLoading] = useState(false);

  if (loading) return null;
  return (
    <>
      {/* <Header /> */}
      <Helmet>
        <title>Superkul | About Us</title>
        <meta name="description" content="About Superkul" />
        <link rel="canonical" href="https://superkul.id/about-us" />
      </Helmet>
      <div className="container-privacy">
        <div className="privacy-bg" style={{ backgroundImage: `url(${BgBanner})` }}>
          <div className="text-container">
            <h3>{t('aboutUs')}</h3>
            <span>
              <a href="/">{t('home')}</a> / {t('aboutUs')}
            </span>
          </div>
        </div>
        <div className="container-form">
          <div className="header-about-us">
            <img src={header} alt="" />
          </div>
          <h1 className="title">
            Find Out Abut Our Beloved Company, Superkul!
          </h1>
          <p>
            Superkul adalah solusi pengiriman mil terakhir (last-mile) berbasis
            pendingin (chiller) di Indonesia. Superkul menyediakan layanan
            pengiriman padai hari yang sama menggunakan Superkul Box untuk
            menjaga suhu dari -22C hingga 10C. Superkul TMS menciptakan jarak
            terdekat untuk pengiriman barang kepada para pelanggan. Superkul
            juga menyediakan integrasi API dengan pelanggan untuk memudahkan
            pengiriman, pelacakan pengiriman, dan melakukan pembayaran. Dengan
            perekam data real-time, para pelanggan dapat melacak posisi barang
            maupun suhu barang selama pengiriman.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

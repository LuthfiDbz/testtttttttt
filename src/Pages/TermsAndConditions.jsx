import React, { useState } from "react";
import "../styles/privacyPolicy/privacyPolicy.scss";
import Swal from "sweetalert2";
import axios from "axios";
import BgBanner from '../assets/img/bg-banner-4.png'
import { Footer } from "../Component/footer/Footer";
import { useEffect } from "react";
import { t } from "i18next";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import SEO from "../Component/SEO/SEO";

export const TermsAndConditions = () => {
  const [privacyData, setPrivacyData] = useState({});
  const [loading, setLoading] = useState(false);

  const url = process.env.REACT_APP_URL_CUST;

  useEffect(() => {
    getPrivacyData();
  }, []);

  const getPrivacyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/term-condition`);
      const data = response.data.data;
      setPrivacyData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      if (error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'), t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'), t('somethingError'), t('close'))
      }
    }
  };

  if (loading) return null;
  return (
    <>
      {/* <Header /> */}
      <SEO
        title={`Superkul | ${t('termConditions')}`}
        description="Syarat dan Ketentuan (“Ketentuan”) ini mengatur akses atau penggunaan platform layanan informasi (“Platform”) oleh Anda melalui aplikasi seluler, situs web, aplikasi kami (bersama-sama disebut “Aplikasi”) untuk menerima layanan yang disediakan Superkul."
        canonicalLink="https://superkul.id/terms-conditions"
      />
      <div className="container-privacy">
        <div className="privacy-bg" style={{ backgroundImage: `url(${BgBanner})` }}>
          <div className="text-container">
            <h3>{t('termConditions')}</h3>
            <span>
              <a href="/">{t('home')}</a> / {t('termConditions')}
            </span>
          </div>
        </div>
        <div className="container-form">
          <h1 className="title">Terms and Conditions for Superkul</h1>
          <div dangerouslySetInnerHTML={{ __html: privacyData.term }}></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

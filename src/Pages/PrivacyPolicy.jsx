import React, { useState } from "react";
import "../styles/privacyPolicy/privacyPolicy.scss";
import Swal from "sweetalert2";
import axios from "axios";
import BgBanner from '../assets/img/bg-banner-4.png'
import { Footer } from "../Component/footer/Footer";
import { useEffect } from "react";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { useTranslation } from "react-i18next";
import SEO from "../Component/SEO/SEO";

export const PrivacyPolicy = () => {
  const { t } = useTranslation()
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
        title={`Superkul | ${t('privacyPolicy')}`}
        description="Kebijakan Privasi ini menjelaskan bagaimana Superkul bersama dengan afiliasinya (disebut sebagai “kami”, “milik kami”, “kami” dan “Superkul”) mengumpulkan, menahan, mengolah, mengalihkan, dan menggunakan data pribadi Anda dan hak terkait yang Anda miliki sehubungan dengan pengolahan data pribadi."
        canonicalLink="https://superkul.id/privacy-policy"
      />
      <div className="container-privacy">
        <div className="privacy-bg" style={{ backgroundImage: `url(${BgBanner})` }}>
          <div className="text-container">
            <h3>{t('privacyPolicy')}</h3>
            <span>
              <a href="/">{t('home')}</a> / {t('privacyPolicy')}
            </span>
          </div>
        </div>
        <div className="container-form">
          <h1 className="title">GDPR & Privacy Policy</h1>
          <div dangerouslySetInnerHTML={{ __html: privacyData.privacy }}></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

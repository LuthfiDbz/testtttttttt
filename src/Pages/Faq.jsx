import React, { useState } from "react";
import "../styles/privacyPolicy/privacyPolicy.scss";
import Swal from "sweetalert2";
import axios from "axios";
import BgBanner from '../assets/img/bg-banner-4.png'
import { Footer } from "../Component/footer/Footer";
import { useEffect } from "react";
import header from "../assets/img/header-about-us.svg";
import { Faq } from "../Component/UI/home/faq/Faq";
import { t } from "i18next";
import SEO from "../Component/SEO/SEO";

export const FaqPage = () => {
  const [privacyData, setPrivacyData] = useState({});
  const [loading, setLoading] = useState(false);

  if (loading) return null;
  return (
    <>
      {/* <Header /> */}
      <SEO
        title={`Superkul | FAQ`}
        description="Temukan jawaban dari pertanyaan yang sering ditanyakan."
        canonicalLink="https://superkul.id/faq"
      />
      <div className="container-privacy">
        <div className="privacy-bg" style={{ backgroundImage: `url(${BgBanner})` }}>
          <div className="text-container">
            <h1>FAQ</h1>
            <span>
              <a href="/">{t('home')}</a> / FAQ
            </span>
          </div>
        </div>
        <Faq classNameParent="container-form" />
      </div>
      <Footer />
    </>
  );
};

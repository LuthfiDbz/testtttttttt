import React, { useState } from "react";
import "../styles/privacyPolicy/privacyPolicy.scss";
import Swal from "sweetalert2";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { Footer } from "../Component/footer/Footer";
import { useEffect } from "react";
import Logo from "../assets/img/logo.png";

export const ContactUs = () => {
  const { t } = useTranslation();
  const [privacyData, setPrivacyData] = useState({});
  const [loading, setLoading] = useState(false);

  if (loading) return null;
  return (
    <>
      {/* <Header /> */}
      <div className="container-privacy">
        <div className="privacy-bg">
          <div className="text-container">
            <h1>Contact Us</h1>
            <span>
              <a href="/">Home</a> / Contact Us
            </span>
          </div>
        </div>
        <div className="container-form">
          <h1 className="title">Connect with Us</h1>
          <div className="contact-us-section">
            <div>
              <div className="maps-contact-us">maps</div>
              <div className="address-superkul">
                <img src={Logo} alt="logo" />
                <p className="addres">
                  Kantor pusat Jl. Keramat Raya 162 Jakarta Pusat 10430
                  Indonesia
                </p>
                <p className="contact">
                  Telp : 0213155550
                  <br />
                  Fax : 02180635162
                </p>
              </div>
            </div>
            <div className="form-contact-us">
              <div className="form-side">
                <div className="wrapper-input">
                  <label className="label-input" htmlFor="name">
                    {t("Name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="Name"
                    placeholder={t("Input Name")}
                  />
                </div>
                <div className="wrapper-input">
                  <label className="label-input" htmlFor="notes">
                    {t("Email")}
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="Email"
                    placeholder={t("Input Email")}
                  />
                </div>
              </div>
              <div className="wrapper-input">
                <label className="label-input" htmlFor="message">
                  {t("Message")}
                </label>
                <textarea
                  className="input-message"
                  type="text"
                  id="message"
                  name="Message"
                  placeholder={t("Input Message")}
                />
              </div>
              <div className="btn-send">
                <button>{t("Send")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

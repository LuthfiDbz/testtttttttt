import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import "../../styles/footerStyle/footerStyle.scss";

export const Footer = () => {
  const { t } =useTranslation()
  return (
    <div className="container-footer">
      <div className="main-footer">
        <div className="address-superkul d-none d-md-block">
          <img src={Logo} alt="logo" />
          <p className="addres">
          PT Superkul Amerta Indonesia 
          <br />
          Ruko Golden 8, Jl. Panjang No. 8, RT.5/RW.11, Kedoya Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11520
          </p>
          <p className="contact">
            Admin : 0821-30000-298
            <br />
            Email : admin@superkul.id
          </p>
        </div>
        <div className="articles">
          <h5 className="title-articles">ARTICLES</h5>
          <p style={{color: 'white'}}>-</p>
          {/* <a href="#">Exploring the New Swift Chart from Scratch</a>
          <a href="#">Introducing weather kit for your IOS App's</a>
          <a href="#">Exposing an App's Funcionality through Appintent</a> */}
        </div>
        <div className="partners">
          <h5 className="title-partners">PARTNERS</h5>
          <p style={{color: 'white'}}>-</p>
          {/* <a href="#">Crocodic Indonesia</a>
          <a href="#">Reprime Indonesia</a>
          <a href="#">Eventy Indonesia</a>
          <a href="#">Salor Indonesia</a>
          <a href="#">Couries Indonesia</a> */}
        </div>
        <div className="company">
          <h5 className="title-company">COMPANY</h5>
          <Link to={"/about-us"}> {t('aboutUs')} </Link>
          <Link to={"/terms-conditions"}> {t('termConditions')} </Link>
          <Link to={"/privacy-policy"}> {t('privacyPolicy')} </Link>
          <Link to={"/faq"}> FAQs </Link>
          {/* <Link to={"/contact-us"}> Contact Us </Link> */}
        </div>
        <div className="address-superkul d-block d-md-none mb-5">
          <img src={Logo} alt="logo" />
          <p className="addres">
          PT Superkul Amerta Indonesia 
          <br />
          Ruko Golden 8, Jl. Panjang No. 8, RT.5/RW.11, Kedoya Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11520
          </p>
          <p className="contact">
            Admin : 0821-30000-298
            <br />
            Email : admin@superkul.id
          </p>
        </div>
      </div>
      <div className="copyright">
        Copyright © 2023 Superkul, All Right Reserved
      </div>
    </div>
  );
};

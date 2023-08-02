import React, { useEffect, useState } from "react";
import "../../src/styles/promoDetail/promoDetail.scss";
import { BiCopy } from "react-icons/bi";
import Promo from "../assets/img/promo-img.png";
import PromoImage1 from "../assets/img/img-banner-1.png";
import PromoImage2 from "../assets/img/img-banner-2.png";
import CopyIcon from "../assets/icon/ic-copy.png";
import { Footer } from "../Component/footer/Footer";
import { Header } from "../Component/header/Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import { useTranslation } from "react-i18next";

export const PromoDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { t } = useTranslation()
  const [allPromoData, setAllPromoData] = useState([])
  const [promoData, setPromoData] = useState([])
  const [placeholder, setPlaceholder] = useState(true)
  const [textCopy, setTextCopy] = useState('')

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    window.scrollTo(0,0)
    getPromoAvailable()
    getPromoAvailableByID()
  }, [])
  
  const getPromoAvailable = async () => {
    try {
      const response = await axios.get(`${url}/api/promo`, { headers });
      const data = response.data.data;
      setPlaceholder(false);
      setAllPromoData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPromoAvailableByID = async () => {
    try {
      const response = await axios.get(`${url}/api/promo/${id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setPromoData(data)
      setTextCopy(data.promo_code)
    } catch(error) {
      console.log(error.message)
    }
  }

  const handleAnotherPromo  = (item) => {
    navigate(`/promo/${item.id}`)
    window.location.reload()
  }

  return (
    <>
      {/* <Header /> */}
      <div className="detail-container">
        <div className="header-title">
          <h3>{t('detailPromo')}</h3>
          <span>
            <a href="/">{t('home')}</a> /<a href="#">{t('detailPromo')}</a>
          </span>
        </div>
        <div className="main-container-promo">
          {placeholder ? 
            <div className="left-side">
              <p class="placeholder-glow col-12">
                <figure>
                  {/* <img src={Promo} alt="promo-image" className="img-promo" /> */}
                  <figcaption className="caption">
                    <span class="placeholder col-6 rounded-2"></span>
                  </figcaption>
                </figure>
                <div className="code-order">
                  <p className="code-promo">
                  {t('promoCode')}: <strong>
                      <span class="placeholder col-4 rounded-2"></span>
                    </strong> <img src={CopyIcon} alt="" />
                  </p>
                  <p className="order-number">
                    {t('validityPromo')}: <span class="placeholder col-8 rounded-2"></span>
                  </p>
                </div>
                <p className="desc-promo">
                  <span class="placeholder col-12 rounded-2"></span>
                  <span class="placeholder col-12 rounded-2"></span>
                  <span class="placeholder col-12 rounded-2"></span>
                  <span class="placeholder col-6 rounded-2"></span>
                  
                </p>
              </p>
            </div>
            : 
            <div className="left-side">
            <figure>
              <img src={`${process.env.REACT_APP_IMG_URL}/promo/${promoData.img_banner}`} alt="promo-image" className="img-promo" />
              <figcaption className="caption">
                {promoData.name}
              </figcaption>
            </figure>
            <div className="code-order">
              <p className="code-promo">
                {t('promoCode')}: <strong>{promoData.promo_code}</strong> 
                {/* <img 
                  src={CopyIcon} 
                  alt="" 
                  onClick={() => navigator.clipboard.writeText(textCopy)}
                /> */}
                <>
                  <Button
                    id="PopoverFocus"
                    type="button"
                  >
                    <img 
                      src={CopyIcon} 
                      alt="" 
                      id="PopoverFocus"
                      onClick={() => navigator.clipboard.writeText(textCopy)}
                    />
                  </Button>
                  <UncontrolledPopover
                    placement="right"
                    target="PopoverFocus"  
                    trigger='focus'      
                  >
                    <PopoverBody>
                      Copied!
                    </PopoverBody>
                  </UncontrolledPopover>
                </>
              </p>
              {promoData.start_date == null || promoData.end_date == null ?
                null :
                <p className="order-number">
                  {t('validityPromo')}: <strong>{format(Date.parse(promoData.start_date), 'dd MMM yyyy')} to {format(Date.parse(promoData.end_date), 'dd MMM yyyy')}</strong>
                </p>
              }
            </div>
            <p className="desc-promo">
              {promoData.promo_desc}
            </p>
            </div>
          }
          <div className="right-side">
            <div className="header-right">
              <h3>{t('anotherPromo')}</h3>
              <p>{t('seeAllDealsPromo')}</p>
            </div>
            {allPromoData.map((item) => (
            <div className="another-promo" key={item.id} onClick={() => handleAnotherPromo(item)}>
              <img src={`${process.env.REACT_APP_IMG_URL}/promo/${item.img_banner}`} alt="promo-image" className="another-image" />
            </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer />  */}
    </>
  );
};

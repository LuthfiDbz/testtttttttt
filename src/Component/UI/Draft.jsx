import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillCalendarFill } from "react-icons/bs";
import { FaBox } from "react-icons/fa";
import "../../styles/draft/draft.scss";
import DraftIcon from "../../assets/icon/ic-draft.png";
import PackageIcon from '../../assets/icon/ic-service-sameday-inactive.png'
import OrderIcon from '../../assets/icon/ic-order-id.png'

import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { EmptyData } from "../emptyData/EmptyData";
import { numberFormat } from "../numberFormat/numberFormat";
import { GrClose } from "react-icons/gr";
import { errorPopup, networkErrorPopup } from "./modal/PopUp/ErrorPopUp";
import { LoadingScreenSpinner } from "../loadingScreen/loadingScreen";

export const Draft = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [openDraft, setOpenDraft] = useState(false);
  const menuRef = useRef();
  const btnRef = useRef();
  const locationUrl = useLocation();
  const auth = useContext(AuthContext)

  const [draftData, setDraftData] = useState([])
  const [placeholder, setPlaceholder] = useState(true)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    if (locationUrl.pathname.includes("home")) {
      getDraftData()
    }
  }, [locationUrl]);

  useEffect(() => {
    // if (locationUrl.pathname.includes("delivery") || locationUrl.pathname.includes("trip-planning") || locationUrl.pathname.includes("order-confirm")) {

    // } else {
      getDraftData()
    // }
  }, [])
  

  const getDraftData = async () => {
    try {
      const response = await axios.get(`${url}/api/list-draft/${auth.id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setDraftData(data.reverse())
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      }
    }
  }



  window.addEventListener("click", (e) => {
    if(window.innerWidth > 767) {
      if (e.target !== menuRef.current && e.target !== btnRef.current) {
        setOpenDraft(false);
      }
    }
  });

  const handleClick = (draftNumber) => {
    setOpenDraft(false)
    navigate(`/draft-detail/${draftNumber}`)
  }

  return (
    <div>
      <img
        src={DraftIcon}
        alt="draft-icon"
        className="draft-icon d-none d-md-flex"
        ref={btnRef}
        onClick={() => setOpenDraft(!openDraft)}
      />
      <p 
        className="d-block d-md-none"
        onClick={() => setOpenDraft(!openDraft)}
      ><img src={DraftIcon} alt="" /> {t('draftOrder')}</p>
      {openDraft && (
        <div className="draft-modal-container" ref={menuRef}>
          <div className="modal-header">
            <img src={DraftIcon} alt="draft-icon" className="inner-icon" />
            <p>{t('draftOrder')}</p>
            <GrClose className="d-block d-md-none close-modal" onClick={() => setOpenDraft(false)}/>
          </div>
          <div className="draft-container">
            {placeholder ? 
                <LoadingScreenSpinner />
              :
              draftData.length !== 0 ?
                draftData.map((item, index) => (
                  <div className="list-draft-container" key={index} onClick={() => handleClick(item.draftNumber)}>
                    <div className="list-draft-header">
                      <div className="left">
                        <div className="icon-symbol">
                          <img src={OrderIcon} className="icon-box" />
                        </div>
                        <div className="item-">
                          <p className="title">{t('orderNumber')}</p>
                          <p className="desc">#{item.draftNumber}</p>
                        </div>
                      </div>
                      <div className="right">
                        <p className="title-cost">{t('costOrder')}</p>
                        <p className="desc-cost">Rp. {numberFormat(item.totalPrice)}</p>
                      </div>
                    </div>
                    <div className="list-draft-main">
                      <div className="img-symbol">
                        <img src={PackageIcon} className="icon-calendar" />
                      </div>
                      <div className="detail-order">
                        <p className="title-order">{item.serviceName}</p>
                        <p className="desc-order">{item.totalTrip} Trip, {item.totalDrop - item.totalTrip} Drop</p>
                      </div>
                    </div>
                  </div>
                ))
              :
                <EmptyData />
            }
          </div>
        </div>
      )}
    </div>
  );
};

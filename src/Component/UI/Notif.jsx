import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaBox } from "react-icons/fa";
import NotifIcon from "../../assets/icon/ic-notification.png";
import GreenNotif from "../../assets/icon/ic-box-green.png"
import BlueNotif from "../../assets/icon/ic-box-blue.png"
import GrayNotif from "../../assets/icon/ic-box-gray.png"
import "../../styles/notif/notif.scss";
import { useTranslation } from "react-i18next";
import { EmptyData } from "../emptyData/EmptyData";
import { GrClose } from "react-icons/gr";
import { BsDot } from "react-icons/bs";
import { LoadingScreenSpinner } from "../loadingScreen/loadingScreen";
import { useLocation } from "react-router-dom";

export const Notif = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const btnRef = useRef();
  const locationUrl = useLocation();
  const [notificationData, setNotificationData] = useState([])
  const [isNotif, setIsNotif] = useState(false)
  const [placeholder, setPlaceholder] = useState(true)


  const url_auth = process.env.REACT_APP_DEV_URL
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `Bearer ${access_token}`
  }

  useEffect(() => {
    getHistoryNotification()
  }, [locationUrl])
  

  const getHistoryNotification = async () => {
    try {
      const response = await axios.get(`${url_auth}/notifications?limit=0`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setNotificationData(data)
      const unreadNotif = data.find((dat) => dat.read_at === '')
      if(unreadNotif !== undefined) {
        setIsNotif(true)
      } else {
        setIsNotif(false)
      }
    } catch(error) {
      console.log(error.message)
    }
  }

  const handleClickNotif = () => {
    setOpen(!open)
    notificationData.map( async (data) => {
      if(data.read_at === '') {
        const notifId = data.id
        try {
          const response = await axios.patch(`${url_auth}/notifications/${notifId}`, {read_at:true}, {headers})
          const data = response.data.data
        } catch(error) {
          console.log(error.message)
        }
      }
    })
    setIsNotif(false)
  }
  

  window.addEventListener("click", (e) => {
    if(window.innerWidth > 767) {
      if (e.target !== menuRef.current && e.target !== btnRef.current) {
        setOpen(false);
      }
    }
  });
  return (
    <div >
      <img
        src={NotifIcon}
        alt="notif-icon"
        className="draft-icon d-none d-md-flex"
        ref={btnRef}
        onClick={handleClickNotif}
      />
      {isNotif && <div className="notif-dot"></div>}
      <p 
        className="d-block d-md-none"
        onClick={handleClickNotif}
      ><img src={NotifIcon} alt="" /> {t('notifications')}</p>
      {open && (
      <div className="modal-notif-container">
        <div className="header-notif">
          <img src={NotifIcon} alt="draft-icon" className="inner-icon" />
          <p>{t('notifications')}</p>
          <GrClose className="d-block d-md-none close-modal" onClick={() => setOpen(false)}/>
        </div>

        <div className="list-notif">
          <div className="container-list">
            {placeholder ? 
                <LoadingScreenSpinner />
              :
              notificationData.length !== 0 ?
                notificationData.map((item,index) => (
                  <div className="item-list" key={item.id}>
                    <div className="icon">
                      <img src={BlueNotif} alt=''  className={item.announce} />
                    </div>
                    <div className="detail">
                      <p className="title-order">
                        {item.message.title}, {item.message.body}
                      </p>
                      <p className="desc-order">{item.created_at}</p>
                    </div>
                    {item.read_at === '' && <div className='unread'></div>}
                    
                  </div>
                ))
              :
              <EmptyData />
            }
          </div>
        </div>
      </div>
        )}
    </div>
  );
};

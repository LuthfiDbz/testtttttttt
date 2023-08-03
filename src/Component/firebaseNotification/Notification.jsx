import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import BlueNotif from "../../assets/icon/ic-box-blue.png"
import { fetchToken, onMessageListener } from './firebase';

const Notification = () => {
  const { t } = useTranslation()
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [isTokenFound, setTokenFound] = useState(false);
  const notify = () => toast(<ToastDisplay />, {
    position: 'top-right'
  });
  function ToastDisplay() {
    return (
      <div className='push-notif'>
        <div className="push-notif-header">
          <img src={BlueNotif} alt="" />
          <p className='push-notif-title'><b>{notification?.title}</b></p>
          <p className="push-notif-time">{t('justNow')}</p>
        </div>
        <p className='push-notif-body'>{notification?.body}</p>
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title) {
      notify()
    }
  }, [notification])


  // fetchToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log('failed: ', err));

  return (
    <>
      {/* <div>
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
      </div> */}
      <Toaster />
    </>
  )
}

export default Notification
import React from 'react'
import { useTranslation } from 'react-i18next'
import '../../../styles/contact/contact.scss'
import { numberFormat } from '../../numberFormat/numberFormat'

export const Contact = () => {
  const { t } = useTranslation()
  return (
    <>
    <div className="contact-profile">
      <div className="header-contact">{t('superkulContact')}</div>
      <div className="body-contact">
        <div className="list-contact">
            <p className="title-contact">{t('superkulPhone')}</p>
            <p className="detail-contact">
              <a 
                href="https://api.whatsapp.com/send/?phone=%2B6282130000298&text&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                082130000298
              </a>
            </p>
        </div>
        <div className="list-contact">
            <p className="title-contact">{t('superkulEmail')}</p>
            <p className="detail-contact">admin@superkul.id</p>
        </div>
      </div>
    </div>
    {/* <div className="chat">
      <div className="header-chat">Chat Admin</div>
      <div className="body-chat">
        
      </div>
    </div> */}
    </>
  )
}

import React from 'react'
import { useTranslation } from 'react-i18next';
import '../../../styles/cancelOrder/cancelOrder.scss'

export const CancelOrder = ({ openCancel, closeCancel, cancelConfirm }) => {
  const { t } = useTranslation()

  if (!openCancel) return null;
  return (
    <div className="overlay">
      <div className="main-content-cancel">
        <p className="title-cancel">{t('cancelOrder')}?</p>
        <p className="warning-cancel">{t('cancelOrderWarning')}</p>
        <div className="btn-container-cancel">
            <button className="btn-save" onClick={closeCancel}>{t('no')}</button>
            <button className="close-btn" onClick={cancelConfirm}>{t('yes')}</button>
        </div>
      </div>
    </div>
  )
}

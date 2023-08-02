import React from "react";
import { useTranslation } from "react-i18next";
import EmptyIcon from '../../assets/img/img-state-no-package.png'

import '../../styles/emptyData/emptyData.scss'

export const EmptyData = () => {
  const { t } = useTranslation()
  return (
    <div 
      className="empty-data-screen">
      <img src={EmptyIcon} alt="" />
      <p className="title">{t('emptyTitle')}</p>
      <p className="text">{t('emptyText')}</p>
    </div>
  )
}
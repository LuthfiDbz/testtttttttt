import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../styles/changeLanguage/changeLanguage.scss";

export const ChangeLanguage = () => {
  const { t, i18n } = useTranslation()


  const changeLanguage = (e) => {
    const code = e.target.value;

    if (i18n.language !== code) {
      i18n.changeLanguage(code);
      localStorage.setItem('lang', code)
    }
  }
  return (
    <div className="change-language">
      <div className="header">{t('changeLanguage')}</div>
      <div className="language-list">
        <input type="radio" name="change-lang" id="en-lang" value='en' onClick={changeLanguage} checked={localStorage.getItem('lang') === 'en' ? 'checked' : ''}/>
        <label >{t('languageEn')}</label>
        <br />
        <input type="radio" name="change-lang" id="id-lang" value='id' onClick={changeLanguage} checked={localStorage.getItem('lang') === 'id' || localStorage.getItem('lang') === null ? 'checked' : ''}/>
        <label >{t('languageId')}</label>
      </div>
      {/* {placeholder && 
      <div className="list-ticket">
        <div className="container-icon-ticket">
            <RiFileListFill className="icon-ticket"/>
        </div>
        <div className="container-detail-ticket placeholder-glow">
          <p class="placeholder-glow col-8">
            <span class="placeholder col-6 placeholder-xs rounded-1"></span>
            <span class="placeholder col-12 rounded-2"></span>
          </p>
        </div>
        <div className="container-status-ticket">
          <p class="placeholder-glow col-9">
            <span class="placeholder col-12 rounded-2"></span>
          </p>
        </div>
      </div>} */}
    </div>
  );
};

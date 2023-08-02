import React, { useEffect, useState } from "react";
import '../../../styles/redirectApp/redirectApp.scss'
import { useTranslation } from "react-i18next";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AppStore from "../../../assets/img/app-store.png";
import PlayStore from "../../../assets/img/play-store.png";
import BannerImg from "../../../assets/img/banner-img.png";

export const RedirectApp = ({isOpen, toggle, data}) => {
  const { t } = useTranslation()
  const [loadingScreen, setLoadingScreen] = useState(false)
  

  return (
    <Modal isOpen={isOpen} fullscreen={true} className="redirect-app">
      <ModalHeader className="redirect-app-header" toggle={toggle} closeButton>
      </ModalHeader>
      <ModalBody className="redirect-app-body d-flex flex-column align-items-end">
        <img src={BannerImg} alt="banner-img" className="redirect-app-banner-img mt-2" />

        <p className="banner-paragraf mt-3 text-center px-3">
          {t("bannerSection.makeItEasier")}
        </p>

        <div className="d-flex align-items-center justify-content-center gap-2 mt-4 w-100">
          <img
            href="#"
            src={AppStore}
            alt="banner-img"
            className="appstore-img"
            />
          <img
            href="#"
            src={PlayStore}
            alt="banner-img"
            className="playstore-img"
            onClick={() => window.open("https://play.google.com/store/apps/details?id=com.superkul.customer.app&pli=1")}
          />
        </div>
        
      </ModalBody>
      <ModalFooter className="redirect-app-footer">
      </ModalFooter>
    </Modal>
  )
}
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import OptimizeImg from '../../../assets/img/img-opt-info.png'
import { sendGetRequestMobile } from "../../../services/request-adapter";
import '../../../styles/realtimeDriver/realtimeDriver.scss'
import { LoadingScreenSpinner } from "../../loadingScreen/loadingScreen";
import DriverLocMaps from "../../maps/DriverLocMaps";
import Maps from "../../maps/Maps";
import { errorPopup } from "./PopUp/ErrorPopUp";

export const RealtimeDriver = ({isOpen, toggle, driverId, tripData}) => {
  const { t } = useTranslation()
  const [driverLocData, setDriverLocData] = useState([])
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    if(isOpen) {
      getDriverLocation()
    }
  }, [isOpen])

  const getDriverLocation = async () => {
    setSpinner(true)
    try {
      const { data } = await sendGetRequestMobile(`/api/live-location-driver/${driverId}`)
      if(data.status === 'other') throw data
      setDriverLocData(data.data)
      setSpinner(false)
    } catch (error) {
      toggle()
      console.log(error.message)
      errorPopup(t('error'), error.message, t('close'))
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}className="realtime-driver">
      <ModalHeader className="realtime-driver-header" toggle={toggle}>
        <h1>Realtime Driver Location</h1>
      </ModalHeader>
      <ModalBody className="realtime-driver-body">
        {spinner ? 
          <LoadingScreenSpinner /> :
          <>
            {/* <Maps driverLatLng={driverLocData?.location?.coordinates}/> */}
            <DriverLocMaps tripData={tripData} driverLatLng={driverLocData?.location?.coordinates}/>
            <div className="body-container">
              <h5 className="body-title">Realtime Information</h5>
              <div className="body-content">
                <div className="info-name d-flex align-items-center justify-content-between gap-2">
                  <h6 >{t('temperature')}</h6> 
                  <p className="driver-temp">{driverLocData?.temp}&deg;C</p>
                </div>
              </div>
            </div>
          </>
        }
      </ModalBody>
    </Modal>
  )
}
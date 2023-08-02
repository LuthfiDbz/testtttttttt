import React, { useState } from "react";
import TimeIcon from '../../../assets/icon/ic-view-time.png'
import DriverAvatar from '../../../assets/img/img-avatar-1.png'
import '../../../styles/manageDedicated/orderConfirmManage/orderConfirmManage.scss'
import axios from "axios";
import { format } from "date-fns";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";

const OrderConfirmByDedicated = ({order,discount, driverData, opt}) => {
  const { t } = useTranslation()
  const [allDataInformation, setAllDataInformation] = useState(order)
  const [loadingScreen, setLoadingScreen] = useState(false)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }


  return (
    <form className="order-confirm-manage">
      {loadingScreen && <div className="loading-map-screen"></div>}
      <div className="order-side">
        <div className="order-info">
          <div className="title-info">
            <h1 className="title">{t('orderInfo')}</h1>
            {opt == 0 ?
              <Badge className="estimation"><img src={TimeIcon} alt="" /> {t('estimation')}: {Math.floor(allDataInformation.durationTotal / 3600)} {t('hour')} {Math.floor(allDataInformation.durationTotal % 3600 / 60)} {t('minute')} {`(${allDataInformation.distanceTotal} km)`}</Badge>
              :
              <Badge className="estimation"><img src={TimeIcon} alt="" /> {t('estimation')}: {Math.floor(allDataInformation.durationTotalOpt / 3600)} {t('hour')} {Math.floor(allDataInformation.durationTotalOpt % 3600 / 60)} {t('minute')} {`(${allDataInformation.distanceTotalOpt} km)`}</Badge>
            }
          </div>
          <div className="date-pickup">
            <h3>{t('datePickup')}</h3>
            <h3>{format(Date.parse(allDataInformation.datePick), 'dd MMMM yyyy')}</h3>
          </div>
          <div className="time-pickup">
            <h3>{t('timePickup')}</h3>
            <h3>{allDataInformation.timePick}</h3>
          </div>
          <div className="total-trip">
            <h3>{t('totalTrips')}</h3>
            <h3>{allDataInformation.trip_planning.length} Trip</h3>
          </div>
        </div>
        <div className="service-info">
          <h1 className="title">{t('serviceInfo')}</h1>
          <div className="service-type">
            <h3>{t('serviceType')}</h3>
            <h3>{allDataInformation.service_name.name}</h3>
          </div>
          <div className="vehicle-type">
            <h3>{t('vehicleType')}</h3>
            <h3>{allDataInformation.vehicle_type.name}</h3>
          </div>
        </div>
        <div className="driver">
          <h1 className="title" >{t('driver')}</h1>
        {driverData !== null &&
          driverData.map((data) => {
            return (
              <div>
                <div className="driver-on"></div>
                <img src={`${process.env.REACT_APP_IMG_URL}/driver/${data.driverImage}`} alt="" className="driver-img"/>
                <div className="driver-data">
                  <h3 className="driver-name">{data.driverName}</h3>
                  <h4 className="driver-bike-number">Bike | {data.vehicleName} | {data.license}</h4>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    </form>
  )
}

export default OrderConfirmByDedicated
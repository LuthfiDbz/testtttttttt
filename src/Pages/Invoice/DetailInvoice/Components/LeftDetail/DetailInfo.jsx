import { format } from "date-fns";
import { t } from "i18next";
import React from "react";
import { Badge } from "reactstrap";
import WaitingPaymentIcon from '../../../../../assets/icon/ic-invoice-unpaid.png'

const DetailInfo = ({data}) => {
  return (
    <>
      <div className="header-detail">
        <div className="detail">
          <h1 className="title">{t('detailOrder')} #{data?.orderNumber}</h1>          
          <h2 className="invoice-number">{t('invoiceNumber')}: <span>{data?.invoiceNumber}</span></h2>
        </div>
        {data?.paymentMethod?.toLowerCase() !== 'postpaid' && data?.paymentStatus?.toLowerCase() === 'paid' ?
          <Badge className="payment-badge paid">
            <img src={WaitingPaymentIcon} alt="" />
            <p>{t('paidAt')} {format(Date.parse(data?.paymentExpiredDate), 'dd MMMM yyyy')} {format(Date.parse(data?.paymentExpiredDate), 'HH:MM')}</p>
          </Badge>
          : null
        }
        {data?.paymentMethod?.toLowerCase() !== 'postpaid' ?
          data?.paymentStatus?.toLowerCase() === 'unpaid' || data?.paymentStatus?.toLowerCase() === 'waiting for payment' ?
            <Badge className="payment-badge unpaid">
              <img src={WaitingPaymentIcon} alt="" />
              <p>{t('duadateAt')} {format(Date.parse(data?.paymentExpiredDate), 'dd MMMM yyyy')} {format(Date.parse(data?.paymentExpiredDate), 'HH:MM')}</p>
            </Badge>
            : null
          : null
        }
      </div>
      <div className="order-information information">
        <h2 className="title">{t('orderInfo')}</h2>
        <div className="order-info-content">
          <div className="date-pickup">
            <h4>{t('datePickup')}</h4>
            <p className="desc">{format(Date.parse(data?.datePick), 'dd MMMM yyyy')}</p>
          </div>
          <div className="time-pickup">
            <h4>{t('timePickup')}</h4>
            <p className="desc">{data?.timePick}</p>
          </div>
          <div className="total-trips">
            <h4>{t('totalTrips')}</h4>
            <p className="desc">{data?.trip_planning.length} Trips</p>
          </div>
        </div>
      </div>
      <div className="service-information information">
        <h2 className="title">{t('serviceInfo')}</h2>
        <div className="service-info-content">
          <div className="service-type">
            <h4>{t('serviceType')}</h4>
            <p className="desc">{data?.serviceName}</p>
          </div>
          <div className="vehicles-type">
            <h4>{t('vehicleType')}</h4>
            <p className="desc">{data?.vehicleType}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailInfo;
import React from "react";
import "../../styles/dataTransaction/dataTransaction.scss";
import Icon from "../../assets/img/dedicated-icon.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2"
import { CancelOrder } from "./modal/CancelOrder";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SamedayIcon from "../../assets/icon/ic-service-sameday-inactive@2x.png"
import InstantIcon from "../../assets/icon/ic-service-instant-inactive@2x.png"
import SuperkulTruckIcon from "../../assets/icon/ic-vehicle-truck-inactive@2x.png"
import DedicatedIcon from "../../assets/icon/ic-service-dedicated@2x.png"
import CancelIcon from "../../assets/icon/ic-delete.png"
import { format } from "date-fns";
import { Badge } from "reactstrap";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { useTranslation } from "react-i18next";
import { numberFormat } from "../numberFormat/numberFormat";
import { errorPopup, networkErrorPopup } from "./modal/PopUp/ErrorPopUp";

export const DataTransactionClone = ({ data, status, dataFetch, allService }) => {
  const { t } = useTranslation()
  const allTransactionData = data
  const auth_context = useContext(AuthContext)
  const [cancelOrder, setCancelOrder] = useState(false);
  const [orderDetail, setOrderDetail] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [orderStatus, setorderStatus] = useState('')
  const [item, setItem] = useState('')
  const [xendit, setXendit] = useState('')
  const navigate = useNavigate()

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  const handleDetail = () => {
    if(allService === 'delivery') {
      navigate(`/transaction/detail-transaction/${data.orderId}`)
    } else {
      navigate(`/transaction/detail-transaction-dedicated/${data.orderId}`)
    }
  } 

  const handleCancelOrder = async () => {
    setCancelOrder(false)
    
    try {
      const response = await axios.post(`${url}/api/order/cancel/${allTransactionData.orderId}`, {},{headers})
      
      window.location.reload()
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }

  // if(allTransactionData === undefined || allTransactionData === null || allTransactionData.length === 0) return null


  return (
    allService === 'delivery' ? 
      <div className="main-container">
        {allTransactionData.orderStatus === 'SCHEDULED' ?
            <div 
              className={`flag-status ${allTransactionData.paymentStatus !== 'WAITING FOR PAYMENT'? "success" : "waiting"}`}
            >
              {allTransactionData.paymentStatus !== 'WAITING FOR PAYMENT' ? 
                `Order will be picked up at ${format(new Date(allTransactionData.date), 'dd MMM yyyy')}`
                : 
                "Waiting for payment"
              }
            </div>  
          : null
        }


        <div className="transaction-list">
          <div className="header-list">
            <div className="left-header">
              <Badge className="status-order">{allTransactionData.orderStatus}</Badge>
              <p>
                {t('dateOrder')}: <strong>{format(Date.parse(data.date), 'dd MMM yyyy')}</strong>
              </p>
              <p>
                {t('orderNumber')}: <strong>#{data.orderNumber}</strong>
              </p>
            </div>
            <div className="right-header">
              {allTransactionData.paymentStatus.toLowerCase() === 'paid' &&
                <Badge className="status-paid">Paid</Badge>
              }
            </div>
          </div>
          <div className="main-list">
            <div className="icon-service">
              {data.serviceName === 'Sameday Delivery' &&
                <img src={SamedayIcon} alt="" />
              }
              {data.serviceName === 'Instant Delivery' &&
                <img src={InstantIcon} alt="" />
              }
              {data.serviceName === 'Superkul Truck' &&
                <img src={SuperkulTruckIcon} alt="" />
              }
              {data.serviceName === 'Dedicated Delivery' &&
                <img src={DedicatedIcon} alt="" />
              }
            </div>
            <div className="detail-service">
              <p className="title-service">{data.serviceName}</p>
              <p className="label-service">
                {data.totalTrip} Trip, {data.totalDrop - data.totalTrip} Drop
              </p>
            </div>
            
            {data.serviceName.toLowerCase() !== 'dedicated delivery' &&
              <div className="cost-order">
                <p className="title-cost">{t('costOrder')}</p>
                <p className="nominal-order">RP. {numberFormat(data.totalPrice)}</p>
              </div>
            }
          </div>
          <div className="footer-list">
            <button className="detail" onClick={handleDetail}>{t('viewDetail')}</button>
            {allTransactionData.paymentStatus.toLowerCase() === "paid" || allTransactionData.paymentMethod.toLowerCase() === "postpaid" || allTransactionData.orderStatus.toLowerCase() === "canceled"? 
              null :
              <button className="cancel"  onClick={() => setCancelOrder(true)}>
                <img src={CancelIcon} alt=''/>
                {t('cancelOrder')}
              </button>
            }
            {allTransactionData.orderStatus.toLowerCase() === "pending" && (
            <button className="destroy">
                <HiOutlineArchiveBoxXMark />
                Destroy
              </button>
            )}
          </div>
          <CancelOrder
            openCancel={cancelOrder}
            closeCancel={() => setCancelOrder(false)}
            cancelConfirm={handleCancelOrder}
          />
        </div>
      </div>
      :
      <div className="main-container">
        <div className="transaction-list">
          <div className="header-list">
            <div className="left-header">
              <Badge className="status-order">{data.orderStatus || data.status}</Badge>
              <p>
                {t('rentStart')}: <strong>{format(Date.parse(data.rentStart), 'dd MMM yyyy')}</strong>
              </p>
              <p>
                {t('rentEnd')}: <strong>{format(Date.parse(data.rentEnd), 'dd MMM yyyy')}</strong>
              </p>
              <p>
                {t('orderNumber')}: <strong>#{data.orderNumber}</strong>
              </p>
            </div>
            {/* <div className="right-header">
            {(orderStatus === "DONE" || orderStatus === "ON PROGRESS") && (
              <Badge className="status-paid">Paid</Badge>
              )}
            </div> */}
          </div>
          <div className="main-list">
            <div className="icon-service">
              <img src={DedicatedIcon} alt="" />
            </div>
            <div className="detail-service">
              <p className="title-service">Dedicated Service</p>
              <p className="label-service">
                {data.quantity} {data.vehicleType}
              </p>
            </div>
            
            {/* <div className="cost-order">
              <p className="title-cost">Cost Order</p>
              <p className="nominal-order">RP. {data.totalPrice}</p>
            </div> */}
          </div>
          <div className="footer-list">
            <button className="detail" onClick={handleDetail}>View Detail</button>
            {/* <button className="cancel"  onClick={() => setCancelOrder(true)}>
              <img src={CancelIcon} alt=''/>
              {t('cancelOrder')}
            </button> */}
          </div>
          <CancelOrder
          openCancel={cancelOrder}
          closeCancel={() => setCancelOrder(false)}
          cancelConfirm={handleCancelOrder}
        />
        </div>
      </div>
  );
};
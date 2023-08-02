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
import { LoadingScreen } from "../../Component/loadingScreen/loadingScreen";
import { sendGetRequestMobile } from "../../services/request-adapter";
import { errorMessage } from "../../utils/errorMessage";

export const DataTransaction = ({ data, status, allService }) => {
  const { t } = useTranslation()
  const [cancelOrder, setCancelOrder] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false)
  const navigate = useNavigate()

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  const handleDetail = () => {
    if (allService === 'delivery') {
      navigate(`/transaction/detail-transaction/${data.orderId}`)
    } else {
      navigate(`/transaction/detail-transaction-dedicated/${data.orderId}`)
    }
  }

  const handleRepeatOrder = async (val) => {
    setLoadingScreen(true)
    try {
      const res = await sendGetRequestMobile(`api/raw-data-order/${data?.orderId}`);
      setLoadingScreen(false)
      if (res.data.status === 'failed') {
        errorMessage(res.data, t('error'), res.data.message, t('close'))
        return
      }
      const reorderData = {
        datePick: res?.data?.data?.datePick,
        timePick: res?.data?.data?.timePick,
        serviceNameId: res?.data?.data?.serviceNameId,
        vehicleTypeId: res?.data?.data?.vehicleTypeId,
        rawData: res?.data?.data,
        service_name: {
          name: res?.data?.serviceName
        },
        vehicle_type: {
          name: res?.data?.vehicleType
        }
      }
      navigate('/delivery', { state: reorderData })
    } catch (error) {
      console.log(error.message);
      errorMessage(error, t('error'), t('somethingError'), t('close'))
    }
  }

  const handleCancelOrder = async () => {
    setCancelOrder(false)

    try {
      const response = await axios.post(`${url}/api/order/cancel/${data.orderId}`, {}, { headers })

      window.location.reload()
    } catch (error) {
      console.log(error.message)
      if (error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'), t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'), t('somethingError'), t('close'))
      }
    }
  }

  // if(allTransactionData === undefined || allTransactionData === null || allTransactionData.length === 0) return null


  return (
    allService === 'delivery' ?
      <div className="main-container">
        {loadingScreen && <LoadingScreen />}
        {data?.orderStatus === 'SCHEDULED' ?
          <div
            className={`flag-status ${data?.paymentStatus !== 'WAITING FOR PAYMENT' ? "success" : "waiting"}`}
          >
            {data?.paymentStatus !== 'WAITING FOR PAYMENT' ?
              `Order will be picked up at ${format(new Date(data?.date || null), 'dd MMM yyyy')}`
              :
              "Waiting for payment"
            }
          </div>
          : null
        }


        <div className="transaction-list">
          <div className="header-list">
            <div className="left-header">
              <Badge className="status-order">{data?.orderStatus}</Badge>
              <p>
                {t('dateOrder')}: <strong>{format(new Date(data?.date || null), 'dd MMM yyyy')}</strong>
              </p>
              <p>
                {t('orderNumber')}: <strong>#{data?.orderNumber}</strong>
              </p>
            </div>
            <div className="right-header">
              {data?.paymentStatus === 'PAID' &&
                <Badge className="status-paid">Paid</Badge>
              }
            </div>
          </div>
          <div className="main-list">
            <div className="icon-service">
              {data?.serviceName === 'Sameday Delivery' &&
                <img src={SamedayIcon} alt="" />
              }
              {data?.serviceName === 'Instant Delivery' &&
                <img src={InstantIcon} alt="" />
              }
              {data?.serviceName === 'Superkul Truck' &&
                <img src={SuperkulTruckIcon} alt="" />
              }
              {data?.serviceName === 'Dedicated Delivery' &&
                <img src={DedicatedIcon} alt="" />
              }
            </div>
            <div className="detail-service">
              <p className="title-service">{data?.serviceName}</p>
              <p className="label-service">
                {data?.totalTrip} Trip, {data?.totalDrop - data?.totalTrip} Drop
              </p>
            </div>

            {data?.serviceName !== 'Dedicated Delivery' &&
              <div className="cost-order">
                <p className="title-cost">{t('costOrder')}</p>
                <p className="nominal-order">RP. {numberFormat(data?.totalPrice)}</p>
              </div>
            }
          </div>
          <div className="footer-list">
            <button className="repeat" onClick={handleRepeatOrder}>{t('repeatOrder')}</button>
            <button className="detail" onClick={handleDetail}>{t('viewDetail')}</button>
            {data?.paymentStatus === "PAID" || data?.paymentMethod === "POSTPAID" || data?.orderStatus === "CANCELED" ?
              null :
              <button className="cancel" onClick={() => setCancelOrder(true)}>
                <img src={CancelIcon} alt='' />
                {t('cancelOrder')}
              </button>
            }
            {data?.orderStatus === "PENDING" && (
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
              <Badge className="status-order">{data?.orderStatus || data?.status}</Badge>
              <p>
                {t('rentStart')}: <strong>{format(new Date(data?.rentStart || null), 'dd MMM yyyy')}</strong>
              </p>
              <p>
                {t('rentEnd')}: <strong>{format(new Date(data?.rentEnd || null), 'dd MMM yyyy')}</strong>
              </p>
              <p>
                {t('orderNumber')}: <strong>#{data?.orderNumber}</strong>
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
                {data?.quantity} {data?.vehicleType}
              </p>
            </div>

            {/* <div className="cost-order">
              <p className="title-cost">Cost Order</p>
              <p className="nominal-order">RP. {data?.totalPrice}</p>
            </div> */}
          </div>
          <div className="footer-list">
            <button className="detail" onClick={handleDetail}>{t('viewDetail')}</button>
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
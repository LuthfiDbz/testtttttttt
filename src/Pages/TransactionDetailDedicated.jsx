import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/transactionDetail/transactionDetailDedicated.scss";
import "../styles/emptyData/emptyData.scss"
import { useState } from "react";
import WaitingPaymentIcon from '../assets/icon/ic-invoice-unpaid.png'
import OrderIdIcon from '../assets/icon/ic-order-id.png'
import ArrowExpand from '../assets/icon/ic-arrow-left.png'
import BgBanner from '../assets/img/bg-banner-4.png'
import EmptyIcon from '../assets/img/img-state-empty.png'
import { Header } from "../Component/header/Header";
import { Footer } from "../Component/footer/Footer";
import { CancelOrder } from "./../Component/UI/modal/CancelOrder";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge } from "reactstrap";
import axios from "axios";
import { differenceInDays, format, set } from "date-fns";
import { RatingDriver } from "../Component/UI/modal/RatingDriver";
import { useContext } from "react";
import { AuthContext } from "../Component/authContext/AuthContext";
import { useTranslation } from "react-i18next";
import { numberFormat } from "../Component/numberFormat/numberFormat";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";

export const TransactionDetailDedicated = () => {
  const navigate = useNavigate()
  let { id } = useParams();
  const { t } = useTranslation()
  const auth_context = useContext(AuthContext)

  const [cancelOrder, setCancelOrder] = useState(false);
  const [transactionDetailData, setTransactionDetailData] = useState([])
  const [placeholder, setPlaceholder] = useState(true)
  const [driverId, setDriverId] = useState('')
  const [openRatingDriver, setOpenRatingDriver] = useState(false);
  const toggleRatingDriver = () => {
    setOpenRatingDriver(!openRatingDriver)
  }

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  const [listTrip, setListTrip] = useState('0')  
  const tripAccordion = (id) => {
    if(listTrip === id) {
      setListTrip()
    } else {
      setListTrip(id)
    }
  }

  useEffect(() => {
    getTransactionDetailData()
  }, [])

  const getTransactionDetailData = async () => {
    setPlaceholder(true)
    try {
      const response = await axios.get(`${url}/api/order-dedicated/${id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setTransactionDetailData(data)
      // console.log(new Date().getTime() < new Date(data.rentStart).getTime())
      // console.log(new Date(data.rentStart).getDay() === new Date().getDay())
      // console.log(new Date(data.rentStart).getMonth() === new Date().getMonth())
      // console.log(new Date(data.rentStart).getFullYear() === new Date().getFullYear())
      // console.log(format(new Date(), 'yyyy-MM-dd') >= '2023-01-24')
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }



  useEffect(() => {
    window.scrollTo(0,0,'auto')
  }, [])
  
  if(placeholder) return null

  return (
    <>
      {/* <Header /> */}
      <div className="transaction-detail-dedicated">
        {/* <RatingDriver isOpen={openRatingDriver} toggle={toggleRatingDriver}  driverData={driverId} allData={transactionDetailData}/> */}

        <div className="container-title" style={{backgroundImage: `url(${BgBanner})`}}>
          <div className="content-title">
            <h3>{t('transactionDetails')}</h3>
            <ul className="link">
              <li>
                <Link className="link-to" to="/">
                {t('home')} /
                </Link>
              </li>
              <li>
                <Link className="link-to" to={`/transaction/${auth_context.id}?srvc=2`}>
                  &nbsp; {t('transaction')} /
                </Link>
              </li>
              <li>
                <div className="link-to" to="#">
                  &nbsp; {transactionDetailData.orderStatus || ''} /
                </div>
              </li>
              <li>
                <div className="link-to" to="#">
                  &nbsp; {t('transactionDetails')}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="detail-transaction">
          <div className="left-detail">
            <div className="header-detail">
              <div className="detail">
                <h1 className="title">{t('detailOrder')} #{transactionDetailData.orderNumber}</h1>
                <Badge className="status-badge schedule">{transactionDetailData.orderStatus || ''}</Badge>
                <h2 className="date-order">{t('dateOrder')}: <span>{format(Date.parse(transactionDetailData.created_at), 'dd MMM yyyy')}</span></h2>
                <div className="invoice">
                  <h2 className="invoice-number">{t('invoiceNumber')}: <span>{transactionDetailData.invoiceNumber || ''}</span></h2>
                  {/* <Link to={`/invoice/detail-invoice/`} className="to-detail">{t('viewDetailInvoice')} {'>'}</Link> */}
                </div>
              </div>
              {new Date().getTime() < new Date(transactionDetailData.rentStart).getTime()?
                null :
                <Badge className="payment-badge">
                {/* Conditional Icon */}
                  {t('endDedicated')} {differenceInDays(new Date(transactionDetailData.rentEnd), new Date())} {t('day')}
                </Badge>
              }
              
                
              
            </div>
            <div className="service-information">
              <h2 className="title">{t('serviceInfo')}</h2>
              <div className="service-info-content">
                <div className="info-data">
                  <h4>{t('rentStart')}</h4>
                  <p className="desc">{format(Date.parse(transactionDetailData.rentStart), 'dd MMM yyyy')}</p>
                </div>
                <div className="info-data">
                  <h4>{t('rentEnd')}</h4>
                  <p className="desc">{format(Date.parse(transactionDetailData.rentEnd), 'dd MMM yyyy')}</p>
                </div>
                <div className="info-data">
                  <h4>{t('driver')}</h4>
                  <p className="desc">{transactionDetailData.serviceType}</p>
                </div>
              </div>
              <div className="service-info-content">
                <div className="info-data">
                  <h4>{t('serviceType')}</h4>
                  <p className="desc">{transactionDetailData.serviceName}</p>
                </div>
                <div className="info-data">
                  <h4>{t('vehicleType')}</h4>
                  <p className="desc">{transactionDetailData.vehicleType}</p>
                </div>
                <div className="info-data">
                  <h4>{t('Quantity')}</h4>
                  <p className="desc">{transactionDetailData.quantity}</p>
                </div>
              </div>
            </div>
            {transactionDetailData.driver.length == 0 ?
              <div 
                className="empty-data-screen">
                <img src={EmptyIcon} alt="" />
                <p className="title">{t('noDriverDedicated')}</p>
                <p className="text">{t('noDriverDedicatedText')}</p>
              </div>
              :
              <div className="list-trip">
                <Accordion open={listTrip} toggle={tripAccordion} className="cek">
                  <AccordionItem className="list-item-unpaid">
                    <AccordionHeader className="header" targetId="1">
                      <div className="list-information">
                        <img src={OrderIdIcon} alt="" className="trip-icon"/>
                        <h2 className="address-name">{t('listVehicle')}</h2>
                        <img src={ArrowExpand} alt="" className={`arrow-icon ${listTrip === '1' ? 'more' : 'less'}`}/>
                      </div>
                    </AccordionHeader>
                    <AccordionBody className="body" accordionId="1">
                      {transactionDetailData.driver.map(driver => {
                        return (
                          <div className="driver">
                            <div>
                              {driver.profile[0] === undefined || driver.profile[0] === null?
                                null :
                                <img src={`${process.env.REACT_APP_IMG_URL}/driver/${driver.profile[0]?.profile_img}`} alt="" className="driver-img"/>
                              }
                              <div className="driver-data">
                                {driver.profile[0] === undefined || driver.profile[0] === null?
                                  null :
                                  <h3 className="driver-name">{driver.profile[0]?.first_name || ''} {driver.profile[0]?.last_name || ''}</h3>
                                }
                                <h4 className="driver-bike-number">{transactionDetailData.vehicleType} | {driver.profile[0]?.vehicle_name.vehicle_name || ''} | {driver.profile[0]?.vehicle_name.license_number || ''}</h4>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              </div>
            }
          </div>
          <div className="right-detail">
            <div className="header-right">
              <h1 className="title">{t('payment')}</h1>
              {/* <Badge className="status unpaid">Unpaid</Badge> */}
              {/* <Badge className="status paid">Paid</Badge> */}
            </div>
            {/* <div className="body-right">
              <div className="fee">
                <p className="title-fee">{t('serviceFee')}</p>
                <p className="price-fee">Rp. </p>
              </div>
              <div className="fee">
                <p className="title-fee">{t('additionalService')}</p>
                <p className="price-fee">Rp. </p>
              </div>
            </div> */}
            <div className="footer-right">
              <div className="total">
                <p className="total-cost">{t('totalCostTrip')}</p>
                <p className="price-total">Rp. {numberFormat(transactionDetailData.totalCostOrder)}</p>
              </div>
              {/* <div className="button-group">
                <button className="btn cancel" onClick={() => setCancelOrder(true)}>{t('cancelOrder')}</button>
              </div> */}
              {/* <CancelOrder
                openCancel={cancelOrder}
                closeCancel={() => setCancelOrder(false)}
                cancelConfirm={handleCancelOrder}
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

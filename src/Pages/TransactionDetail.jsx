import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/transactionDetail/transactionDetail.scss";
import { useState } from "react";
import WaitingPaymentIcon from '../assets/icon/ic-invoice-unpaid.png'
import OrderIdIcon from '../assets/icon/ic-order-id.png'
import PriceIcon from '../assets/icon/ic-currency.png'
import InfoIconWhite from '../assets/icon/ic-info-white.png'
import ArrowExpand from '../assets/icon/ic-arrow-left.png'
import DriverImg from '../assets/img/img-avatar-1.png'
import BgBanner from '../assets/img/bg-banner-4.png'
import { Header } from "../Component/header/Header";
import { Footer } from "../Component/footer/Footer";
import { CancelOrder } from "./../Component/UI/modal/CancelOrder";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge } from "reactstrap";
import axios from "axios";
import { format, set } from "date-fns";
import { RatingDriver } from "../Component/UI/modal/RatingDriver";
import { useContext } from "react";
import { AuthContext } from "../Component/authContext/AuthContext";
import { useTranslation } from "react-i18next";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { numberFormat } from "../Component/numberFormat/numberFormat";

export const TransactionDetail = () => {
  const navigate = useNavigate()
  let { id } = useParams();
  const { t } = useTranslation()
  const auth_context = useContext(AuthContext)

  const [cancelOrder, setCancelOrder] = useState(false);
  const [transactionDetailData, setTransactionDetailData] = useState([])
  const [additional, setAdditional] = useState([])
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

  const getStatusStyle = (value) => {
    switch (value) {
      case "Menunggu Pembayaran":
        return "one"
      case "Order Sedang Diproses":
        return "one"
      case "Mencari Driver":
        return "one"
      case "Driver Ditemukan":
        return "four"
      case "Proses Penjemputan":
        return "five"
      case "Proses Pengiriman":
        return "six"
      case "Terkirim":
        return "seven"
      case "Dibatalkan":
        return "eight"
      default:
        return {};
    }
  };

  const getStatusValue = (value) => {
    switch (value) {
      case "Menunggu Pembayaran":
        return t('tripWaiting');
      case "Order Sedang Diproses":
        return t('tripProcess');
      case "Mencari Driver":
        return t('tripLookingDriver');
      case "Driver Ditemukan":
        return t('tripDriverFound');
      case "Proses Penjemputan":
        return t('tripPicking');
      case "Proses Pengiriman":
        return t('tripDelivering');
      case "Terkirim":
        return t('tripDelivered');
      case "Dibatalkan":
        return t('tripCancel');
      default:
        return "";
    }
  };

  useEffect(() => {
    getTransactionDetailData()
  }, [])

  const getTransactionDetailData = async () => {
    setPlaceholder(true)
    try {
      const response = await axios.get(`${url}/api/order/${id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setTransactionDetailData(data)
      const filterAdditional = data.additionalService.filter(a => a.name.toLowerCase() !== 'handling fee')
      setAdditional(filterAdditional)
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }

  const handleRatingDriver = (driverId) => {
    setDriverId(driverId)
    if(driverId.driverRating == 0 ) {
      toggleRatingDriver()
    } else {
      errorPopup(t('rateOnlyOnce'), '', t('close'))
    }
  }

  const handleCancelOrder = async () => {
    setCancelOrder(false)
    try {
      const response = await axios.post(`${url}/api/order/cancel/${id}`, {},{headers})
      
      // {{url2}}/api/order/cancel/63d8e7b1eca416b53b0d4302
      navigate('/')
    } catch(error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    window.scrollTo(0,0,'auto')
  }, [])
  
  if(placeholder) return null

  return (
    <>
      {/* <Header /> */}
      <div className="transaction-detail">
        <RatingDriver isOpen={openRatingDriver} toggle={toggleRatingDriver}  driverData={driverId} allData={transactionDetailData}/>

        <div className="container-title" style={{backgroundImage: `url(${BgBanner})`}}>
          <div className="content-title">
            <h3 >{t('transactionDetails')}</h3>
            <ul className="link">
              <li>
                <Link className="link-to" to="/">
                {t('home')} /
                </Link>
              </li>
              <li>
                <Link className="link-to" to={`/transaction/${auth_context.id}`}>
                  &nbsp; {t('transaction')} /
                </Link>
              </li>
              <li>
                <div className="link-to" to="#">
                  &nbsp; {transactionDetailData.orderStatus[0].toUpperCase() + transactionDetailData.orderStatus.toLowerCase().substring(1)} /
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
                <Badge className="status-badge schedule">{transactionDetailData.orderStatus[0].toUpperCase() + transactionDetailData.orderStatus.toLowerCase().substring(1)}</Badge>
                <h2 className="date-order">{t('dateOrder')}: <span>{format(Date.parse(transactionDetailData.created_at), 'dd MMM yyyy')}</span></h2>

                {transactionDetailData.paymentStatus.toLowerCase() === 'paid' || transactionDetailData.orderStatus.toLowerCase() !== 'scheduled'?
                  <div className="invoice">
                    <h2 className="invoice-number">{t('invoiceNumber')}: <span>{transactionDetailData.invoiceNumber}</span></h2>
                    <Link to={`/invoice/detail-invoice/${transactionDetailData._id}`} className="to-detail">{t('viewDetailInvoice')} {'>'}</Link>
                  </div>
                  : null
                }

              </div>
              
              {transactionDetailData.paymentStatus.toLowerCase() === 'paid' || transactionDetailData.paymentMethod.toLowerCase() === 'postpaid' || transactionDetailData.orderStatus.toLowerCase() === 'canceled'?
                null :
                <Badge className="payment-badge waiting-payment">
                {/* Conditional Icon */}
                  <img src={WaitingPaymentIcon} alt="" /> {t('waitingPayment')}
                  {/* <img src={WaitingPaymentIcon} alt="" /> Waiting for Payment {format(Date.parse(transactionDetailData.paymentExpiredDate), 'HH:MM:SS')} */}
                </Badge>
              }
              
            </div>
            <div className="service-information">
              <h2 className="title">{t('serviceInfo')}</h2>
              <div className="service-info-content">
                <div className="service-type">
                  <h4>{t('serviceType')}</h4>
                  <p className="desc">{transactionDetailData.serviceName}</p>
                </div>
                <div className="vehicles-type">
                  <h4>{t('vehicleType')}</h4>
                  <p className="desc">{transactionDetailData.vehicleType}</p>
                </div>
                <div className="date-pickup">
                  <h4>{t('datePickup')}</h4>
                  <p className="desc">{format(Date.parse(transactionDetailData.datePick), 'dd MMMM yyyy')}</p>
                </div>
                <div className="time-pickup">
                  <h4>{t('timePickup')}</h4>
                  <p className="desc">{transactionDetailData.timePick}</p>
                </div>
              </div>
            </div>
            <div className="list-trip">
              {transactionDetailData.trip_planning.map((trip, index) => {
                  const sortTrip = trip.trip_planning_dt.sort((a,b) => a.order - b.order)
                  return (
                    <Accordion open={listTrip} toggle={tripAccordion} className="cek">
                      <AccordionItem className="list-item-paid">
                        <AccordionHeader className="header" targetId={index}>
                          <div className="list-header">
                            <img src={OrderIdIcon} alt="" className="trip-icon"/>
                            <div className="trip-number">
                              <h3>{t('tripNumber')}</h3>
                              <h4>#{trip.tripNumber}</h4>
                            </div>
                            {transactionDetailData.serviceName.toLowerCase() !== 'dedicated delivery' ?
                              <div className="price">
                                <img src={PriceIcon} alt="" className="price-icon"/>
                                {transactionDetailData.serviceName.toLowerCase() === 'superkul truck' ?
                                  <h3>Rp {transactionDetailData.superkulPriceTotal}</h3>
                                  :
                                  <h3>Rp {numberFormat(trip.price)}</h3>
                                }
                              </div>
                              : null
                            }
                          </div>
                          <div className="list-information">
                            {
                                trip.tripStatus.toLowerCase() !== 'menunggu pembayaran' &&
                                trip.tripStatus.toLowerCase() !== 'order sedang diproses' &&
                                trip.tripStatus.toLowerCase() !== 'mencari driver' &&
                                trip.tripStatus.toLowerCase() !== 'dibatalkan' && 
                                trip?.driverId != 0?
                                  <div className="driver">
                                    {transactionDetailData.serviceName.toLowerCase() !== 'superkul truck' ?
                                      <>
                                        <img src={`${process.env.REACT_APP_IMG_URL}/driver/${trip.driverPhoto}`} alt="" className="driver-img" />
                                        <div>
                                          <h3 className="driver-name">{trip?.driverName}</h3>
                                          <h4 className="driver-vehicle">{trip?.driverPhone} | {trip?.driverVehicleName} | {trip?.driverVehicleNumber}</h4>
                                        </div>
                                      </>
                                      :null
                                    }
                                    <div className="button">
                                      {transactionDetailData.serviceName.toLowerCase() !== 'superkul truck' ?
                                        transactionDetailData.orderStatus.toLowerCase() === 'done' ?
                                          <button className="btn rate-driver" onClick={() => handleRatingDriver(trip)}>{t('rateDriver')}</button>
                                          : null
                                        : null
                                      }
                                      <button className="btn view-trip" onClick={() => navigate(`detail-trip/${trip.tripNumber}`)}>{t('viewTrip')}</button>
                                    </div>      
                                  </div>
                                  : null
                                  
                            }
                            <h2 className="address-name">{trip.pick[0]?.pickLabel || trip.pick.pickLabel}</h2>
                            <h3 className="address-street">{trip.pick[0]?.pickAddress || trip.pick.pickAddress}</h3>
                            <div className="status-badge">
                              <Badge className={`status ${getStatusStyle(trip.tripStatus)}`}>{trip.tripStatus}</Badge>
                              <img src={ArrowExpand} alt="" className={listTrip === index ? 'more' : 'less'}/>
                            </div>
                          </div>
                        </AccordionHeader>
                        <AccordionBody className="body" accordionId={index}>
                          {sortTrip.map((tripPoint) => {
                            return (
                              <div className="list-pickup-drop">
                                <h4 className="title">{tripPoint.job === 'pickup' ? 'Pickup' : 'Drop'} Point</h4>
                                <h3 className="address-name">{
                                  tripPoint.item.pickLabel || 
                                  tripPoint.item[0]?.pickLabel ||
                                  tripPoint.item.dropOff?.dropLabel ||
                                  tripPoint.item.dropLabel
                                  }
                                </h3>
                                <h5 className="address-street">{
                                  tripPoint.item.pickAddress ||  
                                  tripPoint.item[0]?.pickAddress ||
                                  tripPoint.item.dropOff?.dropAddress ||
                                  tripPoint.item.dropAddress
                                  }
                                </h5>
                              </div>
                            )
                          })}
                        </AccordionBody>
                      </AccordionItem>
                    </Accordion>  
                  )
                }) 
              }
              
            </div>
          </div>
          {transactionDetailData.serviceName.toLowerCase() !== 'dedicated delivery' &&
            <div className="right-detail">
              <div className="header-right">
                <h1 className="title">{t('payment')}</h1>
                { 
                  transactionDetailData.paymentStatus === 'UNPAID' || transactionDetailData.paymentStatus === 'WAITING FOR PAYMENT' ? <Badge className="status unpaid">Unpaid</Badge> : null
                }
                {transactionDetailData.paymentStatus === 'PAID' && <Badge className="status paid">Paid</Badge>}
              </div>
              <div className="body-right">
                {transactionDetailData.serviceName.toLowerCase() === 'superkul truck' ?
                    <>
                      <div className="fee">
                        <p className="title-fee">{t('priceBase')}</p>
                        <p className="price-fee">Rp. {numberFormat(transactionDetailData.superkulPriceDestination)}</p>
                      </div>
                      <div className="fee">
                        <p className="title-fee">{t('pricePerDropIntracity')}</p>
                        <p className="price-fee">Rp. {numberFormat(transactionDetailData.superkulCostPerDropIntra * transactionDetailData.totalIntracity)}</p>
                      </div>
                      <div className="fee">
                        <p className="title-fee">{t('pricePerDropIntercity')}</p>
                        <p className="price-fee">Rp. {numberFormat(transactionDetailData.superkulCostPerDropInter * transactionDetailData.totalIntercity)}</p>
                      </div>
                    </>
                  :
                  <>
                    <div className="fee">
                      <p className="title-fee">{t('serviceFee')}</p>
                      <p className="price-fee">Rp. {numberFormat(transactionDetailData.basicPrice)}</p>
                    </div>
                    {transactionDetailData.additionalService.map((add) => {
                        if(add.price !== null)
                        return (
                          add.is_mandatory == 1 ? null : 
                          <div className="fee">
                            <p className="title-fee">{add.name} x {transactionDetailData.totalDestination} Drop</p>
                            <p className="price-fee">Rp. {numberFormat(add.price * transactionDetailData.totalDestination)}</p>
                          </div>
                        )
                      })
                    }
                    {/* <div className="fee">
                      <p className="title-fee">{t('additionalService')}</p>
                      <p className="price-fee">Rp. {numberFormat(additional.reduce((val, element) => {return val + element.price}, 0))}</p>
                      
                    </div> */}
                  </>
                }
                {transactionDetailData.promoCode !== ' ' &&
                  <div className="fee">
                    <p className="title-fee discount">{transactionDetailData.promoCode}</p>
                    <p className="price-fee discount">Rp. -{numberFormat(transactionDetailData.promoAmount)}</p>
                  </div>
                }
                {transactionDetailData.totalPublicHolidayPrice > 0? 
                  <>
                    <hr />
                    <div className="public-holiday">
                      <img src={InfoIconWhite} alt="" />
                      <h4>{t('publicHolidayText')}</h4>  
                    </div>
                  </>
                  : null
                }
              </div>
              <div className="footer-right">
                <div className="total">
                  <p className="total-cost">{t('totalCostTrip')}</p>
                  <p className="price-total">Rp. {numberFormat(transactionDetailData.priceTotal) || numberFormat(transactionDetailData.superkulPriceTotal)}</p>
                </div>
                
                {/* {transactionDetailData.paymentMethod !== "POSTPAID" ?
                  transactionDetailData.paymentStatus === 'UNPAID' || transactionDetailData.paymentStatus === 'WAITING FOR PAYMENT' ?
                    <div className="button-group">
                      <button className="btn cancel" onClick={() => setCancelOrder(true)}>{t('cancelOrder')}</button>
                      
                      <a href={transactionDetailData.paymentLink} target='_blank' onClick={() => navigate('/')}><button className="btn pay">{t('pay')}</button></a>
                    </div>
                    : null
                  : null
                } */}

                {transactionDetailData.paymentStatus.toLowerCase() === "paid" || transactionDetailData.paymentMethod.toLowerCase() === "postpaid" || transactionDetailData.orderStatus.toLowerCase() === "canceled"?
                  null :
                  <div className="button-group">
                    <button className="btn cancel" onClick={() => setCancelOrder(true)}>{t('cancelOrder')}</button>
                    
                    <a href={transactionDetailData.paymentLink} target='_blank' onClick={() => navigate('/')}><button className="btn pay">{t('pay')}</button></a>
                  </div>
                }
                <CancelOrder
                  openCancel={cancelOrder}
                  closeCancel={() => setCancelOrder(false)}
                  cancelConfirm={handleCancelOrder}
                />
              </div>
            </div>
          }
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

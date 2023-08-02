import React, { useState } from "react";
import DiscountIcon from '../../../assets/icon/ic-discount.png'
import RemoveIcon from '../../../assets/icon/ic-remove.png'
import PromoSuccessIcon from '../../../assets/icon/ic-invoice-paid.png'
import TimeIcon from '../../../assets/icon/ic-view-time.png'
import InfoIcon from '../../../assets/icon/ic-info-blue.png'
import InfoIconWhite from '../../../assets/icon/ic-info-white.png'
import '../../../styles/deliveryService/orderConfirm/orderConfirm.scss'
import axios from "axios";
import { format } from "date-fns";
import { Badge, Tooltip } from "reactstrap";
import { errorPopup, networkErrorPopup } from "../modal/PopUp/ErrorPopUp";
import { useTranslation } from "react-i18next";
import { numberFormat } from "../../numberFormat/numberFormat";

const OrderConfirmation = ({order,discount, opt, prm}) => {
  const { t } = useTranslation()
  const [promoCode, setPromoCode] = useState('')
  const [promoData, setPromoData] = useState('')
  const [promoCheck, setPromoCheck] = useState('')
  const [promoAmount, setPromoAmount] = useState('')
  const [allDataInformation, setAllDataInformation] = useState(order)
  const [loadingScreen, setLoadingScreen] = useState(false)

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  const handlePromo = async (e,autoPromo) => {
    let promo = promoCode

    if(promoCode === '' && autoPromo === undefined) {
      errorPopup(t('error'),t('fillPromoCodeFirst'), t('close'))
      return
    }

    if(autoPromo !== undefined) {
      promo = autoPromo
    }

    const dataPromo = {
      promoCode : promo,
      tmpOrderId : allDataInformation._id
    }
    
    setLoadingScreen(true)
    try {
      const response = await axios.post(`${url}/api/promo/code`, dataPromo,{headers})
      const data = response.data
      
      
      setLoadingScreen(false)

      if(data.status === 'failed') {
        setPromoData(data)
        setPromoCheck(false)
        discount('', false)
      } else {
        if(data.data.discount_type == 0) {
  
          let subtotal = allDataInformation.priceTotal
          if(opt == 1) {
            subtotal = allDataInformation.priceTotalOpt
          }
  
          let calculate = subtotal * (data.data.amount / 100)
          
          if(calculate >= data.data.max_discount) {
            calculate = data.data.max_discount
          }
          
          setPromoAmount(calculate)
          setPromoData(data)
  
        } 
        if(data.data.discount_type == 1) {
          
          setPromoAmount(data.data.amount)
          setPromoData(data)
        }
        setPromoCheck(true)
        discount(data, true)
      }
    } catch(error) {
      setLoadingScreen(false)
      setPromoCheck(false)
      console.log(error.message)
      if(error.message === 'Network Error') {
        // setLoadingScreen(false)
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),error.message, t('close'))
      }
    }
  }

  const handleClearPromo = () => {
    setPromoCode(''); 
    setPromoCheck('')
    discount('', false)
  }

  const handleChangePromo = (e) => {
    setPromoCode(e);
  }

  useState(() => {
    if(prm !== null) {
      handleChangePromo(prm)
      handlePromo('',prm)
    }
  }, [prm])

  return (
    <div className="order-confirmation">
      {loadingScreen && <div className="loading-map-screen"></div>}
      <div className="order-side">
        <div className="order-info">
          <div className="title-info">
            <h1 className="title">{t('orderInfo')}</h1>
            {allDataInformation.optimize ?
              <Badge className="estimation"><img src={TimeIcon} alt="" /> {t('estimation')}: {Math.floor(allDataInformation.durationTotalOpt / 3600)} {t('hour')} {Math.floor(allDataInformation.durationTotalOpt % 3600 / 60)} {t('minute')} {`(${allDataInformation.distanceTotalOpt} km)`}</Badge>
              :
              <Badge className="estimation"><img src={TimeIcon} alt="" /> {t('estimation')}: {Math.floor(allDataInformation.durationTotal / 3600)} {t('hour')} {Math.floor(allDataInformation.durationTotal % 3600 / 60)} {t('minute')} {`(${allDataInformation.distanceTotal} km)`}</Badge>
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
        <div className="cost-order">
          <h1 className="title">{t('costOrder')}</h1>
          {allDataInformation.service_name.name.toLowerCase() === 'superkul truck' ?
            <>
              <div>
                <h3>{t('priceBase')}</h3>
                <h3>Rp {numberFormat(allDataInformation.superkulPriceDestination)}</h3>
              </div>
              <div>
                <h3>{t('pricePerDropIntracity')}</h3>
                <h3>Rp {numberFormat(allDataInformation.superkulCostPerDropIntra * allDataInformation.totalIntracity)}</h3>
              </div>
              <div>
                <h3>{t('pricePerDropIntercity')}</h3>
                <h3>Rp {numberFormat(allDataInformation.superkulCostPerDropInter * allDataInformation.totalIntercity)}</h3>
              </div>
            </>
            : 
            allDataInformation.trip_planning.map((trip, index) => {
              return (
                <div>
                  <h3>Trip {index + 1}</h3>
                  <h3>Rp. {numberFormat(trip.optimize ? trip.priceOpt : trip.price)}</h3>
                </div>
              )
            })
          }
        </div>
        {allDataInformation.additionalService.length !== 0 && allDataInformation.additionalService.find((a) => a.is_mandatory !== 1) !== undefined ?
          <div className="additional-service">
            <h1 className="title">{t('additionalService')}</h1>
            {allDataInformation.additionalService.map((add) => {
                  if(add.price !== null)
                  return (
                    add.is_mandatory == 1 ? null : 
                    <div className="list-service">
                      <h3>{add.name} x {allDataInformation.totalDestination} Drop</h3>
                      <h3 className="price-service">Rp {numberFormat(add.price * allDataInformation.totalDestination)}</h3>
                    </div>
                  )
                })
              }
          </div>
          : null
        }
        {allDataInformation.service_name.name.toLowerCase() === 'superkul truck'?
          null :
          <div className="promo-code">
            <h1 className="title">{t('promoCode')}</h1>
            <div className="promo-form">
              <img src={DiscountIcon} alt='discount-png' className="promo-icon"/>
              {promoCode !== '' && 
                <img 
                  src={RemoveIcon} 
                  alt='discount-png' className="remove-icon"
                  onClick={handleClearPromo}
                />
              }
              <input 
                type="text" 
                className="promo-input" placeholder="Input Code Promo"
                value={promoCode}
                onChange={(e) => {handleChangePromo(e.target.value)}}          
              />
              <button className="promo-button btn" onClick={handlePromo}>{t('apply')}</button>
            </div>
            {promoCheck && 
              <div className="promo-success">
                <img src={PromoSuccessIcon} alt="" />
                <h4>{t('promoSuccess')}</h4>  
              </div>
            }
            {promoCheck === false && 
              <div className="promo-failed">
                {/* <img src={PromoSuccessIcon} alt="" /> */}
                <h4>{promoData?.message}</h4>  
              </div>
            }
          </div>
        }
        <div className="subtotal-info">
          {allDataInformation.service_name.name.toLowerCase() === 'superkul truck'?
            null :
            <>
              <div className="subtotal">
                <h3>{t('subtotal')}</h3>
                {allDataInformation.optimize ?
                  <h3>Rp {numberFormat(allDataInformation.priceTotalOpt)}</h3>
                  // <h3>Rp {numberFormat(allDataInformation.priceTotal - allDataInformation.handlingPrice + allDataInformation.additionalService.reduce((val, element) => {return val + element.price}, 0))}</h3>
                  :
                  <h3>Rp {numberFormat(allDataInformation.priceTotal)}</h3>
                  // <h3>Rp {numberFormat(allDataInformation.priceTotalOpt - allDataInformation.handlingPrice + allDataInformation.additionalService.reduce((val, element) => {return val + element.price}, 0))}</h3>
                }
              </div>
              {/* <div className="handling-fee">
                <h3>{t('handlingFee')}</h3>
                <h3>Rp {numberFormat(allDataInformation.handlingPrice)}</h3>
              </div> */}
            </>
          }
          {promoCheck && 
            <div className="promo">
              <h3>Promo</h3>
              <h3>Rp -{numberFormat(promoAmount)}</h3>
            </div>
          }
          
          {allDataInformation.totalPublicHolidayPrice != 0 ? 
            <div className="public-holiday">
              <img src={InfoIconWhite} alt="" />
              <h4>{t('publicHolidayText')}</h4>  
            </div>
          : null}
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
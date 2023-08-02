import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import 'rc-slider/assets/index.css';
import axios from "axios";
import { format } from "date-fns";
import ReactGA from "react-ga4";

import { BsArrowLeftShort } from "react-icons/bs";

// Asset
import Logo from "../assets/img/logo.png";

import PickupIcon from '../assets/icon/ic-location-blue.png'
import DropIcon from '../assets/icon/ic-location-yellow.png'
import GrayIcon from '../assets/icon/ic-location-gray.png'
import ConfirmIcon from '../assets/img/img-state-confirmation.png'
import SuccessIcon from '../assets/img/img-state-success.png'


// Style
import "../styles/deliveryService/deliveryService.scss";
import '../styles/deliveryService/createOrder/createOrder.scss'
import OrderConfirmation from "../Component/UI/deliveryService/OrderConfirmation";
import { useTranslation } from "react-i18next";
import { numberFormat } from "../Component/numberFormat/numberFormat";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { PaymentXendit } from "../Component/UI/modal/Delivery/PaymentXendit";
import { Header } from "../Component/header/Header";

export const DeliveryOrderConfirm = ({idx}) => {
  const { t } = useTranslation()
  const { orderid } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const opt = searchParams.get('opt')
  const drft = searchParams.get('drft')
  const prm = searchParams.get('prm')
  const drftNum = searchParams.get('drftNum')
  const [userType, setUserType] = useState(2)
  const navigate = useNavigate()
  const [location, setLocation] = useState([])
  const [allDataOrder, setAllDataOrder] = useState([])
  const [priceTotal, setPriceTotal] = useState(0)
  const [priceTotalWithPromo, setPriceTotalWithPromo] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingPromo, setLoadingPromo] = useState(false)
  const [promoId, setPromoId] = useState(null)
  const [xenditUrl, setXenditUrl] = useState('test')
  const [openPaymentXendit, setOpenPaymentXendit] = useState(false);
  const togglePaymentXendit = () => {
    if(openPaymentXendit) {
      navigate('/')
    } else {
      setOpenPaymentXendit(!openPaymentXendit)
    }
  }
  
  
  // Auth
  const url = process.env.REACT_APP_URL_CUST
  const url_auth = process.env.REACT_APP_DEV_URL
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }


  const center = {
    lat: -6.734807200000001,
    lng: 106.8047719
  }
  const [loadingMapScreen, setLoadingMapScreen] = useState(false)
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [ libraries ] = useState(['places']);

  
  useEffect(() => {
    setLoading(true)
    setLoadingMapScreen(true)
    getOrderData()
  }, [])

  const getOrderData = async () => {
    // User Type
    try {
      const response = await axios.get(`${url_auth}/profile`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      const data = response.data.data
      setUserType(data[0].type)
    } catch(error) {
      console.log(error.message)
    }
    
    try {
      const response = await axios.get(`${url}/api/tmp-order/${orderid}`, {headers})
      
      setAllDataOrder(response.data.data)
      if(response.data.data.service_name.name.toLowerCase() === 'superkul truck') {
        setPriceTotal(response.data.data.superkulPriceTotal)
        setPriceTotalWithPromo(response.data.data.superkulPriceTotal)
      } else {
        if(response.data.data.optimize) {
          setPriceTotal(response.data.data.priceTotalOpt)
          setPriceTotalWithPromo(response.data.data.priceTotalOpt)
          // setPriceTotal(response.data.data.priceTotal + response.data.data.additionalService.reduce((val, element) => {return val + element.price}, 0))
          // setPriceTotalWithPromo(response.data.data.priceTotal + response.data.data.additionalService.reduce((val, element) => {return val + element.price}, 0))
        } else {
          setPriceTotal(response.data.data.priceTotal)
          setPriceTotalWithPromo(response.data.data.priceTotal)
          // setPriceTotal(response.data.data.priceTotalOpt + response.data.data.additionalService.reduce((val, element) => {return val + element.price}, 0))
          // setPriceTotalWithPromo(response.data.data.priceTotalOpt + response.data.data.additionalService.reduce((val, element) => {return val + element.price}, 0))
        }
      }
      setLoadingMapScreen(false)
      setLoadingPromo(false)
      setLoading(false)
    } catch(error) {
      console.log(error.message)
    }
  }


  const handlePayment = () => {
    const data = {
      tmpOrderId: orderid,
      promoId : promoId,
      optimize: opt == 0 ? false : true
    }

    Swal.fire({
      title: `${t('continuePayment')}?`,
      html: t('invoicePayment'),
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: t('no'),
      confirmButtonText: t('yes'),
      confirmButtonColor: '#1F83BB',
      reverseButtons: true,
      imageUrl: ConfirmIcon,
      customClass: {
        popup: 'popup-swal',
        title: 'title-swal',
        htmlContainer: 'text-swal',
        confirmButton:'confirm-swal',
        cancelButton:'cancel-swal'
      }
    }).then( async (result) => {
      if(result.isConfirmed) {
        setLoadingMapScreen(true)
        // axios get createOrder
        try {
          const response = await axios.post(`${url}/api/order`, data, {headers})
          setLoadingMapScreen(false)
          
          if(response.data.status === 'other') {
            ReactGA.event({
              category: "order_category",
              action: "confirm_order_notavail",
              // label: "start_delivery_label", 
              // value: 99
            });
            Swal.fire({
              title: t('driverNotAvail'),
              text: t('driverNotAvailText'),
              imageUrl: ConfirmIcon,
              showConfirmButton: true,
              confirmButtonColor: '#1F83BB',
              confirmButtonText: t('close'),
              customClass: {
                popup: 'popup-swal',
                title: 'title-swal',
                htmlContainer: 'text-swal',
                confirmButton:'confirm-swal'
              }
            })
            return
          } else {
            const xendit = response.data.data.invoiceLink

            ReactGA.event({
              category: "order_category",
              action: "confirm_order_success",
              // label: "start_delivery_label", 
              // value: 99
            });
            
            if(userType === 3) {
              Swal.fire({
                title: t('orderSuccess'),
                timer: 3000,
                imageUrl: SuccessIcon,
                showConfirmButton: false,
                customClass: {
                  popup: 'popup-swal',
                  title: 'title-swal'
                }
              }).then(result => {
                navigate('/')
              })
            } else {
              setXenditUrl(xendit)
              togglePaymentXendit()
            }
          }

        } catch(error) {
          setLoadingMapScreen(false)
          ReactGA.event({
            category: "order_category",
            action: "confirm_order_error",
            // label: "start_delivery_label", 
            // value: 99
          });
          if(error.message === 'Network Error') {
            networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
          } else {
            errorPopup(t('error'),t('somethingError'), t('close'))
          }
        }

      }
    })
  }

  const handleDiscount = (discountData,isTrue) => {
    if(isTrue) {
      if(discountData.data.discount_type == 0) {
        let subtotal = allDataOrder.priceTotal
        if(opt == 1) {
          subtotal = allDataOrder.priceTotalOpt
        }

        let calculate = subtotal * (discountData.data.amount / 100)
        
        if(calculate >= discountData.data.max_discount) {
          calculate = discountData.data.max_discount
        }
        
        setPromoId(discountData?.data.id)
        setPriceTotalWithPromo(priceTotal - calculate)
      } 
      if(discountData.data.discount_type == 1) {
        setPromoId(discountData?.data.id)
        setPriceTotalWithPromo(priceTotal - discountData.data.amount)
      }
    } else {
      setLoadingPromo(true)
      setPromoId(null)
      getOrderData()
    }
  }

  const handleDraft = () => {
    
    Swal.fire({
      title: t('saveToDraft'),
      text: t('saveDraftText'),
      imageUrl: ConfirmIcon,
      confirmButtonColor: '#1F83BB',
      showCancelButton: 'true',
      cancelButtonText: t('no'),
      confirmButtonText: t('yes'),
      reverseButtons: true,
      customClass: {
        popup: 'popup-swal',
        title: 'title-swal',
        htmlContainer: 'text-swal',
        confirmButton:'confirm-swal',
        cancelButton:'cancel-swal'
      }
    }).then(async (result) => {
      if(result.isConfirmed) {
        setLoadingMapScreen(true)
        try {
          const response = await axios.get(`${url}/api/save-draft-order/${orderid}`, {headers})
          navigate('/')
        } catch (error) {
          if(error.message === 'Network Error') {
            networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
          } else {
            errorPopup(t('error'),t('somethingError'), t('close'))
          }
        }
      }
    })
  }

  // Maps Config
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDfdR5Et5GQSGbLqWjFbXB7JNjLIA3Q9Vw',
    libraries
  }) 

  if(!isLoaded) {
    return (
      <h1></h1>
    )
  }

  

  const handleBack = () => {
    
    if(drft === null) {
      if(prm === null || prm == undefined) {
        navigate(`/delivery/trip-planning/${orderid}`)
      } else {
        navigate(`/delivery/trip-planning/${orderid}?prm=${prm}`)
      }
    } else {
      navigate(`/draft-detail/${orderid}`)
    }
  }


  // * COMPONENT
  const HeaderOrder = () => {
    return (
      <div className="header-order">
        <div className="title">
          <BsArrowLeftShort className="home-btn" onClick={handleBack} />
          <p className="title-text">{t('orderConfirm')}</p>
        </div>
        <div className="header-progress">
          <div className='create active'>
            <h6 className="progress-index">1</h6>
            <h6 className="progress-name">{t('createOrder')}</h6>
          </div>
          <div className='trip-planning active'>
            <h6 className="progress-index">2</h6>
            <h6 className="progress-name">{t('tripPlanning')}</h6>
          </div>
          <div className='order-confirm active'>
            <h6 className="progress-index">3</h6>
            <h6 className="progress-name">{t('orderConfirm')}</h6>
          </div>
          <div className='order-confirm'>
            <h6 className="progress-index">4</h6>
            <h6 className="progress-name">{t('payment')}</h6>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="start-delivery">
      <div className="order-side">   
        <PaymentXendit isOpen={openPaymentXendit} toggle={togglePaymentXendit} xenditUrl={xenditUrl}/> 
        {loadingPromo && <div className="loading-map-screen"></div>}
        <HeaderOrder />
        {loadingMapScreen ? <div className="loading-map-screen"></div> :
          <>
            <OrderConfirmation order={allDataOrder} load={loading} discount={handleDiscount} opt={opt} prm={prm}/>
            <div className="footer-order">
              <div className="total-cost-order">
                <div>
                  <h5>{t('totalCostOrder')}</h5>
                  <div className="payment-method">{userType === 2 ? 'Pre-Paid' : 'Post-Paid'}</div>
                </div>
                <h4>Rp {numberFormat(priceTotalWithPromo)}</h4>
              </div>
              <div className="confirmation-button">
                <button className="save-draft btn btn-outline-dark" onClick={handleDraft} >{t('saveToDraft')}</button>
                <button className="continue-payment btn btn-primary" onClick={handlePayment}>{t('continuePayment').toUpperCase()}</button>
              </div>
            </div>
          </>
        }
      </div>
      <div className="maps-side">
        {/* <div className="navbar-maps">
          <img src={Logo} alt="logo superkull" />
        </div> */}
        <Header />
        <div className="maps-view">
          {/* <Maps address={markerLoc}/> */}
          <div style={{positon: 'relative'}}>
            <div className="maps" style={{width: '100%', height: '100vh'}}>
              <GoogleMap 
                // center={center[center.length - 1]}
                center={location[0] === undefined ? center : location[0].latlng}
                zoom={15}
                mapContainerStyle={{width: '100%', height: '100%'}}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false
                }}
                onLoad={(map) => setMap(map)}
              >
                {location.map((data) => {
                  if(data === undefined) {
                    return null
                  } else {
                    if(data.point === '') {
                      return (
                        <Marker 
                          position={data.latlng}
                          draggable={true}
                          // onDragEnd={(e) => dragEnd(e, data.locationId)}
                          icon={GrayIcon}
                        >
                          {/* <InfoWindow position={data.latlng}>
                            <div>{data.point}</div>
                          </InfoWindow> */}
                        </Marker>
                      )
                    } else {
                      return (
                        <Marker 
                          position={data.latlng}
                          draggable={true}
                          // onDragEnd={(e) => dragEnd(e, data.locationId)}
                          icon={data.point === 'Pick' ? PickupIcon : DropIcon}
                        >
                          {/* <InfoWindow position={data.latlng}>
                            <div>{data.point}</div>
                          </InfoWindow> */}
                        </Marker>
                      )
                    }
                  }
                })}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

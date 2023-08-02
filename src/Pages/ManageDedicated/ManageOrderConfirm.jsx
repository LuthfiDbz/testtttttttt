import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import 'rc-slider/assets/index.css';
import axios from "axios";
import { format } from "date-fns";

import { BsArrowLeftShort } from "react-icons/bs";

// Asset
import Logo from "../../assets/img/logo.png";

import PickupIcon from '../../assets/icon/ic-location-blue.png'
import DropIcon from '../../assets/icon/ic-location-yellow.png'
import GrayIcon from '../../assets/icon/ic-location-gray.png'
import ConfirmIcon from '../../assets/img/img-state-confirmation.png'
import SuccessIcon from '../../assets/img/img-state-success.png'


// Style
import "../../styles/manageDedicated/manageDedicated.scss"
import OrderConfirmByDedicated from "../../Component/UI/manageDedicated/OrderConfirmDedicated";
import { errorPopup, networkErrorPopup } from "../../Component/UI/modal/PopUp/ErrorPopUp";
import { useTranslation } from "react-i18next";
import { Header } from "../../Component/header/Header";

export const ManageOrderConfirm = ({idx}) => {
  const { t } = useTranslation()
  const { orderid } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const opt = searchParams.get('opt')
  const locState = useLocation();
  const navigate = useNavigate()
  const [location, setLocation] = useState([])
  const [allDataOrder, setAllDataOrder] = useState([])
  const [priceTotal, setPriceTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingPromo, setLoadingPromo] = useState(false)
  
  
  // Auth
  const url = process.env.REACT_APP_URL_CUST
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
    try {
      const response = await axios.get(`${url}/api/tmp-order/${orderid}`, {headers})
      
      setAllDataOrder(response.data.data)
      setPriceTotal(response.data.data.priceTotal + response.data.data.additionalService.reduce((val, element) => {return val + element.price}, 0))
      setLoadingMapScreen(false)
      setLoadingPromo(false)
      setLoading(false)
    } catch(error) {
      console.log(error.message)
    }
  }


  const handlePayment = async () => {
    setLoadingPromo(true)
    if(locState.state === null) {
      errorPopup(t('error'), t('noDriverChoosen'), t('close'))
      setLoadingPromo(false)
      return
    }

    const data = {
      tmpOrderId: orderid,
      optimize: opt == 0 ? false : true,
      driverList: 
        locState.state.map(data => {
          return (
            {
              tmpTripId: data.tmpTripId,
              driverId: data.driverId
            }
          )
        })
    }

    
    try {
      const response = await axios.post(`${url}/api/order`, data, {headers})
      setLoadingPromo(false)
      Swal.fire({
        title: t('orderSuccess'),
        text: t('orderCreatedSuccess'),
        showCancelButton: true,
        showConfirmButton: true,
        imageUrl: SuccessIcon,
        cancelButtonText: t('createAnother'),
        confirmButtonText: t('backHome').toUpperCase(),
        confirmButtonColor: '#1F83BB',
        // reverseButtons: true,
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal',
          htmlContainer: 'text-swal',
          confirmButton:'confirm-swal',
          cancelButton: 'cancel-swal'
        }
      }).then(res => {
        if(res.isConfirmed) {
          navigate('/')
        }
        if(res.isDismissed) {
          navigate('/manage-dedicated')
        }
      })
    } catch(error) {
      setLoadingPromo(false)
      console.log(error.message)
      if(error.message === 'Network Error') {
        // setLoadingScreen(false)
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }

    
  }



  // Maps Config
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDfdR5Et5GQSGbLqWjFbXB7JNjLIA3Q9Vw',
    libraries
  }) 

  if(!isLoaded) {
    return (
      <h1>Please wait...</h1>
    )
  }

  

  

  const handleBack = () => {
    navigate(`/manage-dedicated/trip-planning/${orderid}`)
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
        </div>
      </div>
    )
  }

  return (
    <div className="order-by-dedicated">
      <div className="order-side">    
        {loadingPromo && <div className="loading-map-screen"></div>}
        <HeaderOrder />
        {loadingMapScreen ? <div className="loading-map-screen"></div> :
          <>
            <OrderConfirmByDedicated order={allDataOrder} load={loading}  driverData={locState.state} opt={opt}/>
            <div className="footer-order">
              <div className="confirmation-button">
                <button className="continue-payment btn btn-primary" onClick={handlePayment}>{t('orderConfirm').toUpperCase()}</button>
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
                          draggable={false}
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
                          draggable={false}
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

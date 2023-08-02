import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useJsApiLoader, GoogleMap, Marker, InfoWindow, Polyline, OverlayView } from '@react-google-maps/api'
import 'rc-slider/assets/index.css';
import axios from "axios";
import { format, set } from "date-fns";

import { BsArrowLeftShort } from "react-icons/bs";

// Asset
import Logo from "../assets/img/logo.png";

import PickupIcon from '../assets/icon/ic-location-blue.png'
import DropIcon from '../assets/icon/ic-location-yellow.png'
import GrayIcon from '../assets/icon/ic-location-gray.png'


// Style
import "../styles/deliveryService/deliveryService.scss";
import '../styles/deliveryService/createOrder/createOrder.scss'
import { AuthContext } from "../Component/authContext/AuthContext";
import TripPlanning from "../Component/UI/deliveryService/TripPlanning";
import { numberFormat } from "../Component/numberFormat/numberFormat";
import { useTranslation } from "react-i18next";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { Header } from "../Component/header/Header";

export const DeliveryTripPlanning = ({idx}) => {
  const { t } = useTranslation()
  const { orderid } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const prm = searchParams.get('prm')
  const navigate = useNavigate()
  const [allDataOrder, setAllDataOrder] = useState([])
  const [loading, setLoading] = useState(true)
  const [allPolyline, setAllPolyline] = useState([])
  const [directionPolyline, setDirectionPolyline] = useState([])
  const [isOptimize, setIsOptimize] = useState(0)
  const [allMarker, setAllMarker] = useState([])
  const [marker, setMarker] = useState([
    {
      lat: -6.734807200000001,
      lng: 106.8047719
    }
  ])
  const colorTrip = ['#EB5757', '#50B044', '#F4CD32', '#1F83BB', '#EB5757', '#50B044', '#F4CD32', '#1F83BB','#EB5757', '#50B044', '#F4CD32', '#1F83BB']
  const [colorIndex, setColorIndex] = useState(0)
  
  
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
    getOrderData()
  }, [])

  const polyMarker = (data, opt) => {

    let allMark = []
    let allPoly = []

    data.trip_planning.map((trip) => {
      let poly = []
      let dataTrips = []
      if(trip.optimize) {
        dataTrips = trip.trip_planning_dt.sort((a,b) => a.orderOpt - b.orderOpt)
      } else {
        dataTrips = trip.trip_planning_dt.sort((a,b) => a.order - b.order)
      }
      dataTrips.map(dt => {
        const locData = {
          job : dt.job,
          location : {
            lat: dt.location[1],
            lng: dt.location[0]
          }
        }
        const polyData = {
          lat: dt.location[1],
          lng: dt.location[0]
        }
        poly.push(polyData)
        allMark.push(locData)
      })
      allPoly.push(poly)
    })

    setAllPolyline(allPoly)
    setDirectionPolyline(allPoly)

    setAllMarker(allMark)
    setMarker(allMark)
  }

  const getOrderData = async () => {
    // if(allDataOrder.length === 0) {
      setLoadingMapScreen(true)
    // }
    try {
      const response = await axios.get(`${url}/api/tmp-order/${orderid}`, {headers})
      
      setAllDataOrder(response.data.data)
      polyMarker(response.data.data,false)
      
      setLoadingMapScreen(false)
      setLoading(false)
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }

  const handleOptimize = (e) => {
    if(e) {
      setIsOptimize(1)
    } else {
      setIsOptimize(0)
    }
  }

  const handleMarker = (data, indexTrip) => {
    if(data.length === 0) {
      setMarker(allMarker)
      setDirectionPolyline(allPolyline)
    } else {
      const targetMarker = data.map((e) => {
        return (
          {
            job : e.job,
            location : {
              lat: e.location[1],
              lng: e.location[0]
            }
          }
        )
      })
      const directPolyline = data.map((e) => {
        return (
          {
            lat: e.location[1],
            lng: e.location[0]
          }
        )
      })
      setMarker(targetMarker)
      setDirectionPolyline([directPolyline])
      setColorIndex(indexTrip)
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

  const onLoad = polyline => {
    // console.log('polyline: ', polyline)
  };


  const handleBackButton = async () => {
    setLoadingMapScreen(true)
    navigate(`/delivery?drftNum=${orderid}`)
  }


  // * COMPONENT
  const HeaderOrder = () => {
    return (
      <div className="header-order">
        <div className="title">
          <BsArrowLeftShort className="home-btn" onClick={handleBackButton} />
          <p className="title-text">{t('tripPlanning')}</p>
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
          <div className='order-confirm'>
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


  const handleOrder = () => {
    if(prm === null) {
      navigate(`/delivery/order-confirm/${orderid}?opt=${isOptimize}`)
    } else {
      navigate(`/delivery/order-confirm/${orderid}?opt=${isOptimize}&prm=${prm}`)
    }
  }

  return (
    <div className="start-delivery">
      <div className="order-side">    
        <HeaderOrder />
        {loadingMapScreen ? <div className="loading-map-screen"></div> :
          <>
            <TripPlanning order={allDataOrder} optimize={handleOptimize} marker={handleMarker} getData={getOrderData} polyMarker={polyMarker}/>
            <div className="footer-order">
              <div className="total-cost-trip">
                <h5 >{t('totalCostTrip')}</h5>
                {allDataOrder.service_name.name.toLowerCase() === 'superkul truck' ?
                  <h4>Rp. {numberFormat(allDataOrder.superkulPriceTotal)}</h4>
                  :
                  <h4>Rp. {allDataOrder.optimize ? numberFormat(allDataOrder.priceTotalOpt) : numberFormat(allDataOrder.priceTotal)}</h4>
                }
              </div>
              <button className="order-2 btn btn-primary" onClick={handleOrder}>{t('order').toUpperCase()}</button>
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
                center={allMarker[0]?.location}
                zoom={10}
                mapContainerStyle={{width: '100%', height: '100%'}}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false
                }}
                onLoad={(map) => setMap(map)}
              >
                {marker.map((data, index) => {
                    if(data === undefined) {
                      return null
                    } else {
                      return (
                        <Marker 
                          key={index}
                          position={data.location}
                          // draggable={true}
                          // onDragEnd={(e) => dragEnd(e, data.locationId)}
                          icon={data.job === 'pickup' ? PickupIcon : DropIcon}
                        >
                          {/* <InfoWindow >
                            <div>Test</div>
                          </InfoWindow> */}
                        </Marker>
                      )
                    }
                  }
                )}
                {directionPolyline.map((pol,index) => {
                  const route = pol.map((a) => {
                    return (
                      {
                        lat: a.lat,
                        lng: a.lng
                      }
                    )
                  })
                  return (
                    <>
                      <Polyline
                        onLoad={onLoad}
                        path={route}
                        options={{
                          strokeColor: directionPolyline.length === 1 ? colorTrip[colorIndex] : colorTrip[index],
                          strokeOpacity: 0.8,
                          strokeWeight: 5,
                          fillColor: directionPolyline.length === 1 ? colorTrip[colorIndex] : colorTrip[index],
                          fillOpacity: 0.35,
                          clickable: false,
                          draggable: false,
                          editable: false,
                          visible: true,
                          radius: 30000,
                          zIndex: 1
                        }}
                      />
                      {route.map((overlay,indexOvly) => {
                        return (
                          <OverlayView position={overlay} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                            <div
                              style={{
                                backgroundColor: "white",
                                padding: '0.1rem 0.3rem',
                                position: 'relative',
                                top: '-3.2rem',
                                left: '-0.55rem',
                                borderRadius: '50%',
                                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                                fontWeight: '700',
                                fontSize:'0.75rem'
                              }}
                            >
                              {indexOvly === 0 ? '1' : `${indexOvly + 1}`}
                              {/* {indexOvly === 0 ? 'Pickup' : `Drop ${indexOvly} Trip ${directionPolyline.length === 1 ? colorIndex + 1 : index + 1}`} */}
                            </div>
                          </OverlayView>
                        )
                      })}
                    </>
                  )
                })}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

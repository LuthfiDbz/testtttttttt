import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useJsApiLoader, GoogleMap, Marker, InfoWindow, Polyline, OverlayView } from '@react-google-maps/api'
import 'rc-slider/assets/index.css';
import axios from "axios";
import { format, isBefore, isSameDay, subHours } from "date-fns";

import { BsArrowLeftShort } from "react-icons/bs";

// Asset
import Logo from "../assets/img/logo.png";

import PickupIcon from '../assets/icon/ic-location-blue.png'
import DropIcon from '../assets/icon/ic-location-yellow.png'
import GrayIcon from '../assets/icon/ic-location-gray.png'
import DeleteIcon from '../assets/icon/ic-delete.png'
import ConfirmIcon from '../assets/img/img-state-confirmation.png'



// Style
// Style same with delivery and create order
import "../styles/draftDetail/draftDetail.scss"
import { AuthContext } from "../Component/authContext/AuthContext";
import TripPlanning from "../Component/UI/deliveryService/TripPlanning";
import { useTranslation } from "react-i18next";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { numberFormat } from "../Component/numberFormat/numberFormat";

export const DraftDetail = ({idx}) => {
  const { orderid } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [location, setLocation] = useState([])
  const [allDataOrder, setAllDataOrder] = useState([])
  const [loading, setLoading] = useState(true)
  const [detailOpen, setDetailOpen] = useState(false)
  const [toggleShow, setToggleShow] = useState(false)
  const [allPolyline, setAllPolyline] = useState([])
  const [directionPolyline, setDirectionPolyline] = useState([])
  const [isOptimize, setIsOptimize] = useState(0)
  const [allMarker, setAllMarker] = useState([])
  const [marker, setMarker] = useState([])
  const colorTrip = ['#EB5757', '#50B044', '#F4CD32', '#1F83BB']
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
    setLoadingMapScreen(true)
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

  const handleDeleteDraft = () => {
    Swal.fire({
      title: 'Delete Draft',
      text:'Are you sure want to delete this draft?',
      imageUrl: ConfirmIcon,
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      cancelButtonText: 'No',
      confirmButtonText: `Yes`,
      customClass: {
        popup: 'container-payment-swal',
        confirmButton: 'confirm-payment-swal',
        cancelButton: 'cancel-payment-swal',
        title: 'title-payment-swal',
        htmlContainer: 'text-payment-swal'
      }
    }).then(async (result) => {
      if(result.isConfirmed) {
        setLoadingMapScreen(true)
        try {
          const response = await axios.post(`${url}/api/tmp-order-del/${orderid}`,{}, {headers})
          
          setLoading(false)
          navigate('/')
        } catch(error) {
          console.log(error.message)
          setLoadingMapScreen(false)
          if(error.message === 'Network Error') {
            // setLoadingScreen(false)
            networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
          } else {
            errorPopup(t('error'),t('somethingError'), t('close'))
          }
        }
      }
    })
  }

  const handleMarker = (data,indexTrip) => {
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

  // Geocode
  const placeChanged = (e, targetId) => {
    /* eslint-disable */
    setLoadingMapScreen(true)
    setLocationError(false)
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({'address' : e}).then((response) => {
      const addressformat = response.results[0].formatted_address
      const addressname = e
      const lat = response.results[0].geometry.location.lat()
      const lng = response.results[0].geometry.location.lng()
      const changeAddress = location.map(loc => {
        if(loc.locationId === targetId) {
          loc.point === 'Pick' || loc.point === '' ? setPoint('Pick') : setPoint('Drop')
          const newLoc = {...loc, addressFormat: addressformat ,addressName:  addressname, addressLabel: addressname,lnglat: [lng,lat], latlng: {lat,lng}}
          
          return newLoc
        } else {
          return loc
        }
      })
      setPointLabel(addressname)
      setLocation(changeAddress)
      setLoadingMapScreen(false)
      setToggleShow(true)
      setDetailOpen(true)
    }).catch((error) => {
      // setLocationError(true)
      setLoadingMapScreen(false)
      Swal.fire({
        title: 'Location not found!',
        icon: 'error'
      })
    })
  }

  // Reverse Geocode
  const dragEnd = (e, targetId) => {
    /* eslint-disable */
    setLoadingMapScreen(true)
    setTargetLocationId(targetId)
    const geocoder = new google.maps.Geocoder()
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    const latlng = {
      lat,
      lng
    }
    geocoder.geocode({location: latlng})
      .then((response) => {
        const addressformat = response.results[0].formatted_address
        const addressname = response.results[0].name
        const changeAddress = location.map(loc => {
          if(loc.locationId === targetId) {
            const newLoc = {...loc, addressFormat: addressformat ,addressName:  addressformat, addressLabel: addressformat, lnglat: [lng,lat], latlng: {lat, lng}}
            
            return newLoc
          } else {
            return loc
          }
        })
        setLocation(changeAddress)
        setLoadingMapScreen(false)
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }

  const editDraft = () => {
    navigate(`/delivery?drftNum=${orderid}`)
  }

  const continuePayment = () => {
    // console.log(allDataOrder.datePick)
    // console.log(new Date('2023-03-16 12:00'))
    const sameDay = isSameDay(new Date(allDataOrder.datePick), new Date())
    const beforeDay = isBefore(new Date(allDataOrder.datePick), new Date())
    const minusHours = subHours(new Date(`${allDataOrder.datePick} ${allDataOrder.timePick}`), 2)
    const beforeHours = isBefore(new Date(), minusHours)
    console.log(beforeHours)
    console.log(new Date())
    console.log(minusHours)
    if(isSameDay(new Date(allDataOrder.datePick), new Date())) {
      if(isBefore(new Date(), minusHours)) {
        navigate(`/delivery/order-confirm/${orderid}?opt=${isOptimize}&drft=1`)
      } else {
        errorPopup(t('error'), t('pickuptimeNotAvail'), t('close'))
      }
    } else if(isBefore(new Date(allDataOrder.datePick), new Date())) {
      errorPopup(t('error'), t('pickupdateNotAvail'), t('close'))
    } else {
      // Date not expired
      navigate(`/delivery/order-confirm/${orderid}?opt=${isOptimize}&drft=1`)
    }
  }

  const handleOptimize = (e) => {
    if(e) {
      setIsOptimize(1)
    } else {
      setIsOptimize(0)
    }
  }

  // * COMPONENT
  const HeaderOrder = () => {
    return (
      <div className="header-order">
        <div className="title">
          <BsArrowLeftShort className="home-btn" onClick={() => navigate('/')} />
          <p className="title-text">{t('customerOrder')}</p>
          <img src={DeleteIcon} alt="" onClick={handleDeleteDraft}/>
        </div>
      </div>
    )
  }

  return (
    <div className="draft-detail">
      <div className="order-side">    
        <HeaderOrder />
        {loadingMapScreen ? <div className="loading-map-screen"></div> :
          <>
            <TripPlanning order={allDataOrder} optimize={handleOptimize} marker={handleMarker} getData={getOrderData} polyMarker={polyMarker}/>
            <div className="footer-order">
              <div className="total-cost-trip">
                <h5>{t('totalCostTrip')}</h5>
                {allDataOrder.service_name.name.toLowerCase() === 'superkul truck' ?
                  <h4>Rp. {numberFormat(allDataOrder.superkulPriceTotal)}</h4>
                  :
                  <h4>Rp. {allDataOrder.optimize ? numberFormat(allDataOrder.priceTotalOpt) : numberFormat(allDataOrder.priceTotal)}</h4>
                }
              </div>
              <div className="confirmation-button">
                <button className="save-draft btn btn-outline-dark" onClick={editDraft}>{t('edit').toUpperCase()}</button>
                <button className="continue-payment btn btn-primary" onClick={continuePayment}>{t('continuePayment').toUpperCase()}</button>
              </div>
              {/* <div className="total-cost-trip">
                <h5>Total Cost Trip</h5>
                <h4>Rp. {allDataOrder.priceTotal}</h4>
              </div>
              <button className="order-2 btn btn-primary" onClick={() => navigate(`/delivery/order-confirm/${orderid}?opt=${isOptimize}`)}>ORDER</button> */}
            </div>
          </>
        }
      </div>
      <div className="maps-side">
        <div className="maps-view">
          {/* <Maps address={markerLoc}/> */}
          <div style={{positon: 'relative'}}>
            <div className="maps" style={{width: '100%', height: '100vh'}}>
              <GoogleMap 
                // center={center[center.length - 1]}
                center={marker[0]?.location}
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
                {marker.map((data) => {
                    if(data === undefined) {
                      return null
                    } else {
                      return (
                        <Marker 
                          position={data.location}
                          // draggable={true}
                          // onDragEnd={(e) => dragEnd(e, data.locationId)}
                          icon={data.job === 'pickup' ? PickupIcon : DropIcon}
                        >
                          {/* <InfoWindow position={data.latlng}>
                            <div>{data.point}</div>
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
                        // onLoad={onLoad}
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

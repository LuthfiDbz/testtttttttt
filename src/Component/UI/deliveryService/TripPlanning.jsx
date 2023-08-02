import React from "react";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core"
import { 
  arrayMove, 
  SortableContext, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable"
import { SortableItem } from "../../sortableItem/SortableItem";
import { ToggleSwitch } from "../ToggleSwitch";
import { BsArrowRightShort } from "react-icons/bs";
import TimeIcon from "../../../assets/icon/ic-view-time.png"
import WeightIcon from "../../../assets/icon/ic-weight.png"
import ConfirmIcon from '../../../assets/img/img-state-confirmation.png'
import SuccessIcon from '../../../assets/icon/ic-invoice-paid@2x.png'
import LocationTooFarIcon from '../../../assets/img/location-toofar.png'
import ToggleIcon from '../../../assets/icon/ic-chevron-right.png'
import InfoIcon from '../../../assets/icon/ic-info-blue.png'
import InfoIconWhite from '../../../assets/icon/ic-info-white.png'
import '../../../styles/deliveryService/tripPlanning/tripPlanning.scss'
import axios from "axios";
import { useEffect } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { ToggleSwitchAll } from "../ToggleSwitchAll";
import { numberFormat } from "../../numberFormat/numberFormat";
import { useTranslation } from "react-i18next";
import { errorPopup, networkErrorPopup } from "../modal/PopUp/ErrorPopUp";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { OptimizeInfo } from "../modal/Delivery/OptimizeInfo";
import { useParams } from "react-router-dom";
import { Tooltip } from "reactstrap";
import ReactGA from "react-ga4";


const TripPlanning = ({service, order, optimize, marker, getData, polyMarker}) => {
  const { t } = useTranslation()
  const { orderid } = useParams()
  const [allDataOrder, setAllDataOrder] = useState(order)
  const [optimizeAll, setOptimizeAll] = useState(order.optimize)
  const [optimizeTrip, setOptimizeTrip] = useState(false)
  const [tempTripId, setTempTripId] = useState('')
  const [targetTripIndex, setTargetTripIndex] = useState(0)
  const [targetTrip, setTargetTrip] = useState(order.trip_planning[0])
  const [targetRoute, setTargetRoute] = useState('')
  const [detailOpen, setDetailOpen] = useState(false)
  const [toggleShow, setToggleShow] = useState(false)
  const [popoverIndex, setPopoverIndex] = useState('')
  const [OpenOptimizeInfo, setOpenOptimizeInfo] = useState(false);
  const toggleOptimizeInfo = () => {
    setOpenOptimizeInfo(!OpenOptimizeInfo)
  }

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  
  const [orderRoute, setOrderRoute] = useState([0,1,2,3])
  const [loadingScreen, setLoadingScreen] = useState(false)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  const handleToggle = async (e, targetTrip) => {
    setPopoverIndex('')
    try {
      const response = await axios.get(`${url}/api/optimize-trip/v2/${targetTrip}/${e}`, {headers})
      // setOptimizeTrip(e)
      getData()
    } catch (error) {
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }

  const handleToggleAll = async (e) => {
    setPopoverIndex('')

    try {
      const response = await axios.get(`${url}/api/optimize-order/${orderid}/${e}`, {headers})
      getData()
    } catch (error) {
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }

  const showDetail = (trip, index, tripId) => {
    setPopoverIndex('')
    setLoadingScreen(true)
    setDetailOpen(false) 
    setTempTripId(tripId)

    setTargetTrip(trip)
    setTargetTripIndex(index + 1)


    

    if(trip.optimize) {
      setTargetRoute(trip.trip_planning_dt.sort((a,b) => a.orderOpt - b.orderOpt))
      // setOptimizeAll(true)
    } else {
      setTargetRoute(trip.trip_planning_dt.sort((a,b) => a.order - b.order))
      // setOptimizeAll(false)
    }



    const initialRoute = trip.trip_planning_dt.map(e => {
      return e.order
    })

    setOrderRoute(initialRoute)

    setTimeout(() => {
      marker(trip.trip_planning_dt, index)
      setToggleShow(true)
      setLoadingScreen(false)
      setDetailOpen(true)
    }, 1000);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if(active.id === over.id) {
      // if(popoverIndex == active.id.defaultOrder && popoverIndex !== '') {
      //   setPopoverIndex('')
      // } else {
      //   setPopoverIndex(active.id.defaultOrder)
      // }
      return
    }
    if(optimizeAll || targetTrip.optimize) {
      errorPopup(t('error'),t('switchOffToggle'), t('close'))
      return
    }
    if(active.id.job === 'pickup' || over.id.job === 'pickup') {
      errorPopup(t('error'),t('pickupCantMove'), t('close'))
      return
    }
    if(active.id.pickNumber !== over.id.pickNumber) {
      errorPopup(t('error'),t('pickupCantMove'), t('close'))
      return
    }
    if(active.id !== over.id) {
      setTargetRoute((items) => {
        const activeIndex = items.indexOf(active.id)
        const overIndex = items.indexOf(over.id)
        return arrayMove(items, activeIndex, overIndex)
      })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    marker([])
    setPopoverIndex('')
    setToggleShow(false)
    setDetailOpen(false)
  }

  const handleReRoute = async (e) => {
    e.preventDefault()
    setPopoverIndex('')
    if(optimizeAll || targetTrip.optimize) {
      errorPopup(t('error'),t('switchOffToggle'), t('close'))
      return
    }

    

    
    const newRoute = targetRoute.map(e => {
      return e.order
    })


    if(JSON.stringify(orderRoute) === JSON.stringify(newRoute)) {
      marker([])
      setToggleShow(false)
      setDetailOpen(false)
      return
    }

    const newRouteFromDefault = targetRoute.map(e => {
      return e.defaultOrder
    })


    const data = {
        "tmpTripId" : tempTripId,
        "ordering" : newRouteFromDefault
    }

    if(optimizeTrip) { 
    } else {
      setLoadingScreen(true)
      try {
        const response = await axios.post(`${url}/api/re-routing`, data, {headers})
        
        setLoadingScreen(false)
        if(response.data.status === 'failed') {
          ReactGA.event({
            category: "order_category",
            action: "rerouting_failed",
            // label: "start_delivery_label", 
            // value: 99
          });
          response.data.data ? 
            errorPopup(t('checkAddress'),`<strong>${response.data.data}</strong> ${response.data.message}`, t('gotit'), LocationTooFarIcon)
            :
            errorPopup(t('checkAddress'),response.data.message, t('gotit'), LocationTooFarIcon)
          return
        }

        Swal.fire({
          title: t('reRouteSuccess'),
          timer: 2000,
          imageUrl: SuccessIcon,
          showConfirmButton: false,
          customClass: {
            popup: 'popup-swal',
            title: 'title-swal'
          }
        })
        ReactGA.event({
          category: "order_category",
          action: "rerouting_success",
          // label: "start_delivery_label", 
          // value: 99
        });
        marker([])
        setToggleShow(false)
        setDetailOpen(false)
        getData()
      } catch(error) {
        ReactGA.event({
          category: "order_category",
          action: "rerouting_error",
          // label: "start_delivery_label", 
          // value: 99
        });
        console.log(error.message)
      }

    }

  }

  

  return (
    <form className="trip-planning" >
      <div className="order-side">
        <OptimizeInfo isOpen={OpenOptimizeInfo} toggle={toggleOptimizeInfo}/> 
        <div className="service-info">
          <h1 className="title">{t('serviceInfo')}</h1>
          <div className="service-type">
            <h3>{t('serviceType')}</h3>
            <h3>{allDataOrder.service_name.name}</h3>
          </div>
          <div className="vehicle-type">
            <h3>{t('vehicleType')}</h3>
            <h3>{allDataOrder.vehicle_type.name}</h3>
          </div>
          <div className="date-pickup">
            <h3>{t('datePickup')}</h3>
            <h3>{format(Date.parse(allDataOrder.datePick), 'dd MMMM yyyy')}</h3>
          </div>
          <div className="time-pickup">
            <h3>{t('timePickup')}</h3>
            <h3>{allDataOrder.timePick}</h3>
          </div>
        </div>
        <hr />
        <div className="list-trip">
          <div className="title-trip">
            <h1 >List Trip</h1>
            {allDataOrder.totalDestination == 1 || allDataOrder.service_name.name.toLowerCase() === 'instant delivery' ?
              null :
              <div className="toggle-optimize">
                <h1>
                  Optimize All
                  <AiOutlineInfoCircle className="optimize-info" onClick={toggleOptimizeInfo}/>
                </h1>
                <ToggleSwitchAll bg='#d8d8d8' opt={handleToggleAll} currentOpt={allDataOrder.optimize}/>
              </div>
            }
          </div>
          
          {allDataOrder.trip_planning.map((trip,index) => {
            return (
              <div className="list-data">
                <div className="list-left">
                  {allDataOrder.service_name.name.toLowerCase() === 'superkul truck' ?
                    <>
                      <h3 className="trip">Trip {index + 1} | <span>{trip.pick.itemTmp}&deg; C</span></h3>
                    </>
                    :
                    <>
                      <h3 className="trip">Trip {index + 1} | <span>{trip.drop[0].itemTmp}&deg; C</span></h3>
                    </>
                  }
                  <div className="location">
                    <h4>Pick</h4>
                    <h3>{trip.pick[0]?.pickLabel || trip.pick.pickLabel}</h3>
                  </div>
                </div>
                <div className="list-right">
                  {allDataOrder.totalDestination == 1 || allDataOrder.service_name.name.toLowerCase() === 'instant delivery'?
                    null :
                    <h6>Optimize<ToggleSwitch bg='white' opt={handleToggle} currentOpt={trip.optimize} targetTrip={trip._id}/></h6>
                  }
                  
                  {allDataOrder.service_name.name.toLowerCase() === 'superkul truck' ?
                    <h4 className="price">Rp. { numberFormat(allDataOrder.superkulPriceTotal)}</h4>
                    :
                    <h4 className="price">Rp. {trip.optimize ?  numberFormat(trip.priceOpt) : numberFormat(trip.price)}</h4>
                  } 
                  <BsArrowRightShort className="list-detail" onClick={() => showDetail(trip,index, trip._id)}/>
                </div>
              </div>
            )
          })}
        </div>
        {allDataOrder.additionalService.length !== 0 && allDataOrder.additionalService.find((a) => a.is_mandatory !== 1) !== undefined?
          <>
            <hr />
            <div className="additional-service">
              <h1>{t('additionalService')}</h1>
                {allDataOrder.additionalService.map((add) => {
                    
                    if(add.price !== null)
                    return (
                      add.is_mandatory == 1 ? null : 
                      <div className="list-service">
                        <h3>{add.name} x {allDataOrder.totalDestination} Drop</h3>
                        <h3 className="price-service">Rp {numberFormat(add.price * allDataOrder.totalDestination)}</h3>
                      </div>
                    )
                  })
                }
            </div>
          </>
          : null
        }
        {allDataOrder.totalPublicHolidayPrice != 0 ? 
          <>
            <hr />
            <div className="public-holiday">
              <img src={InfoIconWhite} alt="" />
              <h4>{t('publicHolidayText')}</h4>  
            </div>
          </>
        : null}
      </div>
      {loadingScreen && <div className="loading-map-screen"></div>}
      {toggleShow && 
        <img src={ToggleIcon} alt="" className={`toggle-icon ${detailOpen ? '' : 'close'}`} onClick={() => {setDetailOpen(!detailOpen); setPopoverIndex('')}}/>
      }
      <div className={`detail-trip-planning ${detailOpen ? 'show-detail' : ''}`}>    
        <div className="detail-header">
          <div className="trip-price">
            {allDataOrder.service_name.name.toLowerCase() === 'superkul truck' ?
              <>
                <div className="trip">Trip {targetTripIndex} | <span>{targetTrip.pick.itemTmp}&deg; C</span></div>
              </>
              :
              <>
                <div className="trip">Trip {targetTripIndex} | <span>{targetTrip.drop[0].itemTmp}&deg; C</span></div>
              </>
            }
            {allDataOrder.service_name.name.toLowerCase() === 'superkul truck' ?
              <div className="price">Rp {numberFormat(allDataOrder.superkulPriceTotal)}</div>
              :
              <div className="price">Rp {targetTrip.optimize? numberFormat(targetTrip.priceOpt) : numberFormat(targetTrip.price)}
              </div>
            }
          </div>
          {/* {allDataOrder.service_name.name.toLowerCase() === 'instant delivery' || allDataOrder.service_name.name.toLowerCase() === 'superkul truck'?
            null : 
            <div className="optimize">
              <h1>Optimize Route</h1>
              <ToggleSwitch bg='white' opt={handleToggle} currentOpt={targetTrip.optimize}/>
            </div>
          } */}
          <div className="estimation-weights">
            {targetTrip.optimize? 
              <div className="estimation"><img src={TimeIcon} alt="" />
                {t('estimation')}: {Math.floor(targetTrip.durationOpt / 3600)} {t('hour')} {Math.floor(targetTrip.durationOpt % 3600 / 60)} {t('minute')} {`(${targetTrip.distanceOpt} km)`}
              </div>
              :
              <div className="estimation"><img src={TimeIcon} alt="" /> 
                {t('estimation')}: {Math.floor(targetTrip.duration / 3600)} {t('hour')} {Math.floor(targetTrip.duration % 3600 / 60)} {t('minute')} {`(${targetTrip.distance} km)`}
              </div>
            }
            {allDataOrder.service_name.name.toLowerCase() !== 'superkul truck' && 
              <div className="weights">
                <img src={WeightIcon} alt="" /> {targetTrip.drop.reduce((val, element) => {return val + element.weight}, 0)} Kg
              </div>
            }
          </div>
        </div>
        {targetRoute !== '' && 
          <div className={`detail-data ${
            allDataOrder.service_name.name.toLowerCase() === 'instant delivery' || allDataOrder.service_name.name.toLowerCase() === 'superkul truck' ?
            '' : 'opt'
          }`}>
            <div className="detail-point">
              {targetRoute.map((trip,index) => {
                return (
                  <div className={`detail-index ${trip.job === 'pickup' ? 'pick' : ''}`} key={index}>
                    <h1>{index +1}</h1>
                  </div>
                )
              })}
            </div>
            <div className="detail-datas">
              <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="detail-data-trip">
                <SortableContext
                  items={targetRoute}
                  strategy={verticalListSortingStrategy}
                >
                  {targetRoute.map((trip,i) => {
                      return (
                        <SortableItem key={i} service={allDataOrder.service_name.name} tripsData={trip} popoverIndex={popoverIndex} />
                      )
                  })}
                </SortableContext>
              </div>
              </DndContext>
            </div>
          </div>   
        }
        <div className="detail-footer">
          <button className="back btn" onClick={handleCancel}>{t('back').toUpperCase()}</button>
          <button className="save btn" disabled={targetTrip.optimize? 'disabled' : ''} onClick={handleReRoute}>{t('save').toUpperCase()}</button>
        </div>
      </div>
    </form>
  )
}

export default TripPlanning
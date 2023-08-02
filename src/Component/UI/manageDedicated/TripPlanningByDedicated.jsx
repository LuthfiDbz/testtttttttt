import React from "react";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core"
import { 
  arrayMove, 
  SortableContext, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable"
import { SortableItemManage } from "../../sortableItem/SortableItemManage";
import { ToggleSwitch } from "../ToggleSwitch";
import { BsArrowRightShort, BsCircle } from "react-icons/bs";
import TimeIcon from "../../../assets/icon/ic-view-time.png"
import WeightIcon from "../../../assets/icon/ic-weight.png"
import ConfirmIcon from '../../../assets/img/img-state-confirmation.png'
import SuccessIcon from '../../../assets/icon/ic-invoice-paid@2x.png'
import CheckIcon from '../../../assets/icon/ic-invoice-paid.png'
import ArrowDetailIcon from '../../../assets/icon/ic-arrow-right.png'
import DriverSelectIcon from '../../../assets/icon/ic-driver-select.png'
import ToggleIcon from '../../../assets/icon/ic-chevron-right.png'

import '../../../styles/manageDedicated/tripPlanningManage/tripPlanningManage.scss'
import axios from "axios";
import { useEffect } from "react";
import { format } from "date-fns";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ToggleSwitchAll } from "../ToggleSwitchAll";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { errorPopup, networkErrorPopup } from "../modal/PopUp/ErrorPopUp";
import { EmptyData } from "../../emptyData/EmptyData";
import { OptimizeInfo } from "../modal/Delivery/OptimizeInfo";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";


const TripPlanningByDedicated = ({service, order, setLoadingMapScreen, load, optimize, driverTrip, marker , getData}) => {
  const { t } = useTranslation()
  const { orderid } = useParams()
  const [allDataOrder, setAllDataOrder] = useState(order)
  const [tempTripId, setTempTripId] = useState('')
  const [targetTripIndex, setTargetTripIndex] = useState(0)
  const [targetTrip, setTargetTrip] = useState(order.trip_planning[0])
  const [targetRoute, setTargetRoute] = useState('')
  const [optimizeAll, setOptimizeAll] = useState(false)
  const [optimizeTrip, setOptimizeTrip] = useState(false)
  const [OpenOptimizeInfo, setOpenOptimizeInfo] = useState(false);
  const toggleOptimizeInfo = () => {
    setOpenOptimizeInfo(!OpenOptimizeInfo)
  }


  const [listDriver, setListDriver] = useState([
    // {
    //   driverId: '81350b35-f91b-4e2f-8f38-66d38b067563',
    //   driverName: `Anang Saya Res`,
    //   driverImage: 'zrYFIAGEdiPEZOwfUludPZ0Z9ecRC2NuwaMtflMu.jpg',
    //   vehicleName: 'YAMAHA NMAX',
    //   driverPhone: '082742213214',
    //   license: 'B 2729 YO'
    // },
    // {
    //   driverId: '123',
    //   driverName: `Epi`,
    //   driverImage: 'zrYFIAGEdiPEZOwfUludPZ0Z9ecRC2NuwaMtflMu.jpg',
    //   vehicleName: 'YAMAHA NMAX',
    //   driverPhone: '082742213214',
    //   license: 'B 2729 YO'
    // }
  ])
  const [tripListWithDriver, setTripListWithDriver] = useState(
    order.trip_planning.map(trp => {
      const a = {
        driverId: '',
        driverName: `${t('selectDriver')}`,
        tripId: trp._id,
        driverImage: '',
        vehicleName: '',
        driverPhone: '',
        license: ''
      }
      return a
    })
  )
  const [targetTripIdDriver, setTargetTripIdDriver] = useState('')
  const [targetDriverId, setTargetDriverId] = useState(' ')
  const [choosenDriver, setChoosenDriver] = useState('')



  const [detailOpen, setDetailOpen] = useState(false)
  const [toggleShow, setToggleShow] = useState(false)
  const [openSelectDriver, setOpenSelectDriver] = useState(false)
  const [orderRoute, setOrderRoute] = useState([0,1,2,3])
  const [loadingScreen, setLoadingScreen] = useState(false)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    getDriverList()
  }, [])

  useEffect(() => {
    const trip = []
    order.trip_planning.map(trp => {
      const a = {
        driverId: '',
        driverName: t('selectDriver'),
        tripId: trp._id,
        driverImage: '',
        vehicleName: '',
        driverPhone: '',
        license: ''
      }
      trip.push(a)
    })
    setTripListWithDriver(trip)
  }, [order])

  const getDriverList = async () => {
    setLoadingScreen(true)
    try {
      const response = await axios.get(`${url}/api/driver-dedicated/${allDataOrder.customerId}`, {headers})
      
      const data = response.data.data
      
      setListDriver(data)
      setLoadingScreen(false)
    } catch(error) {
      setLoadingScreen(false)
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),error.message, t('close'))
      }
      
    }
  }

  const handleToggle = async (e, targetTrip) => {
    try {
      const response = await axios.get(`${url}/api/optimize-trip/v2/${targetTrip}/${e}`, {headers})
      getData()
    } catch (error) {
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
    // if(e) {
    //   setTargetRoute(targetTrip.trip_planning_dt.sort((a,b) => a.orderOpt - b.orderOpt))
    //   setOptimizeTrip(true)
    // } else {
    //   setTargetRoute(targetTrip.trip_planning_dt.sort((a,b) => a.order - b.order))
    //   setOptimizeTrip(false)
    // }
  }

  const handleToggleAll = async (e) => {
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
    // if(e) {
    //   setOptimizeAll(true)
    //   optimize(true)
    // } else {
    //   setOptimizeAll(false)
    //   optimize(false)
    // }
    // setToggleShow(false)
    // setDetailOpen(false)
  }

  const showDetail = (trip, index, tripId) => {
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
    if(optimizeAll || optimizeTrip) {
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
    setToggleShow(false)
    setDetailOpen(false)
  }

  const handleReRoute = async (e) => {
    e.preventDefault()
    if(optimizeAll || optimizeTrip) {
      errorPopup(t('error'), t('switchOffToggle'), t('close'))
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
    setLoadingScreen(true)
    try {
      const response = await axios.post(`${url}/api/re-routing`, data, {headers})
      
      setLoadingScreen(false)
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
      marker([])
      setToggleShow(false)
      setDetailOpen(false)
      getData()
    } catch(error) {
      console.log(error.message)
    }
  }

  
  const toggleSelectDriver = (tripId, index) => {
    setTargetDriverId(tripListWithDriver[index].driverId)
    if(tripId === targetTripIdDriver) {
      setTargetTripIdDriver('')
    } else {
      setTargetTripIdDriver(tripId)
    }
    // setOpenSelectDriver(!openSelectDriver)
  }

  const handleSelectDriver = (targetDriver, targetTrip) => {
    setTargetDriverId(targetDriver)
    // console.log(targetDriver);
    const updateChoosenDriver = tripListWithDriver.map(list => {
      if(list.tripId === targetTrip) {
        const newData = {
          ...list,
          driverId: targetDriver.driverId,
          driverName: targetDriver.driverName,
          vehicleName: targetDriver.vehicleName,
          license: targetDriver.license,
          driverImage: targetDriver.driverImage,
          driverPhone: targetDriver.driverPhone
        }
        return newData
      } else {
        return list
      }
    })
    setTripListWithDriver(updateChoosenDriver)
    setTargetTripIdDriver('')
    driverTrip(updateChoosenDriver)
  }

  return (
    <form className="trip-planning-manage" >

      <div className="order-side">
        <OptimizeInfo isOpen={OpenOptimizeInfo} toggle={toggleOptimizeInfo}/>
        <div className="service-info">
          <h1 className="title" >{t('serviceInfo')}</h1>
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
            <h1>List Trip</h1>
            {allDataOrder.totalDestination == 1 ? 
              null :
              <div className="toggle-optimize">
                <h1>
                  Optimize All
                  <AiOutlineInfoCircle className="optimize-info" onClick={toggleOptimizeInfo}/>
                </h1>
                <ToggleSwitchAll bg='#E6E6E6' opt={handleToggleAll} currentOpt={allDataOrder.optimize}/>
              </div>
            }
          </div>
          
          {allDataOrder.trip_planning.map((trip,index) => {
            return (
              <div className="list-data">
                
                <div className="driver">
                  <div className="driver-select" onClick={() => toggleSelectDriver(trip._id,index)}>
                    <img src={DriverSelectIcon} alt="" />
                    <div className="driver-name-display">{tripListWithDriver[index].driverName} 
                    </div>{tripListWithDriver[index].license !== '' ? '|' + tripListWithDriver[index].license : ''}
                  </div>
                  {targetTripIdDriver === trip._id && 
                    <div className="driver-list">
                      {/* <h1 className="title">{t('selectDriver')}</h1> */}
                      {listDriver.length === 0 ? <EmptyData /> :
                        listDriver.map(driver => {
                          const checkDriver = tripListWithDriver.filter(list => {
                            return list.driverId === driver.driverId
                          })
                          if(checkDriver.length > 0 && targetDriverId !== driver.driverId) {
                            return null
                          } else {
                            return ( 
                              <div className="driver-list-content">
                              <label htmlFor={`driver-${driver.driverId}`}>
                                <img src={`${process.env.REACT_APP_IMG_URL}/driver/${driver.driverImage}`} alt="" className="driver-img"/>
                                <div className="driver-data">
                                  <h3 className="driver-name">{driver.driverName}</h3>
                                  <h4 className="driver-bike-number">Bike | {driver.vehicleName} | {driver.license}</h4>
                                </div>
                              </label>
                              <input 
                                type="radio" 
                                name="driver-choice" 
                                id={`driver-${driver.driverId}`} 
                                onChange={() => handleSelectDriver(driver, trip._id)}
                                hidden
                              />
                            </div>   
                            )
                          }
                        })
                      }
                    </div>
                  }
                  {allDataOrder.totalDestination == 1 ?
                    null : 
                    <h6>Optimize<ToggleSwitch bg='#E6E6E6' opt={handleToggle} currentOpt={trip.optimize} targetTrip={trip._id}/></h6>
                  }
                </div>
                <div className="list-bottom">
                <div className="list-left">
                  <h3 className="trip">Trip {index + 1} | <span>{trip.drop[0].itemTmp}&deg; C</span></h3>
                  <div className="location">
                    <h4>Pick</h4>
                    <h3>{trip.pick[0]?.pickLabel}</h3>
                  </div>
                </div>
                <div className="list-right">
                  <BsArrowRightShort className="list-detail" onClick={() => showDetail(trip,index, trip._id)}/>
                </div>
                </div>
              </div>
            )
          })}


        </div>
      </div>
      {loadingScreen && <div className="loading-map-screen"></div>}
      {toggleShow && 
        <img src={ToggleIcon} alt="" className={`toggle-icon ${detailOpen ? '' : 'close'}`} onClick={() => setDetailOpen(!detailOpen)}/>
      }
      <div className={`detail-trip-planning-dedi ${detailOpen ? 'show-detail' : ''}`}>    
        <div className="detail-header">
          <div className="trip-price">
            <div className="trip">Trip {targetTripIndex} | <span>{targetTrip.drop[0].itemTmp}&deg; C</span></div>
          </div>
          {/* <div className="optimize">
            <h1>Optimize Route</h1>
            <ToggleSwitch bg='#E6E6E6' opt={handleToggle} currentOpt={targetTrip.optimize}/>
          </div> */}
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
            <div className="weights">
              <img src={WeightIcon} alt="" /> {targetTrip.drop.reduce((val, element) => {return val + element.weight}, 0)} Kg
            </div>
          </div>
        </div>
        {targetRoute !== '' && 
          <div className="detail-data">
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
                      <SortableItemManage key={i} tripsData={trip}/>
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
          <button className="save btn" onClick={handleReRoute}>{t('save').toUpperCase()}</button>
        </div>
      </div>
    </form>
  )
}

export default TripPlanningByDedicated
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/transactionDetail/transactionViewTrip/transactionViewTrip.scss";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import BgBanner from '../assets/img/bg-banner-4.png'
import { Header } from "../Component/header/Header";
import { Footer } from "../Component/footer/Footer";
import {  Badge } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../Component/authContext/AuthContext";
import { format } from "date-fns";
import { TransactionDetailPoint } from "../Component/UI/modal/TransactionDetailPoint";
import DetailTripMaps from "../Component/maps/DetailTripMaps";
import { useTranslation } from "react-i18next";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { numberFormat } from "../Component/numberFormat/numberFormat";
import { RealtimeDriver } from "../Component/UI/modal/RealtimeDriver";

export const TransactionViewTrip = () => {
  const { t } = useTranslation()
  let { orderid, tripnumber } = useParams();
  const auth_context = useContext(AuthContext)
 

  const [transactionDetailData, setTransactionDetailData] = useState([])
  const [viewTripData, setViewTripData] = useState([])
  const [detailPointData, setDetailPointData] = useState([])
  const [weightTotal, setweightTotal] = useState(0)
  const [placeholder, setPlaceholder] = useState(true)
  const [openTripPoint, setOpenTripPoint] = useState(false);
  const toggleTripPoint = () => {
    setOpenTripPoint(!openTripPoint)
  }
  const [driverLocation, setDriverLocation] = useState(false);
  const toggleDriverLocation = () => {
    setDriverLocation(!driverLocation)
  }

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    getViewTripData()
  }, [])

  const getViewTripData = async () => {
    const customerId = auth_context.id
    setPlaceholder(true)
    try {
      const response = await axios.get(`${url}/api/order/${orderid}`, {headers})
      const data = response.data.data
      const tripData = data.trip_planning.filter((trip) => {
        return trip.tripNumber == tripnumber
      })
      setTransactionDetailData(data)
      setViewTripData(tripData[0])
      let weightTotal = 0
      tripData[0].drop.map((e) => {
        weightTotal += e.weight
      })
      setweightTotal(weightTotal)

      // Driver Data
      setPlaceholder(true)
      // try {
      //   const response = await axios.get(`${url}/api/driver/${tripData[0].driverId}`, {headers})
      //   const data = response.data
        setPlaceholder(false)
      //   setDriverData(data)
      // } catch(error) {
      //   console.log(error.message)
      // }
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }

  const handleTripPoint = (data) => {
    setDetailPointData([data, viewTripData, transactionDetailData])
    toggleTripPoint()
  }

  
  useEffect(() => {
    window.scrollTo(0,0,'auto')
  }, [])

  if(placeholder) return null

  return (
    <>
      {/* <Header /> */}
      <div className="transaction-view-trip">
        <RealtimeDriver isOpen={driverLocation} toggle={toggleDriverLocation} driverId={viewTripData.driverId} tripData={viewTripData.trip_planning_dt}/> 
        <div className="container-title" style={{backgroundImage: `url(${BgBanner})`}}>
          <div className="content-title">
            <h3>{t('detailTrip')}</h3>
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
                  &nbsp; {transactionDetailData.orderStatus} /
                </div>
              </li>
              <li>
                <div className="link-to" to="#">
                  &nbsp; {t('transactionDetails')} /
                </div>
              </li>
              <li>
                <div className="link-to" to="#">
                  &nbsp; {t('viewTrip')}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="detail-invoice">
          <div className="left-detail">
            <div className="header-detail">
              <div className="detail">
                <h1 className="title">{t('detailTrip')} #{viewTripData.tripNumber}</h1>
                {transactionDetailData.paymentMethod.toLowerCase() !== 'postpaid' && 
                  transactionDetailData.paymentStatus.toLowerCase() === 'unpaid' || transactionDetailData.paymentStatus.toLowerCase() === 'waiting for payment' ?
                    <Badge className="status-badge schedule">{transactionDetailData.paymentStatus}</Badge>
                    : null
                }
                <div className="estimation-actual">
                  <div className="estimation">{t('estimation')} <br /> {Math.floor(viewTripData.duration / 3600)} {t('hour')} {Math.floor(viewTripData.duration % 3600 / 60)} {t('minute')} {`(${viewTripData.distance} km)`}</div>
                  {/* <div className="actual">{t('actual')} <br /> {Math.floor(viewTripData.duration / 3600)} {t('hour')} {Math.floor(viewTripData.duration % 3600 / 60)} {t('minute')} {`(${viewTripData.distance} km)`}</div> */}
                </div>
              </div>
            </div>
            <div className="maps">
              <DetailTripMaps tripData={viewTripData.trip_planning_dt}/>
            </div>
            {transactionDetailData.serviceName.toLowerCase() !== 'superkul truck' &&
              <div className="d-flex flex-column">
                {transactionDetailData.orderStatus.toLowerCase() === 'done' ?
                  null :
                  <button className="btn btn-view-driver " onClick={() => toggleDriverLocation()}>{t('viewDriverLocation')}</button>
                }
                <div className="driver">
                  <div>
                    <h2 className="title">{t('driver')}</h2>
                    <div className="driver-data">
                      <img src={`${process.env.REACT_APP_IMG_URL}/driver/${viewTripData.driverPhoto}`} alt="" className="driver-img"/>
                      <div className="data">
                        <h4 className="driver-name">{viewTripData.driverName}</h4>
                        <div>
                          <h5 className="driver-phone" >{viewTripData.driverPhone}</h5>
                          <h5 className="driver-vehicle">{viewTripData.driverVehicleName}</h5>
                          <h5 className="driver-vehicle-number">{viewTripData.driverVehicleNumber}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {transactionDetailData.orderStatus === 'DONE' || transactionDetailData.orderStatus === 'FINISH' ?  
                    <div className="driver-rating">
                      <h2 className="title">{t('ratingDriver')}</h2>
                      <div className="rating-stars">
                        {[...Array(5)].map((star, index) => {
                          return (
                              index < viewTripData.driverRating ? 
                              <AiFillStar className="on"/>
                              :
                              <AiFillStar className="off"/>
                          );
                        })}
                      </div>
                      <h4 className="rating-comment">{viewTripData.driverComment}</h4>
                    </div>
                    : null
                  }
                </div>
              </div>
            }
            <div className="information">
              <h2 className="title">{t('tripInfo')}</h2>
              <div className="content">
                <div className="info-name">
                  <h4>{t('datePickup')}</h4>
                  <p className="desc">{format(Date.parse(transactionDetailData.datePick), 'dd MMM yyyy')}</p>
                </div>
                <div className="info-name">
                  <h4>{t('timePickup')}</h4>
                  <p className="desc">{transactionDetailData.timePick}</p>
                </div>
                <div className="info-name">
                  <h4>{t('temperature')}</h4>
                  {transactionDetailData.serviceName.toLowerCase() === 'superkul truck' ?
                    <>
                      <p className="desc">{viewTripData.pick.itemTmp}&deg; C</p>
                    </>
                    :
                    <>
                      <p className="desc">{viewTripData.drop[0]?.itemTmp}&deg; C</p>
                    </>
                  }
                  {/* <p className="desc">{viewTripData.pick[0]?.itemTmp || viewTripData.drop[0]?.itemTmp}&deg; C</p> */}
                </div>
              </div>
            </div>
            <div className="information">
              <h2 className="title">{t('serviceInfo')}</h2>
              <div className="content">
                <div className="info-name">
                  <h4>{t('serviceType')}</h4>
                  <p className="desc">{transactionDetailData.serviceName}</p>
                </div>
                <div className="info-name">
                  <h4>{t('vehicleType')}</h4>
                  <p className="desc">{transactionDetailData.vehicleType}</p>
                </div>
              </div>
            </div>
            {transactionDetailData.serviceName.toLowerCase() !== 'superkul truck' &&
              <div className="information">
                <h2 className="title">{t('listPackages')}</h2>
                <div className="content">
                  <div className="info-name">
                    <h4>{t('totalWeight')}</h4>
                    
                    <p className="desc">{weightTotal} Kg</p>
                  </div>
                  <div className="info-name">
                    <h4>{t('totalPackages')}</h4>
                    <p className="desc">{viewTripData.drop.length}</p>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="right-detail">
            <div className="header-right">
              <h1 className="title">{t('listRoute')}</h1>
            </div>
            <div className="body-right">
              <div className="detail-point">
                {viewTripData.trip_planning_dt.map((trip,index) => {
                  return (
                    <div className={`detail-index ${trip.job}`} key={index} >
                      <h1>{index +1}</h1>
                    </div>
                  )
                })}
              </div>
              <div className="detail-datas">
                {/* <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <div className="detail-data-trip">
                    <SortableContext
                      items={trip}
                      strategy={verticalListSortingStrategy}
                    >
                      {trip.map((trip,i) => {
                        return (
                          <SortableItem key={i} tripsData={trip}/>
                        )
                      })}
                    </SortableContext>
                  </div>
                </DndContext> */}
                {viewTripData.trip_planning_dt.sort((a,b) => a.order - b.order).map((trip) => {
                  return (
                    <div className="trip-point mb-3" onClick={() => handleTripPoint(trip)}>
                      <div className="trip-title mb-2">
                        <div>
                          <h1 className="trip-name">#{trip.dispatchNumber || viewTripData.tripNumber} </h1>
                          {trip.status.toLowerCase() === 'pending' &&
                            <Badge className="pending">{trip.status}</Badge>
                          }
                          {trip.status.toLowerCase() === 'finish' || trip.status.toLowerCase() === 'done' ?
                            <Badge className="done">{trip.status}</Badge>
                            : null
                          }
                          {trip.status.toLowerCase() === 'progress' || trip.status.toLowerCase() === 'onpogress' ?
                            <Badge className="onprogress">{trip.status}</Badge>
                            : null
                          }
                        </div>
                        {transactionDetailData.serviceName.toLowerCase() === 'dedicated delivery' || transactionDetailData.serviceName.toLowerCase() === 'superkul truck'?
                          null :
                          trip.price !== null &&  <h3>Rp {numberFormat(trip.price)}</h3>
                        }
                      </div>
                      <h1 className="loc-name">{
                        trip.item.pickLabel || 
                        trip.item[0]?.pickLabel ||
                        trip.item.dropOff?.dropLabel ||
                        trip.item.dropLabel
                        }
                      </h1>
                      <h3 className="loc-address">{
                        trip.item.pickAddress ||  
                        trip.item[0]?.pickAddress ||
                        trip.item.dropOff?.dropAddress ||
                        trip.item.dropAddress
                        }
                      </h3>
                    </div>
                  )
                })}
              </div>
              {/* <TransactionDetailPoint open={openModal} onClose={() => setOpenModal(false)} data={detailPointData}/> */}
              <TransactionDetailPoint isOpen={openTripPoint} toggle={toggleTripPoint}  data={detailPointData} />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

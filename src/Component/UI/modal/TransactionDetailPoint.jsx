import axios from "axios";
import React, { useEffect, useState } from "react";
import DriverAvatar from '../../../assets/img/img-avatar-1.png'
import PickIconMini from '../../../assets/icon/ic-location-blue-1.png'
import DropIconMini from '../../../assets/icon/ic-location-yellow-1.png'
import TestImageTripDone from '../../../assets/img/img-hero-driver.png'
import { AiFillStar } from "react-icons/ai";
import { Badge, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import '../../../styles/transactionDetail/transactionViewTrip/transactionDetailPoint/transactionDetailPoint.scss'
import { LoadingScreen } from "../../loadingScreen/loadingScreen";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { numberFormat } from "../../numberFormat/numberFormat";
import { format, parse } from "date-fns";

export const TransactionDetailPoint = ({isOpen, toggle, data}) => {
  const { t } = useTranslation()
  const [loadingScreen, setLoadingScreen] = useState(false)
  // const [starsRate, setStarsRate] = useState(driverData.driverRating)
  // const [ratingNotes, setRatingNotes] = useState('')
  // const [hover, setHover] = useState(driverData.driverRating);
  // const textRate = ['Worst!','Bad!','Good!','Awesome!','Excellent!']
  const [detailPointData, setDetailPointData] = useState({})
  const [tripData, setTripData] = useState({})
  const [allData, setAllData] = useState({})

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    setDetailPointData(data[0])
    setTripData(data[1])
    setAllData(data[2])
  }, [data])

  if(detailPointData === undefined || tripData === undefined || allData === undefined ||detailPointData.item === undefined) return null

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="transaction-detail-point">
          <ModalHeader className="transaction-detail-point-header" >
            <div className="header-content">
              <div>
                {detailPointData.job.toLowerCase() === 'pickup' ?
                  <h3 className="title">{t('detailPickupPoint')}</h3>
                  :
                  <h3 className="title">{t('detailDropPoint')}</h3>
                }
                <h5>#{detailPointData.dispatchNumber || tripData.tripNumber}</h5>
              </div>
              {detailPointData.status.toLowerCase() === "pending" &&
                <Badge className="status pending">{detailPointData.status}</Badge>
              }
              {detailPointData.status.toLowerCase() === "progress" || detailPointData.status.toLowerCase() === "onprogress" ?
                <Badge className="status onprogress">{detailPointData.status}</Badge>
                : null
              }
              {detailPointData.status.toLowerCase() === "done" || detailPointData.status.toLowerCase() === "finish" ?
                <Badge className="status done">{detailPointData.status}</Badge>
                : null
              }
            </div>
          </ModalHeader>
          <ModalBody className="transaction-detail-point-body">
            {detailPointData.job !== 'pickup' && 
              <div className="estimation-actual">
                <div className="estimation">{t('estimation')} <br /> {Math.floor(detailPointData.duration / 3600)} {t('hour')} {Math.floor(detailPointData.duration % 3600 / 60)} {t('minute')} {`(${detailPointData.distance} km)`}
                </div>
                {/* {detailPointData.status.toLowerCase() !== "done" || detailPointData.status.toLowerCase() !== "finish" ?
                  <div className="actual">{t('actual')} <br /> {Math.floor(detailPointData.duration / 3600)} {t('hour')} {Math.floor(detailPointData.duration % 3600 / 60)} {t('minute')} {`(${detailPointData.distance} km)`}
                  </div> 
                  : null
                } */}
              </div>
            }
            <div className="address">
              <div className="address-info">
                <img src={detailPointData.job === 'pickup' ? PickIconMini : DropIconMini} alt="" />
                <div className="address-data">
                  <h3 className="address-label">{
                    detailPointData.item.pickLabel || 
                    detailPointData.item[0]?.pickLabel ||
                    detailPointData.item.dropOff?.dropLabel ||
                    detailPointData.item.dropLabel
                    }
                  </h3>
                  <p className="address-loc">{
                    detailPointData.item.pickAddress ||  
                    detailPointData.item[0]?.pickAddress ||
                    detailPointData.item.dropOff?.dropAddress ||
                    detailPointData.item.dropAddress
                    }
                  </p>
                  <h4 className="address-note">{t('notes')}</h4>
                  <p className="address-note-content">{
                    detailPointData.item.pickNotes ||  
                    detailPointData.item[0]?.pickNotes ||
                    detailPointData.item.dropOff?.dropNotes ||
                    detailPointData.item.dropNotes
                    }
                  </p>
                </div>
              </div>
              {allData.serviceName.toLowerCase() !== "dedicated delivery" ?
                detailPointData.job !== 'pickup' && 
                  <div className="price">Rp {numberFormat(detailPointData.price)}</div>
                : null
              }
            </div>
            <div className="contact">
              <h2 className="title">{t('customerContact')}</h2>
              <div className="contact-info-content">
                <div className="name">
                  {detailPointData.job.toLowerCase() === 'pickup' ?
                    <h4>{t('senderName')}</h4>
                    :
                    <h4>{t('receiverName')}</h4>
                  }
                  <p className="desc">{
                    detailPointData.item.senderName ||  
                    detailPointData.item[0]?.senderName ||
                    detailPointData.item.dropOff?.receiverName ||
                    detailPointData.item.receiverName
                    }
                  </p>
                </div>
                <div className="phone-number">
                  <h4>{t('phoneNumber')}</h4>
                  <p className="desc">{
                    detailPointData.item.pickPhoneNumber ||  
                    detailPointData.item[0]?.pickPhoneNumber ||
                    detailPointData.item.dropOff?.dropPhoneNumber ||
                    detailPointData.item.dropPhoneNumber
                    }
                  </p>
                </div>
              </div>
            </div>
            {allData.serviceName.toLowerCase() !== "superkul truck" &&
              <div className="list-packages">
                <div className="packages-header">
                  {detailPointData.job.toLowerCase() === 'pickup' ?
                    // <h2 className="title">{t('listPickupPackage')}</h2>
                    null
                    :
                    <>
                      <h2 className="title">{t('listDropPackage')}</h2>
                      {/* <h3 className="total">{detailPointData.item.itemPick !== undefined ? detailPointData.item.itemPick.length :detailPointData.item.itemQty} {t('packages')}</h3> */}
                    </>
                  }
                </div>
                <div className="packages">
                  {/* {detailPointData.job.toLowerCase() === 'pickup' &&
                    detailPointData.item.itemPick.map((itm) => {
                      return (
                        <>
                          <div className="packages-data">
                            <h6>{itm.itemCategory}</h6>
                            <p>{t('quantity')} {itm.itemQty}, {itm.weight}kg, {itm.itemTmp}&deg; C</p>
                          </div>
                        </>
                      )
                    })
                  } */}
                  {detailPointData.job.toLowerCase() === 'dropoff' &&
                    <div className="packages-data">
                      <h6>{detailPointData.item.itemCategory}</h6>
                      <p>{detailPointData.item.lenght} x {detailPointData.item.width} x {detailPointData.item.height}, {detailPointData.item.weight}kg, {detailPointData.item.itemTmp}&deg; C</p>
                    </div>
                  } 
                </div>
              </div>
            }
            {detailPointData.status.toLowerCase() === "done" || detailPointData.status.toLowerCase() === "finish" ?
              detailPointData.job.toLowerCase() === 'pickup' ? 
                <div className="pickup-proven">
                  <h1 className="title">{t('pickupProvenTitle')}</h1>
                  <div className="proven-data">
                    <h3>{t('pickupRecipient')}</h3>
                    <p className="desc">{detailPointData.picName}</p>
                  </div>
                  <div className="proven-data">
                    <h3>{t('photo')}</h3>
                    <div className="photo">
                      <img src={`${process.env.REACT_APP_IMG_URL}/pod_trip/${detailPointData.photo1}`} alt="" />
                      <img src={`${process.env.REACT_APP_IMG_URL}/pod_trip/${detailPointData.photo2}`}  alt="" />
                    </div>
                  </div>
                  <div className="proven-data">
                    <h3>{t('time')}</h3>
                    <p className="desc">{format(new Date(detailPointData.reportTime), 'HH:mm, dd/MM/yyyy')}</p>
                  </div>
                  <div className="proven-data">
                    <h3>{t('notes')}</h3>
                    <p className="desc">{detailPointData.remark}</p>
                  </div>
                </div>
                : 
                <div className="pickup-proven">
                  <h1 className="title">{t('dropProvenTitle')}</h1>
                  <div className="proven-data">
                    <h3>{t('dropRecipient')}</h3>
                    <p className="desc">{detailPointData.picName}</p>
                  </div>
                  <div className="proven-data">
                    <h3>{t('photo')}</h3>
                    <div className="photo">
                      <img src={`${process.env.REACT_APP_IMG_URL}/pod_trip/${detailPointData.photo1}`} alt="" />
                      <img src={`${process.env.REACT_APP_IMG_URL}/pod_trip/${detailPointData.photo2}`}  alt="" />
                    </div>
                  </div>
                  <div className="proven-data">
                    <h3>{t('time')}</h3>
                    <p className="desc">{format(new Date(detailPointData.reportTime), 'HH:mm, dd/MM/yyyy')}</p>
                  </div>
                  <div className="proven-data">
                    <h3>{t('notes')}</h3>
                    <p className="desc">{detailPointData.remark}</p>
                  </div>
                </div>
              : null
            }
            {/* <div className="pending-report">
              <h2 className="title">{t('listDropPackage')}</h2>
              <div className="report-notes">
                <h6>{t('notes')}</h6>
                <p>Restoran Tutup</p>
              </div>
              <div className="report-store-loc">
                <h6>{t('storedWarehouse')}</h6>
                <h6 className="warehouse-label">Superkul Jakarta Pusat</h6>
                <p className="warehouse-address">Jl. Bina Remaja No.6</p>
              </div>
            </div> */}
            
          </ModalBody>
          <ModalFooter className="transaction-detail-point-footer">
            <Button className="close" onClick={toggle}>
              {t('close')}
            </Button>
          </ModalFooter>
    </Modal>
  )
}

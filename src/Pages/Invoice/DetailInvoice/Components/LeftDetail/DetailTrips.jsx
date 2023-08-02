import { t } from "i18next";
import React, { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge } from "reactstrap";
import OrderIdIcon from '../../../../../assets/icon/ic-order-id.png'
import PriceIcon from '../../../../../assets/icon/ic-currency.png'
import ArrowExpand from '../../../../../assets/icon/ic-arrow-left.png'
import { numberFormat } from "../../../../../Component/numberFormat/numberFormat";

const DetailTrips = ({data}) => {
  const [listTrip, setListTrip] = useState('0') 

  const tripAccordion = (id) => {
    if(listTrip === id) {
      setListTrip()
    } else {
      setListTrip(id)
    }
  }

  return (
    <div className="list-trip">
      {data?.paymentStatus?.toLowerCase() === 'paid' && 
        data?.trip_planning.map((trip, index) => {
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
                    {data?.serviceName?.toLowerCase() !== 'dedicated delivery' && 
                      <div className="price">
                        <img src={PriceIcon} alt="" className="price-icon"/>
                        {data?.serviceName.toLowerCase() === 'superkul truck' ?
                          <h3>Rp {numberFormat(data?.superkulPriceTotal)}</h3>
                          :
                          <h3>Rp {numberFormat(trip.price)}</h3>
                        }
                        {/* <h3>Rp {trip.price}</h3> */}
                      </div>
                    }
                  </div>
                  <div className="list-information">
                    <h2 className="address-name">{trip.pick[0]?.pickLabel || trip.pick.pickLabel}</h2>
                    <h3 className="address-street">{trip.pick[0]?.pickAddress || trip.pick.pickAddress}</h3>
                    <div className="status-badge">
                      {trip.tripStatus.toLowerCase() === 'mencari driver' ?
                        <Badge className="status waiting-payment">{trip.tripStatus}</Badge>
                        :
                        <Badge className="status done">{trip.tripStatus}</Badge>
                      }
                      <img src={ArrowExpand} alt="" className={listTrip === index ? 'more' : 'less'}/>
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody className="body" accordionId={index}>
                  {sortTrip.map((tripdt) => {
                    return (
                      <div className="list-pickup-drop">
                        <h4 className="title">{tripdt.job === 'pickup' ? 'Pickup' : 'Drop'} Point</h4>
                        <h3 className="address-name">{
                          tripdt.item.pickLabel || 
                          tripdt.item[0]?.pickLabel ||
                          tripdt.item.dropOff?.dropLabel ||
                          tripdt.item.dropLabel
                          }
                        </h3>
                        <h5 className="address-street">{
                          tripdt.item.pickAddress ||  
                          tripdt.item[0]?.pickAddress ||
                          tripdt.item.dropOff?.dropAddress ||
                          tripdt.item.dropAddress
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
      {data?.paymentStatus.toLowerCase() === 'unpaid' && 
        data?.trip_planning.map((trip,index) => {
          const sortTrip = trip.trip_planning_dt.sort((a,b) => a.order - b.order)
          return (
            <Accordion open={listTrip} toggle={tripAccordion} className="cek">
              <AccordionItem className="list-item-unpaid">
                <AccordionHeader className="header" targetId={index}>
                  <div className="list-header">
                    {data?.serviceName.toLowerCase() === 'superkul truck' ?
                      <>
                        <h3 className="trip-number">Trip {index + 1} | <span>{trip.pick.itemTmp}&deg; C</span></h3>
                        <h3 className="price">Rp {numberFormat(data?.superkulPriceTotal)}</h3>
                      </>
                      :
                      <>
                        <h3 className="trip-number">Trip {index + 1} | <span>{trip.drop[0].itemTmp}&deg; C</span></h3>
                        <h3 className="price">Rp {numberFormat(trip.price)}</h3>
                      </>
                    }
                  </div>
                  <div className="list-information">
                    <Badge className="status">Pick</Badge>
                    <h2 className="address-name">{trip.pick[0]?.pickLabel || trip.pick.pickLabel}</h2>
                    <img src={ArrowExpand} alt="" className={listTrip === index ? 'more' : 'less'}/>
                  </div>
                </AccordionHeader>
                <AccordionBody className="body" accordionId={index}>
                  {sortTrip.map((tripdt) => {
                    return (
                      <div className="list-pickup-drop">
                        <h4 className="title">{tripdt.job === 'pickup' ? 'Pickup' : 'Drop'} Point</h4>
                        <h3 className="address-name">{
                          tripdt.item.pickLabel || 
                          tripdt.item[0]?.pickLabel ||
                          tripdt.item.dropOff?.dropLabel ||
                          tripdt.item.dropLabel
                          }
                        </h3>
                        <h5 className="address-street">{
                          tripdt.item.pickAddress ||  
                          tripdt.item[0]?.pickAddress ||
                          tripdt.item.dropOff?.dropAddress ||
                          tripdt.item.dropAddress
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
      {data?.paymentStatus.toLowerCase() === 'waiting for payment' && 
        data?.trip_planning.map((trip,index) => {
          const sortTrip = trip.trip_planning_dt.sort((a,b) => a.order - b.order)
          return (
            <Accordion open={listTrip} toggle={tripAccordion} className="cek">
              <AccordionItem className="list-item-unpaid">
                <AccordionHeader className="header" targetId={index}>
                  <div className="list-header">
                    
                    {data?.serviceName.toLowerCase() === 'superkul truck' ?
                      <>
                        <h3 className="trip-number">Trip {index + 1} | <span>{trip.pick.itemTmp}&deg; C</span></h3>
                        <h3 className="price">Rp {numberFormat(data?.superkulPriceTotal)}</h3>
                      </>
                      :
                      <>
                        <h3 className="trip-number">Trip {index + 1} | <span>{trip.drop[0].itemTmp}&deg; C</span></h3>
                        <h3 className="price">Rp {numberFormat(trip.price)}</h3>
                      </>
                    }
                  </div>
                  <div className="list-information">
                    <Badge className="status">Pick</Badge>
                    <h2 className="address-name">{trip.pick[0]?.pickLabel || trip.pick.pickLabel}</h2>
                    <img src={ArrowExpand} alt="" className={listTrip === index ? 'more' : 'less'}/>
                  </div>
                </AccordionHeader>
                <AccordionBody className="body" accordionId={index}>
                  {sortTrip.map((tripdt) => {
                    return (
                      <div className="list-pickup-drop">
                        <h4 className="title">{tripdt.job === 'pickup' ? 'Pickup' : 'Drop'} Point</h4>
                        <h3 className="address-name">{
                          tripdt.item.pickLabel || 
                          tripdt.item[0]?.pickLabel ||
                          tripdt.item.dropOff?.dropLabel ||
                          tripdt.item.dropLabel
                          }
                        </h3>
                        <h5 className="address-street">{
                          tripdt.item.pickAddress ||  
                          tripdt.item[0]?.pickAddress ||
                          tripdt.item.dropOff?.dropAddress ||
                          tripdt.item.dropAddress
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
  )
}

export default DetailTrips;
import React from "react";
import { numberFormat } from "../../../../Component/numberFormat/numberFormat";
import { t } from "i18next";
import { Badge } from "reactstrap";

const RightDetailInvoice = ({data, exportToCSV}) => {
  return (
    <div className="right-detail">
      {data?.serviceName.toLowerCase() !== 'dedicated delivery' && 
        <>
          <div className="header-right">
            <div>
              <h1 className="title">{t('payment')}</h1>
              <h2 className="payment-detail">{t('paymentDetails')}<span>{data?.paymentMethod}</span></h2>
            </div>
            {data?.paymentStatus.toLowerCase() === 'paid' ? 
              <Badge className={`status paid`}>{t('paid')}</Badge>
              :
              <Badge className={`status unpaid`}>{data?.paymentStatus === 'CANCELED' ? t('canceled') : t('unpaid')}</Badge>
            } 
            {/* <Badge className={`status ${data?.paymentStatus === 'PAID' ? 'paid' : 'unpaid'}`}>{data?.paymentStatus}</Badge> */}
          </div>
          <div className="body-right">
          {data?.serviceName.toLowerCase() === 'superkul truck' ?
                <>
                  <div className="fee">
                    <p className="title-fee">{t('priceBase')}</p>
                    <p className="price-fee">Rp. {numberFormat(data?.superkulPriceDestination)}</p>
                  </div>
                  <div className="fee">
                    <p className="title-fee">{t('pricePerDropIntracity')}</p>
                    <p className="price-fee">Rp. {numberFormat(data?.superkulCostPerDropIntra * data?.totalIntracity)}</p>
                  </div>
                  <div className="fee">
                    <p className="title-fee">{t('pricePerDropIntercity')}</p>
                    <p className="price-fee">Rp. {numberFormat(data?.superkulCostPerDropInter * data?.totalIntercity)}</p>
                  </div>
                </>
              :
              <>
                <div className="fee">
                  <p className="title-fee">{t('serviceFee')}</p>
                  <p className="price-fee">Rp. {numberFormat(data?.basicPrice)}</p>
                </div>
                {data?.additionalService.map((add) => {
                    if(add.price !== null)
                    return (
                      add.is_mandatory == 1 ? null : 
                      <div className="fee">
                        <p className="title-fee">{add.name} x {data?.totalDestination} Drop</p>
                        <p className="price-fee">Rp. {numberFormat(add.price * data?.totalDestination)}</p>
                      </div>
                    )
                  })
                }
                {/* <div className="fee">
                  <p className="title-fee">{t('additionalService')}</p>
                  <p className="price-fee">Rp. {numberFormat(additional.reduce((val, element) => {return val + element.price}, 0))}</p>
                </div> */}
              </>
            }
            {data?.promoCode !== ' ' &&
              <div className="fee">
                <p className="title-fee discount">{data?.promoCode}</p>
                <p className="price-fee discount">Rp. -{numberFormat(data?.promoAmount)}</p>
              </div>
            }
          </div>
        </>
      }
      <div className="footer-right">
        {data?.serviceName.toLowerCase() !== 'dedicated delivery' && 
          <div className="total">
            <p className="total-cost">{t('totalCostTrip')}</p>
            <p className="price-total">Rp. {numberFormat(data?.priceTotal) || numberFormat(data?.superkulPriceTotal)}</p>
          </div>
        }
        
        {/* Conditional Button */}
        {data?.paymentStatus.toLowerCase() === 'paid' && 
          <button className="download-invoice" onClick={exportToCSV}>{t('downloadInvoice')}</button>
        }
        
      </div>
    </div>
  )
}

export default RightDetailInvoice;
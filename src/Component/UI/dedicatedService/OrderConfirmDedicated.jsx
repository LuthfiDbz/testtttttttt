import { format } from "date-fns";
import React, { useState } from "react";
import { useEffect } from "react";
import '../../../styles/dedicatedService/orderConfirmDedicated/orderConfirmDedicated.scss'
import { useTranslation } from "react-i18next";

const OrderConfirmDedicated = ({orderData, dataCalculate}) => {
  const { t } = useTranslation()
  const [corporateServiceId, setCorporateServiceId] = useState('')
  const [corporateServiceName, setCorporateServiceName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [rentStart, setRentStart] = useState(new Date())
  const [rentEnd, setRentEnd] = useState(new Date())
  const [costOrder, setCostOrder] = useState(0)

  

  useEffect(() => {
    setCorporateServiceId(orderData.corporateServiceId)
    setCorporateServiceName(orderData.corporateServiceName)
    setQuantity(orderData.quantity)
    setRentStart(orderData.rentStart)
    setRentEnd(orderData.rentEnd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData, dataCalculate])

  useEffect(() => {
    setCostOrder(dataCalculate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form className="order-confirmation-dedicated">
      <div className="order-side">
        <div className="order-info">
          <h1 className="title">{t('orderConfirm')}</h1>
          <div className="date-pickup">
            <h3>{t('rentStart')}</h3>
            <h3>{format(Date.parse(rentStart), 'dd MMM yyyy')}</h3>
          </div>
          <div className="date-pickup">
            <h3>{t('rentEnd')}</h3>
            <h3>{format(Date.parse(rentEnd), 'dd MMM yyyy')}</h3>
          </div>
        </div>
        <div className="service-info">
          <h1 className="title">{t('serviceInfo')}</h1>
          <div className="service-type">
            <h3>{t('serviceType')}</h3>
            <h3>Dedicated</h3>
          </div>
          <div className="vehicle-type">
            <h3>{t('vehicleType')}</h3>
            <h3>Bike</h3>
          </div>
          <div className="vehicle-type">
            <h3>{t('quantity')}</h3>
            <h3>{quantity}</h3>
          </div>
        </div>
        <div className="cost-order">
          <h1 className="title">{t('costOrder')}</h1>
          <div>
            <h3>{corporateServiceName}</h3>
            <h3>Rp {new Intl.NumberFormat('de-DE', {maximumSignificantDigits:3}).format(costOrder)}</h3>
          </div>
        </div>
      </div>
    </form>
  )
}

export default OrderConfirmDedicated
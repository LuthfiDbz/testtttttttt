import React, { useEffect, useRef, useState } from "react";
import "../../styles/invoice/invoice.scss";
import InvoiceIcon from "../../assets/icon/ic-invoice.png";
import PaidIcon from "../../assets/icon/ic-invoice-paid.png";
import UnpaidIcon from "../../assets/icon/ic-invoice-unpaid.png";
import InvoiceGreen from "../../assets/icon/ic-invoice-green.png";
import InvoiceRed from "../../assets/icon/ic-invoice-red.png";
import InvoiceGray from "../../assets/icon/ic-invoice-gray.png";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import { Badge } from "reactstrap";
import axios from "axios";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { EmptyData } from "../emptyData/EmptyData";
import { numberFormat } from "../numberFormat/numberFormat";
import { GrClose } from "react-icons/gr";
import { errorPopup, networkErrorPopup } from "./modal/PopUp/ErrorPopUp";
import { LoadingScreenSpinner } from "../loadingScreen/loadingScreen";

export const Invoice = ({data}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const locationUrl = useLocation();
  const [openInvoice, setOpenInvoice] = useState(false);
  const menuInvoiceRef = useRef();
  const btnInvoiceRef = useRef();

  const profileData = data
  const [invoiceData, setInvoiceData] = useState([])
  const [amount, setAmount] = useState([])
  const [placeholder, setPlaceholder] = useState(true)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    if (locationUrl.pathname.includes("home")) {
      getInvoiceData()
      getTotalAmount()
    }
  }, [locationUrl]);

  useEffect(() => {
    getInvoiceData()
    getTotalAmount()
  }, [])
  
  const getInvoiceData = async () => {
    try {
      const response = await axios.get(`${url}/api/invoice-list/${profileData.id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setInvoiceData(data)
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      }
    }
  }

  const getTotalAmount = async () => {
    try {
      const response = await axios.get(`${url}/api/invoice-amount/${profileData.id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setAmount(data)
    } catch(error) {
      console.log(error.message)
    }
  }

  window.addEventListener("click", (e) => {
    if(window.innerWidth > 767) {
      if (
        e.target !== menuInvoiceRef.current &&
        e.target !== btnInvoiceRef.current
      ) {
        setOpenInvoice(false);
      }
    }
  });
  

  return (
    <div className="invoice-nav">
      <img
        className="invoice-icon d-none d-md-flex"
        src={InvoiceIcon}
        alt="icon-invoice"
        ref={btnInvoiceRef}
        onClick={() => setOpenInvoice(!openInvoice)}
      />
      <p 
        className="d-block d-md-none"
        onClick={() => setOpenInvoice(!openInvoice)}
      ><img src={InvoiceIcon} alt="" /> {t('invoice')}</p>
      {openInvoice && (
        <div className="invoice-modal-container" ref={menuInvoiceRef}>
          <div className="header-container">
            <img src={InvoiceIcon} alt="draft-icon" className="inner-icon" />
            <p>{t('invoice')}</p>

            <Link to={`/invoice`} className="view-all d-none d-md-flex">
            {t('viewAllInvoice')} {">"}
            </Link>
            <GrClose className="d-block d-md-none close-modal" onClick={() => setOpenInvoice(false)}/>
          </div>
          <Link to={`/invoice`} className="view-all d-block d-md-none" onClick={() => setOpenInvoice(false)}>
            {t('viewAllInvoice')} {">"}
          </Link>
          <div className="paid-container">
            <div className="paid">
              <div className="icon-paid">
                <img src={PaidIcon} className="icon-check" />
              </div>
              <div className="desc-paid">
                <p className="desc">{t('paid')}</p>
                <p className="nominal">Rp. {numberFormat(amount.paid)}</p>
              </div>
            </div>
            <div className="unpaid">
              <div className="icon-unpaid">
                <img src={UnpaidIcon} className="exclamation" />
              </div>
              <div className="desc-unpaid">
                <p className="unpaid-desc">{t('unpaid')}</p>
                <p className="nominal-unpaid">Rp. {numberFormat(amount.unpaid)}</p>
              </div>
            </div>
          </div>
          <div className="list-container">
            
            {placeholder ? 
                <LoadingScreenSpinner />
              :
              invoiceData.length !== 0 ?
                invoiceData.map((data) => {
                  const dateFormat = format(Date.parse(data.date), 'dd MMM yyy')
                  return (
                    <div className="list" 
                      onClick={() => {
                        setOpenInvoice(false);
                        navigate(`/invoice/detail-invoice/${data.orderId}`)
                      }} 
                      key={data.orderId}>
                      <div className="detail">
                        {data.invoiceStatus === 'PAID' ? 
                          <img src={InvoiceGreen} className='icon' />
                        :
                          <img src={InvoiceRed} className='icon' />
                        }
                        <div className="list-detail">
                          <p className="numb-inv">{data.invoiceNumber}</p>
                          <p className="detail-order">
                            {data.serviceName}   |   {data.vehicleType}
                          </p>
                        </div>
                        <div className="date-invoice">{dateFormat}</div>
                      </div>
                      <div className="invoice-payment">
                        <div className="price">Rp. {numberFormat(data.amount)}</div>
                        {data.invoiceStatus.toLowerCase() === 'paid' ? 
                            <Badge className={`status-invoice paid`}>{t('paid')}</Badge>
                          :
                            <Badge className={`status-invoice unpaid`}>{data.invoiceStatus === 'CANCELED' ? t('canceled') : t('unpaid')}</Badge>
                        }
                        {/* <Badge className={`status-invoice ${data.invoiceStatus === 'PAID' ? 'paid': 'unpaid'}`}>{data.invoiceStatus}</Badge> */}
                      </div>
                    </div>
                  )
                })
              : 
                <EmptyData />
            }
          </div>
        </div>
      )}
    </div>
  );
};

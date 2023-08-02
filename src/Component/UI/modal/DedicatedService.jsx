import React, { useEffect, useState } from "react";
import "../../../styles/dedicatedService/dedicated.scss";
import { AiOutlineClose } from "react-icons/ai";
import { RiEBikeFill } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { BiAlarm } from "react-icons/bi";
import ConfirmIcon from '../../../assets/img/img-state-confirmation.png'
import SuccessIcon from '../../../assets/img/img-state-success.png'
import NewOrder from "../dedicatedService/NewOrder";
import OrderConfirmDedicated from "../dedicatedService/OrderConfirmDedicated";
import { BsArrowLeftShort } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { number } from "prop-types";
import { numberFormat } from "../../numberFormat/numberFormat";
import { LoadingScreen } from "../../loadingScreen/loadingScreen";
import { errorPopup, networkErrorPopup } from "./PopUp/ErrorPopUp";

export const DedicatedService = ({ open, onClose }) => {
  const { t } = useTranslation()
  const navigate = useNavigate
  const [checked, setChecked] = useState(false);
  const [index, setIndex] = useState(1)
  const [orderData, setOrderData] = useState([])
  const [dataCalculate, setDataCalculate] = useState(0)
  
  const [loadingScreen, setLoadingScreen] = useState(false)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  const handleCheck = () => {
    // Change state to the opposite (to ture) when checkbox changes
    setChecked(!checked);
  };

  const handleData = (e) => {
    setOrderData(e)
  }

  const handleClose = () => {
    onClose()
    setIndex(1)
  }


  const handlePayment = () => {
    Swal.fire({
      title:  `${t('continuePayment')}!`,
      html: t('paymentTextDedicated'),
      // Tagihan pembayaran akan masuk kedalam daftar invoice Anda
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText:  t('no'),
      confirmButtonText:  t('yes'),
      confirmButtonColor: '#1F83BB',
      reverseButtons: true,
      imageUrl: ConfirmIcon,
      customClass: {
        popup: 'popup-swal',
        title: 'title-swal',
        htmlContainer: 'text-swal',
        confirmButton:'confirm-swal',
        cancelButton: 'cancel-swal'
      }
    }).then(async (result) => {
      if(result.isConfirmed) {
        const fullData = {
          rentStart: orderData.rentStart,
          rentEnd: orderData.rentEnd,
          note: orderData.notes,
          poolAddress: orderData.poolAddress,
          corporateServiceId: orderData.corporateServiceId,
          quantity: orderData.quantity,
          promoCode: '',
        }
        setLoadingScreen(true)
        try {
          const response = await axios.post(`${url}/api/dedicated-order`, fullData, {headers})
          const data = response.data
          setLoadingScreen(false)
          Swal.fire({
            title:  `${t('orderSuccess')}!`,
            html: `${t('invoiceTotal')} <b>${numberFormat(dataCalculate)}</b>`,
            // Total tagihan anda
            timer: 3000,
            imageUrl: SuccessIcon,
            showConfirmButton: false,
            customClass: {
              popup: 'popup-swal',
              title: 'title-swal',
              htmlContainer: 'text-payment-swal'
            }
          }).then(result => {
            setIndex(1)
            onClose()
          })
        } catch(error) {
          console.log(error.message)
          setLoadingScreen(false)
          if(error.message === 'Network Error') {
            networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
          } else {
            errorPopup(t('error'),t('somethingError'), t('close'))
          }
        }
      }
    })
  }

  const handleCalculate = async () => {
    if(orderData.corporateServiceId === '') {
      Swal.fire({
        title:`${t('error')}!`,
        text: t('errorContractDedicated'),
        // Maaf, kamu belum bisa menggunakan dedicated service. Silahkan hubungi admin Superkul.
        imageUrl: ConfirmIcon,
        showConfirmButton: true,
        confirmButtonColor: '#1F83BB',
        confirmButtonText: t('close'),
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal',
          htmlContainer: 'text-swal',
          confirmButton:'confirm-swal'
        }
      })
      onClose()
      return
    }

    if(orderData.poolAddress === "" || orderData.notes === "") {
      Swal.fire({
        title:  `${t('error')}!`,
        text:  `${t('fillDataCorrectly')}!`,
        imageUrl: ConfirmIcon,
        showConfirmButton: true,
        confirmButtonColor: '#1F83BB',
        confirmButtonText: t('close'),
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal',
          htmlContainer: 'text-swal',
          confirmButton:'confirm-swal'
        }
      })
      return
    }
    const calculateData = {
      corporateServiceId: orderData.corporateServiceId,
      quantity: orderData.quantity,
      rentStart: orderData.rentStart,
      rentEnd: orderData.rentEnd,
    }
    setLoadingScreen(true)
    try {
      const response = await axios.post(`${url}/api/dedicated-order/calculate`, calculateData, {headers})
      const data = response.data.data
      setDataCalculate(data)
      setLoadingScreen(false)
      setIndex(2)
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }



  const HeaderModal = () => {
    if(index === 1) {
      return (
        <>
          <h5>{t('newOrder')}</h5>
          <GrFormClose className="close-modal" onClick={onClose}/>
        </>
      )
    } else {
      return (
        <>
          <BsArrowLeftShort className="back-modal" onClick={() => {
            setIndex(1)
          }}/>
          <h5>{t('orderConfirm')}</h5>
          <GrFormClose className="close-modal" onClick={handleClose}/>
        </>
      )
    }
  }


  if (!open) return null;
  return (
    <div onClick={handleClose} className="overlay-dedicated fixed-top">
      {loadingScreen && <LoadingScreen />}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="dedicated-container"
      >
        <div className="dedicated-header" >
          <HeaderModal />
        </div>
        <div className="dedicated-service">
          {index === 1 && <NewOrder dataFromChild={handleData}/>}
          {index === 2 && <OrderConfirmDedicated orderData={orderData} dataCalculate={dataCalculate} />}
        </div>
       
        <div className="dedicated-footer">
          {index === 1 ? 
              <button className="order-btn btn" onClick={handleCalculate}>{t('order').toUpperCase()}</button>
            :
              <>
                <div className="total-cost-order">
                  <div>
                    <h5>{t('totalCostOrder')}</h5>
                    <div className="payment-method">Post-Paid</div>
                  </div>
                  <h4>Rp {numberFormat(dataCalculate)}</h4>
                  {/* <h4>Rp {new Intl.NumberFormat('de-DE', {maximumSignificantDigits:3}).format(dataCalculate)}</h4> */}
                </div>
                <button className="order-btn btn" onClick={handlePayment}>{t('order').toUpperCase()}</button>
              </>
          }
          {/* <FooterModal /> */}
        </div>
      </div>
    </div>
  );
};

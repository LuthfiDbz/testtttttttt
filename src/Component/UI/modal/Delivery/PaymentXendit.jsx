import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import DriverAvatar from '../../../assets/img/img-avatar-1.png'
// import ConfirmIcon from '../../../assets/img/img-state-confirmation.png'
// import SuccessIcon from '../../../assets/img/img-state-success.png'
import { AiFillStar } from "react-icons/ai";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import '../../../../styles/paymentXendit/paymentXendit.scss'
import SuccessIcon from '../../../../assets/img/img-state-success.png'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../authContext/AuthContext";

export const PaymentXendit = ({isOpen, toggle, xenditUrl}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loadingScreen, setLoadingScreen] = useState(false)
  const auth_context = useContext(AuthContext)
  // const [xendit, setXendit] = useState('')
  
  // useEffect(() => {
  //   setXendit(xenditUrl)
  // }, [xenditUrl])

  

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={`xendit-payment }`} >
      <ModalBody className="rating-driver-body">
        <img src={SuccessIcon} alt="" />
        <h5>{t('orderSuccess')}</h5>
      </ModalBody>
      <ModalFooter className="rating-driver-footer">
        <Button className={`rating-skip`} onClick={() => navigate(`/`)}>
          {t('backHome')}
        </Button>
        <a href={xenditUrl} target="_blank"  className="xendit-btn" rel="noopener noreferrer" onClick={() => navigate(`/transaction/${auth_context.id}`)}>
          <Button className={`rating-submit`} >
            {t('pay')}
          </Button>
        </a>
      </ModalFooter>
    </Modal>
  )
}
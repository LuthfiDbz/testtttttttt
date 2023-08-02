import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import OptimizeImg from '../../../../assets/img/img-opt-info.png'
import '../../../../styles/optimizeInfo/optimizeInfo.scss'

export const OptimizeInfo = ({isOpen, toggle, data, id, trigger}) => {
  const { t } = useTranslation()
  const [dataAddress, setDataAddress] = useState([])

  

  return (
    <Modal isOpen={isOpen} toggle={toggle}className="optimize-info">
      <ModalHeader className="optimize-info-header" toggle={toggle}>
        {/* <h1>Optimize Info</h1> */}
      </ModalHeader>
      <ModalBody className="optimize-info-body">
        <img src={OptimizeImg} alt="" />
        <p>{t('optimizeInfoText')}</p>
      </ModalBody>
    </Modal>
  )
}
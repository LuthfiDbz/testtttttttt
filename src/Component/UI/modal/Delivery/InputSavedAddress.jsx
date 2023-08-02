import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Placeholder } from "reactstrap";
import '../../../../styles/inputSavedAddress/inputSavedAddress.scss'
import { LoadingScreenSpinner } from "../../../loadingScreen/loadingScreen";

export const InputSavedAddress = ({isOpen, toggle, data, id, trigger}) => {
  const { t } = useTranslation()
  const [dataAddress, setDataAddress] = useState([])
  const [placeholder, setPlaceholder] = useState(true)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    if(isOpen) {
      getDataAddress()
    }
  }, [id, trigger, isOpen])
  

  const getDataAddress = async () => {
    const custid = id
    try {
      const response = await axios.get(`${url}/api/bookmark/${custid}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setDataAddress(data)
    } catch(error) {
      console.log(error.message)
      
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}className="input-saved-address">
      <ModalHeader className="input-saved-address-header" toggle={toggle}>
        <h1>{t('savedAddress')}</h1>
      </ModalHeader>
      <ModalBody className="input-saved-address-body">
        {placeholder ? <LoadingScreenSpinner /> :
          dataAddress.map(addr => {
            return (
              <div className="address-data" key={addr.id} onClick={() => data(addr)}>
                <h3 className="address-label">{addr.label}</h3>
                <h6 className="address-format">{addr.address}</h6>
                {addr.name === null && addr.phone === null && addr.notes === null ? null :
                  <h6 className="address-format mt-2">
                  {addr.name || '-'}  |  {addr.phone === null ? '-' : addr.phone}  |  {addr.notes || '-'}
                  </h6>
                }
              </div>
            )
          })
        }
      </ModalBody>
    </Modal>
  )
}
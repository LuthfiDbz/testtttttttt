import axios from "axios";
import { format } from "date-fns";
import FileSaver from "file-saver";
import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import * as xlsx from "xlsx";
import { LoadingScreen } from "../../../loadingScreen/loadingScreen";
import '../../../../styles/importOrder/importOrder.scss'
import { errorPopup, networkErrorPopup } from "../PopUp/ErrorPopUp";
import { useTranslation } from "react-i18next";
import ImportIcon from '../../../../assets/icon/ic-uplaod-file.png'

export const ImportOrder = ({isOpen, toggle, extractData, id, trigger}) => {
  const { t } = useTranslation()
  const [importData, setImportData] = useState([])
  const [rawData, setRawData] = useState([])
   // drag state
  const [dragActive, setDragActive] = useState(false);
  const [dropAreaText, setDropAreaText] = useState('Drop file or click to upload')
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  

  const url = process.env.REACT_APP_URL_CUST
  const url_auth =process.env.REACT_APP_DEV_URL
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }
  const headers_auth = {
    'Authorization': `Bearer ${access_token}`
  }

  const fileExtension = ".xlsx";
  const fileName = `Superkul Template Order`

  const exportToCSV = () => {
    setLoadingScreen(true)
    axios({
      method:'GET',
      url: `${url_auth}/customer-orders/export-templates`,      
      responseType: 'blob', 
      headers: headers_auth
    }).then((response) => {
      FileSaver.saveAs(response.data, fileName + fileExtension);
      setLoadingScreen(false)
      toggle()
    })
  };

 
  
  
  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
    
    setDropAreaText(e.dataTransfer.files[0].name)
    setSelectedFile(e.dataTransfer.files[0])
  };

  // triggers when file is selected with click
  const handleChange = function(e) {
    e.preventDefault();
    setDragActive(true);
    setDropAreaText(e.target.files[0].name)
    setSelectedFile(e.target.files[0])
  };

  const handleRemove = () => {
    setSelectedFile(null)
    setDragActive(false)
    setDropAreaText('Drop file or click to upload')
  }

  

  const applyImport = async () => {
    const formData = new FormData()
    formData.append('attachment', selectedFile)
    if(selectedFile === null) {
      errorPopup(t('error'), 'Pilih file terlebih dahulu!', t('close'))
      return
    }
    setLoadingScreen(true)
    try {
      const response = await axios({
        method: "POST",
        url: `${url_auth}/customer-orders/import-address`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${access_token}`
        }
      })
      setLoadingScreen(false)
      extractData(response.data)
    } catch (error) {
      console.log(error.response.data.message)
      setLoadingScreen(false)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),error.response.data.message, t('close'))
      }
    }
    
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}className="import-order-address">
      {loadingScreen && <LoadingScreen />}
      <ModalHeader className="import-order-address-header" toggle={toggle}>
        <h1>{t('importTitle')}</h1>
      </ModalHeader>
      <ModalBody className="import-order-address-body">
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
          <input type="file" id="input-file-upload" multiple={true}  accept=".xlsx" onChange={handleChange} />
          <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
            {selectedFile === null &&
              <img src={ImportIcon} alt="" />
            }
            <p>{dropAreaText}</p> 
          </label>
          { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
          { dropAreaText !== 'Drop file or click to upload' && 
            <h6 className="remove-file" onClick={handleRemove}>X {t('removeImport')}</h6>
          }
        </form>
        <p className="download-text">{t('importDownloadText')} <a href={`${process.env.REACT_APP_IMG_URL}/templates/Superkul+Template+Order+Address.xlsx`} target="_blank" rel="noreferrer noopener" className="download-link">{t('importDownload')}</a ></p>
      </ModalBody>
      <ModalFooter className="import-order-address-footer">
        {selectedFile === null ? 
          <Button className="apply-file disable">
            {t('apply')}
          </Button>
          :
          <Button className="apply-file" onClick={applyImport}>
            {t('apply')}
          </Button>
        }
      </ModalFooter>
    </Modal>
  )
}
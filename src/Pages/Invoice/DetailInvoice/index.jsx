import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import * as FileSaver from "file-saver";

import "./Styles/detailInvoice.scss";
import { useTranslation } from "react-i18next";
import { errorPopup } from "../../../Component/UI/modal/PopUp/ErrorPopUp";
import { LoadingScreen } from "../../../Component/loadingScreen/loadingScreen";
import TitlePages from "../../../Component/TitlePage/TitlePage";
import RightDetailInvoice from "./Components/RightDetail";
import LeftDetailInvoice from "./Components/LeftDetail";
import DetailInvoiceMethods from "./Methods/DetailInvoiceMethods";

const DetailInvoiceIndex = () => {
  let { id } = useParams();
  const { t } = useTranslation()
  const { isLoading, detailData, getDetailInvoiceData } = DetailInvoiceMethods()
  // const [additional, setAdditional] = useState([])
  const [loadingScreen, setLoadingScreen] = useState(false)

  const url_auth = process.env.REACT_APP_DEV_URL
  const access_token = sessionStorage.getItem('token')
  const headers_auth = {
    'Authorization': `Bearer ${access_token}`
  }

  useEffect(() => {
    window.scrollTo(0, 0, 'auto')
  }, [])

  useEffect(() => {
    getDetailInvoiceData(id)
  }, [id])

  // DOWNLOAD INVOICE

  // const fileType =
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const fileName = `${detailData.invoiceNumber}`

  const exportToCSV = () => {
    setLoadingScreen(true)

    const payload = {
      invoices_ids: [detailData?.invoice[0]?._id],
    };

    axios({
      method: 'POST',
      url: `${url_auth}/invoices/export?download=1`,
      responseType: 'blob',
      headers: headers_auth,
      data: payload
    }).then((response) => {
      setLoadingScreen(false)
      FileSaver.saveAs(response.data, fileName + fileExtension);
    }).catch(error => {
      setLoadingScreen(false)
      errorPopup(t('error'), t('somethingWrong'), t('close'))
    })
  };

  const breadcumbs = [
    {
      text: t('home'),
      link: '/'
    },
    {
      text: t('invoice'),
      link: '/invoice'
    },
    {
      text: t('invoiceDetails'),
      link: '#'
    }
  ]


  return (
    <div className="invoice-detail">
      {loadingScreen && <LoadingScreen />}
      <TitlePages
        title={t('invoiceDetails')}
        breadcumbs={breadcumbs}
      />
      {isLoading ? null :
        <div className="detail-invoice">
          <LeftDetailInvoice
            data={detailData}
          />
          <RightDetailInvoice
            data={detailData}
            exportToCSV={exportToCSV}
          />
        </div>
      }
    </div>
  );
};

export default DetailInvoiceIndex;

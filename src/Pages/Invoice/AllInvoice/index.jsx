import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { DateRanged } from "../../../Component/UI/DateRange";
import { ServiceFiltering } from "../../../Component/UI/serviceFiltering";
import PaidIcon from "../../../assets/icon/ic-invoice-paid.png";
import UnpaidIcon from "../../../assets/icon/ic-invoice-unpaid.png";
import InvoiceGreen from "../../../assets/icon/ic-invoice-green.png";
import InvoiceRed from "../../../assets/icon/ic-invoice-red.png";
import InvoiceGray from "../../../assets/icon/ic-invoice-gray.png";
import BgBanner from '../../../assets/img/bg-banner-4.png'

// import {dataInvoice} from '../../../Data/dataInvoice';

import "./Styles/allInvoice.scss";
import { Footer } from "../../../Component/footer/Footer";
import { Header } from "../../../Component/header/Header";
import { Badge } from "reactstrap";
import axios from "axios";
import { addDays, format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "../../../Component/authContext/AuthContext";
import { EmptyData } from "../../../Component/emptyData/EmptyData";
import { numberFormat } from "../../../Component/numberFormat/numberFormat";
import { errorPopup, networkErrorPopup } from "../../../Component/UI/modal/PopUp/ErrorPopUp";
import TitlePages from "../../../Component/TitlePage/TitlePage";
import TotalSection from "./Components/TotalSection";
import { LoadingScreenSpinner } from "../../../Component/loadingScreen/loadingScreen";
import ListSection from "./Components/ListSection";
import FilterSection from "./Components/FilterSection";
import AllInvoiceMethods from "./Methods/AllInvoiceMethods"

const AllInvoiceIndex = () => {
  // const { id } = useParams()
  const {
    isLoading,
    allInvoice,
    allAmount,
    getTotalAmount,
    getInvoiceData
  } = AllInvoiceMethods()

  const auth_context = useContext(AuthContext)
  const id = auth_context.id
  const { t } = useTranslation()
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('default')
  const [dateDefault, setDateDefault] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
      key: "selection",
    },
  ])

  const [invoiceData, setInvoiceData] = useState([])
  const [placeholder, setPlaceholder] = useState(true)
  const [amount, setAmount] = useState([])

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    if (id !== '') {
      getInvoiceDataa(id)
      getTotalAmountt(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (statusFilter !== 'default') {
      filterData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  useEffect(() => {
    filterDataWithDate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate])

  useEffect(() => {
    filterBySearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter])

  const getInvoiceDataa = async () => {
    setPlaceholder(true)
    try {
      const response = await axios.get(`${url}/api/invoice-list/${id}`, { headers })
      const data = response.data.data
      setPlaceholder(false)
      setInvoiceData(data)
    } catch (error) {
      console.log(error.message)
      if (error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'), t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'), t('somethingError'), t('close'))
      }
    }
  }

  const getTotalAmountt = async () => {
    try {
      const response = await axios.get(`${url}/api/invoice-amount/${id}`, { headers })
      const data = response.data.data
      setPlaceholder(false)
      setAmount(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const filterData = async () => {
    setPlaceholder(true)
    const lowstring = statusFilter.toLowerCase()
    try {
      const response = await axios.get(`${url}/api/invoice-list/${lowstring}/${id}`, { headers })
      const data = response.data.data
      setPlaceholder(false)
      setInvoiceData(data.reverse())
    } catch (error) {
      console.log(error.message)
    }
  }

  const filterDataWithDate = async () => {
    setPlaceholder(true)
    try {
      const response = await axios.get(`${url}/api/invoice-list/${id}/${fromDate}/${toDate}`, { headers })
      const data = response.data.data
      setPlaceholder(false)
      setInvoiceData(data.reverse())
    } catch (error) {
      console.log(error.message)
    }
  }

  const filterBySearch = async () => {
    setPlaceholder(true)
    if (searchFilter.length === 3) {
      try {
        const response = await axios.get(`${url}/api/invoice-list/${id}`, { headers })
        const data = response.data.data
        setPlaceholder(false)
        const filtereddata = data.filter((e) => {
          return e.invoiceNumber.toLowerCase().includes(searchFilter) || e.serviceName.toLowerCase().includes(searchFilter) || e.vehicleType.toLowerCase().includes(searchFilter)
        })
        setInvoiceData(filtereddata.reverse());
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  const dateRangeData = (e) => {
    const startDate = format(e[0].startDate, 'yyyy-MM-dd')
    const endDate = format(e[0].endDate, 'yyyy-MM-dd')
    setFromDate(startDate)
    setToDate(endDate)
  }

  const resetData = () => {
    getInvoiceDataa()
    setSearchFilter('')
    setStatusFilter('default')
    setDateDefault([
      {
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
        endDate: new Date(),
        key: "selection",
        // startDate: new Date(),
        // endDate: addDays(new Date(), 7),
        // key: "selection",
      },
    ])
  }

  const breadcumbs = [
    {
      text: t('home'),
      link: '/'
    },
    {
      text: t('invoice'),
      link: '#'
    }
  ]

  return (
    <>
      <div className="container-invoice">
        <TitlePages
          title={t('invoice')}
          breadcumbs={breadcumbs}
        />
        <div className="invoice-data">
          <div className="invoice-list">
            <FilterSection
              data={invoiceData}
              statusFilter={statusFilter}
              setStatusFilter={(e) => setStatusFilter(e)}
              dateRangeData={dateRangeData}
              defaultDate={dateDefault}
              onReset={resetData}
            />
            <TotalSection data={amount} />
            {placeholder ?
              <LoadingScreenSpinner />
              :
              <ListSection data={invoiceData} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default AllInvoiceIndex;

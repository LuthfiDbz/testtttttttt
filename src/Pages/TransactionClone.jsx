import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import "../styles/transaction/transaction.scss";
import { FiSearch } from "react-icons/fi";
import { DateRanged } from "../Component/UI/DateRange";
import { DataTransaction } from "../Component/UI/DataTransactionClone";
import { Footer } from "../Component/footer/Footer";
import { Header } from "../Component/header/Header";
import { useRef } from "react";
import format from "date-fns/format";
import { addDays } from "date-fns";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Component/authContext/AuthContext";
import { EmptyData } from "../Component/emptyData/EmptyData";
import { useTranslation } from "react-i18next";
import BgBanner from '../assets/img/bg-banner-4.png'
import { LoadingScreen, LoadingScreenSpinner } from "../Component/loadingScreen/loadingScreen";
import { DataTransactionClone } from "../Component/UI/DataTransactionClone";

const statusList = {
  deliveryList: ['SCHEDULED', 'ON PROGRESS', 'DONE', 'CANCELED'],
  dedicatedList: ['PREPARED', 'SCHEDULED', 'DEDICATED', 'DONE', 'CANCELED']
}

// const statusList = {
//   deliveryList: [
//     'Scheduled Order', 
//     'On Progress', 
//     'Done', 'Canceled'],
//   dedicatedList: ['Being Prepared', 'Scheduled', 'Dedicated', 'Done', 'Canceled']
// }

export const TransactionClone = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const srvc = searchParams.get('srvc')
  const auth_context = useContext(AuthContext)
  // const id = auth_context.id
  const [searchTerm, setSearchTerm] = useState("");
  const [menuSelected, setMenuSelected] = useState(srvc == 2 ? 2 : 1)
  const [sidebar, setSidebar] = useState(statusList.deliveryList)
  const [loadingScreen, setLoadingScreen] = useState(false)

  // const [selectedService, setSelectedService] = useState('delivery')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchFilter, setSearchFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [serviceFilter, setServiceFilter] = useState("Service")
  const [dateFilter, setDateFilter] = useState("")
  const [dateDefault, setDateDefault] = useState([
    {
      startDate: new Date("2023-01-01"),
      endDate: new Date(),
      key: "selection",
    },
  ])
  const [transactionData, setTransactionData] = useState([])
  const [deliveryData, setDeliveryData] = useState([])
  const [dedicatedData, setDedicatedData] = useState([])
  const [placeholder, setPlaceholder] = useState(true)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  const getStatusOrderDelivery = (value) => {
    switch (value) {
      case "SCHEDULED":
        return t('scheduledOrder');
      case "ON PROGRESS":
        return t('onProgress');
      case "DONE":
        return t('done');
      case "CANCELED":
        return t('canceled');
      default:
        return "";
    }
  };

  const getStatusOrderDedicated = (value) => {
    switch (value) {
      case "PREPARED":
        return t('prepared');
      case "SCHEDULED":
        return t('scheduled');
      case "DEDICATED":
        return t('dedicated');
      case "DONE":
        return t('done');
      case "CANCELED":
        return t('canceled');
      default:
        return "";
    }
  };


  useEffect(() => {
    if(srvc == 2) {
      setMenuSelected(2)
      setSidebar(statusList.dedicatedList)
      getTransactionData('dedicated')
    } else {
      setMenuSelected(1)
      getTransactionData('delivery')
    }
  }, [])

  useEffect(() => {
    if(menuSelected == 1) {
      filterDataWithDate()
    }
    if(menuSelected == 2) {
      filterDataWithDateDedicated()
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate])

  useEffect(() => {
    if(menuSelected == 1) {
      if(statusFilter === 'All') {
        // getTransactionData('delivery')
      } else {
         filterByStatus()
      }
    } 
    if(menuSelected == 2) {
      if(statusFilter === 'All') {
        // getTransactionData('dedicated')
      } else {
        filterByStatusDedicated()
      }
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  useEffect(() => {
    if(menuSelected == 1) {
      filterBySearch()
    }
    if(menuSelected == 2) {
      filterBySearchDedicated()
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter])

  useEffect(() => {
    if(menuSelected == 1) {
      filterByService()
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceFilter])

  const getTransactionData = async (service) => {
    setPlaceholder(true)
    setLoadingScreen(true)
    if(service === 'delivery') {
      try {
        const response = await axios.get(`${url}/api/customer-order-history/${id}`, {headers})
        const data = response.data.data
        setTimeout(() => {
          setPlaceholder(false)
          setTransactionData(data.reverse())
          setStatusFilter('All')
          setLoadingScreen(false)
        }, 500);
      } catch(error) {
        console.log(error.message)
      }
    } else {
      try {
        const response = await axios.get(`${url}/api/dedicated-history/${id}`, {headers})
        const data = response.data.data
        setTimeout(() => {
          setPlaceholder(false)
          setTransactionData(data.reverse())
          setStatusFilter('All')
          setLoadingScreen(false)
        }, 500);
      } catch(error) {
        console.log(error.message)
      }
    }
  }

  

  const filterByStatus = async (item) => {
    setPlaceholder(true)
    let status = statusFilter.toUpperCase()
    if(statusFilter.toUpperCase() === 'SCHEDULED ORDER') {
      status = 'SCHEDULED'
    }
    if(statusFilter.toUpperCase() === 'ON PROGRESS') {
      status = 'ON PROGRESS'
    }
    try {
      const response = await axios.get(`${url}/api/customer-order-history/${id}/${status}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setTransactionData(data.reverse())
    } catch(error) {
      console.log(error.message)
    }
  }

  const filterByStatusDedicated = async (item) => {
    setPlaceholder(true)
    let status = statusFilter.toUpperCase()
    if(statusFilter.toUpperCase() === 'SCHEDULED ORDER') {
      status = 'SCHEDULED'
    }
    if(statusFilter.toUpperCase() === 'ON PROGRESS') {
      status = 'ON PROGRESS'
    }
    try {
      const response = await axios.get(`${url}/api/dedicated-history/${id}/${status}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setTransactionData(data.reverse())
    } catch(error) {
      console.log(error.message)
    }
  }

  

  const filterDataWithDate = async () => {
    try {
      const response = await axios.get(`${url}/api/customer-order-history-date/${id}/${fromDate}/${toDate}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setTransactionData(data.reverse())
    } catch(error) {
      console.log(error.message)
    }
  }

  const filterDataWithDateDedicated = async () => {
    try {
      const response = await axios.get(`${url}/api/dedicated-history-date/${id}/${fromDate}/${toDate}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setTransactionData(data.reverse())
    } catch(error) {
      console.log(error.message)
    }
  }

  const filterByService = async () => {
    let status = statusFilter.toUpperCase()
    if(statusFilter.toUpperCase() === 'SCHEDULED ORDER') {
      status = 'SCHEDULED'
    }
    if(statusFilter.toUpperCase() === 'ON PROGRESS') {
      status = 'ON PROGRESS'
    }
    try {
      const response = await axios.get(`${url}/api/customer-order-history-service/${id}/${status}/${serviceFilter}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setTransactionData(data.reverse())
    } catch(error) {
      console.log(error.message)
    }
  }

  const filterBySearch = async () => {
    setPlaceholder(true)
    try {
      const response = await axios.get(`${url}/api/customer-order-history/${id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      const filtereddata = data.filter((e) => {
        return e.orderNumber.toLowerCase().includes(searchFilter.toLowerCase()) || e.serviceName.toLowerCase().includes(searchFilter.toLowerCase())
      })
      setTransactionData(filtereddata.reverse());
    } catch(error) {
      console.log(error.message)
    }
  }

  const filterBySearchDedicated = async () => {
    setPlaceholder(true)
    try {
      const response = await axios.get(`${url}/api/dedicated-history/${id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      const filtereddata = data.filter((e) => {
        return e.orderNumber.toLowerCase().includes(searchFilter.toLowerCase()) || e.serviceName.toLowerCase().includes(searchFilter.toLowerCase())
      })
      setTransactionData(filtereddata.reverse());
    } catch(error) {
      console.log(error.message)
    }
  }


  const resetData = () => {
    // getTransactionData(selectedService)
    if(menuSelected == 2) {
      getTransactionData('dedicated')
    } else {
      getTransactionData('delivery')
    }
    setSearchFilter('')
    setStatusFilter('All')
    setServiceFilter('Service')
    setDateDefault([
      {
        startDate: new Date("2023-01-01"),
        endDate: addDays(new Date(), 7),
        key: "selection",
      },
    ])
  }



  const dateRangeData = (e) => {
    const startDate = format(e[0].startDate, 'yyyy-MM-dd')
    const endDate = format(e[0].endDate, 'yyyy-MM-dd')
    setFromDate(startDate)
    setToDate(endDate)
  }

  return (
    <>
      {/* <Header /> */}
      <div className="container-transaction">
        {loadingScreen && <LoadingScreen />}
        <div className="container-title" style={{backgroundImage: `url(${BgBanner})`}}>
          <div className="content-title">
            <h3>{t('transaction')}</h3>
            <ul className="link">
              <li>
                <Link className="link-to" to="/">
                {t('home')} /
                </Link>
              </li>
              <li>
                <Link className="link-to" to="/transaction">
                  &nbsp; {t('transaction')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="transaction">
          <div className="transaction-container-content">
            <div className="transaction-menu">
              <ButtonGroup>
                <Button 
                  className="delivery-service service"
                  color="primary"
                  outline
                  onClick={() => {
                    setMenuSelected(1); 
                    setSidebar(statusList.deliveryList); 
                    getTransactionData('delivery')
                  }}
                  active={menuSelected === 1}
                >Delivery Service</Button>
                <Button 
                  className="dedicated-service service"
                  color="primary"
                  outline
                  onClick={() => {
                    setMenuSelected(2); 
                    setSidebar(statusList.dedicatedList); 
                    getTransactionData('dedicated')
                  }}
                  active={menuSelected === 2}
                >Dedicated Service</Button>
              </ButtonGroup>
            </div>
            <div className="transaction-content">
              <div className="transaction-sidebar">
                <h4 >{t('statusOrder')}</h4>
                <button
                  className={`sidebar-item ${statusFilter === 'All' ? 'active' : ''}`}
                  onClick={() => {
                    menuSelected == 1 ? getTransactionData('delivery') : getTransactionData('dedicated')
                    // setStatusFilter('All')
                  }}
                >{t('all')}</button>
                {sidebar.map((item, index) => (
                  <button
                    key={index}
                    className={`sidebar-item ${statusFilter === item ? 'active' : ''}`}
                    onClick={() => {setStatusFilter(item)}}
                  >
                    {menuSelected == 1 ?
                      getStatusOrderDelivery(item)
                      :
                      getStatusOrderDedicated(item)
                    }
                  </button>
                ))}
              </div>
              <div className="transaction-list">
                <div className={`filtering ${statusFilter === 'All' ? '' : ''}`}>
                  <div className="filtering-input">
                    <div className="input-search">
                      <input
                        placeholder="Search..."
                        className="search-transactions"
                        type="text"
                        name="first-name"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                      />
                      {/* {menuSelected === 1 && statusFilter !== 'All'?
                        <FiSearch className={`icon-search`}/>
                        :
                        <FiSearch className={`icon-search`}/>
                      } */}
                      <FiSearch className={`icon-search`}/>
                    </div>

                    {/* {menuSelected === 1 && statusFilter !== 'All'? */}
                      <select 
                        className="service-btn-trans" 
                        value={serviceFilter} 
                        style={{
                          visibility: menuSelected === 1 && statusFilter !== 'All' ? "" : "hidden"
                        }}
                        onChange={(e) => setServiceFilter(e.target.value)}
                      >
                        <option value="Service" disabled hidden>{t('service')}</option>
                        <option value="sameday">Sameday Delivery</option> 
                        <option value="instant">Instant Delivery</option>
                        <option value="middlemile">Superkul Truck</option>
                        <option value="dedicated">Dedicated Delivery</option>
                      </select>
                    {/* //   : null */}
                    

                    <div className="date-range-filter">
                      <DateRanged 
                        dataFromChild={dateRangeData} 
                        defaultValue={dateDefault}
                      />
                    </div>

                  </div>
                  {/* <button className="reset-filter" onClick={resetFilter}>Reset</button> */}
                  <button className="reset-filter" onClick={resetData}>{t('')}Reset</button>
                </div>
                {placeholder ? 
                    <LoadingScreenSpinner />
                  :
                  transactionData.length !== 0 ?
                    transactionData.map((item) => {
                      return (
                        <DataTransactionClone data={item} status={statusFilter} dataFetch={{url,access_token,headers}} allService={menuSelected == 2 ? 'dedicated' : 'delivery'}/>
                      )
                    })
                    : 
                    <EmptyData />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
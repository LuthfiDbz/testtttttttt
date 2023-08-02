import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import Pagination from 'rc-pagination';
import "../styles/transaction/transaction.scss";
import "../styles/transaction/pagination.scss";
import { FiSearch } from "react-icons/fi";
import { TbPlayerTrackNext, TbPlayerTrackPrev, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { DateRanged } from "../Component/UI/DateRange";
import { DataTransaction } from "../Component/UI/DataTransaction";
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
import { DataTransactionClone } from "../Component/UI/DataTransaction";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const statusList = {
  deliveryList: ['ALL', 'SCHEDULED', 'ON PROGRESS', 'DONE', 'CANCELED'],
  dedicatedList: ['ALL', 'PREPARED', 'SCHEDULED', 'DEDICATED', 'DONE', 'CANCELED']
}

// const statusList = {
//   deliveryList: [
//     'Scheduled Order', 
//     'On Progress', 
//     'Done', 'Canceled'],
//   dedicatedList: ['Being Prepared', 'Scheduled', 'Dedicated', 'Done', 'Canceled']
// }

export const Transaction = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const srvc = searchParams.get('srvc')
  const [placeholder, setPlaceholder] = useState(true)
  // const auth_context = useContext(AuthContext)
  // const id = auth_context.id
  const [transactionData, setTransactionData] = useState([])
  const [metaData, setMetaData] = useState({
    perPage: 15,
    currentPage: 1,
    total: 1
  })
  const [menuSelected, setMenuSelected] = useState(srvc == 2 ? 2 : 1)
  const [sidebar, setSidebar] = useState(srvc == 2 ? statusList.dedicatedList : statusList.deliveryList)
  const [searchFilter, setSearchFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [serviceFilter, setServiceFilter] = useState("Service")
  const [dateDefault, setDateDefault] = useState([
    {
      startDate: new Date("2023-01-01"),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ])

  const [paramsFilter, setParamsFilter] = useState({
    page: 1,
    status: "ALL",
    service: "Service",
    startDate: '',
    endDate: '',
  })

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  const getStatusOrderDelivery = (value) => {
    switch (value) {
      case "ALL":
        return t('all');
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
      case "ALL":
        return t('all');
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

  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;
    getTransactionData(signal)

    return () => {controller.abort();}
  }, [menuSelected, paramsFilter])



  const getTransactionData = async (signal) => {
    setPlaceholder(true)
    let endPoint = menuSelected == 1 ? 'order-history' : 'dedicated-history'
    let fullURL = `${url}/api/${endPoint}/${id}`
    if(
      paramsFilter.status === 'ALL' && 
      paramsFilter.service === 'Service' && 
      paramsFilter.startDate === '' && 
      paramsFilter.endDate === ''
    ) {
      fullURL = `${url}/api/${endPoint}/${id}`
    } 

    if(paramsFilter.status !== 'ALL') {
      fullURL = `${url}/api/${endPoint}/${id}/${paramsFilter.status}`
      if(paramsFilter.service !== 'Service') {
        fullURL = `${url}/api/order-history-service/${id}/${paramsFilter.status}/${paramsFilter.service}`
      }
      if(paramsFilter.startDate !== '') {
        endPoint = menuSelected == 1 ? 'order-history-date' : 'dedicated-history-date'
        fullURL = `${url}/api/${endPoint}/${id}/${paramsFilter.status}/${paramsFilter.startDate}/${paramsFilter.endDate}`
      }
    } else if(paramsFilter.startDate !== '') {
      endPoint = menuSelected == 1 ? 'order-history-date' : 'dedicated-history-date'
      fullURL = `${url}/api/${endPoint}/${id}/${paramsFilter.startDate}/${paramsFilter.endDate}`
    }

    try {
      const response = await axios.get(`${fullURL}?page=${paramsFilter.page}`, {headers, signal})
      const data = response.data.data
      setPlaceholder(false)
      setTransactionData(data)
      setMetaData({
        perPage: response.data.perPage,
        currentPage: response.data.currentPage,
        total: response.data.total,
      })
    } catch(error) {
      console.log(error.message)
    }
  }

  const resetData = () => {
    setSearchFilter('')
    setStatusFilter('ALL')
    setServiceFilter('Service')
    setParamsFilter({
      page: 1,
      status: "ALL",
      service: "Service",
      startDate: '',
      endDate: '',
    })
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
    setParamsFilter({
      ...paramsFilter,
      startDate: startDate,
      endDate: endDate,
      page: 1
    })
  }

  return (
    <>
      <div className="container-transaction">
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
                    setStatusFilter('ALL')
                    setParamsFilter({
                      ...paramsFilter,
                      status: "ALL",
                      page: 1
                    })
                    setMenuSelected(1); 
                    setSidebar(statusList.deliveryList); 
                    // getTransactionData('delivery')
                  }}
                  active={menuSelected === 1}
                >Delivery Service</Button>
                <Button 
                  className="dedicated-service service"
                  color="primary"
                  outline
                  onClick={() => {
                    setStatusFilter('ALL')
                    setParamsFilter({
                      ...paramsFilter,
                      status: "ALL",
                      page: 1
                    })
                    setMenuSelected(2); 
                    setSidebar(statusList.dedicatedList); 
                    // getTransactionData('dedicated')
                  }}
                  active={menuSelected === 2}
                >Dedicated Service</Button>
              </ButtonGroup>
            </div>
            <div className="transaction-content">
              <div className="transaction-sidebar">
                <h4 >{t('statusOrder')}</h4>
                {sidebar.map((item, index) => (
                  <button
                    key={index}
                    className={`sidebar-item ${statusFilter === item ? 'active' : ''}`}
                    onClick={() => {
                      setStatusFilter(item)
                      setParamsFilter({
                        ...paramsFilter,
                        status: item,
                        page: 1
                      })
                    }}
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
                <div className='filtering'>
                  <div className="filtering-input">
                    <div className="input-search">
                      <input
                        placeholder="Search..."
                        className="search-transactions"
                        type="text"
                        name="first-name"
                        value={searchFilter}
                        onChange={(e) => {
                          setParamsFilter({
                            ...paramsFilter,
                            page: 1
                          })
                          setSearchFilter(e.target.value)
                        }}
                      />
                      <FiSearch className={`icon-search`}/>
                    </div>
                      <select 
                        className="service-btn-trans" 
                        value={serviceFilter} 
                        style={{
                          visibility: menuSelected === 1 && statusFilter !== 'ALL' ? "" : "hidden"
                        }}
                        onChange={(e) => {
                          setServiceFilter(e.target.value)
                          setParamsFilter({
                            ...paramsFilter,
                            service: e.target.value,
                            page: 1
                          })
                        }}
                      >
                        <option value="Service">{t('service')}</option>
                        <option value="sameday">Sameday Delivery</option> 
                        <option value="instant">Instant Delivery</option>
                        <option value="middlemile">Superkul Truck</option>
                        <option value="dedicated">Dedicated Delivery</option>
                      </select>
                    

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
                  transactionData.length !== 0 ? (
                    <>
                      {transactionData.map((item) => {
                        return (
                          <DataTransaction 
                            data={item} 
                            status={statusFilter} 
                            allService={menuSelected == 2 ? 'dedicated' : 'delivery'}
                          />
                        )
                      })}
                      {menuSelected == 1 &&
                        <Pagination
                          showTotal={(total, range) =>
                            `Showing ${range[0]} - ${range[1]} of ${total} items`
                          }
                          total={metaData?.total  || 1}
                          nextIcon={<GrFormNext />}
                          prevIcon={<GrFormPrevious />}
                          onChange={(a) => {
                            setParamsFilter({...paramsFilter, page: a})
                          }}
                          current={metaData?.currentPage || 1}
                          pageSize={metaData?.perPage || 1}
                        />
                      }
                    </>
                  )
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
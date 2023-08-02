import React, { useEffect, useState } from "react";
import "../../../styles/ticketComplain/ticketComplain.scss";
import { RiFileListFill } from 'react-icons/ri'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Placeholder } from "reactstrap";
import format from "date-fns/format";
import { useTranslation } from "react-i18next";
import { EmptyData } from "../../emptyData/EmptyData";
import { TicketComplainDetail } from "../modal/TicketComplainDetail";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { errorPopup, networkErrorPopup } from "../modal/PopUp/ErrorPopUp";

export const TicketComplain = () => {
  const auth_context = useContext(AuthContext)
  const id = auth_context.id
  const [complaintData, setComplaintData] = useState([])
  const [selectedTicket, setSelectedTicket] = useState('')
  const [placeholder, setPlaceholder] = useState(true)
  const { t } = useTranslation()
  const [openTripPoint, setOpenTripPoint] = useState(false);
  const toggleTripPoint = () => {
    setOpenTripPoint(!openTripPoint)
  }

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    getTicketComplaint()
  }, [])
  

  const getTicketComplaint = async () => {
    try {
      const response = await axios.get(`${url}/api/ticket-complaint/${id}`, {headers})
      const data = response.data.data
      setPlaceholder(false)
      setComplaintData(data)
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      }
    }
  }

  const handleDetail = (data) => {
    setSelectedTicket(data)
    toggleTripPoint()
  }

  return (
    <div className="ticket-complain">
      <div className="header-ticket">{t('ticketComplaint')}</div>
      {
        complaintData.length !== 0 ?
          complaintData.map((data, index) => (
          <div className="list-ticket" key={index} onClick={()=> handleDetail(data)}>
            <div className="container-icon-ticket">
                <RiFileListFill className="icon-ticket"/>
            </div>
            <div className="container-detail-ticket">
                <p className="date-ticket">{format(Date.parse(data.created_at), 'dd MMM yyy')}, {format(Date.parse(data.created_at), 'HH:mm')}</p>
                <p className="name-ticket">{t('ticket')} {data.ticket_number}</p>
            </div>
            <div className="container-status-ticket">
              {data.status == 0 &&
                <div className='waiting'>Waiting</div>
              }
              {data.status == 1 &&
                <div className='done'>Done</div>
              }
              {data.status == 2 &&
                <div className='onprogress'>Process</div>
              }
              {data.status == 3 &&
                <div className='cancel'>Cancel</div>
              }
            </div>
          </div>
          ))
        :
          !placeholder && <EmptyData />
      }
      {placeholder && 
      <div className="list-ticket">
        <div className="container-icon-ticket">
            <RiFileListFill className="icon-ticket"/>
        </div>
        <div className="container-detail-ticket placeholder-glow">
          <p class="placeholder-glow col-8">
            <span class="placeholder col-6 placeholder-xs rounded-1"></span>
            <span class="placeholder col-12 rounded-2"></span>
          </p>
        </div>
        <div className="container-status-ticket">
          <p class="placeholder-glow col-9">
            <span class="placeholder col-12 rounded-2"></span>
          </p>
        </div>
      </div>}
      <TicketComplainDetail isOpen={openTripPoint} toggle={toggleTripPoint} data={selectedTicket}/>
    </div>
  );
};

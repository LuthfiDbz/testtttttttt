import axios from "axios";
import React, { useEffect, useState } from "react";
import DriverAvatar from '../../../assets/img/img-avatar-1.png'
import PickIconMini from '../../../assets/icon/ic-location-blue-1.png'
import DropIconMini from '../../../assets/icon/ic-location-yellow-1.png'
import TestImageTripDone from '../../../assets/img/img-hero-driver.png'
import { AiFillStar } from "react-icons/ai";
import { Badge, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import '../../../styles/ticketComplain/ticketComplainDetail.scss'
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

export const TicketComplainDetail = ({isOpen, toggle, data}) => {
  const { t } = useTranslation()
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [ticketData, setTicketData] = useState('')

  useEffect(() => {
    setTicketData(data)
  }, [data])

  // if(detailPointData === undefined || tripData === undefined || allData === undefined ||detailPointData.item === undefined) return null
  if(ticketData === '') return null

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="ticket-complain-detail">
      <ModalHeader className="ticket-complain-detail-header" >
        <div className="header-content">
          <div>
            <h3 className="title">{t('ticket')} {data.ticket_number}</h3>
            <h5>{format(Date.parse(data.created_at), 'dd MMM yyy, HH.mm')}</h5>
          </div>
          {data.status == 0 &&
            <Badge className='waiting'>Waiting</Badge>
          }
          {data.status == 1 &&
            <Badge className='done'>Done</Badge>
          }
          {data.status == 2 &&
            <Badge className='onprogress'>Process</Badge>
          }
          {data.status == 3 &&
            <Badge className='cancel'>Cancel</Badge>
          }
        </div>
      </ModalHeader>
      <ModalBody className="ticket-complain-detail-body">
        <p>{data.complaint_description}</p>
        
      </ModalBody>
      <ModalFooter className="ticket-complain-detail-footer">
        <Button className="close" onClick={toggle}>
          {t('close')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

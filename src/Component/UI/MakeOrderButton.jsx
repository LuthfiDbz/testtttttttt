import React, { useRef, useState } from "react";
import "../../styles/newOrderBtn/newOrder.scss";
import Delivery from "../../assets/icon/ic-service-sameday-inactive.png";
import Dedicated from "../../assets/icon/ic-service-dedicated.png";
import ConfirmIcon from "../../assets/img/img-state-confirmation.png";
import { DedicatedService } from "./modal/DedicatedService";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const MakeOrderButton = ({userType}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef();
  const btnRef = useRef();

  const handleOpenDedicated = () => {
    userType === 3 ? 
      setOpenModal(true) 
      :
      Swal.fire({
        title: t('notCorporateAccount'),
        imageUrl: ConfirmIcon,
        showConfirmButton: true,
        confirmButtonColor: '#1F83BB',
        confirmButtonText: t('close'),
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal',
          htmlContainer: 'text-swal',
          confirmButton:'confirm-swal'
        }
      })
  }

  window.addEventListener("click", (e) => {
    if(window.innerWidth > 767) {
      if (e.target !== menuRef.current && e.target !== btnRef.current) {
        setOpen(false);
      }
    }
  });
  return (
    <div>
      <button
        className="btn-new-order"
        ref={btnRef}
        onClick={() => setOpen(!open)}
      >
        + {t('makeNewOrder')}
      </button>
      {open && (
        <div className="menu-container-new-order" ref={menuRef}>
          <ul>
            <li className="menu-item" onClick={() => navigate('/delivery')}>
              <img src={Delivery} alt="menu-icon" />{t('deliveryService')}
            </li>
            <li className="menu-item" onClick={handleOpenDedicated}>
              <img src={Dedicated} alt="menu-icon" />{t('dedicatedService')}
            </li>
          </ul>
        </div>
      )}
      <DedicatedService open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

import React, { useRef, useState } from "react";
import "../../styles/transactionButton/transactionButton.scss";
import ArrowIcon from "../../assets/icon/ic-arrow-trans.png";
import { DedicatedService } from "./modal/DedicatedService";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";

export const TransactionButton = ({userType}) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef();
  const btnRef = useRef();
  const auth_context = useContext(AuthContext)

  

  window.addEventListener("click", (e) => {
    if(window.innerWidth > 767) {
      if (e.target !== menuRef.current && e.target !== btnRef.current) {
        setOpen(false);
      }
    }
  });
  return (
    <div className="btn-transaction">
      <h1
        className="btn-transaction-header"
        ref={btnRef}
        onClick={() => setOpen(!open)}
      >
        {t('transaction')}
        <img src={ArrowIcon} alt="" />
      </h1>
      {open && (
        <div className="transaction-btn-container" ref={menuRef}>
          <ul>
            <li className="menu-item">
              <a href={`/transaction/${auth_context.id}`}>
                {t('deliveryService')}
              </a>
            </li>
            <li className="menu-item" >
             <a href={`/transaction/${auth_context.id}?srvc=2`}>
                {t('dedicatedService')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

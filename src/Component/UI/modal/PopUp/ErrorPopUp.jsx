import React from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import ConfirmIcon from '../../../../assets/img/img-state-confirmation.png'

export function errorPopup(title, text ,confirmText, image) {
  Swal.fire({
    title: title,
    html: text,
    imageUrl: image ?? ConfirmIcon,
    showConfirmButton: true,
    confirmButtonColor: '#1F83BB',
    confirmButtonText: confirmText,
    customClass: {
      popup: 'popup-swal',
      title: 'title-swal',
      htmlContainer: 'text-swal',
      confirmButton:'confirm-swal'
    }
  })
}

export function networkErrorPopup(title, text, confirm, cancel) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: '#1F83BB',
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    reverseButtons: true,
    customClass: {
      popup: 'popup-swal',
      title: 'title-swal',
      htmlContainer: 'text-swal',
      confirmButton:'confirm-swal',
      cancelButton: 'cancel-swal'
    }
  }).then((result) => {
    if(result.isConfirmed) {
      window.location.reload()
    } 
  })
}
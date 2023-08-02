import Swal from "sweetalert2";
import ConfirmIcon from "../assets/img/img-state-confirmation.png";
import {t} from "i18next";

export function errorMessage(err, title, text, confirmText, image) {
  if (err.message === "Network Error") {
    Swal.fire({
      title: t("networkErrorTitle"),
      text: t("networkErrorText"),
      icon: "error",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#1F83BB",
      confirmButtonText: t("reload"),
      cancelButtonText: t("cancel"),
      reverseButtons: true,
      customClass: {
        popup: "popup-swal",
        title: "title-swal",
        htmlContainer: "text-swal",
        confirmButton: "confirm-swal",
        cancelButton: "cancel-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  } else {
    Swal.fire({
      title: title,
      html: text,
      imageUrl: image ?? ConfirmIcon,
      showConfirmButton: true,
      confirmButtonColor: "#1F83BB",
      confirmButtonText: confirmText,
      customClass: {
        popup: "popup-swal",
        title: "title-swal",
        htmlContainer: "text-swal",
        confirmButton: "confirm-swal",
      },
    });
  }
}

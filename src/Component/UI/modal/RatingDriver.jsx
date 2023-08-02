import axios from "axios";
import React, { useEffect, useState } from "react";
import DriverAvatar from '../../../assets/img/img-avatar-1.png'
import ConfirmIcon from '../../../assets/img/img-state-confirmation.png'
import SuccessIcon from '../../../assets/img/img-state-success.png'
import { AiFillStar } from "react-icons/ai";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import '../../../styles/driverRating/driverRating.scss'
import { LoadingScreen } from "../../loadingScreen/loadingScreen";
import { toast } from "react-hot-toast";
import { errorPopup } from "./PopUp/ErrorPopUp";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export const RatingDriver = ({isOpen, toggle, driverData, allData}) => {
  const { t } = useTranslation()
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [starsRate, setStarsRate] = useState(driverData.driverRating === 0 ? 1 : driverData.driverRating)
  const [ratingNotes, setRatingNotes] = useState('')
  const [hover, setHover] = useState(driverData.driverRating === 0 ? 1 : driverData.driverRating);
  const textRate = ['Worst!','Bad!','Good!','Awesome!','Excellent!']

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    setStarsRate(driverData.driverRating === 0 ? 1 : driverData.driverRating)
    setHover(driverData.driverRating === 0 ? 1 : driverData.driverRating)
    setRatingNotes(driverData.driverComment)
  }, [driverData])

  const handleSubmit = async () => {
    const data = {
      driver_id: driverData.driverId,
      rating: starsRate,
      customer_id: allData.customerId,
      comment: ratingNotes,
      trip_id: driverData._id,
      trip_number: driverData.tripNumber
    }
    setLoadingScreen(true)
    try {
      const response = await axios.post(`${url}/api/rating`, data, {headers})
      
      setLoadingScreen(false)
      toggle()
      Swal.fire({
        title: t('rateAdded'),
        imageUrl: SuccessIcon,
        showConfirmButton: false,
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal',
          confirmButton:'confirm-swal'
        }
      })

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch(error) {
      console.log(error.message)
      setLoadingScreen(false)
      errorPopup(t('error'),t('somethingError'), t('close'))
    } 
  }

  const handleSkip = () => {
    setStarsRate(driverData.driverRating === 0 ? 1 : driverData.driverRating)
    setHover(driverData.driverRating === 0 ? 1 : driverData.driverRating)
    setRatingNotes(driverData.driverComment)
    toggle()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={`rating-driver ${loadingScreen && 'loading'}`}>
      <ModalHeader className="rating-driver-header" >
        {t('pleaseRateDriver')}
      </ModalHeader>
      <ModalBody className="rating-driver-body">
        {/* <img src={driverData.driverPhoto} alt="" className="driver-photo"/> */}
        <img src={`${process.env.REACT_APP_IMG_URL}/driver/${driverData.driverPhoto}`} alt="" className="driver-photo"/>
        <h4 className="driver-name">{driverData.driverName}</h4>
        <h5 className="vehicle-type">{allData.vehicleType}</h5>
        <div className="stars"> 
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || starsRate) ? "on" : "off"}
                onClick={() => setStarsRate(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(starsRate)}
              >
                <AiFillStar className="stars-rate"/> 
              </button>
            );
          })}
        </div>
        <h4 className="text-rate">{textRate[starsRate - 1]}</h4>
        <div className="comment">
          <input type="text" id="comment-notes" name="comment-notes" value={ratingNotes} onChange={(e) => setRatingNotes(e.target.value)}/>
          <label htmlFor="comment-notes">{t('notes')}</label>
        </div>
      </ModalBody>
      <ModalFooter className="rating-driver-footer">
        <Button className={`rating-skip ${loadingScreen && 'loading'}`} onClick={handleSkip}>
          {t('skip')}
        </Button>
        <Button className={`rating-submit ${loadingScreen && 'loading'}`} onClick={handleSubmit}>
          {t('submit')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
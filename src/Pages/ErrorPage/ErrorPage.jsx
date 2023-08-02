import React from "react";
import '../../styles/notFoundPage/notFoundPage.scss'
import NotFoundImg from '../../assets/img/img-notfound.png'

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <img src={NotFoundImg} alt="" className="img-404"/>
    </div>
  )
}
import React from "react";
import Bg from "../assets/img/img-bg-coming-soon.png"
import ComingSoonImg from "../assets/img/img-coming-soon.png"
import '../styles/comingSoon/comingSoon.scss'

export const ComingSoon = () => {
  return (
    <div className="coming-soon" style={{backgroundImage: `url(${Bg})`}}>
      <div className="coming-soon-container">
        <img src={ComingSoonImg} alt="" />
        <h4>Kami akan segera hadir</h4>
        <h6>Tekan tombol di bawah ini untuk infomasi lebih lanjut</h6>
        <a href="https://api.whatsapp.com/send/?phone=%2B6282130000298&text=Halo+Admin+Superkul+%21%0ASaya+tertarik+menggunakan+layanan+Superkul.+Apakah+bisa+dibantu+%3F&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"><button className="btn ">Hubungi Admin Superkul</button></a>
      </div>
    </div>
  ) 
}
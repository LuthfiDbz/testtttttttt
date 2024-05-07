import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../../styles/slider/slider.scss";

import ArrowLeftIcon from "../../../assets/icon/ic-arrow-left@2x.png";
import ArrowRightIcon from "../../../assets/icon/ic-arrow-right@2x.png";

export const Promo = () => {
  const navigate = useNavigate();
  const [promoData, setPromoData] = useState([]);
  const settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    // slidesToShow: promoData.length > 2 ? 3 : promoData.length == 2 ? 2 : 1,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const slider = useRef();

  const url = process.env.REACT_APP_URL_CUST;
  const access_token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `${access_token}`,
  };

  useEffect(() => {
    getPromoAvailable();
  }, []);

  const getPromoAvailable = async () => {
    try {
      const response = await axios.get(`${url}/api/promo`, { headers });
      const data = response.data.data;
      setPromoData(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container-slider">
      <Slider
        {...settings}
        ref={slider}
        className={
          promoData.length < 4 && window.innerWidth > 700 ? "hide-cloned" : ""
        }
      >
        {promoData.map((item) => (
          <div onClick={() => navigate(`/promo/${item.id}`)}>
            <div
              style={{
                backgroundImage: `url(${process.env.REACT_APP_IMG_URL}/promo/${item.img_banner})`,
              }}
            ></div>
          </div>
        ))}
      </Slider>
      {promoData.length > 3 && window.innerWidth > 700 ? (
        <>
          <img
            src={ArrowLeftIcon}
            alt=""
            className="arrow-left"
            onClick={() => slider?.current?.slickPrev()}
          />
          <img
            src={ArrowRightIcon}
            alt=""
            className="arrow-right"
            onClick={() => slider?.current?.slickNext()}
          />
        </>
      ) : null}
    </div>
  );
};

import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import singapura from "../../../assets/icon/client/PT-Singapura-Fresh-Green.jpg";
// import tigaraksa from "../../../assets/icon/client/PT-Tigaraksa-Satria.jpg";
// import mcdeli from "../../../assets/icon/client/Mc-Deli.png";
// import amazingFarm from "../../../assets/icon/client/Amazing-Farm.png";
// import biomed from "../../../assets/icon/client/Biomed-Sinergi.png";
// import campina from "../../../assets/icon/client/Campina.png";
// import chiayo from "../../../assets/icon/client/Chia-Yo.jpg";
// import efishery from "../../../assets/icon/client/Efishery.jpg";
// import haagen from "../../../assets/icon/client/Haagen-daaz.png";
// import joyday from "../../../assets/icon/client/IC-Joyday.png";
import amazing from "../../../assets/icon/client/Row1/amazing.png"
import campina from "../../../assets/icon/client/Row1/campina.png"
import chiayo from "../../../assets/icon/client/Row1/chiayou.png"
import flash from "../../../assets/icon/client/Row1/flash.png"
import goodheart from "../../../assets/icon/client/Row1/goodheart.png"
import haagen from "../../../assets/icon/client/Row1/haagen.png"
import prima from "../../../assets/icon/client/Row1/prima.png"
import threefolks from "../../../assets/icon/client/Row1/threefolks.png"
import tigaraksa from "../../../assets/icon/client/Row1/tigaraksa.png"

import freshfactory from "../../../assets/icon/client/Row2/freshfactory.png"
import frozendept from "../../../assets/icon/client/Row2/frozendept.png"
import kanemory from "../../../assets/icon/client/Row2/kanemory.png"
import karajo from "../../../assets/icon/client/Row2/karajo.png"
import maza from "../../../assets/icon/client/Row2/maza.png"
import primafood from "../../../assets/icon/client/Row2/primafood.png"
import sekarbumi from "../../../assets/icon/client/Row2/sekarbumi.png"
import sidoagung from "../../../assets/icon/client/Row2/sidoagung.png"

import bakersun from "../../../assets/icon/client/Row3/bakersun.png"
import batamindo from "../../../assets/icon/client/Row3/batamindo.png"
import beleaf from "../../../assets/icon/client/Row3/beleaf.png"
import joyday from "../../../assets/icon/client/Row3/joyday.png"
import lesglacee from "../../../assets/icon/client/Row3/lesglacee.png"
import mcdeli from "../../../assets/icon/client/Row3/mcdeli.png"
import sewu from "../../../assets/icon/client/Row3/sewu.png"
import venchi from "../../../assets/icon/client/Row3/venchi.png"
import vilo from "../../../assets/icon/client/Row3/vilo.png"

import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";

// import "../../../styles/slider/slider.scss";
import "../../../styles/client/client-slider.scss";

export const ClientSlider = () => {
  const { t } = useTranslation();
  const clientData1 = [
    {
      imgUrl: amazing,
      alt: 'Amazing Farm',
    },
    {
      imgUrl: campina,
      alt: 'Campina'
    },
    {
      imgUrl: chiayo,
      alt: 'Chia-Yo'
    },
    {
      imgUrl: flash,
      alt: 'Flash Coffee'
    },
    {
      imgUrl: goodheart,
      alt: 'Goodheart Salmon',
    },
    {
      imgUrl: haagen,
      alt: 'Haagen Dazs'
    },
    {
      imgUrl: prima,
      alt: 'Prima Freshmart'
    },
    {
      imgUrl: threefolks,
      alt: 'Three Folks'
    },
    {
      imgUrl: tigaraksa,
      alt: 'PT. Tigaraksa Satria'
    },
  ]

  const clientData2 = [
    {
      imgUrl: freshfactory,
      alt: 'Amazing Farm',
    },
    {
      imgUrl: frozendept,
      alt: 'Campina'
    },
    {
      imgUrl: kanemory,
      alt: 'Chia-Yo'
    },
    {
      imgUrl: karajo,
      alt: 'Flash Coffee'
    },
    {
      imgUrl: maza,
      alt: 'Goodheart Salmon',
    },
    {
      imgUrl: primafood,
      alt: 'Haagen Dazs'
    },
    {
      imgUrl: sekarbumi,
      alt: 'Prima Freshmart'
    },
    {
      imgUrl: sidoagung,
      alt: 'Three Folks'
    },
  ]

  const clientData3 = [
    {
      imgUrl: bakersun,
      alt: 'Amazing Farm',
    },
    {
      imgUrl: batamindo,
      alt: 'Campina'
    },
    {
      imgUrl: beleaf,
      alt: 'Chia-Yo'
    },
    {
      imgUrl: joyday,
      alt: 'Flash Coffee'
    },
    {
      imgUrl: lesglacee,
      alt: 'Goodheart Salmon',
    },
    {
      imgUrl: mcdeli,
      alt: 'Haagen Dazs'
    },
    {
      imgUrl: sewu,
      alt: 'Prima Freshmart'
    },
    {
      imgUrl: venchi,
      alt: 'Three Folks'
    },
    {
      imgUrl: vilo,
      alt: 'Three Folks'
    },
  ]

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 7000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: "linear",
    rtl: true,
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
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div
      className="container-client-slider"
    // style={{
    //   padding: '120px'
    // }}
    >
      <Row>
        <Col xs="24" lg="12" className="client-text text-center">
          <h1 className="fw-bold">{t("clientSection.ourClient")}</h1>
          <p>{t("clientSection.weHaveGave")}</p>
        </Col>

        <Col>
          <Slider {...settings}>
            {clientData1.map((item, index) => (
              <div className="client-item">
                <img
                  src={item.imgUrl}
                  alt={item.alt}
                />
              </div>
            ))}
          </Slider>
          <Slider {...settings2}>
            {clientData2.map((item, index) => (
              <div className="client-item">
                <img
                  src={item.imgUrl}
                  alt={item.alt}
                />
              </div>
            ))}
          </Slider>
          <Slider {...settings}>
            {clientData3.map((item, index) => (
              <div className="client-item">
                <img
                  src={item.imgUrl}
                  alt={item.alt}
                />
              </div>
            ))}
          </Slider>
        </Col>

      </Row>
    </div>
  );
};

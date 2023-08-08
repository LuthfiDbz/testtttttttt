import React from "react";
import { Col, Row } from "reactstrap";
import singapura from "../../../assets/icon/client/PT-Singapura-Fresh-Green.jpg";
import tigaraksa from "../../../assets/icon/client/PT-Tigaraksa-Satria.jpg";
import mcdeli from "../../../assets/icon/client/Mc-Deli.png";
import amazingFarm from "../../../assets/icon/client/Amazing-Farm.png";
import biomed from "../../../assets/icon/client/Biomed-Sinergi.png";
import campina from "../../../assets/icon/client/Campina.png";
import chiayo from "../../../assets/icon/client/Chia-Yo.jpg";
import efishery from "../../../assets/icon/client/Efishery.jpg";
import haagen from "../../../assets/icon/client/Haagen-daaz.png";
import joyday from "../../../assets/icon/client/joyday.png";

import "../../../styles/client/client.scss";
import { useTranslation } from "react-i18next";

export const Client = () => {
  const { t } = useTranslation();

  const clientData = [
    {
      imgUrl: singapura,
      alt: 'PT Singapura Fresh Green'
    },
    {
      imgUrl: tigaraksa,
      alt: 'PT Tigarakasa Satria'
    },
    {
      imgUrl: mcdeli,
      alt: 'Mc Deli'
    },
    {
      imgUrl: amazingFarm,
      alt: 'Amazing Farm'
    },
    {
      imgUrl: biomed,
      alt: 'Biomed Sinergi'
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
      imgUrl: efishery,
      alt: 'eFishery'
    },
    {
      imgUrl: haagen,
      alt: 'Haagen Dazs'
    },
    {
      imgUrl: joyday,
      alt: 'Joyday'
    },
  ];
  return (
    <div className="container-client">
      <Row>
        <Col lg="12" className="client-text text-center">
          <h1 className="fw-bold">{t("clientSection.ourClient")}</h1>
          <p>{t("clientSection.weHaveGave")}</p>
        </Col>

        {clientData.map((item, index) => (
          <Col key={index} className="mt-3 col-6 col-md-3">
            <div className="client-item" data-aos="fade-up">
              <img src={item.imgUrl} alt={item.alt} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

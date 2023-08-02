import React from "react";
import { Col, Row } from "reactstrap";
import lessGlacee from "../../../assets/icon/client/les-glacee.jpg";
import bakersun from "../../../assets/icon/client/bakersun.jpeg";
import chiayo from "../../../assets/icon/client/chiayo.jpg";
import goodHeart from "../../../assets/icon/client/goodheart.jpeg";
import joyDay from "../../../assets/icon/client/joyday.png";
import sewuPrimatama from "../../../assets/icon/client/sewu-primatama.png";
import ziato from "../../../assets/icon/client/ziato.jpeg";
import cmpi from "../../../assets/icon/client/cmpi.png";

import "../../../styles/client/client.scss";
import { useTranslation } from "react-i18next";

export const Client = () => {
  const { t } = useTranslation();

  const clientData = [
    {
      imgUrl: lessGlacee,
    },
    {
      imgUrl: bakersun,
    },
    {
      imgUrl: chiayo,
    },
    {
      imgUrl: goodHeart,
    },
    {
      imgUrl: joyDay,
    },
    {
      imgUrl: sewuPrimatama,
    },
    {
      imgUrl: ziato,
    },
    {
      imgUrl: cmpi,
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
              <img src={item.imgUrl} alt="feature-img" />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

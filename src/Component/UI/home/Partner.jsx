import React from "react";
import { Col, Row } from "reactstrap";
import Driver from "../../../assets/img/driver.png";
import Vendor from "../../../assets/img/vendor.png";
import "../../../styles/partner/partner.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Partner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div className="container-partner">
      <Row>
        <Col lg="12" className="partner-text text-center">
          <h1 className="fw-bold px-3 px-md-0">
            {t("partnerSection.interestServices")}
          </h1>
          <p>{t("partnerSection.becomePartner")}</p>
        </Col>

        <Col className="mt-3 d-block d-md-flex justify-content-center">
          <div className="card-container" data-aos="zoom-in">
            <h4 className="title-card">Driver</h4>
            <p className="desc-card">{t("partnerSection.findOutDriver")}</p>
            <img className="card-img" src={Driver} alt="Driver" />
            <a href="/driver">
              <button className="card-btn" >{t("readMore")}</button>
            </a>
          </div>
          <div className="card-container" data-aos="zoom-in">
            <h4 className="title-card">{t("Vendor")}</h4>
            <p className="desc-card">{t("partnerSection.findOutVendor")}</p>
            <img className="card-img-vendor" src={Vendor} alt="Driver" />
            <a href="/mitra">
              <button className="card-btn" >{t("readMore")}</button>
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

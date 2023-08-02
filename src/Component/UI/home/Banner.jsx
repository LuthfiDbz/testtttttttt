import React from "react";
import { Col, Container, Row } from "reactstrap";
import BannerImg from "../../../assets/img/banner-img.png";
import "../../../styles/banner/banner.scss";
import AppStore from "../../../assets/img/app-store.png";
import PlayStore from "../../../assets/img/play-store.png";
import { useTranslation } from "react-i18next";

export const Banner = () => {
  const { t } = useTranslation();

  return (
    <div>
      <section className="banner-container">
        <Container>
          <Row>
            <Col lg="5" className="banner-text">
              <div className="banner-content">
                <h2 className="mb-4 fw-bolder banner-title">
                  {t("bannerSection.deliveringColStuff")}
                </h2>
                <p className="banner-paragraf">
                  {t("bannerSection.makeItEasier")}
                </p>

                <div className="d-flex align-items-center gap-2 mt-4">
                  <img
                    href="#"
                    src={AppStore}
                    alt="banner-img"
                    className="appstore-img"
                    />
                  <img
                    href="#"
                    src={PlayStore}
                    alt="banner-img"
                    className="playstore-img"
                    onClick={() => window.open("https://play.google.com/store/apps/details?id=com.superkul.customer.app&pli=1")}
                  />
                </div>
              </div>
            </Col>

            <Col className="image-container d-none d-md-block" data-aos="fade-left">
              <img src={BannerImg} alt="banner-img" className="banner-img" />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

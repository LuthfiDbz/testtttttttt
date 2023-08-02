import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Row } from "reactstrap";
import heroImg from "../../assets/img/img-hero-vendor-1.png";
import Features1 from "../../assets/img/feature1.png";
import Features2 from "../../assets/img/feature2.png";
import Features3 from "../../assets/img/feature3.png";
import Features4 from "../../assets/img/feature4.png";
import Service from "../../assets/img/feature2.png";
import Driver from "../../assets/img/driver.png";
import DriverGuide from "../../assets/img/vendor.png";
import Vendor from "../../assets/img/vendor.png";
import Customer from "../../assets/img/img-customer-icon.png";

import '../../styles/mitraPage/mitraPage.scss'
import { Link, useNavigate } from "react-router-dom";
import { Question } from "../../Component/UI/home/faq/Question";
import { Footer } from "../../Component/footer/Footer";
import { useEffect } from "react";

export const MitraPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0,0,'auto')
  }, [])

  const featureData = [
    {
      imgUrl: Features1,
      desc: t("mitraPage.profitDriver.p1"),
    },
    {
      imgUrl: Features2,
      desc: t("mitraPage.profitDriver.p2"),
    },
    {
      imgUrl: Features3,
      desc: t("mitraPage.profitDriver.p3"),
    },
    {
      imgUrl: Features4,
      desc: t("mitraPage.profitDriver.p4"),
    }
  ];

  const guideData = [
    {
      title: t("mitraPage.howToJoin.h1.title"),
      desc: t("mitraPage.howToJoin.h1.desc"),
    },
    {
      title: t("mitraPage.howToJoin.h2.title"),
      desc: t("mitraPage.howToJoin.h2.desc"),
    },
    {
      title: t("mitraPage.howToJoin.h3.title"),
      desc: t("mitraPage.howToJoin.h3.desc"),
    },
    {
      title: t("mitraPage.howToJoin.h4.title"),
      desc: t("mitraPage.howToJoin.h4.desc"),
    },
    {
      title: t("mitraPage.howToJoin.h5.title"),
      desc: t("mitraPage.howToJoin.h5.desc"),
    },
  ];

  const data = [
    {
      title: t("mitraPage.generalQuestion.q1.q"),
      info: t("mitraPage.generalQuestion.q1.a"),
    },
    {
      title: t("mitraPage.generalQuestion.q2.q"),
      info: t("mitraPage.generalQuestion.q2.a"),
    },
    {
      title: t("mitraPage.generalQuestion.q3.q"),
      info: t("mitraPage.generalQuestion.q3.a"),
    },
    {
      title: t("mitraPage.generalQuestion.q4.q"),
      info: t("mitraPage.generalQuestion.q4.a"),
    }
  ];
  const [questions, setQuestions] = useState(data);
  return (
    <div className="mitra-page">
      <div className="hero-container-mitra">
        <Row className="m-0 p-0 row-hero">
          <Col lg="5" className="hero-text">
            <div className="hero_content">
              <div className="hero-content-img d-flex d-md-none mb-5 ">
                <img src={heroImg} alt="hero-img" className="hero-img" />
              </div>
              <h1 className="mb-4 hero_title">{t("mitraPage.hero.heroTitle")}</h1>

              <p className="hero-paragraf">{t("mitraPage.hero.heroDesc")}</p>

              <div className="d-flex align-items-center gap-2 mt-4 ">
                <a style={{textDecoration: 'none'}} href="https://forms.gle/NpfTrcu6sP6WAJ2p7" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="btn-join-mitra  d-flex" 
                  >
                    {t("mitraPage.hero.joinDriver")}
                  </Button>
                </a>
              </div>
            </div>
          </Col>

          <Col lg="7" md="6" className="d-none d-md-block">
            <div className="hero-img-container">
              <img src={heroImg} alt="hero-img" className="hero-img" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="mitra-features">
        <div  className="text-center">
          <h1 className="fw-bold px-5">{t("mitraPage.profitDriver.title")}</h1>
          {/* <p className="mb-1 mt-4 feature-text px-5">
            {t("featureSection.sendAnything")}
          </p> */}
        </div>

        <div className="features-content row mt-5 mt-lg-0">
          {featureData.map((item, index) => (
            <Col xs={6} lg={3} key={index} className="m-0 p-0">
              <div className="text-center feature__item mt-lg-5 ">
                <img src={item.imgUrl} alt="feature-img" />
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </div>
      </div>
      <div className="mitra-guide">
        <Container>
          <Row>
            <Col lg="7" className="guide-text">
              <div className="guide-content">
                <h2 className="mb-4 guide-title">{t("mitraPage.howToJoin.title")}</h2>

                <ol className="ordered-list">
                  {guideData.map((item, index) => (
                    <li key={index}>
                      <h4 className="guide-list-title">{item.title}</h4>
                      <p className="guide-list-desc">{item.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Col>
            <Col lg="5" className="column-img">
              <img src={DriverGuide} alt="guide-img" className="guide-img" />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="container-partner">
        <Row>
          <Col lg="12" className="partner-text text-center">
            <h1 className="fw-bold px-3 px-md-0">
              {t("mitraPage.otherInfo.title")}
            </h1>
            <p>{t("partnerSection.becomePartner")}</p>
          </Col>

          <Col className="mt-3 d-block d-md-flex justify-content-center">
            <div className="card-container">
              <h4 className="title-card">Driver</h4>
              <p className="desc-card">{t("mitraPage.otherInfo.mitra")}</p>
              <img className="card-img-vendor" src={Driver} alt="Driver" />
              <a href="/driver">
                <button className="card-btn" >{t("readMore")}</button>
              </a>
            </div>
            <div className="card-container">
              <h4 className="title-card">Customer</h4>
              <p className="desc-card">{t("mitraPage.otherInfo.customer")}</p>
              <img className="card-img" src={Customer} alt="Driver" />
              <a href="/">
                <button className="card-btn" >{t("readMore")}</button>
              </a>
            </div>
          </Col>
        </Row>
      </div>
      <div className={"container-partner"}>
        <Row>
          <Col lg="12" className="partner-text text-center">
            <h1 className="fw-bold">{t("mitraPage.generalQuestion.title")}</h1>
            <p>{t("mitraPage.generalQuestion.subtitle")}</p>
          </Col>

          <div className="container-faq">
            {questions.map((question, index) => (
              <Question key={index} {...question} />
            ))}
          </div>
        </Row>
      </div>
      <Footer />
    </div>
  )
}
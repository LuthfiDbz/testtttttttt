import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Row } from "reactstrap";
import heroImg from "../../assets/img/img-hero-driver.png";
import Features1 from "../../assets/img/feature1.png";
import Features2 from "../../assets/img/feature2.png";
import Features3 from "../../assets/img/feature3.png";
import Features4 from "../../assets/img/feature4.png";
import Service from "../../assets/img/feature2.png";
import Driver from "../../assets/img/driver.png";
import DriverGuide from "../../assets/img/driver.png";
import Vendor from "../../assets/img/vendor.png";
import Customer from "../../assets/img/img-customer-icon.png";
import DriverStory1 from "../../assets/img/img-driver-story-1.jpeg";
import DriverStory2 from "../../assets/img/img-driver-story-2.jpeg";
import DriverStory3 from "../../assets/img/img-driver-story-3.jpeg";

import '../../styles/driverPage/driverPage.scss'
import { Link, useNavigate } from "react-router-dom";
import { Question } from "../../Component/UI/home/faq/Question";
import { Footer } from "../../Component/footer/Footer";
import { useEffect } from "react";

export const DriverPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0,0,'auto')
  }, [])

  const featureData = [
    {
      imgUrl: Features1,
      desc: t("driverPage.profitDriver.p1"),
    },
    {
      imgUrl: Features2,
      desc: t("driverPage.profitDriver.p2"),
    },
    {
      imgUrl: Features3,
      desc: t("driverPage.profitDriver.p3"),
    },
    {
      imgUrl: Features4,
      desc: t("driverPage.profitDriver.p4"),
    }
  ];

  const guideData = [
    {
      title: t("driverPage.howToJoin.h1.title"),
      desc: t("driverPage.howToJoin.h1.desc"),
    },
    {
      title: t("driverPage.howToJoin.h2.title"),
      desc: t("driverPage.howToJoin.h2.desc"),
    },
    {
      title: t("driverPage.howToJoin.h3.title"),
      desc: t("driverPage.howToJoin.h3.desc"),
    },
    {
      title: t("driverPage.howToJoin.h4.title"),
      desc: t("driverPage.howToJoin.h4.desc"),
    },
    {
      title: t("driverPage.howToJoin.h5.title"),
      desc: t("driverPage.howToJoin.h5.desc"),
    },
  ];

  const serviceData = [
    {
      imgUrl: DriverStory1,
      title: "Alfianto",
      desc: t("driverPage.driverStory.d1"),
    },
    {
      imgUrl: DriverStory2,
      title: "Pandi Sunandar",
      desc: t("driverPage.driverStory.d2"),
    },
    {
      imgUrl: DriverStory3,
      title: "Son",
      desc: t("driverPage.driverStory.d3"),
    }
  ];
  const data = [
    {
      title: t("driverPage.generalQuestion.q1.q"),
      info: t("driverPage.generalQuestion.q1.a"),
    },
    {
      title: t("driverPage.generalQuestion.q2.q"),
      info: t("driverPage.generalQuestion.q2.a"),
    },
    {
      title: t("driverPage.generalQuestion.q3.q"),
      info: t("driverPage.generalQuestion.q3.a"),
    }
  ];
  const [questions, setQuestions] = useState(data);
  return (
    <div className="driver-page">
      <div className="hero-container-driver">
        <Row className="m-0 p-0 row-hero">
          <Col lg="5" className="hero-text">
            <div className="hero_content">
              <div className="hero-content-img d-flex d-md-none mb-5 ">
                <img src={heroImg} alt="hero-img" className="hero-img" />
              </div>
              <h1 className="mb-4 hero_title">{t("driverPage.hero.heroTitle")}</h1>

              <p className="hero-paragraf">{t("driverPage.hero.heroDesc")}</p>

              <div className="d-flex align-items-center gap-2 mt-4 ">
                <a style={{textDecoration: 'none'}} href="https://forms.gle/TTxwmaoMpNWpHbud6" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="btn-start-delevery d-flex"
                  >
                    {t("driverPage.hero.joinDriver")}
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
      <div className="driver-features">
        <div  className="text-center">
          <h1 className="fw-bold px-5">{t("driverPage.profitDriver.title")}</h1>
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
      <div className="driver-guide">
        <Container>
          <Row>
            <Col lg="7" className="guide-text">
              <div className="guide-content">
                <h2 className="mb-4 guide-title">{t("driverPage.howToJoin.title")}</h2>

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
      <div className="driver-story">
        <div className="service-text text-center w-100">
          <div className="service-content">
            <h1 className="mb-4 service-title fw-bold">
              {t("driverPage.driverStory.title")}
            </h1>
            {/* <p className="service-desc">{t("serviceSection.findOut")}</p> */}
            <div className="d-flex align-items-center gap-2 mt-4"></div>
          </div>
        </div>
        <div className="service-img">
          {serviceData.map((item, index) => (
            <div className="service-item" key={index}>
              <img src={item.imgUrl} alt="feature-img" />
              <div>
                <p className="service-desc mb-2">"{item.desc}"</p>
                <p className="service-title">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-partner">
        <Row>
          <Col lg="12" className="partner-text text-center">
            <h1 className="fw-bold px-3 px-md-0">
              {t("driverPage.otherInfo.title")}
            </h1>
            <p>{t("partnerSection.becomePartner")}</p>
          </Col>

          <Col className="mt-3 d-block d-md-flex justify-content-center">
            <div className="card-container">
              <h4 className="title-card">Customer</h4>
              <p className="desc-card">{t("driverPage.otherInfo.customer")}</p>
              <img className="card-img" src={Customer} alt="Driver" />
              <a href="/">
                <button className="card-btn" >{t("readMore")}</button>
              </a>
            </div>
            <div className="card-container">
              <h4 className="title-card">{t("Vendor")}</h4>
              <p className="desc-card">{t("driverPage.otherInfo.mitra")}</p>
              <img className="card-img-vendor" src={Vendor} alt="Driver" />
              <a href="/mitra">
                <button className="card-btn" >{t("readMore")}</button>
              </a>
            </div>
          </Col>
        </Row>
      </div>
      <div className={"container-partner"}>
        <Row>
          <Col lg="12" className="partner-text text-center">
            <h1 className="fw-bold">{t("driverPage.generalQuestion.title")}</h1>
            <p>{t("driverPage.generalQuestion.subtitle")}</p>
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
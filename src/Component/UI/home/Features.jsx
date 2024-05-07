import React from "react";

import { Col, Row } from "reactstrap";

import Features1 from "../../../assets/img/feature1.png";
import Features2 from "../../../assets/img/feature5.png";
import Features3 from "../../../assets/img/feature6.png";
import Features4 from "../../../assets/img/feature3.png";
import Features5 from "../../../assets/img/feature8.png";
import Features6 from "../../../assets/img/feature4.png";
import Features7 from "../../../assets/img/feature7.png";
import Features8 from "../../../assets/img/feature2.png";

import "../../../styles/features/features.css";
import { useTranslation } from "react-i18next";

export const Features = () => {
  const { t } = useTranslation();
  const featureData = [
    {
      imgUrl: Features1,
      desc: t("featureSection.feature1"),
    },

    {
      imgUrl: Features2,
      desc: t("featureSection.feature2"),
    },
    {
      imgUrl: Features3,
      desc: t("featureSection.feature3"),
    },
    {
      imgUrl: Features4,
      desc: t("featureSection.feature4"),
    },
    {
      imgUrl: Features5,
      desc: t("featureSection.feature5"),
    },
    {
      imgUrl: Features6,
      desc: t("featureSection.feature6"),
    },
    {
      imgUrl: Features7,
      desc: t("featureSection.feature7"),
    },
    {
      imgUrl: Features8,
      desc: t("featureSection.feature8"),
    },
  ];
  return (
    <div className="mt-lg-5 container-features">
      <Col lg="12" className="text-center">
        <h1 className="fw-bold px-5">{t("featureSection.whySuperkul")}</h1>
        <p className="mb-1 mt-4 feature-text px-5">
          {t("featureSection.sendAnything")}
        </p>
      </Col>

      <div className="row mt-5 mt-lg-0">
        {featureData.map((item, index) => (
          <Col xs={6} lg={3} key={index}>
            <div className="text-center feature__item mt-lg-5 " data-aos="fade-up">
              <img src={item.imgUrl} alt="feature-img" />
              <p>{item.desc}</p>
            </div>
          </Col>
        ))}
      </div>
    </div>
  );
};

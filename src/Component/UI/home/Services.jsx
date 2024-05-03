import React from "react";
import { Col } from "reactstrap";
import "../../../styles/Service/service.scss";
import Service1 from "../../../assets/img/service1.png";
import Service2 from "../../../assets/img/service2.png";
import Service3 from "../../../assets/img/service3.png";
import Service4 from "../../../assets/img/service4.png";
import { useTranslation } from "react-i18next";

export const Services = () => {
  const { t } = useTranslation();

  const serviceData = [
    {
      imgUrl: Service1,
      title: t("serviceSection.sameday"),
      desc: t("serviceSection.service1"),
    },
    {
      imgUrl: Service2,
      title: t("serviceSection.dedicated"),
      desc: t("serviceSection.service2"),
    },
    {
      imgUrl: Service3,
      title: t("serviceSection.superkulTruck"),
      desc: t("serviceSection.service3"),
    },
    // {
    //   imgUrl: Service4,
    //   title: t("serviceSection.crossdock"),
    //   desc: t("serviceSection.service4"),
    // },
    {
      imgUrl: Service4,
      title: t("serviceSection.superExpress"),
      desc: t("serviceSection.service5"),
    },
  ];
  return (
    <div className="service-container">
      <Col className="service-text text-center w-100">
        <div className="service-content">
          <h1 className="mb-4 service-title fw-bold">
            {t("serviceSection.whatIsService")}
          </h1>
          <p className="service-desc">{t("serviceSection.findOut")}</p>
          <div className="d-flex align-items-center gap-2 mt-4"></div>
        </div>
      </Col>
      <div className="service-img">
        {serviceData.map((item, index) => (
          <div className="service-item" key={index} data-aos="fade-up">
            <img src={item.imgUrl} alt="feature-img" />
            <div>
              <p className="service-title">{item.title}</p>
              <p className="service-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

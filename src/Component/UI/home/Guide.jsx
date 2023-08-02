import React from "react";
import { Row } from "reactstrap";
import GuideImg from "../../../assets/img/img-guide.png";
import "../../../styles/guide/guide.scss";
import { useTranslation } from "react-i18next";

export const Guide = () => {
  const { t } = useTranslation();

  const guideData = [
    {
      title: "Create Order",
      desc: t("guideSection.createOrder"),
    },
    {
      title: "Trip Planning",
      desc: t("guideSection.tripPlanning"),
    },
    {
      title: "Order Confirmation",
      desc: t("guideSection.orderConfirm"),
    },
    {
      title: "Payment",
      desc: t("guideSection.payment"),
    },
  ];
  return (
    <div className="guide-container">
      <Row>
        <div className="column-img" data-aos="fade-right">
          <img src={GuideImg} alt="guide-img" className="guide-img" />
        </div>

        <div className="guide-text">
          <div className="guide-content">
            <h2 className="mb-2 guide-title">{t("guideSection.howTo")}</h2>

            <p className="guide-paragraf">{t("guideSection.makeItEasier")}</p>

            <ol className="ordered-list">
              {guideData.map((item, index) => (
                <li key={index}>
                  <h4 className="guide-list-title">{item.title}</h4>
                  <p className="guide-list-desc">{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Row>
    </div>
  );
};

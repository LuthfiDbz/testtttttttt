import React, {useState} from "react";
import {Col, Row} from "reactstrap";
import "../../../../styles/faq/faq.scss";
import {Question} from "./Question";
import {useTranslation} from "react-i18next";

export const Faq = ({classNameParent}) => {
  const {t} = useTranslation();

  const data = [
    {
      title: t("faqSection.q1"),
      info: t("faqSection.a1"),
    },
    {
      title: t("faqSection.q2"),
      info: t("faqSection.a2"),
    },
    {
      title: t("faqSection.q3"),
      info: t("faqSection.a3"),
    },
    {
      title: t("faqSection.q4"),
      info: t("faqSection.a4"),
    },
  ];
  const [questions, setQuestions] = useState(data);
  return (
    <div className={classNameParent ?? "container-partner"}>
      <Row>
        <Col lg="12" className="partner-text text-center">
          <h1 className="fw-bold">FAQ</h1>
          <p>{t("faqSection.subtitle")}</p>
        </Col>

        <div className="container-faq">
          {questions.map((question, index) => (
            <Question key={index} {...question} />
          ))}
        </div>
      </Row>
    </div>
  );
};

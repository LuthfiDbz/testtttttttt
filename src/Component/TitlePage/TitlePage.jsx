import React from "react";
import "./titlePage.scss"
import BgBanner from '../../assets/img/bg-banner-4.png'
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

const TitlePages = ({ title, breadcumbs }) => {
  return (
    <div className="container-title-new" style={{ backgroundImage: `url(${BgBanner})` }}>
      <div className="content-title">
        <h3>{title}</h3>
        <Breadcrumb className="link">
          {breadcumbs.map((bread, i) => {
            return (
              <BreadcrumbItem key={i}>
                <Link
                  className="link-to"
                  to={bread?.link}
                >{bread?.text}</Link>
              </BreadcrumbItem>
            )
          })}
        </Breadcrumb>
      </div>
    </div>
  )
}

export default TitlePages;
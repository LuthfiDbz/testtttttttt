import React from "react";
import DetailInfo from "./LeftDetail/DetailInfo";
import DetailTrips from "./LeftDetail/DetailTrips";

const LeftDetailInvoice = ({data}) => {
  return (
    <div className="left-detail">
      <DetailInfo data={data}/>
      <DetailTrips data={data}/>
    </div>
  )
}

export default LeftDetailInvoice;
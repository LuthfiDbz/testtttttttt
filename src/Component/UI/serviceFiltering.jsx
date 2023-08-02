import React from "react";
import "../../styles/serficeFiltering/servicefiltering.scss";

export const ServiceFiltering = ({selected, setSelected}) => {
    const options = ['Paid','Unpaid'];
  return (
    <form className="service-filter-wrap">
      <select value={selected} 
       onChange={(e) => setSelected(e.target.value)} className="service-btn">
        <option value="default" selected disabled hidden>
            Status
          </option>
        {options.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
         ))}
      </select>
    </form>
  );
};

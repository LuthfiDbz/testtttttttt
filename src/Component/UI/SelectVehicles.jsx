import React from "react";
import { useState } from "react";
import { RiBus2Fill, RiEBikeFill } from "react-icons/ri";
import { FaBus } from "react-icons/fa";
import { MdDirectionsBus } from "react-icons/md";

import "../../styles/selectVehicles/selectVehicles.css";

export const SelectVehicles = () => {
  const [show, setShow] = useState(true);
  const [showAdd, setShowAdd] = useState("");
  const [showhide, setShowhide] = useState("instant");
  const additionalService = [
    {
      text: "Waiting Time >30 Menit",
      price: 5000,
    },
    {
      text: "Waiting Time >60 Menit",
      price: 10000,
    },
    {
      text: "Waiting Time >90 Menit",
      price: 15000,
    },
    {
      text: "Additional Carrier",
      price: 5000,
    },
    {
      text: "Door to door Delivery",
      price: 5000,
    },
  ];
  const listVehicles = [
    {
      id: 1,
      icon: <RiEBikeFill className="icon-vehicles" />,
      name: "Bike",
    },
    {
      id: 2,
      icon: <FaBus className="icon-vehicles" />,
      name: "3 Wheeler",
    },
    {
      id: 3,
      icon: <MdDirectionsBus className="icon-vehicles" />,
      name: "Pickup/L300",
    },
    {
      id: 4,
      icon: <RiBus2Fill className="icon-vehicles" />,
      name: "CDE/CDC",
    },
  ];
  const handleshow = (e) => {
    const getshow = e.target.value;
    setShowhide(getshow);
  };
  const handleshowAdd = (e) => {
    const getshow = e.target.value;
    setShowAdd(getshow);
  };
  return (
    <div className="select-vehicles">
      <div className="header-vehicles">
        <p className="text-title">Select Vehicles</p>
      </div>
      <div className="body-vehicles">
        <div className="vehicles-checkbox">
          {listVehicles.map((vehicles) => (
            <label className="custom-vehicles">
              <input
                type="radio"
                name="check"
                className="check-vehicles"
                key={vehicles.id}
                value="motor"
                onClick={handleshowAdd}
              />
              <div className="check-btn">
                <div className="content">
                  <div className="icon-img">{vehicles.icon}</div>
                  <span className="check-icon">
                    <span className="icon"></span>
                  </span>
                </div>
                {vehicles.name}
              </div>
            </label>
          ))}
        </div>
        {showAdd === "motor" && (
          <div className="additional-service">
            {show && (
              <div>
                <div className="max-capacity">Maximum capacity 30kg</div>
                <p className="additional-title">Select Additional Service</p>
                {additionalService.map((list, index) => (
                  <div className="mt-2" key={index}>
                    <input type="checkbox" id="additional" name="additional" />
                    <label className="label-additional-list" htmlFor="additional">
                      <div className="additional-list">
                        <p>{list.text}</p>
                        <p>Rp. {list.price}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            )}
            <p className="hiden-addservice" onClick={() => setShow(!show)}>
              {show ? "hide additional service" : "show additional service"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

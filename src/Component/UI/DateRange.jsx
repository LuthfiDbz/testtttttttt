import { useEffect, useRef, useState } from "react";
import { Calendar, DateRange } from "react-date-range";
import { FiSearch } from "react-icons/fi";

import format from "date-fns/format";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import '../../styles/daterange/daterange.scss'

export const DateRanged = ({dataFromChild, defaultValue}) => {
  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date("2023-01-01"),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    setRange(defaultValue)
  }, [defaultValue])

  const [valueRange,  setValueRange] = useState("Date Range")

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap">
      <input
        value={`${format(range[0]?.startDate, "dd MMM yyyy")} - ${format(
          range[0]?.endDate,
          "dd MMM yyyy"
        )}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />
      {/* <FiSearch /> */}

      <div ref={refOne} className='calendar-div'>
        {open && (
          <DateRange
            onChange={(item) => {setRange([item.selection]); dataFromChild([item.selection])}}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
};

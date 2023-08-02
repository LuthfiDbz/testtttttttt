import React, {useState} from "react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import "../../../../styles/faq/faq.css";

export const Question = ({title, info}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="question">
      <header>
        <h6 onClick={() => setExpanded(!expanded)} className="question-title">
          {title}
        </h6>
        <button className="btn-faq" onClick={() => setExpanded(!expanded)}>
          {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {expanded && <p>{info}</p>}
    </div>
  );
};

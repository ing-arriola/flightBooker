import React, { useState } from "react";
import moment from "moment";

const InputDate = ({
  flightDate,
  setFlight,
  fieldState,

  areDatesMakesSense,
}) => {
  const [validDate, setValidDate] = useState(true);
  const handleDateChange = (e) => {
    setFlight(e.target.value);

    isValidDate(e.target.value);

    areDatesMakesSense(e.target.value);
  };

  const isValidDate = (date) => {
    moment(date, "DD.MM.YYYY", true).isValid()
      ? setValidDate(true)
      : setValidDate(false);
  };

  return (
    <input
      onChange={handleDateChange}
      value={flightDate}
      className={`mb-2 ${validDate ? "bg-light" : "bg-danger"}`}
      disabled={fieldState}
    ></input>
  );
};

export default InputDate;

import React, { useState } from "react";

import {
  Button,
  Row,
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import InputDate from "./InputDate";

const FlightBooker = () => {
  const [title, setTitle] = useState("one-way flight");
  const [oneWayDate, setOneWayDate] = useState("04.02.2020");
  const [returnDate, setReturnDate] = useState("04.02.2020");
  const [enableFields, setEnabledFields] = useState([false, true]);
  const [submit, setSubmit] = useState(false);

  const options = ["one-way flight", "return flight"];

  const items = options.map((option, index) => (
    <Dropdown.Item
      key={index}
      className={`${title === options[index] ? "active" : ""}`}
      eventKey={option}
    >
      {option}
    </Dropdown.Item>
  ));

  const handleOptionSelection = (e) => {
    setTitle(e);
    if (e === options[0]) {
      setEnabledFields([false, true]);
      setSubmit(false);
    } else {
      setEnabledFields([false, false]);
    }
  };

  const areDatesMakesSense = (data, name) => {
    if (title === options[1]) {
      if (name === "start") {
        if (data <= returnDate) {
          setSubmit(false);
        } else {
          setSubmit(true);
        }
      } else {
        if (data >= oneWayDate) {
          setSubmit(false);
        } else {
          setSubmit(true);
        }
      }
    }
  };

  const showTripInfo = () => {
    if (title === options[0]) {
      alert(`Your trip starts on ${oneWayDate}`);
    } else {
      alert(
        `Your trip starts on ${oneWayDate} and you're going to return on ${returnDate} `
      );
    }
  };

  return (
    <Row className="justify-content-center align-items-center mt-5 d-flex flex-column ">
      <DropdownButton
        as={ButtonGroup}
        variant="primary"
        title={title}
        onSelect={handleOptionSelection}
        className="mb-2"
      >
        {items}
      </DropdownButton>
      <div className="d-flex flex-column">
        <InputDate
          name="start"
          flightDate={oneWayDate}
          setFlight={setOneWayDate}
          fieldState={enableFields[0]}
          areDatesMakesSense={areDatesMakesSense}
        />
        <InputDate
          name="return"
          flightDate={returnDate}
          setFlight={setReturnDate}
          fieldState={enableFields[1]}
          areDatesMakesSense={areDatesMakesSense}
        />
        <Button disabled={submit} onClick={showTripInfo} className="btn-block">
          Book
        </Button>
      </div>
    </Row>
  );
};

export default FlightBooker;

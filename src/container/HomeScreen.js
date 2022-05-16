import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as moment from "moment";
import NavBar from "../component/NavBar";

// 2022-05-16 04:45:07
export default function HomeScreen() {
  const history = useHistory();
  const [data, setData] = useState("");

  const [second, setSecond] = useState(10);
  const [minut, setMinut] = useState(0);

  const submitMsg = (e) => {
    setData(e.target.value);
    submitAPI(data);
    // history.push(`/dashboard`);
  };

  const submitAPI = (data) => {
    fetch("http://localhost:5000/api/submitMessage", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        message: data,
        email: sessionStorage.getItem("userEmail"),
      }),
    })
      .then((response) => {
        console.log(response);
        setData("");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    // let updatedValue = {};
    // updatedValue = { [e.target.name]: e.target.value };
    // setData((data) => ({
    //   ...data,
    //   ...updatedValue,
    // }));
    setData(e.target.value);
  };

  //   let dateTime = new Date();
  //   dateTime.subtract(5, "seconds").format("m:ss");

  console.log(moment().format("m"));
  console.log(moment("").format("s"));

  console.log(
    moment(sessionStorage.getItem("loginTime")).startOf("minute").fromNow()
  );
  var TEN_MINUTES = 10 * 60 * 1000;
  var duration =
    Date.now() - new Date(sessionStorage.getItem("loginTime")).getTime();
  const reLogin = duration > TEN_MINUTES ? true : false;
  console.log(reLogin);

  return (
    <>
      <NavBar />
      <Row className="justify-content-md-center mt-5">
        <Col className="col-6">
          <div id="timer"></div>
          <div>
            <h1>
              Weclome - {minut}:{second}
            </h1>
          </div>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ENter Message</Form.Label>
            <Form.Control
              type="text"
              name="message"
              placeholder="Enter message"
              value={data}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submitMsg}>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
}

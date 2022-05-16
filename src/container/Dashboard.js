import React, { useEffect, useState } from "react";
import { Form, Nav, Container, Button, Row, Col } from "react-bootstrap";

import Table from "../component/table";
import NavBar from "../component/NavBar";

export default function HomeScreen() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log("hi");
    submitAPI();
  }, []);

  // async function funcName(url) {
  //   const response = await fetch(url);
  //   var data = await response.json();
  // }

  const submitAPI = (data) => {
    fetch("http://localhost:5000/api/getUserDetails", {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data.data));

        setTableData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // tableData.forEach((v) => console.log(v));
  console.log({ tableData });
  return (
    <>
      <NavBar />
      <Table tableData={tableData} />
    </>
  );
}

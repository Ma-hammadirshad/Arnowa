import React from "react";
import { Table } from "react-bootstrap";

export default function table(props) {
  console.log(props);
  //   console.log(props.tableData.map((i) => i + 1));
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Last Login</th>
        </tr>
      </thead>
      <tbody>
        {props.tableData.map((val, i) => {
          console.log(val);
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.mobile}</td>
              <td>{val.loginTime}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

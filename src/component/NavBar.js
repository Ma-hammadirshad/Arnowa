import React from "react";

import {
  Navbar,
  Form,
  Nav,
  Container,
  Button,
  Row,
  Table,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  const logout = () => {
    sessionStorage.clear();
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">
          {" "}
          hi, {sessionStorage.getItem("userName")}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="/">
            <Button value="Logout" className="ml-auto" onClick={logout}>
              Logout
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

import React, { useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import MassageQueue from "./MassageQueue";
import Admin from "./Admin";
import BookingQueue from "./BookingQueue";
import Profile from "./Profile";
import { AuthData } from "./AuthContext";
function NavbarMenu() {
  const { isLogin, setIsLogin } = useContext(AuthData);

  function logout() {
    localStorage.clear();
    setIsLogin("nologin");

    localStorage.setItem("auth", "nologin");
    window.location.href = "/login";
  }

  useEffect(() => {}, []);
  return (
    <Router>
      <div>
        <Navbar
        sticky="top"
          collapseOnSelect
          expand="lg"
          style={{ backgroundColor: "#A96D6D" }}
        >
          <Container>
            <Navbar.Brand style={{ color: "#fff" }}>
              Thai Massage ระบบจัดการร้านนวดแผนไทย
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} style={{ color: "#fff" }} to={"/"}>
                  หน้าหลัก
                </Nav.Link>
                <Nav.Link as={Link} style={{ color: "#fff" }} to={"/service"}>
                  บริการ
                </Nav.Link>
                <Nav.Link as={Link} style={{ color: "#fff" }} to={"/contact"}>
                  ติดต่อเรา
                </Nav.Link>
              </Nav>
              <Nav>
                {isLogin === "loginged" && (
                  <>
                    {localStorage.getItem("role") === "admin" && (
                      <Nav.Link
                        as={Link}
                        style={{ color: "#fff" }}
                        to={"/admin"}
                      >
                        จัดการระบบร้านนวด
                      </Nav.Link>
                    )}
                    {localStorage.getItem("role") === "user" && (
                      <Nav.Link
                        as={Link}
                        style={{ color: "#fff" }}
                        to={"/massage-queue"}
                      >
                        จองคิวนวด
                      </Nav.Link>
                    )}
                    <Nav.Link
                      as={Link}
                      style={{ color: "#fff" }}
                      to={"/profile"}
                    >
                      <Image
                        style={{
                          width: "30px",
                          objectfit: "cover",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                        src={localStorage.getItem("profile")}
                      />{" "}
                      {localStorage.getItem("firstname")}
                    </Nav.Link>{" "}
                    <Nav.Link
                      as={Link}
                      style={{ color: "#fff" }}
                      onClick={() => logout()}
                    >
                      ออกจากระบบ
                    </Nav.Link>
                  </>
                )}

                {isLogin === "nologin" && (
                  <>
                    <Nav.Link
                      as={Link}
                      style={{ color: "#fff" }}
                      to={"/register"}
                    >
                      ลงทะเบียน
                    </Nav.Link>{" "}
                    <Nav.Link
                      as={Link}
                      style={{ color: "#fff" }}
                      eventKey={2}
                      to={"/login"}
                    >
                      เข้าสู่ระบบ
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/register" Component={Register}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/massage-queue" Component={MassageQueue}></Route>
          <Route path="/" Component={Home}></Route>
          <Route path="/admin" Component={Admin}></Route>
          <Route path="/booking-queue" Component={BookingQueue}></Route>
          <Route path="/profile" Component={Profile}></Route>
        </Routes>
      </div>
    </Router>
  );
}
export default NavbarMenu;

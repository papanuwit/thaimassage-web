import React, { useState, useEffect,useContext } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthData } from "./AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const login =  async (e)=> {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };

    await axios.post("http://localhost:3050/login", body).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setIsLogin("loginged")
        localStorage.setItem("age", res?.data[0]?.age);
        localStorage.setItem("firstname", res?.data[0]?.firstname);
        localStorage.setItem("lastname", res?.data[0]?.lastname);
        localStorage.setItem("customerId", res?.data[0]?.customerId);
        let role = res?.data[0]?.role;
        localStorage.setItem("role", res?.data[0]?.role);
        localStorage.setItem("auth", "loginged");
        localStorage.setItem("profile","http://localhost:3050/"+res?.data[0]?.profile)

        Swal.fire("Login!", "เข้าสู่ระบบสำเร็จ", "success");

        if(role==="user"){
              navigate("/");
        }
        if(role === "admin"){

  navigate("/admin");
        }

      
      }
    });
  }

  useEffect(() => {}, []);

  return (
    <>
      <Row className="mt-4">
        <Col sm={3}></Col>
        <Col sm={6}>
          <Card>
            <Form onSubmit={(e) => login(e)}>
              <Card.Body>
                <h5>เข้าสู่ระบบ</h5>

                <Form.Group>
                  <Row>
                    <Col sm={12}>
                      <Form.Label style={{ float: "left" }}>อีเมล</Form.Label>
                    </Col>
                    <Col sm={12}>
                      <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="อีเมล"
                        type="email"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col sm={12}>
                      <Form.Label style={{ float: "left" }}>
                        รหัสผ่าน
                      </Form.Label>
                    </Col>
                    <Col sm={12}>
                      <Form.Control
                        type="password"
                        value={password}
                        placeholder="รหัสผ่าน"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>
             
                <Button variant="primary w-100" type="submit" className="mt-4">
                  เข้าสู่ระบบ
                </Button>
                <br></br>
                <a href="/register" className="mt-4">
                  {" "}
                หากยังไมีมีบัญชี  ลงทะเบียน{" "}
                </a>
              </Card.Body>
            </Form>
          </Card>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </>
  );
};

export default Login;

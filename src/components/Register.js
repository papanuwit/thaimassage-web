import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function Register() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(18);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [gender, setGender] = useState("ชาย");

  let profile = "";
  const handelUpload = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const register = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", file);

    await axios
      .post("http://localhost:3050/uploadfile", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          profile = res.data.path;
        }
      });

    const body = {
      email: email,
      password: password,
      firstname: firstName,
      lastname: lastName,
      age: age,
      phonenumber: phone,
      profile: profile,
      role: "user",
      gender: gender
    };

    await axios.post(`http://localhost:3050/customers`, body).then((res) => {
      if (res.status === 200) {
        Swal.fire("Good job!", "ลงทะเบียนสำเร็จ", "success");
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <>
      <Row className="mt-4">
        <center>


          <Col md={6} >
            <h5>ลงทะเบียนเพื่อจองคิวนวด</h5>
            <Form onSubmit={(e) => register(e)}>
              <Row>
                <Col md={12}>
                  <Form.Group>

                    <Image
                      src={img}
                      style={{
                        marginBottom: '20px',
                        width: "80px",
                        objectfit: "cover",
                        height: "80px",
                        borderRadius: "50%",
                      }}
                    />


                    <Form.Control type="file" onChange={(e) => handelUpload(e)} className="mb-3" />
                  </Form.Group>
                </Col>
                <Col md={6} className="text-left">

                  <Form.Group>
                    <Form.Label style={{ float: 'left' }}>ชื่อ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ชื่อ"
                      value={firstName}
                      onChange={(e) => setfirstName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ float: 'left' }}>นามสกุล</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="นามสกุล"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Row>

                    <Col>
                      <Form.Group>
                        <Form.Label style={{ float: 'left' }}>อายุ</Form.Label>
                        <Form.Control
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="อายุ"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group>
                        <Form.Label style={{ float: 'left' }}>เพศ</Form.Label>
                        <Form.Select
                          onChange={(e) => setGender(e.target.value)}
                          aria-label="Default select example">


                          <option value="male">male</option>
                          <option value="female">female</option>

                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>เบอร์โทรศัพท์</Form.Label>
                    <Form.Control
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="099xxx"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label style={{ float: 'left' }}>อีเมล</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="อีเมล"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label style={{ float: 'left' }}>รหัสผ่าน</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="1234"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={6} className="mt-4">
                  <Button variant="primary w-100" type="submit">
                    สมัครสมาชิก
                  </Button>
                </Col>
                <Col sm={6} className="mt-4">
                  <Button variant="danger w-100" type="reset">
                    ยกเลิก
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </center>
      </Row>

    </>
  );
}
export default Register;

import React, { useState} from "react";
import { Row, Col, Form, Image, Button } from "react-bootstrap";
import axios from "axios";
const MessageForm = (props) => {
  const [fileSelect, setFileSelect] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const {handleClose} = props;

  let path = "";
  const uploadProfile = async () => {

    if (fileSelect) {
      let formData = new FormData();
      formData.append("file", fileSelect);

      await axios
        .post(
          `http://localhost:3050/uploadfile`,

          formData
        )
        .then((res) => {
          console.log(res.data.path);
          path = res.data.path;
        });

      const body = {
        firstname: firstname,
        lastname: lastname,
        age: age,
        profile: path,
      };

      await axios.post(`http://localhost:3050/masseuse`, body).then((res) => {
        if (res.status === 200) {
          alert("เพิ่มข้อมูลหมอนวดสำเร็จ");
         
        }
      });
    }
  await handleClose();
    
  };

  return (
    <Form>
      <Row>
        <Col md={12}>
          <div className="profile">
            <Image src="" />
          </div>
          <Form.Label>อัพโหลดรูปโปรไฟล์</Form.Label>
          <Form.Group>
            <Form.Control
              onChange={(e) => setFileSelect(e.target.files[0])}
              type="file"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>ชื่อ</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              placeholder="ชื่อ"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>นามสกุล</Form.Label>
            <Form.Control
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              value={lastname}
              placeholder="นามสกุล"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>อายุ</Form.Label>
            <Form.Control
              onChange={(e) => setAge(e.target.value)}
              type="text"
              value={age}
              placeholder="อายุ"
            />
          </Form.Group>
        </Col>
      </Row>
      <Button onClick={() => uploadProfile()}> บันทึกข้อมูล</Button>
    </Form>
  );
};

export default MessageForm;

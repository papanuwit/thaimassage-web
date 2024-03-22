import React, { useState,useEffect} from "react";
import { Row, Col, Form, Image, Button } from "react-bootstrap";
import axios from "axios";
const MessageFormUpdate = (props) => { 
  const {handleClose,onSelectMenu,dataUpdate} = props;
 
  const [fileSelect, setFileSelect] = useState(null);
  const [firstname, setFirstname] = useState(dataUpdate.firstname);
  const [lastname, setLastname] = useState(dataUpdate.lastname);
  const [age, setAge] = useState(dataUpdate.age);
 

  console.log('informup',dataUpdate)
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

      await axios.put(`http://localhost:3050/masseuse/${dataUpdate.masseuseId}`, body).then((res) => {
        if (res.status === 200) {
          alert("แก้ไขมูลหมอนวดสำเร็จ");
         
        }
      });
    }
    
   onSelectMenu("ข้อมูลหมอนวด")
  await handleClose();
    
  };
useEffect(()=>{

},[dataUpdate])
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
          <Form.Group clas>
            <Form.Label>ชื่อ {dataUpdate.firstname}</Form.Label>
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
      <Button className="w-100 mt-3" onClick={() => uploadProfile()}> แก้ไขข้อมูล</Button>
    </Form>
  );
};

export default MessageFormUpdate;

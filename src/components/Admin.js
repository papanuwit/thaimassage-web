import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import SideBar from "./SideBar";
import TableData from "./TableData";
import axios from "axios";
import MessageForm from "./forms/MessageForm.js";
import MessageQueuForm from "./forms/MessageQueuForm.js";
function Admin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [menu, setMenu] = useState("ข้อมูลหมอนวด");

  const [data, setData] = useState([]);
 

  const [formName, setFormName] = useState("");

 
  const onSelectMenu = async (val) => {
    setMenu(val);

    if (val === "ข้อมูลหมอนวด") {
      await axios.get("http://localhost:3050/masseuses").then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      });
    } else if (val === "คิวหมอนวด") {
      await axios.get("http://localhost:3050/massagequeue").then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      });
    } else if (val === "คิวจองนวดทั้งหมด") {
      await axios.get("http://localhost:3050/queuebooking").then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      });
    }
     else if (val === "ข้อมูลโปรโมชัน") {
      await axios.get("http://localhost:3050/promotion").then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      });
    }
  };

  const onSelectForm = (formname) => {
    setFormName(formname);
    handleShow();
  };

  useEffect(() => {
    onSelectMenu("ข้อมูลหมอนวด");
  }, []);

  return (
    <>
      <Row>
        <Col md={2}>
          <SideBar onSelectMenu={onSelectMenu} />
        </Col>
        <Col md={10}>
          <Card>
            <Card.Body>
              <Card.Title as="h5"> {menu}</Card.Title>
              {menu === "ข้อมูลหมอนวด" && (
                <>
                  <Row>
                    <Col md={4}>
                      <Button
                        style={{ float: "left" }}
                        className="mb-2"
                        onClick={() => onSelectForm("เพิ่มข้อมูลหมอนวด")}
                      >
                        เพิ่มข้อมูลหมอนวด
                      </Button>
                    </Col>
                    <Col md={12}>
                      <TableData
                        data={data}
                        columns={[
                          { key: "profile", title: "รูปโปรไฟล์" },
                          { key: "masseuseId", title: "รหัส" },
                          { key: "firstname", title: "ชื่อ" },
                          { key: "lastname", title: "นามสกุล" },
                          { key: "age", title: "อายุ" },
                        ]}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {menu === "คิวหมอนวด" && (
                <>
                  <Row>
                    <Col md={4}>
                      <Button
                        style={{ float: "left" }}
                        className="mb-2"
                        onClick={() => onSelectForm("คิวหมอนวด")}
                      >
                        เพิ่มข้อมูลตารางจองคิวหมอนวด
                      </Button>
                    </Col>
                  </Row>
                  <TableData
                    data={data}
                    columns={[
                      { key: "date", title: "วันที่" },
                      { key: "firstname", title: "ชื่อ" },
                      { key: "lastname", title: "นามสกุล" },
                      { key: "age", title: "อายุ" },
                      { key: "detail", title: "รายละเอียด" },
                    ]}
                  />
                </>
              )}

              {menu === "คิวจองนวดทั้งหมด" && (
                <TableData
                  data={data}
                  columns={[
                    {key:"queuebookingId",title:"รหัสการจองคิวนวด"},
                    {key:"customerId",title:"รหัสลูกค้า"},
                    {key:"massagetype",title:"ประเภทการนวด"},
                    {key:"startTime",title:"เวลาเริ่ม"},
                    {key:"endTime",title:"เวลาสิ้นสุด"},
                    {key:"dateBooking",title:"วันที่จอง"},
                    {key:"total",title:"จำนวนเงิน"},
                    {key:"payment",title:"สถานะการชำระเงิน"},
                  ]}
                />
              )}
              {menu === "ข้อมูลโปรโมชัน" && (
                <TableData
                  data={data}
                  columns={[
                    {key:"promotionId",title:"รหัสโปรโมชัน"},
                    {key:"title",title:"ชื่อโปรโมชัน"},
                    {key:"discount",title:"ส่วนลด"},
                    {key:"detail",title:"รายละเอียด"},              
                  ]}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{formName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formName === "เพิ่มข้อมูลหมอนวด" && (
            <MessageForm handleClose={handleClose} />
          )}
          {formName === "คิวหมอนวด" && (
            <MessageQueuForm handleClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Admin;

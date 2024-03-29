import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Modal, Image } from "react-bootstrap";
import SideBar from "./SideBar";
import TableData from "./TableData";
import axios from "axios";
import MessageForm from "./forms/MessageForm.js";
import MessageQueuForm from "./forms/MessageQueuForm.js";
import PromotionForm from "./forms/PromotionForm.js";
import MessageFormUpdate from "./forms/MessageFormUpdate.js";
import MessageQueuFormUpdate from "./forms/MessageQueuFormUpdate.js";
import PromotionFormUpdate from "./forms/PromotionFormUpdate.js";

function Admin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //for update 

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => {
     setImg("")
     setShowUpdate(false);
  } 
  const handleShowUpdate = () => setShowUpdate(true);

  const [menu, setMenu] = useState("ข้อมูลหมอนวด");
  const [data, setData] = useState([]);
  const [formName, setFormName] = useState("");
  const [dataUpdate, setDataUpdate] = useState("");
  const [img, setImg] = useState("");


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

  function updateBooking() {
    const body = {
      payment: "ชำระเงินสำเร็จ"
    };

    axios.put(`http://localhost:3050/queuebooking/${dataUpdate.queuebookingId}`, body)
      .then(res => {
        if (res.status === 200) {
          alert("แจ้งชำระเงินสำเร็จ");
        }
      })
      onSelectMenu("คิวจองนวดทั้งหมด");
  }
  function getSlip() {
   
    axios.get(`http://localhost:3050/payment/${dataUpdate.queuebookingId}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.profile)
          setImg(res.data.profile)
     
        }
      })
  }


  const onClickRowUpdate = (obj, name) => {
    handleShowUpdate();
    setDataUpdate(obj)
    console.log(obj, name)
    setFormName(name)
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
                        onClickRowUpdate={onClickRowUpdate}
                        menu={menu}
                        data={data}
                        columns={[
                          { key: "profile", title: "รูปโปรไฟล์" },
                          { key: "masseuseId", title: "รหัส" },
                          { key: "firstname", title: "ชื่อ" },
                          { key: "lastname", title: "นามสกุล" },
                          { key: "age", title: "อายุ" },
                          { key: "action", title: "จัดการ" },
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
                    onClickRowUpdate={onClickRowUpdate}
                    menu={menu}
                    data={data}
                    columns={[
                      { key: "date", title: "วันที่" },
                      { key: "firstname", title: "ชื่อ" },
                      { key: "lastname", title: "นามสกุล" },
                      { key: "age", title: "อายุ" },
                      { key: "detail", title: "รายละเอียด" },
                      { key: "action", title: "จัดการ" },
                    ]}
                  />
                </>
              )}

              {menu === "คิวจองนวดทั้งหมด" && (
                <TableData
                  onClickRowUpdate={onClickRowUpdate}
                  menu={menu}
                  data={data}
                  columns={[
                    { key: "queuebookingId", title: "รหัสการจอง" },
                    { key: "customerId", title: "รหัสลูกค้า" },
                    { key: "gender", title: "เพศ" },
                    { key: "massagetype", title: "ประเภทการนวด" },
                    { key: "startTime", title: "เวลาเริ่ม" },
                    { key: "endTime", title: "เวลาสิ้นสุด" },
                    { key: "dateBooking", title: "วันที่จอง" },
                    { key: "total", title: "จำนวนเงิน" },
                    { key: "payment", title: "สถานะการชำระเงิน" },
                    { key: "action", title: "จัดการ" },
                  ]}
                />
              )}
              {menu === "ข้อมูลโปรโมชัน" && (<>
                <Row>
                  <Col md={4}>
                    <Button
                      style={{ float: "left" }}
                      className="mb-2"
                      onClick={() => onSelectForm("ข้อมูลโปรโมชัน")}
                    >
                      เพิ่มข้อมูลโปรโมชัน
                    </Button>
                  </Col>
                </Row>
                <TableData
                  onClickRowUpdate={onClickRowUpdate}
                  menu={menu}
                  data={data}
                  columns={[
                    { key: "profile", title: "รูปแสดงโปรโมชัน" },
                    { key: "promotionId", title: "รหัสโปรโมชัน" },
                    { key: "title", title: "ชื่อโปรโมชัน" },
                    { key: "discount", title: "ส่วนลด" },
                    { key: "detail", title: "รายละเอียด" },
                    { key: "action", title: "จัดการ" },
                  ]}
                />
              </>)}
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
            <MessageForm handleClose={handleClose}  onSelectMenu={onSelectMenu}/>
          )}
          {formName === "คิวหมอนวด" && (
            <MessageQueuForm handleClose={handleClose} onSelectMenu={onSelectMenu}/>
          )}
          {formName === "ข้อมูลโปรโมชัน" && (
            <PromotionForm handleClose={handleClose} onSelectMenu={onSelectMenu} />
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{formName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formName === "ข้อมูลหมอนวด" && (
            <MessageFormUpdate dataUpdate={dataUpdate} handleClose={handleCloseUpdate} onSelectMenu={onSelectMenu} />
          )}
          {formName === "คิวหมอนวด" && (
            <MessageQueuFormUpdate dataUpdate={dataUpdate} handleClose={handleCloseUpdate} onSelectMenu={onSelectMenu} />
          )}
          {formName === "ข้อมูลโปรโมชัน" && (
            <PromotionFormUpdate dataUpdate={dataUpdate} handleClose={handleCloseUpdate} onSelectMenu={onSelectMenu} />
          )}
          {formName === "คิวจองนวดทั้งหมด" && (<>
            <Image src={'http://localhost:3050/'+img}/>
            <p> รหัสการจองคิวนวด  {dataUpdate.queuebookingId} </p>
            <p> ประเภท {dataUpdate.massagetype} </p>
            <p> รวมทั้งหมด  {dataUpdate.total} </p>
            <p> สถานะ  {dataUpdate.payment} </p>
            <Button onClick={()=>getSlip()}>ดูสลิป</Button>
            <Button onClick={()=>updateBooking()}> ยืนยันการชำระเงิน</Button>
          </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Admin;

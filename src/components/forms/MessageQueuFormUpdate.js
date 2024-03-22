import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
const MessageQueuFormUpdate = (props) => {
  const { handleClose,onSelectMenu,dataUpdate } = props;
  const [masseuseId, setMasseuseId] = useState(null);
  const [date, setDate] = useState(moment(new Date(dataUpdate.date)).format('YYYY-MM-DD'));
  const [detail, setDetail] = useState(dataUpdate.detail);
 
  const [message, setMessage] = useState([]);


 
  const getMassage = async () => {
    await axios.get("http://localhost:3050/masseuses").then((res) => {
      if (res.status === 200) {
        setMessage(res.data);
      }
    });
  };

  const saveMssageQueue = async () => {

    const body = {
      masseuseId: masseuseId,
      date: date,
      detail: detail,
    };
    await axios.put(`http://localhost:3050/massagequeue/${dataUpdate.massagequeueId}`, body).then((res) => {
      if (res.status === 200) {
        alert("เพิ่มข้อมูลหมอนวดในตารางคิว");
      }
    });
    await onSelectMenu("คิวหมอนวด")
    await handleClose();

  
  };


  useEffect(() => {
    getMassage();
  }, []);


  useEffect(() => {
    console.log(masseuseId)
  }, [masseuseId]);

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group className="mb-2">
          
            <Form.Label>ข้อมูลหมอนวด </Form.Label>
            <Form.Select
              onChange={(e) => setMasseuseId(e.target.value)}
              aria-label="Default select example">

              {message.map((item) => {
                return <option value={item.masseuseId}>{item.firstname + item.lastname}</option>;
              })}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-2">
            <Form.Label>วันที่สร้างคิว</Form.Label>
            <Form.Control
              onChange={(e) => setDate(e.target.value)}
              type="date"
              value={date}
            />
          </Form.Group>
        </Col>
      </Row>
    
      <Row>
        <Col md={12}>
          <Form.Group className="mb-2">
            <Form.Label>รายละเอียด</Form.Label>
            <Form.Control
              placeholder="รายละเอียด"
              onChange={(e) => setDetail(e.target.value)}
              type="text"
              value={detail}
            />
          </Form.Group>
        </Col>
        <Row>
          <Col md={6}>
            <Button
              className="w-100"
              variant="success"
              onClick={() => saveMssageQueue()}
            >
              {" "}
              บันทึกข้อมูล
            </Button>
          </Col>
          <Col md={6}>
            <Button
              onClick={handleClose}
              className="w-100"
              variant="danger"
              type="reset"
            >
              ยกเลิก
            </Button>
          </Col>
        </Row>
      </Row>
    </Form>
  );
};

export default MessageQueuFormUpdate;

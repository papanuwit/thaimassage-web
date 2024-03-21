import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
const MessageQueuForm = (props) => {
  const [masseuseId, setMasseuseId] = useState(null);
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [detail, setDetail] = useState("");
  const [timeStart, setTimeStart] = useState("09:00");
  const [timeEnd, setTimeEnd] = useState("10:00");
  const [stausQueue, setStausQueue] = useState("ว่าง");
  const [message, setMessage] = useState([]);


  const { handleClose } = props;
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
    await axios.post(`http://localhost:3050/massagequeue`, body).then((res) => {
      if (res.status === 200) {
        alert("เพิ่มข้อมูลหมอนวดในตารางคิว");
      }
    });

    await handleClose();

    await saveStatusQueue();
  };

  const saveStatusQueue = async () => {
    const body = {
      massagequeueId: masseuseId,
      status: stausQueue
      , startTime: timeStart,
      endTime: timeEnd
      , date: date
    };

    await axios.post(`http://localhost:3050/statusqueue`, body).then((res) => {
      if (res.status === 200) {
        alert("เพิ่มข้อมูลเวลาในตารางจองคิวสำเร็จ");
      }
    });

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
            <Form.Label>ข้อมูลหมอนวด</Form.Label>
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
        <Col md={6}>
          <Form.Group>
            <Form.Label>เวลาเริ่ม {timeStart}</Form.Label>
            <Form.Control type="time" onChange={(e) => setTimeStart(e.target.value)} />
          </Form.Group>

        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>เวลาสิ้นสุด {timeEnd}</Form.Label>
            <Form.Control type="time" onChange={(e) => setTimeEnd(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group>
            <Form.Label>สถาน่ะ </Form.Label>
            <Form.Select
              onChange={(e) => setStausQueue(e.target.value)}
              aria-label="Default select example">
              <option value="ว่าง">ว่าง</option>
              <option value="ไม่ว่าง">ไม่ว่าง</option>
            </Form.Select>

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

export default MessageQueuForm;

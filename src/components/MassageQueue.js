import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./MassageQueue.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function MassageQueue() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [statusQueue, setStatusQueue] = useState([]);
  
  let auth = localStorage.getItem("auth")
  console.log('in queue',auth)
  function getStatusQueue() {
    axios.get(`http://localhost:3050/statusqueues`).then((res) => {
      setStatusQueue(res.data);
    });
  }

  //ข้อมูลตารางหมอนวดทั้งหมด
  const getMassageQueue = async () => {
    await axios.get(`http://localhost:3050/massagequeue`).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  };

  function filterStatus(id) {
    let result = statusQueue.filter((obj) => obj.massagequeueId === id);
    return result;
  }

  function BookingQueue(time) {
    navigate("/booking-queue", { state: time });
  }

  useEffect(() => {
    getMassageQueue();

    getStatusQueue();
  }, []);

  useEffect(() => {}, [statusQueue]);

  return (
    <>
      <Row className="mt-2">
        <Col sm={12}>
          <Card className="mt-2">
            <Card.Body>
              <h5>ตารางจองคิวหมอนวด ร้านนวดแผนไทย </h5>

              <Row className="mb-4 mt-4">
                <Form>
                  <Form.Group>
                    <Row>
                      <Col sm={4}>
                        <Form.Label>วันที่</Form.Label>
                      </Col>
                      <Col sm={4}>
                        <Form.Control
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </Col>
                      <Col sm={4}>
                        <Button>ค้นหา</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Row>

              <Table bordered className="text-left">
                <thead>
                  <tr>
                    <th>หมอนวด</th>
                    <th>09:00-12:00</th>
                    <th>12:00-13:00</th>
                    <th>14:00-15:00</th>
                    <th>15:00-16:00</th>
                  </tr>
                </thead>
                <tbody>
                  {  data && data.length > 0 &&  data.map((item) => {
                    let Times = filterStatus(item.massagequeueId);
                    return (
                      <>
                        <tr>
                          <td>
                            <div>
                              <img
                                alt="profile"
                                style={{ width: "120px" }}
                                className="mt-2"
                                src={item.profile}
                              />
                              <p className="mt-2"> ชื่อ-นามสกุล  {item.firstname}</p>
                            </div>
                          </td>
                          {Times?.map((time) => {
                            return (
                              <>
                                <td>
                                  {" "}
                                  <Button
                                    onClick={() => BookingQueue(time)}
                                    className="btn-queue"
                                    variant="success"
                                  >
                                    {time.status}
                                  </Button>{" "}
                                </td>
                              </>
                            );
                          })}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default MassageQueue;

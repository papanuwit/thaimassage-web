import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function BookingQueue() {
  const location = useLocation();
  const propsData = location.state;

  const { endTime, massagequeueId, startTime } = propsData;

  const navigate = useNavigate();
  const [massageType, setMassageType] = useState("");
  const [total, setTotal] = useState(500);
  const [start, setStartTime] = useState(startTime);
  const [end, setEndTime] = useState(endTime);
  const price = 500;
  const age = localStorage.getItem("age");
  const name = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");
  const customerId = localStorage.getItem("customerId");
  const [promotion, setPromotion] = useState([]);
  const [massageTypeRec, setMassageTypeRec] = useState([]);
  const [detail, setDetail] = useState("");


  //users 
  const [users, setUsers] = useState([]);

  const getPromotion = async () => {
    await axios.get(`http://localhost:3050/promotion`).then((res) => {
      setPromotion(res.data);
    });
  };

  const getRecommendation = async () => {

    let age = localStorage.getItem("age");
    let gender = localStorage.getItem("gender");
    await axios.get(`http://localhost:3050/recomandtaion/${age}/${gender}`).then((res) => {

      setUsers(res.data);
    });


  };


  const getMassageTypeRec = () => {
    users?.map(item => {
      axios.get(`http://localhost:3050/messageRecomandtaion/${item.customerId}`).then((res) => {
        let data = res.data;
        if (massageTypeRec.length === 0) {
          if (data.length >= 2) {
            setMassageTypeRec(data)
          }

        }

      });
    })


  };



  function saveBooking() {
    const body = {
      customerId: customerId,
      massagequeueId: massagequeueId,
      massagetype: massageType,
      total: total,
      startTime: startTime,
      endTime: endTime,
    };

    axios.post(`http://localhost:3050/queuebooking`, body).then((res) => {
      if (res.status === 200) {
        Swal.fire("Good job!", "บันทึกการจองคิวสำเร็จ", "success");
      }
      navigate("/profile");
    });
  }

  const getDetail = (val) => {
    setDetail(val);
    let number = price - (price / 100) * val.discount;
    setTotal(number);
  };

  useEffect(() => {
    getRecommendation();
    getPromotion();
    console.log(propsData);
  }, []);

  useEffect(() => { }, [promotion]);
  useEffect(() => {
    console.log(users);
    getMassageTypeRec();
  }, [users]);

  return (
    <>
      <Row className="mt-4 mb-4">
        <Col sm={2}></Col>
        <Col sm={8}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">
                บึนทึกข้อมูลการจองคิวนวด ร้านนวดแผนไทย
              </Card.Title>

              <Form className="mt-2">
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control type="text" value={name} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control type="text" value={lastname} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control type="text" value={age} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col sm={6}>
                    <Form.Group>
                      <Row>
                        <Col>
                          <Form.Label>ประเภทการนวดแนะนำ</Form.Label>
                        </Col>
                        <Col>
                          <Form.Select
                            onChange={(e) => setMassageType(e.target.value)}
                          >
                            {
                              massageTypeRec?.map(item => {

                                return (<>

                                  <option value="นวดออยล์">{item?.massagetype}</option>
                                </>)
                              })
                            }


                          </Form.Select>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group>
                      <Row>
                        <Col>
                          <Form.Label>เลือกประเภทอื่น ๆ</Form.Label>
                        </Col>
                        <Col>
                          <Form.Select
                            onChange={(e) => setMassageType(e.target.value)}
                          >
                            <option value="นวดออยล์">นวดออยล์</option>
                            <option value="นวดอโรม่า">นวดอโรม่า</option>
                            <option value="นวดฝ่าเท้า">นวดฝ่าเท้า</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>

                <Card className="mt-4 p-2">
                  <Row>
                    <Col sm={4}>
                      <img
                        style={{ width: "80%" }}
                        src="https://www.sakonnakhonguide.com/upload/pics/9a11b02232729bc6db11fb777a4669d8.jpg"
                      ></img>
                    </Col>
                    <Col sm={8}>
                      <div>
                        <p>ชื่อหมอนวด : jansuda</p>
                        <p>
                          เวลาเริ่มต้น : {start} น - เวลาสิ้นสุด : {end} น{" "}
                        </p>
                        <p>อัตราค่าบริการ ชั่วโมงละ {price} บาท : </p>
                      </div>
                    </Col>
                  </Row>
                </Card>

                <Row className="mt-4">
                  <Col sm={6}>
                    <h5>เลือกโปรโมชัน</h5>

                    {promotion?.map((pro) => {
                      return (
                        <>
                          <Card style={{ backgroundColor: '#2964B9', color: '#fff' }} className="mb-4" onClick={() => getDetail(pro)}>
                            <Card.Body>
                              <h5> {pro.title}</h5>
                              <h5 >
                                ส่วนลด {pro.discount} %{" "}
                              </h5>
                            </Card.Body>
                          </Card>
                        </>
                      );
                    })}
                  </Col>

                  <Col sm={6}>
                    <h5>รายละเอียด</h5>
                    <Card >
                      <Card.Body>
                        <span>{detail.detail}</span>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* check out */}

                <Row className="mt-4">
                  <Col sm={6}>
                    <b>ราคารวมทั้งหมด {total} บาท -</b>
                  </Col>
                  <Col sm={6}>
                    <b>ส่วนลด {(price / 100) * detail.discount || 0} บาท -</b>
                  </Col>
                </Row>

                <Row className="mt-4 mb-4">
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => saveBooking()}
                      className="w-100"
                    >
                      {" "}
                      บันทึกจองคิวนวด{" "}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={() => navigate("/massage-queue")}
                      className="w-100"
                    >
                      {" "}
                      ยกเลิก{" "}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </>
  );
}

export default BookingQueue;

import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button, Alert, Modal, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
const Profile = () => {
  const [booking, setBooking] = useState([]);
  const [fileSelect, setFileSelect] = useState(null);

  const userId = localStorage.getItem("customerId");
  const [show, setShow] = useState(false);
  const [queuebookingId, setQueuebookingId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setQueuebookingId(id);
    setShow(true);
  };


  function updateBooking() {
    const body = {
      payment: "แจ้งชำระเงินแล้ว"
    };

    axios.put(`http://localhost:3050/queuebooking/${queuebookingId}`, body)
  }

  let path = "";

  const uploadPayment = async () => {

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


      const body = { queuebookingId: queuebookingId, profile: path }
      await axios
        .post(`http://localhost:3050/payment`, body)
        .then((res) => {
          if (res.status === 200) {
            updateBooking();
            alert("แจ้งชำระเงินสำเร็จ");
          }

        });
    }

    setShow(false);


  };

  const getBooking = async () => {
    await axios
      .get(`http://localhost:3050/queuebooking/${userId}`)
      .then((res) => {
        console.log(res);
        setBooking(res.data);
      });
  };



  useEffect(() => {
    getBooking();
  }, []);

  return (
    <>
      <Row>
        <Col style={{ marginTop: "40px", marginBottom: "40px" }}>
          <h4>โปรไฟล์ของฉัน</h4>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <img src={localStorage.getItem("profile")} style={{ width: "80px" }} />
              <h5> {localStorage.getItem('firstname') + localStorage.getItem('lastname')}</h5>
              <h5> email : panuwit123@gmail.com</h5>
              <h5> หมายเลขโทรศัพท์ 0987485857</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col sm={12} style={{ marginTop: "40px", marginBottom: "40px" }}>
          <h4>ข้อมูลการจองคิว</h4>
        </Col>
        {booking && booking.length > 0 && booking.map((item) => {
          return (
            <>
              <Col sm={12} className="mb-4">
                <Card style={{ backgroundColor: "#E4E7EC ", color: "#353535 " }}>
                  <Card.Body>
                    <Row>
                      <Col>

                        <h5>
                          วันที่จองคิว{" "}
                          {moment(item.dateBooking).format("YYYY-MM-DD")}{" "}
                        </h5>
                        <h4>เวลาเริ่มต้น {item.startTime} น </h4>
                        <h4>เวลาสิ้นสุด {item.endTime} น </h4>
                        <h4>ราคา {item.total} บาท</h4>
                        <h4>ประเภทการนวด :  {item.massagetype} บาท</h4>
                        <h4>สถานะการชำระเงิน : {item.payment}</h4>
                        <Button className="w-50" onClick={() => handleShow(item.queuebookingId)}> ชำระเงิน</Button>
                      </Col>

                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </>
          );
        })}
        {booking?.length > 0 ? (
          <> </>
        ) : (
          <Alert> ยังไม่มีข้อมูลคิวที่จอง </Alert>
        )}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ชำระเงิน โอนจ่ายผ่านธนาคาร</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            style={{
              width: "70%",
              height: "auto",
              objectFit: "cover",
              display: 'block',
              margin: '0 auto '
            }}
            src="payment.jpg"
          />
          <Form className="mt-4">
            <Form.Label>อัพโหลดสลิปโอนเงิน</Form.Label>
            <Form.Control
              type="file"

              onChange={(e) => setFileSelect(e.target.files[0])}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => uploadPayment()}>
            อัพโหลดสลิปโอนเงิน
          </Button>
          <Button variant="primary" onClick={handleClose}>
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Profile;

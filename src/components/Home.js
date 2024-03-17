import React from "react";
import { Carousel, Col, Row, Card, Button } from "react-bootstrap";
import {useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate()
  return (
    <>
      <Row>
        <Col style={{ marginTop: "60px", marginBottom: "60px" }}>
          <h1>ยินดีต้อนรับ เข้าสู่ร้านนวดแผนไทย </h1>
        </Col>
      </Row>

      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/Young-female-receiving-massage-by-therapist-in-traditional-thai-position-1296x728-header.jpg?w=1155&h=1528"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.sfsm.edu/wp-content/uploads/2018/04/ThaiMassageArticle.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn-prod.medicalnewstoday.com/content/images/articles/323/323687/woman-lying-on-side-receiving-thai-massage.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <Row className="mt-4 mb-4">
        <Col sm={12}>
          <div className="text-center mb-4">
            <h4>ประเภทการนวดทั้งหมด</h4>
          </div>
        </Col>

        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>นวดออยล์</Card.Title>
              <img src="m1.png" style={{ width: "100%" }} />{" "}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>นวดน้ำมันอโรมา</Card.Title>
              <img src="m2.png" style={{ width: "100%" }} />{" "}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>นวดฝ่าเท้า</Card.Title>
              <img src="m3.png" style={{ width: "100%" }} />{" "}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col sm={12}>
          <div className="text-center mb-4">
            <h4>โปรโมชัน</h4>
          </div>
        </Col>

        <Col sm={4}>
          <Card>
            <Card.Body>
              <img src="m4.png" style={{ width: "100%" }} />{" "}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <img src="m5.png" style={{ width: "100%" }} />{" "}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <img src="m6.png" style={{ width: "100%" }} />{" "}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">

        <Col sm={6}>
            <Button className="btn-primary w-50" onClick={()=>navigate('/massage-queue')}>จองคิวนวด</Button>
        </Col>
        <Col sm={6}>
            <Button className="btn-success w-50" onClick={()=>navigate('/register')}>สมัครสมาชิก</Button>
        </Col>
      </Row>
    </>
  );
}
export default Home;

import React, { useState } from "react";
import { Row, Col, Form, Image, Button } from "react-bootstrap";
import axios from "axios";
const PromotionForm = (props) => {
    const [fileSelect, setFileSelect] = useState(null);
    const [title, setTitle] = useState("");
    const [discount, setDiscount] = useState("");
    const [detail, setDetail] = useState("");
    const [proImg, setProImg] = useState("");
    const { handleClose,onSelectMenu } = props;

    let path = "";

    const handelUpload = (e) => {
        setProImg(URL.createObjectURL(e.target.files[0]));
        setFileSelect(e.target.files[0])
      };
    
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
                title: title,
                discount: discount,
                detail: detail,
                profile: path,
            };

            await axios.post(`http://localhost:3050/promotion`, body).then((res) => {
                if (res.status === 200) {
                    alert("เพิ่มข้อมูลโปรโมชันสำเร็จ");

                }
            });
        }

        await onSelectMenu("ข้อมูลโปรโมชัน")
        await handleClose();
        
    };

    return (
        <Form>
            <Row>
                <Col md={12}>
                    <div className="profile mb-2">
                       
                    <Image src={proImg} style={{width:'100%'}} />
                         
                      
                    </div>
                    <Form.Label>อัพโหลดรูปโปรโปรโมชัน</Form.Label>
                    <Form.Group className="mb-2">
                        <Form.Control
                            onChange={(e) => handelUpload(e)}
                            type="file"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-2">
                        <Form.Label>ชื่อโปรโมชัน</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="ชื่อโปรโมชัน"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>ส่วนลด</Form.Label>
                        <Form.Control
                            onChange={(e) => setDiscount(e.target.value)}
                            type="text"
                            value={discount}
                            placeholder="ส่วนลด"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>รายละเอียด</Form.Label>
                        <Form.Control
                            onChange={(e) => setDetail(e.target.value)}
                            type="text"
                            value={detail}
                            placeholder="รายละเอียด"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Button className="w-100 mt-3" onClick={() => uploadProfile()}> บันทึกข้อมูล</Button>
        </Form>
    );
};

export default PromotionForm;

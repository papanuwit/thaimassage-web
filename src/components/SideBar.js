import React from "react";
const SideBar = (props) => {
  const {onSelectMenu} = props;
  return (
    <div className="bg white">
      <div>
        <i className="bi bi-bootstrap-fill my-2"></i>
<br/>
        <span className="brand-name fs-4">ADMIN</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <a className="list-group-item list-group-item-action my-2" onClick={()=>onSelectMenu("ข้อมูลหมอนวด")} >
          <i className="speedometer2"></i>
          <span>ข้อมูลหมอนวด</span>
        </a>
        <a className="list-group-item list-group-item-action my-2" onClick={()=>onSelectMenu("คิวหมอนวด")} >
          <i className="speedometer2"></i>
          <span>คิวหมอนวด</span>
        </a>
        <a className="list-group-item list-group-item-action my-2" onClick={()=>onSelectMenu("คิวจองนวดทั้งหมด")}>
          <i className="speedometer2"></i>
          <span>คิวที่จองนวดทั้งหมด</span>
        </a>
       
        <a className="list-group-item list-group-item-action my-2" onClick={()=>onSelectMenu("ข้อมูลโปรโมชัน")}>
          <i className="speedometer2"></i>
          <span>ข้อมูลโปรโมชัน</span>
        </a>
       
      
      </div>
    </div>
  );
};

export default SideBar;

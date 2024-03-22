import moment from "moment";
import React, { useEffect } from "react";
import { Table, Image, Button } from "react-bootstrap";

const TableData = (props) => {
  const { data, columns,menu,onClickRowUpdate } = props;
  useEffect(() => {}, [data]);
  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            {columns.map((item) => {
              return <th>{item.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <>
                <tr key={item.masseuseId}>
                  {columns.map((key) => {
                    if (key.key === "profile") {
                      return (
                        <td>
                          <Image
                            style={{ width: "120px" }}
                            src={`http://localhost:3050/${item[key.key]}`}
                          />
                        </td>
                      );
                    }
                    if (key.key === "date") {
                      return (
                        <td>
                          
                           <p> { moment(item[key.key]).format('YYYY-MM-DD')} </p>
                         
                        
                        </td>
                      );
                    }
                    if (key.key === "action") {
                      return (
                        <td>
                          
                          <Button variant="warning" onClick={()=>onClickRowUpdate(item,menu)}> แก้ไข </ Button> { ' '}
                          <Button variant="danger"> ลบ </ Button>
                         
                        
                        </td>
                      );
                    }
                    else {
                      return <td>{item[key.key]}</td>;
                    }
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TableData;

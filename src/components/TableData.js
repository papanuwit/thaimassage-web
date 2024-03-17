import React, { useEffect } from "react";
import { Table, Image } from "react-bootstrap";

const TableData = (props) => {
  const { data, columns } = props;
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
                    } else {
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

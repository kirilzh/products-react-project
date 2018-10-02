import * as React from "react";
import SgTableRow from "./TableRow";
import SgTableCell from "./TableCell";

const Table = ({ columns, data, permissions }) => {
  if (data === null || columns === null) {
    return <p>spinners</p>;
  }

  const headerCells = columns.map((column, i) => {
    return <th key={i}>{column.label}</th>;
  });

  return (
    <React.Fragment>
      <div id="flip-scroll">
        <table>
          <thead>
            <tr>{headerCells}</tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <SgTableRow key={index}>
                {columns.map((column, index) => (
                  <SgTableCell key={index} style={column.style} accessor={column.accessor}>
                    {typeof column.accessor === "string"
                      ? element[column.accessor]
                      : column.accessor(permissions, element["_id"])}
                  </SgTableCell>
                ))}
              </SgTableRow>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Table;

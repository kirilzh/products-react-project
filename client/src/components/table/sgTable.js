import React from "react";
import SGTableRow from "./sgTable-row";
import SGTableCell from "./sgTable-cell";

const SGTable = ({ columns, data, permissions }) => {
  if (data === null || columns === null) {
    return "spinner";
  }

  const headerCells = columns.map((column, i) => {
    return <th key={i}>{column.label}</th>;
  });

  return (
    <table>
      <thead>
        <tr>{headerCells}</tr>
      </thead>
      <tbody>
        {data.map((element, index) => (
          <SGTableRow key={index}>
            {columns.map((column, index) => (
              <SGTableCell key={index} style={column.style}>
                {typeof column.accessor === "string"
                  ? element[column.accessor]
                  : column.accessor(permissions, element['_id'])}
              </SGTableCell>
            ))}
          </SGTableRow>
        ))}
      </tbody>
    </table>
  );
};

export default SGTable;

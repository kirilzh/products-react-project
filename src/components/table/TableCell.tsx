import * as React from "react";

const TableCell = ({ children, style, accessor }) => {
  if(typeof accessor === "string") {
    return <td data-column={accessor} style={style}>{children}</td>;
  }
  return <td style={style}>{children}</td>
};

export default TableCell;

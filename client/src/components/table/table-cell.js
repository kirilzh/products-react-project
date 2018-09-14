import React from "react";

const TableCell = props => {
  return <td>{props.children}</td>;
};

// const TableCell = ({ products, permissions }) => {
//   return products.map(product => {
//       return <td>{product}</td>;
//     });
//
// };

export default TableCell;

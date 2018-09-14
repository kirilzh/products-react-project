import React from "react";
import TableCell from "./table-cell";

const TableRow = props => {
  return (
    <React.Fragment>
      <tr>
        <th>{props.heading}</th>
      </tr>
      <tr>{props.children}</tr>
    </React.Fragment>
  );
};

// const TableRow = ({ products, permissions }) => {
//   return products.map((value, i) => {
//     return (
//       <tr key={i}>
//         <TableCell products={value} />
//       </tr>
//     );
//   });
// };

export default TableRow;

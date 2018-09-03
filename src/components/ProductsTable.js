import React from "react";
import ProductItems from './ProductItems'

const ProductTable = ({ products, permissions, productItems, drill }) => {
  return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Actions</th>
          </tr>
          <ProductItems drill={drill} />
        </tbody>
      </table>
  );
};

export default ProductTable;

import React, { Component } from "react";

import { updateProduct, deleteProduct } from "../actions";

class ProductItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const payload = this.props;
    console.log(payload);

    const products = payload.products.map((product, i) => {
      return (
        <tr key={i}>
          <td>{i}</td>
          <td dangerouslySetInnerHTML={{ __html: product.name }} />
          <td>{product.price}</td>
          <td>{product.currency}</td>
          <td>
            {payload.drill.permissions[1].visible && (
              <button onClick={() => payload.drill.deleteProduct(i)}>
                Delete
              </button>
            )}
            {payload.drill.permissions[2].visible && (
              <button
                onClick={() =>
                  payload.drill.updateProduct(
                    i,
                    payload.drill.temporary[0].name,
                    payload.drill.temporary[0].price,
                    payload.drill.temporary[0].currency
                  )
                }
              >
                Update
              </button>
            )}
          </td>
        </tr>
      );
    });

    return products;
  }
}

export default ProductItems;

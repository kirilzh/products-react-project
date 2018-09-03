import React from "react";

const ProductItems = ({ drill }) => {
    const payload = drill;

    return payload.products.map((product, i) => {
      return (
        <tr key={i}>
          <td>{i}</td>
          <td dangerouslySetInnerHTML={{ __html: product.name }} />
          <td>{product.price}</td>
          <td>{product.currency}</td>
          <td>
            {payload.permissions[1].visible && (
              <button onClick={() => payload.deleteProduct(i)}>
                Delete
              </button>
            )}
            {payload.permissions[2].visible && (
              <button
                onClick={() =>
                  payload.updateProduct(
                    i,
                    payload.temporary[0].name,
                    payload.temporary[0].price,
                    payload.temporary[0].currency
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
  };

export default ProductItems;

import React, { Component } from "react";

class ProductItems extends Component {
  render() {
    const payload = this.props.drill;
    console.log("productItems", payload);

    if (payload.permissions.data === null || payload.products.data === null) {
      return (
        <tr>
          <td>loading</td>
        </tr>
      );
    } else {
      return payload.products.data.map((product, i) => {
        return (
          <tr key={i}>
            <td>{i}</td>
            <React.Fragment>
              <td dangerouslySetInnerHTML={{ __html: product.name }} />
              <td>{product.price}</td>
              <td>{product.currency}</td>
            </React.Fragment>
            <td>
              {payload.permissions.data[1].visible && (
                <button onClick={() => payload.onDeleteProduct(product._id)}>
                  Delete
                </button>
              )}
              {payload.permissions.data[2].visible && (
                <button
                  onClick={() =>
                    payload.onUpdateProduct({
                      id: product._id,
                      name: payload.products.name,
                      price: payload.products.price,
                      currency: payload.products.currency
                    })
                  }
                >
                  Update
                </button>
              )}
            </td>
          </tr>
        );
      });
    }
  }
}

export default ProductItems;

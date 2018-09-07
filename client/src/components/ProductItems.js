import React, { Component } from "react";

class ProductItems extends Component {
  handleChange(field, value, index) {
    this.props.drill.changeAction(field, value, index);
  }

  render() {
    const payload = this.props.drill;
    console.log(payload);

    if (payload.permissions.data === null) {
      return <tr><td>loading</td></tr>;
    } else {
      return payload.products.map((product, i) => {
        return (
          <tr key={i}>
            <td>{i}</td>
            {product.editable && (
              <React.Fragment>
                <td>
                  <input
                    name="name"
                    defaultValue={product.name}
                    onChange={e =>
                      this.handleChange(e.target.name, e.target.value, i)
                    }
                  />
                </td>
                <td>
                  <input
                    name="price"
                    defaultValue={product.price}
                    onChange={e =>
                      this.handleChange(e.target.name, e.target.value, i)
                    }
                  />
                </td>
                <td>
                  <input
                    name="currency"
                    defaultValue={product.currency}
                    onChange={e =>
                      this.handleChange(e.target.name, e.target.value, i)
                    }
                  />
                </td>
              </React.Fragment>
            )}

            {/*When the fields should not be editable*/}
            {!product.editable && (
              <React.Fragment>
                <td dangerouslySetInnerHTML={{ __html: product.name }} />
                <td>{product.price}</td>
                <td>{product.currency}</td>
              </React.Fragment>
            )}
            <td>
              {payload.permissions.data[1].visible && (
                <button onClick={() => payload.deleteProduct(i)}>Delete</button>
              )}
              {payload.permissions.data[2].visible &&
                ((!payload.products[i].editable && (
                  <button onClick={() => payload.updateProduct(i)}>
                    Update
                  </button>
                )) || (
                  <button
                    onClick={() =>
                      payload.saveProduct(
                        i,
                        product.name,
                        product.price,
                        product.currency
                      )
                    }
                  >
                    Save
                  </button>
                ))}
            </td>
          </tr>
        );
      });
    }
  }
}

export default ProductItems;

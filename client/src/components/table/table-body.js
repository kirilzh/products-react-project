import React, { Component } from "react";
import { connect } from "react-redux";

import TableRow from "./table-row";

class TableBody extends Component {
  render() {
    const { products, permissions } = this.props;

    if (products === null || permissions === null) return <p>loading</p>;

    function propertySeparator(object) {
      return object.map(property => {
        return Object.values(property);
      })
    }

    const values = propertySeparator(products);

    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Currency</th>
          </tr>
          <TableRow products={values} permissions={permissions} />
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.data,
    permissions: state.permissions.data
  };
}

export default connect(mapStateToProps)(TableBody);

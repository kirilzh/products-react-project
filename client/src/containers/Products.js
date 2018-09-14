import React, { Component } from "react";
import ProductTable from "../components/ProductsTable";
import PermissionButtons from "../components/PermissionButtons";
import PropTypes from "prop-types";

import { changeAction, toggleButton } from "../actions/index";

import TableBody from "../components/table/table-body";

import { connect } from "react-redux";
import TableRow from "../components/table/table-row";
import TableCell from "../components/table/table-cell";

class Products extends Component {
  componentDidMount() {
    const { onRequestPermissions, onRequestProducts } = this.props;
    onRequestPermissions();
    onRequestProducts();
  }

  handleChange = event => {
    this.props.changeAction(event.target.name, event.target.value);
  };

  render() {
    const {
      products,
      permissions,
      togglePermission,
      onPostProduct,
      dataRows
    } = this.props;
    console.log(this.props);

    // fetching products
    const fetching = permissions.fetching || products.fetching;

    dataRows.map(row => console.log(row));

    if (fetching) return <p>fetching</p>;

    return (
      <React.Fragment>
        <div className="table">
          <ProductTable drill={this.props} />
        </div>

        <button
          onClick={() => {
            document.querySelector(".bg-modal").style.display = "flex";
          }}
        >
          PopUp
        </button>
        <div className="bg-modal">
          <div className="modal-content">
            <div
              className="close"
              onClick={() => {
                document.querySelector(".bg-modal").style.display = "none";
              }}
            >
              +
            </div>
            <hr />
            <p>Add Product</p>
            <input
              type="text"
              name="name"
              placeholder="Product name"
              onChange={this.handleChange}
            />
            <input
              name="price"
              placeholder="Price"
              onChange={this.handleChange}
            />
            <input
              name="currency"
              placeholder="Currency"
              onChange={this.handleChange}
            />

            <button
              onClick={() =>
                onPostProduct({
                  name: this.props.products.name,
                  price: this.props.products.price,
                  currency: this.props.products.currency
                })
              }
            >
              Add Product
            </button>
          </div>
        </div>

        <hr />
        <h2>Enable/Disable Permissions</h2>
        {permissions.data ? (
          <PermissionButtons
            permissions={permissions.data}
            togglePermission={togglePermission}
          />
        ) : null}

        <hr />
        {/*<h2>Updated with decoupling</h2>*/}
        {/*<TableBody />*/}
        {/*<hr />*/}

        <h2>Updated with decoupling v2</h2>
        <table>
          <tbody>
            {dataRows.map((row, i) => (
              <TableRow key={i}>
                {Object.values(row).map((cell, i) => (
                  <TableCell key={i} heading={Object.keys(row)}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

Products.propType = {
  products: PropTypes.object.isRequired,
  togglePermission: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired
};

// Map Redux state to component
function mapStateToProps(state) {
  return {
    products: state.products,
    permissions: state.permissions,
    onDeleteProduct: state.onDeleteProduct,
    onUpdateProduct: state.onUpdateProduct,
    dataRows: [
      {
        id: 0,
        name: "SSD",
        price: 200,
        currency: "BGN",
        update: true,
        delete: true
      },
      {
        id: 1,
        name: "HDD",
        price: 100,
        currency: "USD",
        update: true,
        delete: true
      }
    ]
  };
}

// Map Redux action to component props
function mapDispatchToProps(dispatch) {
  return {
    togglePermission: (text, index) => dispatch(toggleButton(text, index)),
    changeAction: (field, value, index) =>
      dispatch(changeAction(field, value, index)),
    onRequestPermissions: () => dispatch({ type: "PERMISSIONS_FETCH_REQUEST" }),
    onRequestProducts: () => dispatch({ type: "PRODUCTS_FETCH_REQUEST" }),
    onPostProduct: product =>
      dispatch({ type: "PRODUCT_POST_REQUEST", product }),
    onDeleteProduct: id => dispatch({ type: "PRODUCT_DELETE_REQUEST", id }),
    onUpdateProduct: product =>
      dispatch({ type: "PRODUCT_UPDATE_REQUEST", product })
  };
}

// Connect component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

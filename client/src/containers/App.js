import React, { Component } from "react";
import ProductTable from "../components/ProductsTable";
import PermissionButtons from "../components/PermissionButtons";
import PropTypes from "prop-types";

import {
  changeAction,
  toggleButton,
  saveProduct,
  updateProduct,
  addProductFormToggle
} from "../actions/index";

import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    const { onRequestPermissions, onRequestProducts } = this.props;
    onRequestPermissions();
    onRequestProducts();
  }

  handleChange(field, value) {
    this.props.changeAction(field, value);
  }

  showForm() {
    this.props.addProductFormToggle();
  }

  render() {
    const {
      products,
      permissions,
      togglePermission,
      onPostProduct
    } = this.props;
    console.log(this.props);

    return (
      <div>
        {permissions.fetching || products.fetching ? (
          <p>fetching</p>
        ) : (
          <React.Fragment>
            <div className="table">
              <ProductTable drill={this.props} />
            </div>

            <input
              type="text"
              name="name"
              placeholder="Product name"
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
            <input
              name="price"
              placeholder="Price"
              onChange={e => this.handleChange(e.target.name, e.target.value)}
            />
            <input
              name="currency"
              placeholder="Currency"
              onChange={e => this.handleChange(e.target.name, e.target.value)}
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
              Add from Saga
            </button>
            <hr />
            <h2>Enable/Disable Permissions</h2>
            {permissions.data ? (
              <PermissionButtons
                permissions={permissions.data}
                togglePermission={togglePermission}
              />
            ) : null}
          </React.Fragment>
        )}
      </div>
    );
  }
}

App.propType = {
  products: PropTypes.object.isRequired,
  saveProduct: PropTypes.func.isRequired,
  togglePermission: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  addProductFormToggle: PropTypes.func.isRequired
};

// Map Redux state to component
function mapStateToProps(state) {
  return {
    products: state.products,
    permissions: state.permissions,
    name: state.name,
    price: state.price,
    currency: state.currency,
    addProductFormVisible: state.addProductFormVisible,
    onDeleteProduct: state.onDeleteProduct
  };
}

// Map Redux action to component props
function mapDispatchToProps(dispatch) {
  return {
    saveProduct: (index, name, price, currency) =>
      dispatch(saveProduct(index, name, price, currency)),
    togglePermission: (text, index) => dispatch(toggleButton(text, index)),
    changeAction: (field, value, index) =>
      dispatch(changeAction(field, value, index)),
    updateProduct: index => dispatch(updateProduct(index)),
    addProductFormToggle: () => dispatch(addProductFormToggle()),
    onRequestPermissions: () => dispatch({ type: "PERMISSIONS_FETCH_REQUEST" }),
    onRequestProducts: () => dispatch({ type: "PRODUCTS_FETCH_REQUEST" }),
    onPostProduct: product =>
      dispatch({ type: "PRODUCT_POST_REQUEST", product }),
    onDeleteProduct: id => dispatch({ type: "PRODUCT_DELETE_REQUEST", id})
  };
}

// Connect component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

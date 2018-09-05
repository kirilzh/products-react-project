import React, { Component } from "react";
import ProductTable from "../components/ProductsTable";
import PermissionButtons from "../components/PermissionButtons";
import PropTypes from "prop-types";

import {
  addProduct,
  changeAction,
  deleteProduct,
  toggleButton,
  saveProduct,
  updateProduct,
  addProductFormToggle
} from "../actions/index";

import { connect } from "react-redux";

class App extends Component {
  handleChange(field, value) {
    this.props.changeAction(field, value);
  }

  showForm() {
    this.props.addProductFormToggle();
  }

  render() {
    const { addProduct, permissions, togglePermission } = this.props;

    return (
      <div>
        <div className="table">
          <ProductTable drill={this.props} />
        </div>

        {this.props.addProductFormVisible && (
          <div>
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
            {this.props.permissions[0].visible && (
              <button
                onClick={() =>
                  addProduct(
                    this.props.name,
                    this.props.price,
                    this.props.currency
                  )
                }
              >
                Save
              </button>
            )}
          </div>
        )}
        <div className="mrk">
          <a className="btn" onClick={() => this.showForm()}>
            Add
          </a>
        </div>
        <hr />
        <h2>Enable/Disable Permissions</h2>
        <PermissionButtons
          permissions={permissions}
          togglePermission={togglePermission}
        />
      </div>
    );
  }
}

App.propType = {
  products: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
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
    addProductFormVisible: state.addProductFormVisible
  };
}

// Map Redux action to component props
function mapDispatchToProps(dispatch) {
  return {
    addProduct: (name, price, currency) =>
      dispatch(addProduct(name, price, currency)),
    deleteProduct: index => dispatch(deleteProduct(index)),
    saveProduct: (index, name, price, currency) =>
      dispatch(saveProduct(index, name, price, currency)),
    togglePermission: (text, index) => dispatch(toggleButton(text, index)),
    changeAction: (field, value, index) =>
      dispatch(changeAction(field, value, index)),
    updateProduct: index => dispatch(updateProduct(index)),
    addProductFormToggle: () => dispatch(addProductFormToggle())
  };
}

// Connect component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

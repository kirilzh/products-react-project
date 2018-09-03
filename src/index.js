import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { createStore, compose } from "redux";
import { Provider, connect } from "react-redux";

import ProductTable from "./components/ProductsTable";
import PermissionButtons from "./components/PermissionButtons";

import "./style.css";

import reducer from "./reducers";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleButton,
  changeAction
} from "./actions";

// Store
const store = createStore(
  reducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

class Products extends Component {
  handleChange(field, value) {
    this.props.changeAction(field, value);
  }

  render() {
    const { products, addProduct, permissions, togglePermission } = this.props;

    return (
      <div>
        <ProductTable
          products={products}
          permissions={permissions}
          drill={this.props}
        />
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
                  this.props.temporary[0].name,
                  this.props.temporary[0].price,
                  this.props.temporary[0].currency
                )
              }
            >
              Add
            </button>
          )}
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

Products.propType = {
  products: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  togglePermission: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired
};

// Map Redux state to component
function mapStateToProps(state) {
  return {
    products: state.products,
    permissions: state.permissions,
    temporary: state.temporary,
    name: state.name,
    price: state.price,
    permission: state.permission
  };
}

// Map Redux action to component props
function mapDispatchToProps(dispatch) {
  return {
    addProduct: (name, price, currency) =>
      dispatch(addProduct(name, price, currency)),
    deleteProduct: index => dispatch(deleteProduct(index)),
    updateProduct: (index, name, price, currency) =>
      dispatch(updateProduct(index, name, price, currency)),
    togglePermission: (text, index) => dispatch(toggleButton(text, index)),
    changeAction: (field, value) => dispatch(changeAction(field, value))
  };
}

// Connect component
const Prod = connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

ReactDOM.render(
  <Provider store={store}>
    <Prod />
  </Provider>,
  document.querySelector("#root")
);

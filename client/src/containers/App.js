import React, { Component } from "react";
import ProductTable from "../components/ProductsTable";
import PermissionButtons from "../components/PermissionButtons";
import PropTypes from "prop-types";

import {
  changeAction,
  toggleButton
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

    // fetching products
    const fetching = permissions.fetching || products.fetching;

    if (fetching) return <p>fetching</p>;
    else {
      return (
        <React.Fragment>
          <div className="table">
            <ProductTable drill={this.props} />
          </div>


          <button onClick={() => {
            document.querySelector('.bg-modal').style.display = 'flex';
          }}>PopUp</button>
          <div className="bg-modal">
            <div className="modal-content">
              <div className="close" onClick={() => {
                document.querySelector('.bg-modal').style.display = 'none';
              }}>
                +
              </div>
              <hr />
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
        </React.Fragment>
      );
    }
  }
}

App.propType = {
  products: PropTypes.object.isRequired,
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
    onDeleteProduct: state.onDeleteProduct,
    onUpdateProduct: state.onUpdateProduct
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
)(App);

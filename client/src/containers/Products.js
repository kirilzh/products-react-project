import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { toggleButton } from "../actions/index";
import SGTable from "../components/table/sgTable";
import ProductFrom from "./ProductForm";

class Products extends Component {
  componentDidMount() {
    const { onRequestPermissions, onRequestProducts } = this.props;
    onRequestPermissions();
    onRequestProducts();
  }

  renderPermissionButton = (permissions, id) => {
    return permissions.map((permission, index) => {
      if (permission.visible && permission.name === "DELETE") {
        return (
          <button
            onClick={() => this.props.onDeleteProduct(id)}
            key={index}
          >
            {permission.name}
          </button>
        );
      }

      if (permission.visible && permission.name === "UPDATE") {
        return (
          <button
            key={index}
            onClick={() =>
              this.props.onUpdateProduct({
                id: id,
                name: this.props.products.name,
                price: this.props.products.price,
                currency: this.props.products.currency
              })
            }
          >
            {permission.name}
          </button>
        );
      }
      return null;
    });
  };

  render() {
    const {
      products,
      permissions,
      onPostProduct
    } = this.props;

    // fetching products
    const fetching = permissions.fetching || products.fetching;

    if (fetching) return <p>fetching</p>;

    return (
      <React.Fragment>
        <SGTable
          columns={[
            { accessor: "_id", label: "id" },
            {
              accessor: "name",
              style: { fontWeight: "bold", color: "red" },
              label: "name"
            },
            { accessor: "price", style: { color: "blue" }, label: "price" },
            { accessor: "currency", label: "currency" },
            {
              accessor: this.renderPermissionButton,
              style: {},
              label: "actions"
            }
          ]}
          data={products.data}
          permissions={permissions.data}
        />
        <ProductFrom onPostProduct={onPostProduct} products={products} />
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
    onUpdateProduct: state.onUpdateProduct
  };
}

// Map Redux action to component props
function mapDispatchToProps(dispatch) {
  return {
    togglePermission: (text, index) => dispatch(toggleButton(text, index)),
    onRequestPermissions: () => dispatch({ type: "PERMISSIONS_FETCH_REQUEST" }),
    onRequestProducts: () => dispatch({ type: "PRODUCTS_FETCH_REQUEST" }),
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

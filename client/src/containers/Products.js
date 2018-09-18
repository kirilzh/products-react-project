import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeAction, toggleButton } from "../actions/index";
import SGTable from "../components/table/sgTable";
import PermissionButtons from "../components/PermissionButtons";

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
    } = this.props;

    // fetching products
    const fetching = permissions.fetching || products.fetching;

    if (fetching) return <p>fetching</p>;

    return (
      <React.Fragment>

        <hr />
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
              accessor: (permissions, id) => {
                return permissions.map((permission, index) => {
                  if (permission.name === "DELETE") {
                    return (
                      <button
                        onClick={() => this.props.onDeleteProduct(id)}
                        key={index}
                      >
                        {permission.name}
                      </button>
                    );
                  }

                  if (permission.name === "UPDATE") {
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          this.props.onUpdateProduct({
                            id: id,
                            name: products.name,
                            price: products.price,
                            currency: products.currency
                          })
                        }
                      >
                        {permission.name}
                      </button>
                    );
                  }

                  return null;
                });
              },
              style: {},
              label: "actions"
            }
          ]}
          data={products.data}
          permissions={permissions.data}
        />

        {/*<h2>Enable/Disable Permissions</h2>*/}
        {/*{permissions.data ? (*/}
          {/*<PermissionButtons*/}
            {/*permissions={permissions.data}*/}
            {/*togglePermission={togglePermission}*/}
          {/*/>*/}
        {/*) : null}*/}

        <button
          onClick={() => {
            document.querySelector(".bg-modal").style.display = "flex";
          }}
        >
          ADD
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

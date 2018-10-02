import * as React from "react";
import { connect } from "react-redux";
import { toggleButton } from "../actions";
import Table from "../components/table/Table";
import ProductFrom from "./ProductForm";
import LoaderHOC from '../HOC/loader'

type ProductsProps = {
  products: any;
  permissions: any;
  onPostProduct: any;
  togglePermission: Function;
  changeAction: Function;
  updateProduct: Function;
  onRequestPermissions: Function;
  onRequestProducts: Function;
  onDeleteProduct: Function;
  onUpdateProduct: Function;
};

class Products extends React.Component<ProductsProps> {
  componentDidMount() {
    const { onRequestPermissions, onRequestProducts } = this.props;
    onRequestPermissions();
    onRequestProducts();
  }

  renderPermissionButton = (permissions, id) => {
    return permissions.map((permission, index) => {
      if (permission.visible && permission.name === "DELETE") {
        return (
          <button onClick={() => this.props.onDeleteProduct(id)} key={index}>
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
                name: this.props.products.temporary.name.value,
                price: this.props.products.temporary.price.value,
                currency: this.props.products.temporary.currency.value
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

  renderLoading() {
    return <div>Loading...</div>;
  }

  render() {
    const { products, permissions, onPostProduct } = this.props;

    const fetching = permissions.fetching || products.fetching;

    if (fetching) {
      return this.renderLoading();
    }

    return (
      <React.Fragment>
        <Table
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
              style: {
                color: "brown",
                fontWeight: "bold"
              },
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
)(LoaderHOC('products', Products));

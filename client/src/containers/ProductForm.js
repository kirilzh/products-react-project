import React, { Component } from "react";
import { connect } from "react-redux";
import { changeAction } from "../actions/index";

class ProductForm extends Component {

  handleChange = event => {
    this.props.changeAction(event.target.name, event.target.value);
  };

  handlePost = () => {
    this.props.onPostProduct({
      name: this.props.products.name,
      price: this.props.products.price,
      currency: this.props.products.currency
    })
  };

  render() {
    return (
      <React.Fragment>
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
              onClick={this.handlePost}
            >
              Add Product
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeAction: (field, value, index) =>
      dispatch(changeAction(field, value, index)),
    onPostProduct: product =>
      dispatch({ type: "PRODUCT_POST_REQUEST", product })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);

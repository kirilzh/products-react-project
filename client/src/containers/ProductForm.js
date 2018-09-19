import React, { Component } from "react";
import { connect } from "react-redux";
import { changeAction } from "../actions/index";
import FormInputField from '../components/FormInputField';

class ProductForm extends Component {
  componentDidMount() {
    const { onRequestValidations } = this.props;
    onRequestValidations();
  }

  checkExpression(regex, name, value) {
    if (value.match(regex)) {
      this.props.changeAction(name + "Error", false);
      this.props.changeAction(name, value);
    } else {
      this.props.changeAction(name, "");
      this.props.changeAction(name + "Error", true);
    }
  }

  handleChange = event => {
    const products = this.props.products;
    const value = event.target.value;
    const name = event.target.name;

    const arr = this.props.validations.data;
    let result = {};
    for (let i = 0; i < arr.length; i++) {
      result[arr[i].name] = arr[i].expression;
    }

    switch (name) {
      case "name":
        this.checkExpression(result.name, name, value);
        break;
      case "price":
        this.checkExpression(result.price, name, value);
        break;
      case "currency":
        this.checkExpression(result.currency, name, value);
        break;

      default:
        this.props.changeAction(name, "");
        this.props.changeAction(name + "Error", true);
    }

    if (
      !(products.nameError && products.priceError && products.currencyError)
    ) {
      document.getElementById("submitForm").disabled = false;
    }
  };

  handlePost = () => {
    this.props.onPostProduct({
      name: this.props.products.name,
      price: this.props.products.price,
      currency: this.props.products.currency
    });
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
              required
              pattern={"[a-zA-Z]+"}
            />
            {this.props.products.nameError && (
              <label>{this.props.products.nameErrorMessage}</label>
            )}
            <input
              name="price"
              placeholder="Price"
              onChange={this.handleChange}
              required
              pattern={"[0-9]+"}
            />
            {this.props.products.priceError && (
              <label>{this.props.products.priceErrorMessage}</label>
            )}
            <input
              name="currency"
              placeholder="Currency"
              onChange={this.handleChange}
              required
              pattern={"[A-Z]+"}
            />
            {this.props.products.currencyError && (
              <label>{this.props.products.currencyErrorMessage}</label>
            )}
            <br />

            <button
              id="submitForm"
              onClick={this.handlePost}
              disabled={
                this.props.products.nameError ||
                this.props.products.priceError ||
                this.props.products.currencyError
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

function mapStateToProps(state) {
  return {
    products: state.products,
    validations: state.validations
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeAction: (field, value, index) =>
      dispatch(changeAction(field, value, index)),
    onPostProduct: product =>
      dispatch({ type: "PRODUCT_POST_REQUEST", product }),
    onRequestValidations: () => dispatch({ type: "VALIDATIONS_FETCH_REQUEST" })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);

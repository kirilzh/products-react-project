import * as React from "react";
import { connect } from "react-redux";
import { changeAction } from "../actions";
import FormInput from "./FormInput/FormInput";

type ProductFormProps = {
  products: any;
  permissions: any;
  validations: any;
  onPostProduct: any;
  togglePermission: Function;
  changeAction: Function;
  updateProduct: Function;
  onRequestPermissions: Function;
  onRequestProducts: Function;
  onRequestValidations: Function;
  onDeleteProduct: Function;
  onUpdateProduct: Function;
};

class ProductForm extends React.Component<ProductFormProps> {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { onRequestValidations } = this.props;
    onRequestValidations();
  }

  handlePost = () => {
    this.props.onPostProduct({
      name: this.props.products.temporary.name.value,
      price: this.props.products.temporary.price.value,
      currency: this.props.products.temporary.currency.value
    });
  };

  renderLoading() {
    return <div>Loading...</div>;
  }

  render() {
    if (this.props.validations.data === null) {
      return this.renderLoading();
    }

    return (
      <React.Fragment>
        <button
          id="addButton"
          onClick={() => {
            (document.querySelector(".bg-modal") as HTMLElement).style.display =
              "flex";
            (document.querySelector(
              ".bg-modal"
            ) as HTMLElement).style.position = "absolute";
          }}
        >
          ADD
        </button>
        <div className="bg-modal">
          <div className="modal-content">
            <div
              className="close"
              onClick={() => {
                (document.querySelector(
                  ".bg-modal"
                ) as HTMLElement).style.display = "none";
              }}
            >
              +
            </div>
            <hr />
            <form>
              <h1 id="headProduct">Add Product</h1>
              <FormInput
                name="name"
                floatingLabel="Name"
                errorLabel="Please enter a valid product name matching /^[a-zA-Z]+$/"
                errorName="nameError"
                error={this.props.products.temporary.name.valid}
                regex={this.props.validations.data.name}
              />
              <FormInput
                name="price"
                floatingLabel="Price"
                errorLabel="Please enter a valid product name matching /^[0-\.9]+$/"
                errorName="priceError"
                error={this.props.products.temporary.price.valid}
                regex={this.props.validations.data.price}
              />
              <FormInput
                name="currency"
                floatingLabel="Currency"
                errorLabel="Please enter a valid product name matching /^[A-Z]+$/"
                errorName="currencyError"
                error={this.props.products.temporary.currency.valid}
                regex={this.props.validations.data.currency}
              />

              <button
                id="submitForm"
                disabled={(Object as any)
                  .values(this.props.products.temporary.error)
                  .find(val => val)}
                onClick={this.handlePost}
              >
                Add Product
              </button>
            </form>
            <br />
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
    changeAction: (field, value, valid) =>
      dispatch(changeAction(field, value, valid)),
    onPostProduct: product =>
      dispatch({ type: "PRODUCT_POST_REQUEST", product }),
    onRequestValidations: () => dispatch({ type: "VALIDATIONS_FETCH_REQUEST" })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);

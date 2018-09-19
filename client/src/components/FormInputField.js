import React from "react";

const FormInputField = ({
  name,
  placeholder,
  onChange,
  pattern,
  error,
  errorMessage
}) => {
  return (
    <React.Fragment>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required
        pattern={pattern}
      />
      <label>{errorMessage}</label>
    </React.Fragment>
  );
};

/*
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
 */

export default FormInputField;

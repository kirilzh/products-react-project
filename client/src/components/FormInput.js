import React, { Component } from "react";
import "./FormInput.css";
import { changeAction } from "../actions";
import connect from "react-redux/es/connect/connect";

const styleError = {
  backgroundColor: "mistyrose"
};

const styleValid = {
  backgroundColor: "#c1f5d6"
};

const styleDefault = {
  backgroundColor: "white"
};

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: styleDefault
    };
  }

  handleChange(event, regex) {
    const value = event.target.value;
    //this.props.changeAction(event.target.name, value);

    if (value.match(regex)) {
      this.props.changeAction(event.target.name, value, false);
      this.setState({ backgroundColor: styleValid });
    } else {
      this.props.changeAction(event.target.name, value, true);
      this.setState({ backgroundColor: styleError });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="group">
          <input
            style={this.state.backgroundColor}
            type="text"
            name={this.props.name}
            required
            onChange={event =>
              this.handleChange(event, this.props.regex, this.props.errorName)
            }
            pattern={this.props.regex}
            autoComplete="off"
          />
          <label className="floatingLabel">{this.props.floatingLabel}</label>
          <span className={"focus-bg"} />
          {this.props.products.temporary[this.props.name].valid && (
            <label className="errorLabel">{this.props.errorLabel}</label>
          )}
        </div>
      </div>
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
    changeAction: (field, value, valid) => {
      dispatch(changeAction(field, value, valid));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormInput);

import React from "react";
import "./FormInput.css";
import { changeAction } from "../actions";
import connect from "react-redux/es/connect/connect";

class FormInput extends React.Component {

  handleChange(event, regex, name) {
    console.log(event.target);
    const value = event.target.value;
    if (value.match(regex)) {
      this.props.changeAction(name, false);
      this.props.changeAction(event.target.name, value);
    } else {
      this.props.changeAction(name, true);
    }

    console.log(event.target.value.match(regex));
  };

  render() {
    return (
      <div className="container">
        <div className="group">
          <input
            type="text"
            name={this.props.name}
            required
            onChange={event =>
              this.handleChange(event, this.props.regex, this.props.errorName)
            }
            pattern={this.props.regex}
          />
          <label className="floatingLabel">{this.props.floatingLabel}</label>
          <span className={"focus-bg"} />
          {this.props.error && (
            <label className="errorLabel">{this.props.errorLabel}</label>
          )}
        </div>
      </div>
    );
  }
}

// const FormInput = ({ name, floatingLabel, error, errorLabel }) => {
//   return (
//     <div className="container">
//       <div className="group">
//         <input type="text" name={name} required />
//         <label className="floatingLabel">{floatingLabel}</label>
//         <span className={"focus-bg"} />
//         {error && <label className="errorLabel">{errorLabel}</label>}
//       </div>
//     </div>
//   );
// };

function mapStateToProps(state) {
  return {
    products: state.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeAction: (field, value, index) => {
      dispatch(changeAction(field, value, index));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormInput);

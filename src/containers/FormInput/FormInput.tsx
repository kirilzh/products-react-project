import * as React from "react";
import "./FormInput.css";
import { changeAction } from "../../actions/index";
import connect from "react-redux/es/connect/connect";

type MyProps = {
  changeAction: Function,
  name: any,
  regex: string,
  floatingLabel: string,
  errorLabel: string,
  products: any,
}

type MyState = {
  backgroundColor: any
}

const styleError = {
  backgroundColor: "mistyrose"
};

const styleValid = {
  backgroundColor: "#c1f5d6"
};

const styleDefault = {
  backgroundColor: "white",
};

class FormInput extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: styleDefault,
    };
  }

  public handleChange(event: any, regex: string) : void {
    const value = event.target.value;
    const name = event.target.name;

    if (value.match(regex)) {
      this.props.changeAction(name, value, false);
      this.setState({ backgroundColor: styleValid });
    } else {
      this.props.changeAction(name, value, true);
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
              this.handleChange(event, this.props.regex)
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

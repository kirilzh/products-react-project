import React, { Component } from "react";

const LoaderHOC = (propName, WrappedComponent) =>
  class LoaderHOC extends Component {

    static isEmpty(prop) {
      return prop === null || prop === undefined;
    }


    render() {
      return (
        <React.Fragment>
          {
            LoaderHOC.isEmpty(this.props[propName].data) && <div>loader</div>
          }
          <WrappedComponent {...this.props}/>
        </React.Fragment>
      );
    }
  };


export default LoaderHOC;

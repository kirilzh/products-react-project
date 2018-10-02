import * as React from "react";
import "./Tiles.css";

// class Tiles extends React.Component {
//   render() {
//     return (
//       <p>style</p>
//     )
//   }
// }

const Tiles = () => {
  return (
    <React.Fragment>
      <div className="grid">
        <div className="card">
          <div className="container">
            <div>
              <h4>John Doe</h4>
            </div>
            <div>
              <p>Architect & Engineer</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="container">
            <div>
              <h4>John Doe</h4>
            </div>
            <div>
              <p>Architect & Engineer</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="container">
            <div>
              <h4>John Doe</h4>
            </div>
            <div>
              <p>Architect & Engineer</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="container">
            <div>
              <h4>John Doe</h4>
            </div>
            <div>
              <p>Architect & Engineer</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="container">
            <div>
              <h4>John Doe</h4>
            </div>
            <div>
              <p>Architect & Engineer</p>
            </div>
          </div>
        </div>
      </div>

      <div id="flip-scroll">
        <table>
          <thead>
            <tr>
              <th>Column #1</th>
              <th>Column #2</th>
              <th>Column #3</th>
              <th>Column #4</th>
              <th>Column #5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-column="First Name">Value #1</td>
              <td data-title="Column #2">Value #2</td>
              <td data-title="Column #3">Value #3</td>
              <td data-title="Column #4">Value #4</td>
              <td data-title="Column #5">Value #5</td>
            </tr>
            <tr>
              <td data-title="Column #1">Value #1</td>
              <td data-title="Column #2">Value #2</td>
              <td data-title="Column #3">Value #3</td>
              <td data-title="Column #4">Value #4</td>
              <td data-title="Column #5">Value #5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Tiles;

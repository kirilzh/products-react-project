import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Products from "./Products";
import Home from "./Home";

const App = () => (
  <Router>
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/table">Table</Link>
            </li>
          </ul>
        </nav>
      </header>

      <section id="main">
        <section className="title">
          <Route exact path="/" component={Home} />
        </section>
        <section className="content">
          <Route path="/table" component={Products} />
        </section>
      </section>
      <hr />
    </div>
  </Router>
);

export default App;

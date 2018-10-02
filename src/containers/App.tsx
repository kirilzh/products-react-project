import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Products from "./Products";
import Home from "../components/home/Home";
import About from "../components/about/About"
import Tiles from "./Tiles";

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
            <li>
              <Link to="/tableTiles">Playground</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
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
        <section className="content">
          <Route path="/tableTiles" component={Tiles} />
        </section>
        <section>
          <Route exact path="/about" component={About}/>
        </section>
      </section>
    </div>
  </Router>
);

export default App;

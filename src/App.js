import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./containers/ProductListing";

import "./App.css";
import ProductDetails from "./containers/ProductDetails";
import Navbar from "./containers/navbar/Navbar";
import Search from "./containers/Search";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/" exact component={ProductListing} />
            <Route path="/product/:productId" component={ProductDetails} />
            <Route path="/search/" component={Search} />
            <Route>404 Not Found!</Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;

import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "./index.css";
import logo from "./logo.png";
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Routing from "./Containers/Routing"
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
              <div  className="App">
                    <Routing/>
              </div>
      </BrowserRouter>

    );
  }
}

export default App;

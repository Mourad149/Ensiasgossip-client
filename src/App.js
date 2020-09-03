import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "./index.css";
import Navbar from './Components/Navbar'
import logo from "./logo.png";
import PanelPage from './Components/PanelPage'
import LoginForm from './Components/LoginForm'
import Footer from './Components/Footer'
import axios from 'axios'
import{BrowserRouter} from 'react-router-dom'
import Routes from "./Containers/Routes"
import { createStore} from 'redux'
import reducer from './Reducer/reducer';
import chatRoomReducer from './Reducer/chatRoomReducer';
import { Provider } from 'react-redux';
import {persistStore} from 'redux-persist'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import {PersistGate} from 'redux-persist/integration/react'
import {combineReducers} from 'redux'
  const persistConfig={
    key : 'root',
    storage,
    blacklist:['Reducer']

  }
  const rootReducer=combineReducers(
    {
    Reducer:reducer,
    ChatRoomReducer:chatRoomReducer
  }
)
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer)

class App extends Component {
  constructor() {
     super();
     this.persistor = persistStore(store);
   }


  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <PersistGate persistor={this.persistor}>
      <div  >
          <Routes/>
        </div>
        </PersistGate>
        </BrowserRouter>
        </Provider>

    );
  }
}

export default App;

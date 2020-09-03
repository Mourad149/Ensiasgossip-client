import React, { Component } from "react";
import "../index.css";
import LoginForm from '../Components/LoginForm'
import Subscription from '../Components/Subscription'
import Footer from '../Components/Footer'
import {connect} from 'react-redux'
class Banner extends Component {


  render() {
    return(
      this.props.formStatus?
        <div className="text-justify d-flex flex-column align-items-center justify-content-center">
            <img src={require("../assets/logo2.png")} style={{maxWidth:"8rem",maxHeight:"8rem",marginBottom:"5rem"}}/>
            <h3 className="white-text text-center" style={{fontFamily:"Quicksand",fontWeight:"500"}}><strong>Hello, dear colleagues </strong></h3>
            <p className="white-text text-center" style={{fontSize:"1.3em",fontWeight:"100",fontFamily:"Quicksand"}}>Please sign in to access the ENSIAS gossip platform.<br/>
            Not subscribed yet? go and
             <a href="#signup" onClick={this.props.switchForm} className="blue-text ml-1">
                Sign up
              </a> !

             </p>
        </div>
        :
        <div className="text-justify d-flex flex-column align-items-center ">
            <img src={require("../assets/logo2.png")} style={{maxWidth:"4rem",maxHeight:"4rem"}}/>
            <h3 className="white-text text-center" style={{fontFamily:"Quicksand",fontWeight:"500"}}><strong>Subscription form </strong></h3>
            <p className="white-text text-center" style={{fontSize:"1.3em",fontWeight:"100",fontFamily:"Quicksand"}}>Please fill in all the fields to submit your subscription.<br/>
            subscribed ? go back and
             <a href="#signup" onClick={this.props.switchForm} className="blue-text ml-1">
                Sign in
              </a> !

             </p>
        </div>

    );
  }
}
const mapStatetoProps = state =>({
  formStatus:state.Reducer.statusForm,
  toastType:state.Reducer.toastType
})
const mapDispatchtoProps = dispatch =>({
    switchForm:()=>dispatch({type:"SWITCHFORM"}),
})
export default connect(mapStatetoProps,mapDispatchtoProps)(Banner);

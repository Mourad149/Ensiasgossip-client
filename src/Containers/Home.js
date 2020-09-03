import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer,MDBAnimation, MDBRow,MDBScrollbar,ToastContainer} from "mdbreact";
import "../index.css";
import Navbar from '../Components/Navbar'
import logo from "../logo.png";
import ClubNews from '../Containers/ClubNews'
import PanelPage from '../Components/PanelPage'
import LoginForm from '../Components/LoginForm'
import Subscription from '../Components/Subscription'
import Footer from '../Components/Footer'
import Banner from '../Components/Banner'
import {connect} from 'react-redux'
import axios from 'axios'
class Home extends Component {


  render() {
    let comp = ()=>{}

    if (this.props.formStatus===true) {
      comp = ()=>{return (
        <MDBCol style={{paddingTop:"100px"}}  md="8" xs="4"   className="d-flex justify-content-between ">
        <Banner/>
        <hr style={{ border: "0.5px solid white",height:"250px",marginTop:"5rem"}}/>
        <MDBAnimation type="slideInRight"><LoginForm/></MDBAnimation>
        </MDBCol>

      )}
    }else if (this.props.formStatus===false) {
        comp = ()=>{return (
          <MDBCol style={{padding:"20px"}}  md="8" xs="4"   className="d-flex flex-column justify-content-center align-items-center ">
          <Banner/>
          <MDBAnimation type="fadeInDown"><Subscription/></MDBAnimation>
          </MDBCol>

        )}
    }


    return (

      <div style={{overflowY:"scroll",overflowX:"hidden",height:"100vh"}}>


          <MDBRow  style={{width:"100%"}}  className="d-flex justify-content-center ">
            {comp()}
          </MDBRow>

        <ToastContainer
               hideProgressBar={true}
               newestOnTop={true}
               autoClose={5000}
               toastClassName={this.props.toastType==="error"?"rounded-pill red":"rounded-pill amber darken-3"}
               bodyClassName="d-flex justify-content-center align-self-center"
               style={{maxWidth:"15rem"}}
             />

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
export default connect(mapStatetoProps,mapDispatchtoProps)(Home);

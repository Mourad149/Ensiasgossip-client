import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer,MDBAnimation, MDBRow,ToastContainer } from "mdbreact";
import "../index.css";
import Navbar from '../Components/Navbar'
import Notifications from "../Components/Notifications"
import logo from "../logo.png";
import EditProfil from '../Components/EditProfil'
import Footer from '../Components/Footer'
import {connect} from 'react-redux'
import axios from 'axios'
class Edit extends Component {



  render() {

console.log(this.props.userId)



    return (
      <div style={{overflowY:"scroll",overflowX:"hidden",height:"100vh"}} >
        <MDBRow >
            <Navbar profilImage={this.props.profilImage} search={true} userId={this.props.userId} room={this.props.room} name={this.props.name}/>
        </MDBRow >

          <MDBRow  style={{width:"100%"}}  className="d-flex justify-content-center ">
            <MDBCol style={{paddingTop:"100px"}}  md="12" xs="4"   className="d-flex justify-content-center ">
              <MDBAnimation type="fadeInDown">
                  <EditProfil />
              </MDBAnimation>
            </MDBCol>
        </MDBRow>


        <ToastContainer
               hideProgressBar={true}
               newestOnTop={true}
               autoClose={5000}
               autoHide={this.props.toastType==="success"?false:true}
               closeOnClick={this.props.toastType==="success"?false:true}
               position={"top-center"}
               closeButton={false}
               toastClassName={this.props.toastType==="success"?"rounded-pill amber darken-3":"rounded-pill red"}
               bodyClassName="d-flex justify-content-center align-self-center"
               style={{maxWidth:"20rem"}}
             />
             <div  style={{visibility:"hidden"}}>
              <Notifications/>
             </div>
        </div>

    );
  }
}
const mapStatetoProps = state =>({
  formStatus:state.Reducer.statusForm,
  profilImage:state.ChatRoomReducer.image2,
  name:state.ChatRoomReducer.name,
  userId:state.ChatRoomReducer.userId,
  toastType:state.Reducer.toastType
})
const mapDispatchtoProps = dispatch =>({
    switchForm:()=>dispatch({type:"SWITCHFORM"})
})
export default connect(mapStatetoProps,mapDispatchtoProps)(Edit);

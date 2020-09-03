
import React ,{Component} from 'react'
import Navbar from '../Components/Navbar'
import { MDBBtn, MDBCol, MDBContainer,MDBAnimation, MDBRow,ToastContainer,MDBAvatar } from "mdbreact";
import {connect} from "react-redux"


class LoadingNewContainer extends Component {
    render(){
        return(
          <div style={{overflowY:"scroll",overflowX:"hidden",height:"100vh"}} >
            <MDBRow >
            </MDBRow >


           </div>
        )
    }

}


export default LoadingNewContainer;

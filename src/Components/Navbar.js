import React, { Component } from "react";
import {MDBRow,MDBCol, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle,MDBAvatar, MDBDropdownMenu, MDBDropdownItem, MDBContainer,MDBIcon,MDBBtn,toast } from "mdbreact";
import EditProfil from "./EditProfil"
import { BrowserRouter as Router,Link,Redirect } from 'react-router-dom';
import image from "../assets/logo.png"
import  axios from "axios"
import {connect} from "react-redux"
import io from 'socket.io-client'
let socket;
const ENDPOINT="/Banne"

class Navbar extends Component {

componentDidMount(){
  socket = io(ENDPOINT, {
   reconnection: true,
   reconnectionDelay: 1000,
   reconnectionDelayMax : 5000,
   reconnectionAttempts: 99999
});

  socket.emit('joinMine',{ userId:this.props.userId }, (error) => {
    console.log("joinMine",this.props.userId)
    if(error) {
      alert(error);
    }
  });
  socket.on("Banned",()=>{
      console.log("your account was banned !")
      this.props.setToastType("error")
      toast(
        <p style={{fontSize:"0.8em"}} className="text-white  text-center">  <MDBIcon  icon="exclamation-triangle"/> Your account was banned ! <br/> you will be logged out in 5 seconds <MDBIcon far icon="sad-cry" /> ! </p>
        , {
          closeButton: false
        },setTimeout(()=>{
          this.props.logout()
        },5000))
  })
}
componentWillUnmount(){
   socket.close()
}
state = {
  collapseID: "",
  searchInput:"",
  within:"post",
  redirect:false

};
onclickHandlerWithin=(value)=>{
   this.setState({
   within:value
   })
}
onChangeHandler=(e)=>{
  this.setState({
    searchInput:e.target.value
  })
}
toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));
onKeyPress=(e)=>{
        if(e.key == "Enter"){
          this.handleSubmit(e)
              }
    }

handleSubmit=(e)=>{
  e.preventDefault()
  if (this.state.within==="file" || this.state.within==="post") {
          this.setState({redirect:true})
  }


}
render() {
  const name=this.props.name?this.props.name.split(' '):null
  const avatar = (this.props.profilImage || this.props.name ?
              <MDBNavItem >


                  <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline" style={{fontSize:"0.8em"}} >
                    <MDBAvatar
                      tag="img"
                      src={this.props.profilImage}
                      alt="avatar"
                      circle
                      className="mx-2 z-depth-1"
                      style={{width:"1.8rem",maxWidth:"1.8rem",height:"1.8rem",maxHeight:"1.8rem"}}
                    />

                    {(name.length>=3)?name[0]+" "+name[1]+" "+name[2]:name[0]+" "+name[1]}
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu color="warning" right>
                    <MDBDropdownItem ><Link to={{pathname: `/profil/${this.props.userId}`}}><MDBBtn color="red accent-3" size="sm" floating  ><MDBIcon icon="user"/></MDBBtn> See profil</Link></MDBDropdownItem>
                    <MDBDropdownItem style={{marginLeft:"30px"}} ><Link to={{pathname: `/EditProfil`}}><MDBBtn floating size="sm" color="red accent-3"  ><MDBIcon  icon="edit" /></MDBBtn >Edit profil</Link></MDBDropdownItem>
                    <MDBDropdownItem onClick={this.props.logout}><Link ><MDBBtn color="red accent-3" size="sm" floating  ><MDBIcon icon="sign-out-alt" /></MDBBtn> Logout</Link></MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>

              </MDBNavItem>
              : null)



    if (this.state.redirect===true) {

      return (
        <Redirect to={{pathname: `/search/${this.state.searchInput}/${this.state.within}`}}/>
      )
    }
    else {
      return (
      <MDBNavbar
            dark
            expand="md"
            fixed="top"
            style={{
          background: "#870000"  ,/* fallback for old browsers */
          background: "-webkit-linear-gradient(to right, #190A05, #870000)" , /* Chrome 10-25, Safari 5.1-6 */
          background: "linear-gradient(to left, #190A05, #870000)" ,/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          width:"99%"
      }}
    >

        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
        {this.props.search===true?

          <MDBNavbarNav left className="d-flex justify-content-between">
          {avatar}
            <MDBNavItem active >
              <Link to="/NewsFeed"><MDBBtn color="amber darken-2" size="sm" rounded outline ><MDBIcon icon="home" className="mr-2" color='white' /> Home </MDBBtn></Link>
            </MDBNavItem>
          <MDBNavItem >
          <Link to="/AboutUs"><MDBBtn color="amber darken-2" size="sm" rounded outline ><MDBIcon icon="info-circle" className="mr-2" color='white' />About us</MDBBtn></Link>
          </MDBNavItem>
          </MDBNavbarNav>
          :
          <MDBNavbarNav left className="d-flex justify-content-between">

            <MDBNavItem active >
              <MDBNavLink to="#!">Welcome</MDBNavLink>
            </MDBNavItem>

          </MDBNavbarNav>
        }

          <MDBNavbarBrand  style={this.props.search===true?{marginRight:"7rem"}:{marginRight:"43rem"}} >
            <img src={require("../assets/logo2.png")} style={{maxWidth:"4rem",maxHeight:"4rem"}}/>
          </MDBNavbarBrand >
          {this.props.search===true?
          <MDBNavbarNav right className="d-flex align-items-center justifu-content-center">

            <MDBNavItem >
              <MDBNavItem waves>
                <div className="md-form my-0 d-flex align-items-center justifu-content-center" style={{width:"12rem",border:"1px light white"}}>
                  <MDBIcon icon="search"  style={{marginLeft:"0.4rem",color:"#FF8F00"}}/>
                  <input className="form-control mr-sm-2" onChange={this.onChangeHandler} onKeyPress={this.onKeyPress} style={{marginLeft:"0.5rem",width:"10rem",color:"white"}}  type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBNavItem>
              </MDBNavItem>
              <MDBNavItem>
              <MDBDropdown size="sm" >
                <MDBDropdownToggle caret color="white" >
                  {this.state.within+"s"}
                </MDBDropdownToggle>
                <MDBDropdownMenu color="dark" basic>
                  <MDBDropdownItem onClick={()=>this.onclickHandlerWithin('file')}>FILES</MDBDropdownItem>
                  <MDBDropdownItem onClick={()=>this.onclickHandlerWithin('post')}>POSTS</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          :null}

        </MDBCollapse>
      </MDBNavbar>



    );
    }


  }
}
const mapStatetoProps=state=>({
  userId:state.ChatRoomReducer.userId
})
const mapDispatchtoProps = dispatch =>({
    switchForm:()=>dispatch({type:"SWITCHFORM"}),
    logout:()=>dispatch({type:"LOGOUT"}),
    setToastType:(toastType)=>dispatch({type:"TOAST",toastType:toastType}),
})
export default connect(mapStatetoProps,mapDispatchtoProps)(Navbar);

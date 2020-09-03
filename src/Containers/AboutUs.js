
import React ,{Component} from 'react'
import Navbar from '../Components/Navbar'
import { MDBBtn, MDBCol, MDBContainer,MDBAnimation, MDBRow,ToastContainer,MDBAvatar,MDBIcon } from "mdbreact";
import {connect} from "react-redux"
import Notifications from "../Components/Notifications"


class AboutUs extends Component {
    render(){
        return(
          <div style={{overflowY:"scroll",overflowX:"hidden",height:"100vh"}} >
            <MDBRow >
                <Navbar profilImage={this.props.profilImage} search={true} userId={this.props.userId} room={this.props.room} name={this.props.name}/>
            </MDBRow >
            <MDBRow  style={{width:"100%",marginTop:"50px"}} >
              <MDBCol style={{paddingTop:"100px"}}  md="12" xs="12"   >
                <MDBAnimation type="fadeInDown" className="d-flex align-items-center justify-content-center">
                    <MDBAvatar
                      tag="img"
                      src={require("../assets/mourad.PNG")}
                      alt="avatar"
                      circle
                      className="z-depth-1 "
                      style={{width:"10rem",height:"10rem",maxWidth:"10rem",maxHeight:"10rem",marginBottom:"5rem"}}
                        />
                        <div style={{width:"60rem",marginLeft:"4rem"}} className="align-self-end">
                         <div className="d-flex flex-row align-items-center justify-content-between">
                            <h3 className="white-text"><strong>Mourad ZINBI</strong></h3>
                            <div>
                            <MDBBtn href="https://www.facebook.com/morad.zinbi.9" target="_blank" size="sm" tag="a" floating social="fb">
                              <MDBIcon fab size="lg" icon="facebook-f" />
                            </MDBBtn>
                            <MDBBtn href="https://www.instagram.com/moradzinbi19/" target="_blank" size="sm" className="purple-gradient" tag="a" floating social="ins">
                              <MDBIcon fab size="lg" icon="instagram" />
                            </MDBBtn>
                            <MDBBtn href="https://www.github.com/Mourad149" target="_blank" size="sm" tag="a" floating social="git">
                              <MDBIcon fab size="lg" icon="github" />
                            </MDBBtn>
                            </div>

                          </div>
                            <p className="white-text " style={{fontSize:"1.3em",fontWeight:"100"}} >Since my first step inside ENSIAS, I've realised that what I am studying is now a passion rather than a burden. I cant spend a single day without learning new things about IT and computer science,
                              especialy in web and mobile developement. My decision to  be part of the few IWIMs students in ENSIAS was arbitrary, but now I can only thank myself for making that choice.
                             I hope that this modest work could please you and let you have a great and unique experience that no engineering school student have had before.
                              </p>

                        </div>
                </MDBAnimation>
                  <hr style={{ border: "0.5px solid white",width:"20rem"}}/>
              </MDBCol>
          </MDBRow>
          <MDBRow  style={{width:"100%"}}  className="d-flex justify-content-center ">
              <MDBCol   md="12" xs="12"   >
              <MDBAnimation type="fadeInDown" className="d-flex align-items-center justify-content-center">
                        <div style={{width:"60rem",marginRight:"4rem"}} className="align-self-end text-justify">
                          <div className="d-flex flex-row align-items-center justify-content-between">
                             <div>
                             <MDBBtn href="https://www.github.com/anasalkouraichi " target="_blank"size="sm" tag="a" floating social="git">
                               <MDBIcon fab size="lg" icon="github" />
                             </MDBBtn>
                             <MDBBtn href="https://www.instagram.com/anasalkouraichi/" target="_blank"  size="sm" className="purple-gradient" tag="a" floating social="ins">
                               <MDBIcon fab size="lg" icon="instagram" />
                             </MDBBtn>
                             <MDBBtn href="https://www.facebook.com/rbm.drag10" target="_blank" size="sm" tag="a" floating social="fb">
                               <MDBIcon fab size="lg" icon="facebook-f" />
                             </MDBBtn>


                             </div>
                             <h3 className="white-text"><strong>Anas Al KOURAICHI</strong></h3>
                           </div>
                           <p className="white-text " style={{fontSize:"1.3em",fontWeight:"100"}} >
                           My name is Anas AL KOURAICHI, I am currently an engineering student at ENSIAS Web and Mobile option,
                            I am passionate about Web developing and data science. I would like to become a successful engineer
                             in the future and have my own IT company.
                             </p>
                        </div>
                            <MDBAvatar
                              tag="img"
                              src={require("../assets/anas.jpg")}
                              alt="avatar"
                              circle
                              className="z-depth-1 "
                              style={{width:"10rem",height:"10rem",maxWidth:"10rem",maxHeight:"10rem",marginBottom:"5rem"}}
                                />
                </MDBAnimation>
              </MDBCol>
              <ToastContainer
                     hideProgressBar={true}
                     newestOnTop={true}
                     autoClose={5000}
                     toastClassName="rounded-pill amber darken-3"
                     bodyClassName="d-flex justify-content-center align-self-center"
                     style={{maxWidth:"15rem"}}
                   />
                   <div  style={{visibility:"hidden"}}>
                    <Notifications/>
                   </div>
         </MDBRow>

           </div>
        )
    }

}
const mapStatetoProps = state =>({
  profilImage:state.ChatRoomReducer.image2,
  name:state.ChatRoomReducer.name,
  userId:state.ChatRoomReducer.userId
})

export default connect(mapStatetoProps,null)(AboutUs);

import  React,{Component} from "react"
import "./Contacts.css";
import {connect} from "axios"
import {MDBCard,MDBCardBody,MDBAvatar} from "mdbreact"

class Comment extends Component {
  state={
    avatar:"",
    name:"",
    comment:""
  }

  render(){
return(

  <li className="chat-message d-flex ">
  <MDBAvatar
    tag="img"
    src={this.props.commentImage}
    alt="avatar"
    circle
    className="mx-1 z-depth-1 align-self-start"
    style={{maxHeight:"1.8rem",maxWidth:"1.8rem",width:"1.8rem",height:"1.8rem"}}
  />
  <MDBCard  className="d-flex flex-row" style={{width:"22rem",marginTop:"15px",backgroundColor:"#D0322D",borderBottomLeftRadius:"35px",borderTopRightRadius:"35px",borderBottomRightRadius:"35px"}}>

    <MDBCardBody >
      <div style={{fontSize:"0.9em",color:"white"}}>
        <strong className="primary-font" style={{fontSize:"0.75em"}}>{this.props.commentName}</strong>
      </div>
      <p className="mb-0" style={{fontSize:"0.75em",color:"white"}}>{this.props.comment}</p>
    </MDBCardBody>
  </MDBCard>

</li>
)
}
}
export default Comment;

import React,{Component} from 'react'
import { MDBListGroupItem, MDBAvatar, MDBBadge, MDBIcon,MDBBtn,MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import {Route,Link} from 'react-router-dom'
import {connect} from "react-redux"
import io from 'socket.io-client'
let socket;

const ENDPOINT="/Banne"
class Friend extends Component {
state={
  hover:false,
  status:this.props.status,
  modal0:false,
  modal1:false
}
toggleHover=()=>{
this.setState({hover:!this.state.hover})
}
constroleUser=(status,id)=>{
  socket = io(ENDPOINT, {
   reconnection: true,
   reconnectionDelay: 1000,
   reconnectionDelayMax : 5000,
   reconnectionAttempts: 99999
});

  socket.emit('joinUser',{id} , () => {
    console.log("joinUser",id)

  });
  socket.emit("banneUser",{status,id},()=>{
    this.setState({
      status:status
    })
  })
}
toggle =  (nr) => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}
  render(){
    let hoverStyle ;
    if (this.state.hover) {
       hoverStyle = {
        backgroundColor:"#D0322D",
       color:"white",
       border:"0px"}
     } else {
      hoverStyle = {color: '#000'}
     }
    return(

      <MDBListGroupItem
         className=" rounded-pill d-flex justify-content-between p-0 m-2 border-light "
         style={hoverStyle}
         onMouseEnter={this.toggleHover}
         onMouseLeave={this.toggleHover}

       >
       <MDBModal isOpen={this.state.modal1} toggle={()=>this.toggle(1)} size="sm" className="z-depth-1"  backdrop={true}>
         <MDBModalBody 	>
             <div  style={{color:"black"}} className="p-2 d-flex justify-content-end align-items-start">
                 <MDBIcon icon="times" onClick={()=>this.toggle(1)}  />
             </div>
             <p  style={{color:"black"}} className="text-center">Please confirm your action.</p>
             <div className="d-flex justify-content-center ">
               <MDBBtn
                   size="sm"
                    color="red accent-4"
                    rounded
                    onClick={()=>
                    {
                      this.constroleUser(1,this.props.id)
                      this.toggle(1)
                    }
                    }
                    >
                   Confirm
               </MDBBtn>
             </div>
         </MDBModalBody>
      </MDBModal >
      <MDBModal isOpen={this.state.modal0} toggle={()=>this.toggle(0)} size="sm" className="z-depth-1" backdrop={true}>
        <MDBModalBody 	>
            <div  style={{color:"black"}} className="p-2 d-flex justify-content-end align-items-start">
                <MDBIcon icon="times" onClick={()=>this.toggle(0)}  />
            </div>
            <p  style={{color:"black"}} className="text-center">Please confirm your action.</p>
            <div className="d-flex justify-content-center ">
              <MDBBtn
                  size="sm"
                   color="success"
                   rounded
                   onClick={()=>
                     {
                       this.constroleUser(0,this.props.id)
                       this.toggle(0)
                     }
                   }
                   >
                  Confirm
              </MDBBtn>
            </div>
        </MDBModalBody>
     </MDBModal >
       <div className="d-flex align-self-center" >
         <Link to={{pathname: `/profil/${this.props.id}`}}>
           <MDBBtn floating size="sm" color={this.state.hover===true?"amber darken-4":"red accent-4"} ><MDBIcon far size="2x" icon="user" /></MDBBtn >
         </Link>


       </div>
      {
        this.props.email==="dalia_elaiche@um5.ac.ma"
        ?
           <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ fontSize: "0.65rem"}}>
            <MDBIcon icon="crown" />
            <strong> Admin </strong>
            </div>
        :
        null
      }
         <div className="d-flex  align-items-center" style={{ fontSize: "0.8rem",maxWidth:"10rem",width:"10rem" }}>
         {
           this.props.userEmail==="dalia_elaiche@um5.ac.ma" && this.props.email!=="dalia_elaiche@um5.ac.ma"
           ?
            this.state.status===0
            ?
              <MDBBadge pill color="danger" onClick={()=>this.toggle(1)} style={{cursor:"pointer"}} className="ml-2"><MDBIcon icon="times-circle"/></MDBBadge>
            :
              <MDBBadge pill color="success" onClick={()=>this.toggle(0)} style={{cursor:"pointer"}} className="ml-2"><MDBIcon  icon="undo" /></MDBBadge>

          :
           null
        }
          <MDBAvatar
           tag="img"
           src={this.props.image}
           alt="avatar"
           circle
           className="mr-2 z-depth-1"
         />

           <strong>{this.props.name}</strong>
         </div>

       </MDBListGroupItem>

    )
  }

}
const mapStatetoProps=state =>({
  userEmail:state.ChatRoomReducer.email,
  userId:state.ChatRoomReducer.userId
})

export default connect(mapStatetoProps,null)(Friend);

import React, { useState, useEffect,useRef } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBAvatar, MDBBadge, MDBIcon,MDBInput,MDBBtnGroup,MDBPopover, MDBPopoverBody, MDBPopoverHeader,MDBContainer,
MDBBtn, MDBScrollbar,MDBAnimation } from "mdbreact";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactDOM from "react-dom";

import queryString from 'query-string'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
let socket;

const PrivateContact =({switchStatus,Room,Name,Messages,image,ReloadMessages,nam,id,userId})=> {
const [name, setName] = useState(Name);
 const [room, setRoom] = useState(Room);
 const [avatar,setAvatar]=useState(image)
 const [users, setUsers] = useState('');
 const [message, setMessage] = useState('');
 const [messages, setMessages] = useState(Messages);
 const ENDPOINT = 'http://localhost:5000/Private';
const myref=useRef(null)

useEffect(()=>{
  myref.current.scrollIntoView({ block: "end", inline: "nearest" });
  console.log("lll")
},[messages])


 useEffect(() => {

   socket = io(ENDPOINT);

   socket.emit('joinPrivate', (error) => {
     if(error) {
       alert(error);
     }
     console.log(socket.id,nam)
   });
 } , [ENDPOINT,name,room]);

 useEffect(() => {

   socket.on('message', (message) => {
     setMessages([...messages ,message ]);
     ReloadMessages([...messages,message])
     console.log(message)

   });


   socket.on('roomData', ({ users }) => {
     setUsers(users);

   })

   return () => {
     socket.emit('disconnect');

     socket.off();
   }
 }, [messages])
 useEffect(() => {

   socket.on('PrivateMessage', (data) => {

     console.log(data)
     socket.emit("id",id)

   });
 })
 useEffect(() => {

   socket.on(userId, (data) => {

     console.log(data)

   });
 })
 const sendMessage = () => {
   if(message) {

     socket.emit('sendMessage', {message,id}, () => setMessage(''));

   }
 }
 const addEmoji = e => {
  let emoji = e.native;
  console.log(e)
  setMessage(message+emoji)
};
return (

    <MDBRow className="white lighten-3 chat-room " style={{height:"25rem"}}>

      <MDBCol lg="12"  className="pl-md-3 mt-4 mt-md-0 ">

        <div className="scrollable-chat" style={{height:"22.5rem"}}>
          <MDBScrollbar>
            <MDBListGroup className="list-unstyled " >

              {messages.map(message =>
            (  <MDBAnimation type="slideInDown" duration="300ms"><ChatMessage key={message.author + message.when} user={message.user} message={message.text} name={name} room={message.room} Room={Room} Image={message.image} /></MDBAnimation>)

            )}
              <div style={{ float:"left", clear: "both" }}
             ref={myref}>
             </div>
            </MDBListGroup>
          </MDBScrollbar>
        </div>
        <div className="form-group basic-textarea d-flex justify-content-center align-items-center">
          <input value={message} onChange={(event)=>setMessage(event.target.value)} style={{height:"2rem"}} className="form-control pl-2 my-0" />
          <div className="d-flex justify-content-center align-items-center">
          <MDBPopover
             placement="top"
             popover
             clickable
             id="popper1"
             >
         <MDBBtn floating size="sm" color="unique"><MDBIcon far size="2x"  icon="grin" /></MDBBtn>
           <MDBPopoverBody>
            <Picker style={{maxWidth:"15rem"}}  onSelect={(e)=>addEmoji(e)}/>
           </MDBPopoverBody>
       </MDBPopover>
       <MDBBtn
               onClick={(event)=>sendMessage()}
               color="pink darken-4"
               floating
               size="sm"

             >
             <MDBIcon

             icon="paper-plane" />
             </MDBBtn>
       </div>

              </div>
            </MDBCol>
          </MDBRow>

    );
  }



const ChatMessage = ({message,name,user,room,Room,Image}) => {
  let isSentByUser= false;
  const trimmedName = name.trim().toLowerCase();
  const relativePath=".../"
  const data=Image;
  if(user===trimmedName){
    isSentByUser=true
  }

  return (
    isSentByUser ?(room===Room ?(
  <li className="chat-message d-flex justify-content-between mb-2 ml-1">

    <MDBCard   style={{borderBottomLeftRadius:"28px",borderTopLeftRadius:"28px",borderBottomRightRadius:"28px"}}>
        <MDBCardBody style={{width:"13rem"}} >
        <p className="mb-0" style={{fontSize:"0.7em"}}>{message}</p>
      </MDBCardBody>
    </MDBCard>
    <MDBAvatar
      tag="img"
      src={`${data}`}
      alt="avatar"
      circle
      className=" z-depth-1"
      style={{width:"2rem",height:"2rem",maxWidth:"2rem",maxHeight:"2rem"}}
    />
  </li>
):null)
:
(room===Room ?(
  <li className="chat-message d-flex justify-content-between mb-2 ml-1">
  <MDBAvatar
    tag="img"
    src={`${data}`}
    alt="avatar"
    circle
    className=" z-depth-1"
    style={{width:"2rem",height:"2rem",maxWidth:"2rem",maxHeight:"2rem"}}

  />
    <MDBCard  style={{backgroundColor:"#C70039",borderBottomLeftRadius:"28px",borderTopRightRadius:"28px",borderBottomRightRadius:"28px"}}>
      <MDBCardBody style={{width:"13rem"}}  >
        <p className="mb-0" style={{fontSize:"0.7em",color:"white"}}>{message}</p>

      </MDBCardBody>
    </MDBCard>

  </li>
):null)
);}
const mapStatetoProps = state =>({
  Room:state.ChatRoomReducer.room,
  Name:state.ChatRoomReducer.name,
  status:state.Reducer.status,
  Messages:state.ChatRoomReducer.messages,
  image:state.ChatRoomReducer.image2
})
const mapDispatchtoProps = dispatch =>({
    switchStatus:()=>dispatch({type:"SWITCH"}),
    ReloadMessages: (messages)=>  dispatch({type:"MESSAGES",messages:messages}),

})
export default connect(mapStatetoProps,mapDispatchtoProps)(PrivateContact);

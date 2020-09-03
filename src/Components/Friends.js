import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBAvatar, MDBBadge, MDBIcon,MDBInput,MDBBtnGroup,
MDBBtn, MDBScrollbar } from "mdbreact";
import {Route,Link} from 'react-router-dom'
import "./Contacts.css";
import queryString from 'query-string'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import Friend from "./Friend"
import axios from "axios"
let socket;

const Friends = (props) => {
const [hover,setHover]=useState(false)
  const [friends, setFriends] = useState([]);
  useEffect(()=>{
        axios.get(`/getUsers/${props.filiere}/${props.niveau}`,
          {
            headers:{
              'Authorization': `Bearer ${props.token}`

            }
          }
        )
            .then((res)=>{
                setFriends(res.data)
            })
  },[])

  return (

    <MDBCard className="grey lighten-3 chat-room mr-auto " style={{height:"35rem",width:"25rem"}}>
      <MDBCardBody>
        <MDBRow >

          <MDBCol lg="12"  >
          <MDBRow style={{height:"2.5rem"}} className="d-flex justify-content-center ">
                <MDBBtn onClick={()=>props.switchStatus()} size={props.status===false?"sm":null} color={props.status===false?"white":"red accent-4"} outline rounded  >
                  <MDBIcon icon="users"  />
                </MDBBtn>
                <MDBBtn   size={props.status===false?null:"sm"} color={props.status===false?"red accent-4":"white"} outline rounded onClick={()=>props.switchStatus()}>
                  <MDBIcon  fab  icon="facebook-messenger" />
                  {props.counter!==0?<MDBBadge pill color="amber darken-3">{props.counter}</MDBBadge>:null}
                </MDBBtn>
            </MDBRow>
            <hr/>
            <h6 className="font-weight-bold mb-3 text-lg-center">COLLEAGUES</h6>
              <div className="transparent z-depth-1 p-1 " style={{height:"25rem"}}>
              <MDBScrollbar>

                <MDBListGroup className=" transparent friend-list">
                  {
                    friends.map(friend=>( <Friend status={friend.status} id={friend._id} image={friend.image} name={friend.name} email={friend.email}/> ))
                  }
                </MDBListGroup>
                </MDBScrollbar>

              </div>
          </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>


);
}
const mapStatetoProps = state =>({

  status:state.Reducer.status,
  filiere:state.ChatRoomReducer.filiere,
  niveau:state.ChatRoomReducer.niveau,
  userId:state.ChatRoomReducer.userId,
  token:state.ChatRoomReducer.token,
  counter:state.ChatRoomReducer.counter
})
const mapDispatchtoProps = dispatch =>({
    switchStatus:()=>dispatch({type:"SWITCH"})
})
export default connect(mapStatetoProps,mapDispatchtoProps)(Friends);

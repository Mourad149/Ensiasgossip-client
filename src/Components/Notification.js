import React from "react"
import {MDBIcon} from "mdbreact"

const Notification = (props)=>{
  return(
    <div className="news">
      <div className="label">
        <img
          src={props.profilImage}
          alt=""
          className="rounded-circle z-depth-1-half"
          style={{maxHeight:"1.5rem",maxWidth:"1.5rem",width:"1.5rem",height:"1.5rem"}}

        />
      </div>
      <div className="excerpt">
        <div className="brief">
        {
          props.type==="post"
          ?
         <p  style={{fontSize:"0.8em"}} className="black-text"><a>{props.name} </a> {props.notiftext} <a >"{props.text.length>=13? props.text.slice(0,13)+"..." :props.text}"</a> </p>
          :
          <p  style={{fontSize:"0.8em"}} className="black-text"><a>{props.name} </a> {props.notiftext} <a>"{props.text.length>=13? props.text.slice(0,13)+"..." :props.text}"</a>  </p>

        }
        </div>
        <div className="d-flex justify-content-start ">
          <img
            src={props.image}
            alt=""
            className="z-depth-1 rounded mb-md-0 mb-2"
            style={{maxHeight:"3rem",maxWidth:"3rem"}}

          />
        </div>
          <div className="date d-flex justify-content-start" style={{fontSize:"0.6em"}}>{props.date} ago</div>
      </div>
    </div>

  );

}
export default Notification;

import React from "react"
import {MDBIcon} from "mdbreact"

const LikeNotification = (props)=>{
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
        <div className="brief ">
          <p className="red-text" style={{fontSize:"0.8em"}}><a>{props.name}</a> {props.notiftext} <a>"{props.postText.length>=13? props.postText.slice(0,13)+"..." :props.postText}"</a> </p>
        </div>
        <div className="d-flex justify-content-start ">
          <img
            src={props.postImage}
            alt=""
            className="z-depth-1 rounded mb-md-0 mb-2"
            style={{maxHeight:"3rem",maxWidth:"3rem"}}

          />
        </div>
          <div className="date d-flex justify-content-start" style={{fontSize:"0.8em"}}>{props.date} ago</div>
      </div>
    </div>

  );

}
export default LikeNotification;

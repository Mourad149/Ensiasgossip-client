import React from "react"
import {MDBIcon} from "mdbreact"

const CommentNotification = (props)=>{
  return(
    <div className="news">
      <div className="label">
        <img
          src={props.commentImage}
          alt=""
          className="rounded-circle z-depth-1-half"
          style={{maxHeight:"1.5rem",maxWidth:"1.5rem",width:"1.5rem",height:"1.5rem"}}

        />
      </div>
      <div className="excerpt ">
        <div className="brief ">
          <p  style={{fontSize:"0.8em"}} className="black-text"><a>{props.commentName}</a> {props.notiftext} <a>"{props.text.length>=10? props.text.slice(0,13)+"..." :props.text}"</a></p>
        </div>
          <div className="date d-flex justify-content-start" style={{fontSize:"0.8em"}}>{props.date} ago</div>
      </div>
    </div>

  );

}
export default CommentNotification;

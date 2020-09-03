import React,{useEffect,useState,useRef} from 'react';
import {connect} from 'react-redux'
import {  MDBRow,  MDBCard, MDBCardBody,  MDBIcon ,MDBScrollbar,toast, ToastContainer,MDBAvatar} from "mdbreact";
import Notification from "./Notification"
import LikeNotification from "./LikeNotification"
import CommentNotification from "./CommentNotification"
import {Link} from "react-router-dom"


import axios from "axios"
import io from 'socket.io-client'
let socket;
const ENDPOINT="/Post"

const Notifications= (props) => {
  const [notifs,setNotifs]=useState([])
  const [skip,setSkip]=useState(0)
  const myRefer=useRef()


  useEffect(()=>{
  },[notifs])
  useEffect(()=>{
        axios.get(`/getNotifs/${skip}/${props.room}/${props.userId}`)
        .then(result=>{

          setNotifs(
            prevNotifs=>{
              if (prevNotifs && prevNotifs!==result.data) {
                  return  prevNotifs.concat(result.data)
              }
              else{
                return result.data
              }
            }
          )


      })

  },[skip])
  const setDate=(dateInMs)=>{
    const seconds = ~~(dateInMs / 1000);
    const minutes = ~~(seconds / 60);
    const hours = ~~(minutes / 60);
    const days = ~~(hours / 24);
    let time=0;
    if(days===0 && hours===0 && minutes===0 && seconds===0) {
       time =  seconds % 60+"s";
    }

    else if ( days===0 && hours===0 && minutes===0) {
       time =  seconds % 60+"s";

    }
    else if (days===0 && hours===0) {
       time =  minutes % 60 + "min" ;

    }
    else if (days===0 ) {
       time =  hours % 24 + "h" + minutes % 60 + "min";
    }
    else {
      time = days + "days" ;
    }
      return time;
  }
  const onScroll=(e)=>{
    const scrollY=window.scrollY
   const scrollTop=myRefer.current.scrollTop
   const scrollHeight=myRefer.current.scrollHeight
   const offsetHeight=myRefer.current.offsetHeight
   const clientHeight=myRefer.current.clientHeight
   if (  scrollHeight - offsetHeight -scrollTop < 1  ) {
        setSkip(notifs.length)
       }
  }
  const playAudio = () => {
     document.getElementById("audio2").play();
  };
    useEffect(()=>{

      socket = io("/Post",
      {
       reconnection: true,
       reconnectionDelay: 1000,
       reconnectionDelayMax : 5000,
       reconnectionAttempts: 99999
   }
    );

        socket.emit('join', {room:props.room}, (error) => {
          if(error) {
            alert(error);
          }
      } );
         socket.on("receivePost",(data)=>{

           if (data.userId!==props.userId ) {

             setNotifs(prevNotifs=>([data,...prevNotifs]))

           }

         })
    },[])

    useEffect(()=>{
      socket = io("/comments",
      {
       reconnection: true,
       reconnectionDelay: 1000,
       reconnectionDelayMax : 5000,
       reconnectionAttempts: 99999
   }
 );
      socket.emit('joinComm', {room:props.room}, (error) => {
        if(error) {
          alert(error);
        }
    } );
    socket.emit('joinLike', {room:props.room}, (error) => {
      if(error) {
        alert(error);
      }
  } );

    socket.on("receiveLike",(data)=>{
      if (data.userId!==props.userId ) {

        setNotifs(prevNotifs=>([data,...prevNotifs]))
     }
      if (data.posterId===props.userId && data.userId!==props.userId ) {
        playAudio()
        props.setToastType("success")
        toast(
          <Link to={{pathname: `/post/${data.id}`}}>
          <div className="d-flex justify-content-center align-items-center">
          <MDBAvatar
            tag="img"
            src={data.profilImage}
            alt="avatar"
            circle
            className="z-depth-1"
            style={{width:"2rem",height:"2rem",maxWidth:"2rem",maxHeight:"2rem"}}

          />
          <div >
           <h5 style={{fontSize:"0.8em",marginLeft:"10px"}} className="text-white"><strong>{data.name}</strong> liked your post !</h5>
           </div>
           </div>
           </Link >

          , {
            closeButton: false
          })

      }




    })

         socket.on("receiveComm",(data)=>{
           if (data.userId!==props.userId ) {
             setNotifs(prevNotifs=>([data,...prevNotifs]))
          }
           if (data.posterId===props.userId && data.userId!==props.userId ) {
            props.setToastType("success")
             playAudio()
             toast(
               <Link to={{pathname: `/post/${data.id}`}}>
               <div className="d-flex justify-content-center align-items-center">
               <MDBAvatar
                 tag="img"
                 src={data.profilImage}
                 alt="avatar"
                 circle
                 className="z-depth-1"
                 style={{width:"2rem",height:"2rem",maxWidth:"2rem",maxHeight:"2rem"}}

               />
               <div >
                <h5 style={{fontSize:"0.8em",marginLeft:"10px"}} className="text-white"><strong>{data.name}</strong> commented on your post !</h5>
                </div>
                </div>
                </Link >
               , {
                 closeButton: false
               })

           }

         })
         return ()=>{
           socket.disconnect()

         }

    },[])
    const notifications = notifs!==undefined ?notifs.map((notif,index)=>{
      switch (notif.type) {
        case "file" :

            return <Link to={{pathname: `/NewsFeed`}}><Notification type="file" date={setDate(Date.now()-notif.date)}  notiftext="added new FILES" name={notif.name} profilImage={notif.profilImage}  text={notif.file[0].filename}/></Link>

          break;
        case "post" :
            return <Link to={{pathname: `/NewsFeed`}}><Notification type="post" date={setDate(Date.now()-notif.date)} notiftext="added a new POST" name={notif.name} profilImage={notif.profilImage}  text={notif.text}/></Link>

          break;
        case "like":
          if (notif.posterId===props.userId) {

            return <Link to={{pathname: `/post/${notif.id}`}}><LikeNotification date={setDate(Date.now()-notif.date)} notiftext="liked your post" name={notif.name} profilImage={notif.profilImage}  postText={notif.postText}/></Link>
          }
          else {
            return <Link to={{pathname: `/post/${notif.id}`}}><LikeNotification date={setDate(Date.now()-notif.date)} notiftext="liked the post" name={notif.name} profilImage={notif.profilImage}  postText={notif.postText}/></Link>

          }
          break;
        case "comment":
          if (notif.posterId===props.userId) {

            return <Link to={{pathname: `/post/${notif.id}`}}><CommentNotification date={setDate(Date.now()-notif.date)} notiftext={`commented "${notif.comment.length>=10? notif.comment.slice(0,10)+"..." :notif.comment}" on your post `} commentName={notif.name} commentImage={notif.profilImage}  text={notif.text} /></Link>
          }
          else {
            return <Link to={{pathname: `/post/${notif.id}`}}><CommentNotification date={setDate(Date.now()-notif.date)} notiftext={`commented "${notif.comment.length>=10? notif.comment.slice(0,10)+"..." :notif.comment}" on the post `} commentName={notif.name} commentImage={notif.profilImage}  text={notif.text} /></Link>

          }
          break;
      }

    })
    :null
  return (
    <MDBCard
        className=" px-2 pt-2"
        style={{ fontWeight: 100, maxWidth: 600,height:"21rem",maxHeight:"21rem" }}
      >
      <div onScroll={(e)=>onScroll()} style={{overflowY:"scroll"}} ref={myRefer}>


        <MDBCardBody className="py-0">
          <MDBRow>
            <div className="mdb-feed" >
            {notifications}
            </div>

          </MDBRow>

        </MDBCardBody>
        </div>

      </MDBCard>

  );
}
const mapStatetoProps = state =>({
  image:state.ChatRoomReducer.image2,
  Name:state.ChatRoomReducer.name,
  userId:state.ChatRoomReducer.userId,
  room:state.ChatRoomReducer.room,
})
const mapDispatchtoProps = dispatch =>({
    setToastType:(toastType)=>dispatch({type:"TOAST",toastType:toastType}),

})

export default connect(mapStatetoProps,mapDispatchtoProps)(Notifications);

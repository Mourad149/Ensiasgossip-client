import React,{useEffect,useState,useRef} from 'react';
import {connect} from 'react-redux'
import {  MDBRow,  MDBCard, MDBCardBody,  MDBIcon ,MDBScrollbar} from "mdbreact";
import Notification from "./Notification"
import axios from "axios"
import io from 'socket.io-client'
let socket;
const ENDPOINT="http://localhost:5000/Post"

const Notifications= (props) => {
  const [notifs,setNotifs]=useState([])
  const [skip,setSkip]=useState(0)
  const [posts,setPosts]=useState([])
  const myRefer=useRef()
  useEffect(()=>{
    console.log("did in notification")
      axios.get(`http://localhost:5000/getPosts/${skip}`)
      .then(result=>{
        setPosts(result.data)
        setNotifs(result.data)

  })},[])
  useEffect(()=>{
        console.log("did update")
        axios.get(`http://localhost:5000/getPosts/${skip}`)
        .then(result=>{
          setPosts(posts.concat(result.data))
          setNotifs(posts.concat(result.data))



      })

  },[skip])
  const onScroll=(e)=>{
    const scrollY=window.scrollY
   const scrollTop=myRefer.current.scrollTop
   const scrollHeight=myRefer.current.scrollHeight
   const offsetHeight=myRefer.current.offsetHeight
   const clientHeight=myRefer.current.clientHeight
   if (  scrollHeight - offsetHeight -scrollTop < 1  ) {
        setSkip(posts.length)
       console.log("Top :" +scrollTop,"scrollHeight : "+scrollHeight,"offsetHeight : "+offsetHeight,"clinetHeight : "+ clientHeight,"skip"+skip)
       }
       console.log(skip)
  }
    useEffect(()=>{
         socket = io(ENDPOINT);
         socket.on("receivePost",(data)=>{
           posts.unshift(data)
           setNotifs(posts)
           console.log(posts)

         })
    },[posts])
    const notifications = notifs!==undefined ?notifs.map((notif,index)=>(<Notification name={notif.name} profilImage={notif.profilImage} image={notif.image} text={notif.text}/>)):null
  return (
    <MDBCard
        className=" px-2 pt-2"
        style={{ fontWeight: 100, maxWidth: 600,height:"18rem",maxHeight:"18rem" }}
      >
      <div onScroll={(e)=>onScroll()} style={{overflowY:"hidden"}} ref={myRefer}>

      <MDBScrollbar>

        <MDBCardBody className="py-0">
          <MDBRow>
            <div className="mdb-feed" >
            {notifications}
            </div>

          </MDBRow>

        </MDBCardBody>
        </MDBScrollbar>
        </div>

      </MDBCard>
  );
}
const mapStatetoProps = state =>({
  image:state.ChatRoomReducer.image2,
  Name:state.ChatRoomReducer.name,
  posts:state.ChatRoomReducer.Posts,
  Notifs:state.ChatRoomReducer.notifs

})
const mapDispatchtoProps = dispatch =>({
    setNotifs:(notifs)=>dispatch({type:"SETNOTIFS",notifs:notifs})
})
export default connect(mapStatetoProps,mapDispatchtoProps)(Notifications);

import React,{useState,useEffect,useRef} from "react";
import {  MDBRow,  MDBCard, MDBCardBody, MDBIcon, MDBCol, MDBCardImage, MDBInput,MDBScrollbar,MDBBtn,
  MDBPopover,MDBPopoverBody, MDBPopoverHeader,MDBBtnGroup,MDBBadge,MDBAnimation,toast,ToastContainer,MDBModal,MDBModalBody} from "mdbreact";
import {connect} from "react-redux"
import Comments from "./Comments"
import axios from "axios"
import io from 'socket.io-client'
import * as Scroll from 'react-scroll';
import {Link} from "react-router-dom";


let socket;
let aux;
let aux2;
let likeChanged;
const Feed = (props)=>{
const [comm,setComment]=useState([])
const [comments,setComments]=useState(props.comments)
const [nbrComm,setNbrComm]=useState(props.comments.length)
const [likes,setLikes]=useState(props.likes)
const [allowLike,setAllowLike]=useState(true)
const [likeChanged,setLikeChanged]=useState()
const [editMode,setEditMode]=useState(false)
const [text,setText]=useState(props.text)
const [file,setFile]=useState(props.file)
const [likePosts,setLikePosts]=useState(props.likedPosts)
const [modal,setModal]=useState(false)
const [deleteMode,setDeleteMode]=useState(false)
const ENDPOINT="/comments"

useEffect(()=>
  {  socket = io(ENDPOINT);

    socket.emit('join', {postId:props.id}, (error) => {
      if(error) {
        alert(error);
      }
  } );
  socket.emit('joinLike', {room:props.room}, (error) => {
    if(error) {
      alert(error);
    }
} );
socket.emit('joinComm', {room:props.room}, (error) => {
  if(error) {
    alert(error);
  }
} );
} , [ENDPOINT])
  useEffect(()=>{

  socket.on("SendBackComm",data =>{

    if(props.id===data.id)
    {
      if(data.userId!==props.userId)
          {


            setComments(prevState=>[...prevState,data])
          }
      setNbrComm(data.aux)

    }

  })

},[aux])

  useEffect(()=>{


    socket.on("SendBackLikes",data =>{

      if(props.id===data.id)
      {
        setLikes(data.likes)

      }

    })

  },[allowLike])





const sendComm=(comment,name,profilImage,id,postImage,userId,type,text,room,posterId)=>{
  if (comment) {

    setComments([...comments,{comment,name,profilImage,id}])

    aux = nbrComm+1

    socket.emit("addComment",{comment,name,profilImage,id,aux,postImage,userId,type,text,room,posterId},() => setComment(''))


  }
}

const sendLike=(id)=>{


  props.setLikedPosts([...likePosts,props.id])
setAllowLike(false)



    socket.emit("addLike",{likes:likes+1,id:props.id,userId:props.userId,remove:false,profilImage:props.ProfilImage,name:props.Name,postText:props.text,type:"like",room:props.room,posterId:props.posterId})

}
const removeLike=(id)=>{
  const auxRemovePosts=likePosts
  const indexOfPost=auxRemovePosts.indexOf(props.id)
  auxRemovePosts.splice(indexOfPost,1)
  setLikePosts(auxRemovePosts)
  props.setLikedPosts(auxRemovePosts)
  setAllowLike(true)
  socket.emit("addLike",{likes:likes-1,id:props.id,userId:props.userId,remove:true,profilImage:props.ProfilImage,name:props.Name,postText:props.text,type:"like"})




}
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
const onEdit=()=>{
  setEditMode(prevState=>!prevState)
}
const toggle =  () => {
    setModal(prevState=>!prevState)
    setDeleteMode(prevState=>!prevState)
}
let likeButton;
    if ( props.likedPosts.find(x=> x===props.id)===props.id ) {
  likeButton=   <MDBBtn
      tag="a"
      size="sm"
      floating
      color="red accent-4"
      onClick={()=>(removeLike(props.id))}
              >
     <MDBIcon icon="heart" />
     </MDBBtn>
   }else if (  props.likedPosts.find(x=> x===props.id)===undefined  ) {
    likeButton= <MDBBtn
       tag="a"
       size="sm"
       floating
       color="dark"
       onClick={()=>(sendLike(props.id))}
       >
        <MDBIcon icon="heart" />
      </MDBBtn>
  }
  const handleDelete=()=>{
    axios(
      {
        method: 'post',
        url: `/deletePost/${props.id}`,
        headers: {
            'crossDomain': true,  //For cors errors
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`,
            'Access-Control-Allow-Origin': '*'
        }

    }
      ).then((res)=>{
        toast(
          <p style={{fontSize:"0.8em"}} className="text-white"><MDBIcon far  icon="check-circle"/>  Post deleted !</p>
          , {
            closeButton: false
          })
          setTimeout(()=>{
            window.location=window.location.href
          },2000)


    }).catch(err=>{
      console.log(err)
    })
}

  const onSubmit= ()=>{
      axios(
        {
          method: 'post',
          url: `/updatePost/${props.id}`,
          headers: {
              'crossDomain': true,  //For cors errors
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${props.token}`,
              'Access-Control-Allow-Origin': '*'
          },
          data:  {
            text:text,
            file:file
          }
      }
        ).then((res)=>{
          onEdit()


      }).catch(err=>{
          console.log(err)
      })
  }
  const onDiscard=()=>{
    onEdit()
    setText(props.text)
    setFile(props.file)
  }

    return (
        <MDBCard news className="m-auto" style={{width:"100%",backgroundColor:editMode || deleteMode?"grey":null}} >

          <MDBCardBody>
            <div className="content d-flex flex-row justify-content-between">
              <div className="d-flex flex-row align-items-center ">
                <Link to={{pathname:`/profil/${props.posterId}`}}>
                <img
                  alt=""
                  src={props.profilImage}
                  className="rounded-circle avatar-img z-depth-1-half"
                  style={{width:"2.5rem",maxWidth:"2.5rem",height:"2.5rem",maxHeight:"2.5rem"}}
                />
                </Link>
                <div className="d-flex flex-column justify-content-start">
                  <div>{props.name}</div>
                  <div style={{color:"grey",fontSize:"0.7em"}}>{setDate(Date.now()-props.date)} ago</div>
                </div>
              </div>
              {props.userId===props.posterId
                ?
                <div className="d-flex flex-row align-items-start justify-content-end">

                  {editMode
                    ?
                    <MDBBtnGroup size="sm" >
                        <MDBBtn color="red accent-4" rounded={true}  onClick={()=>onDiscard()} ><MDBIcon className="mr-2" icon="undo" />Discard</MDBBtn>
                        <MDBBtn color="amber darken-4" rounded={true} onClick={()=>onSubmit()}><MDBIcon far icon="check-circle" className="mr-2" /> Save</MDBBtn>
                    </MDBBtnGroup>
                    :
                    deleteMode
                      ?
                      null
                      :
                      <MDBPopover
                       placement="top"
                       clickable
                       id="popper1"
                       >
                       <MDBBtn rounded color="white"  className="z-depth-0" ><MDBIcon size="lg" icon="ellipsis-v" /></MDBBtn>
                         <MDBPopoverBody style={{backgroundColor:"black"}}>
                         <MDBBtnGroup size="sm">
                             <MDBBtn color="black" onClick={()=> onEdit()} >Edit</MDBBtn>
                             <MDBBtn
                             color="black"
                             onClick={()=>toggle()}
                            >
                             Delete
                             </MDBBtn>
                         </MDBBtnGroup>
                         </MDBPopoverBody>
                      </MDBPopover>

                  }
                </div>
                :
                  (props.email==="dalia_elaiche@um5.ac.ma" && props.userId!==props.posterId)
                  ?
                  <div className="d-flex flex-row align-items-start justify-content-end">
                {
                   deleteMode
                    ?
                    null
                    :
                    <MDBPopover
                     placement="top"
                     clickable
                     id="popper1"
                     >
                     <MDBBtn rounded color="white"  className="z-depth-0" ><MDBIcon size="lg" icon="ellipsis-v" /></MDBBtn>
                       <MDBPopoverBody style={{backgroundColor:"black"}}>
                           <MDBBtn
                           color="black"
                           onClick={()=>toggle()}
                           size="sm"
                          >
                           Delete
                           </MDBBtn>
                       </MDBPopoverBody>
                    </MDBPopover>
                  }
                  </div>

                    :
                    null




              }


            </div>

          </MDBCardBody>
          {props.type==="post"?
              <MDBCardImage
                top
                src={props.image}
                alt=""
              />

          :
          file!==null?file.map(file=>
              (
                <div className="d-flex justify-content-center">
                  <a href={file.image} download target="_blank">
                    <MDBBtn color="red accent-3" >
                      <MDBIcon className="mr-3" fad size="2x" icon="file-alt" />
                        {file.filename}
                      </MDBBtn>
                   </a>
                   {editMode
                     ?
                     <MDBAnimation type="rollIn" >
                     <MDBBtn floating  size="sm" onClick={()=>setFile([])} color="red accent-4" >
                       <MDBIcon  size="1x"  icon="times" />
                     </MDBBtn>
                     </MDBAnimation >
                     :
                     null
                   }


                  </div>

              )
          ):null

        }

          <MDBCardBody>

            <div className="social-meta">
            {editMode===false
              ?
               <p>{text}</p>
              :
               <textarea
                name="text"
                className="form-control pl-2 my-0 d-flex"
                id="exampleFormControlTextarea2"
                rows="3"
                value={text}
                onChange={(e)=>setText(e.target.value)}
                placeholder="Write something !" />

            }

              <div className="d-flex  justify-content-between">

              <span>

            {likeButton}
            {likes} likes

            </span>


            <div>
              <MDBBtn tag="a" size="sm" floating color="dark">
                 <MDBIcon icon="comment" />
               </MDBBtn>
               {nbrComm} comments
               </div>
            </div>


            </div>
            <hr />
            <div  style={{maxHeight:"15rem"}} className="d-flex justify-content-center"  >

                <Comments comments={comments} id={props.id} />


            </div>


            <MDBInput
            name="comment"
            value={comm}
            onChange={(e)=>{
              setComment(e.target.value)
            }}
             far
            icon="heart"
             hint="Add Comment..."
             onKeyPress={
               (e)=>{
                     if(e.key == "Enter"){
                        sendComm(comm,props.commentName,props.commentImage,props.id,props.image,props.userId,"comment",props.text,props.room,props.posterId)
                     }
                 }
             }
              />
          </MDBCardBody>
          <MDBModal isOpen={modal} toggle={()=>toggle()} size="sm" className="z-depth-3" backdrop={false}>
            <MDBModalBody 	>
                <div  className="p-2 d-flex justify-content-end align-items-start">
                    <MDBIcon icon="times" onClick={()=>toggle()}  />
                </div>
                <p className="text-center">Please confirm your action.</p>
                <div className="d-flex justify-content-center ">
                  <MDBBtn
                      size="sm"
                       color="red accent-4"
                       rounded
                       onClick={()=>handleDelete()}
                       >
                      Confirm
                  </MDBBtn>
                </div>
            </MDBModalBody>
         </MDBModal >
        </MDBCard>
  );

}

const mapStatetoProps = state =>({
  commentName:state.ChatRoomReducer.name,
  Comments:state.ChatRoomReducer.comments,
  commentImage:state.ChatRoomReducer.image2,
  userId:state.ChatRoomReducer.userId,
  likedPosts:state.ChatRoomReducer.likedPosts,
  Name:state.ChatRoomReducer.name,
  ProfilImage:state.ChatRoomReducer.image2,
  room:state.ChatRoomReducer.room,
  token:state.ChatRoomReducer.token,
  email:state.ChatRoomReducer.email
})
const mapDispatchtoProps = dispatch =>({
    switchStatus:()=>dispatch({type:"SWITCH"}),
    ReloadMessages: (messages)=>  dispatch({type:"MESSAGES",messages:messages}),
    setCommentaires:(comment)=>dispatch({type:"COMMENTS",comments:comment}),
    setLikedPosts:(likedPosts)=>dispatch({type:"SETLIKEDPOSTS",likedPosts:likedPosts})


})
export default connect(mapStatetoProps,mapDispatchtoProps)(Feed);

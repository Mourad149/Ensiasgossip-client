const  initialState= {
  volumeMess:true,
  clicked:false,
  room:0,
  name:"",
  messages:[],
  image:"",
  image2:{},
  Posts:[],
  comments:[],
  userId:"",
  likedPosts:[],
  notifs:"",
  filiere:"",
  niveau:"",
  gender:"",
  date:"",
  phone:"",
  token:"",
  counter:0,
  status:0,
  email:""
}

const chatRoomReducer = (state=initialState, action)=>{
  if (action.type==="INIT") {
      const updatedState={...state}
      updatedState.room=action.room
      updatedState.name=action.name
      updatedState.filiere=action.filiere
      updatedState.niveau=action.niveau
      updatedState.gender=action.gender
      updatedState.date=action.date
      updatedState.phone=action.phone
      updatedState.email=action.email
      updatedState.status=action.status

      return updatedState
  }
  if (action.type==="MESSAGES") {
    const updatedState={...state}
    updatedState.messages=action.messages
    console.log(updatedState.messages)
    return updatedState
  }
  if (action.type==="UPLOAD") {
    const updatedState={...state}
    updatedState.image=action.image
    console.log(updatedState.image)
    return updatedState
  }
  if (action.type==="IMAGE") {
    const updatedState={...state}
    updatedState.image2=action.image
    return updatedState
  }
  if (action.type==="POSTS") {
    const updatedState={...state}
    updatedState.Posts=action.posts
    return updatedState
  }
  if (action.type==="COMMENTS") {
    const updatedState={...state}
    updatedState.comments=action.comments
    return updatedState
  }
  if (action.type==="SETID") {
    const updatedState={...state}
    updatedState.userId=action.userId
    console.log(updatedState.userId)
    return updatedState
  }
  if (action.type==="SETLIKEDPOSTS") {
    const updatedState={...state}
    updatedState.likedPosts=action.likedPosts
    console.log(updatedState.likedPosts)
    return updatedState
  }
  if (action.type==="TOKEN") {
    const updatedState={...state}
    updatedState.token=action.token
    console.log(updatedState.likedPosts)
    return updatedState
  }
  if (action.type==="COUNTER") {
    const updatedState={...state}
      let counter=updatedState.counter
    counter++
    updatedState.counter=counter
    return updatedState
  }
  if (action.type==="LOGOUT") {
    console.log("logout")
    const updatedState={...initialState}
    return updatedState
  }
  if (action.type==="TOZERO") {
    const updatedState={...state}
    updatedState.counter=0

    return updatedState
  }
  if (action.type==="SWITCHCLICK") {
    const updatedState={...state}
    updatedState.clicked=true

    return updatedState
  }
  if (action.type==="VOLUMEMESS") {
    const updatedState={...state}
    updatedState.volumeMess=action.volume
    return updatedState
  }


    return state
}
export default chatRoomReducer;

import React,{Component} from 'react'
import axios from "axios";

import { MDBBtn, MDBCol, MDBContainer, MDBRow,MDBSpinner,MDBAnimation,ToastContainer } from "mdbreact";
import Navbar from '../Components/Navbar'
import Feed from '../Components/Feed'
import Profile from '../Components/Profile'
import Contacts  from '../Components/Contacts'
import Friends from '../Components/Friends'
import PanelPage from '../Components/PanelPage'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import Event from "../Components/Event"
import CreateEvent from "../Components/CreateEvent"

let socket;
class NewsFeed extends Component {
  constructor(props){
    super(props)
    this.state={
      posts:[],
      events:[],
      refreshFeed:this.props.refreshFeed,
      loadingPost:true,
      loadingEvents:true,
      buttonStatus:true,
      skip:0,
      messages:[]
    }
    this.myRef=React.createRef()
  }

  componentDidMount(){


      axios.get(`/getPosts/${this.state.skip}/${this.props.room}`,
        {
         headers: {
           'Authorization': `Bearer ${this.props.token}`,
           'Content-Type': 'application/json'
      }})
      .then(result=>{
        this.setState({
          posts:result.data,
          loadingPost:false
        })
      })
      axios.get("/getEvents",
      {
        headers: {
          'Authorization': `Bearer ${this.props.token}`

        }
      }
    )
      .then(result=>{
        this.setState({
          events:result.data,
          loadingEvents:false
        })

      })
  }

  componentDidUpdate(prevProps,prevState){
      if(prevState.skip!==this.state.skip){
        axios.get(`/getPosts/${this.state.skip}/${this.props.room}`,
        {
          headers: {
            'Authorization': `Bearer ${this.props.token}`

          }
        })
        .then(result=>{
          this.setState({
            posts:this.state.posts.concat(result.data),
            loadingPost:false,
          },()=>{

          })

      })

  }
  if (prevState.buttonStatus!==this.state.buttonStatus && this.state.buttonStatus===false) {
      axios.get(`/getPosts/${this.state.skip}/${this.props.room}`,
        {
          headers: {
            'Authorization': `Bearer ${this.props.token}`

          }
        }
      )
      .then(result=>{
        this.setState({
          posts:result.data,
          loadingPost:false
        })
      })
  }

}
onScroll=(e)=>{
  const scrollY=window.scrollY
 const scrollTop=this.myRef.current.scrollTop
 const scrollHeight=this.myRef.current.scrollHeight
 const offsetHeight=this.myRef.current.offsetHeight
 const clientHeight=this.myRef.current.clientHeight
 if (  scrollHeight - offsetHeight -scrollTop < 1  ) {
   this.setState({skip:this.state.posts.length})
     }

}

  Refresh=(post)=>{
    this.setState({
      posts:[...this.state.posts,post]
    })
  }
  setButtonStatus=()=>{
    this.setState({skip:0,buttonStatus:!this.state.buttonStatus})
  }

    render(){
      const switchTo = (this.props.status===false ? <Contacts  status={this.props.status}/>  : <Friends status={this.props.status}/> )
      const feed= (this.state.loadingPost=== false ? this.state.posts.map(post=>(
        <MDBAnimation type="slideInUp">

        <MDBRow  className="d-flex justify-content-center align-items-center mb-2 "  style={{width:"100%"}}>
              <Feed  key={post._id} date={post.date} file={post.file} type={post.type} id={post._id} comments={post.comments} posterId={post.userId} text={post.text} image={post.image} profilImage={post.profilImage} name={post.name} likes={post.likes} />
        </MDBRow >
        </MDBAnimation>

      )) :         <MDBRow  className="d-flex justify-content-center align-items-center" style={{height:"25rem"}}  >
                  <MDBSpinner crazy white/>
                  </MDBRow >)

      const events= (this.state.loadingEvents=== false ? this.state.events.slice(0).reverse().map(eventt=>(
        <MDBRow  className="d-flex justify-content-center align-items-center mb-2 "  style={{width:"100%"}}>
              <Event key={eventt._id} participants={eventt.participants} team1={eventt.team1} team2={eventt.team2} id={eventt._id} profilImage={eventt.profilImage} userName={eventt.userName} type={eventt.type} description={eventt.description} background={eventt.background} participants={eventt.participants} place={eventt.place} name={eventt.name} time={eventt.time} date={eventt.date} icone={eventt.icone}  />
        </MDBRow >
      )) :         <MDBRow  className="d-flex justify-content-center align-items-center" style={{height:"25rem"}}  >
                  <MDBSpinner crazy white/>
                  </MDBRow >)
          return(
              <div style={{overflowY:"scroll",overflowX:"hidden",height:"100vh"}} onScroll={this.onScroll} ref={this.myRef}>



              <MDBRow  className="ml-auto" style={{width:"100%"}} >
              <Navbar profilImage={this.props.profilImage} search={true} userId={this.props.userId} room={this.props.room} name={this.props.name}/>


                <MDBCol md="4" className="d-flex  justify-content-center" >
                   <MDBRow className=" d-flex justify-content-center position-fixed" style={{marginTop:"150px"}} >
                   <MDBAnimation type="slideInLeft">
                      <Profile  image={this.props.profilImage} avatarStyle={{width:"7rem",maxWidth:"7rem",height:"7rem",maxHeight:"7rem"}} name={this.props.name} cardStyle={{height:"32rem",width:"25rem"}} notif={true}/>
                    </MDBAnimation>

                   </MDBRow >

                </MDBCol>

              <MDBCol md="4"  className="d-flex flex-column justify-content-center" style={{width:"100%"}} >
              <MDBRow  className="d-flex justify-content-center align-items-center "  style={{marginTop:"90px",width:"100%"}}>
                      <MDBBtn rounded outline color={this.state.buttonStatus===true? "amber darken-4" : "light"} size={this.state.buttonStatus===true? "lg" : "sm"} onClick={this.setButtonStatus}>SEE POSTS</MDBBtn>
                      <MDBBtn rounded outline color={this.state.buttonStatus===true? "light" : "amber darken-4"} size={this.state.buttonStatus===true? "sm" : "lg"} onClick={this.setButtonStatus} >CHECK EVENTS</MDBBtn>
              </MDBRow >
              <MDBRow  className="d-flex justify-content-center align-items-center "  style={{paddingTop:"20px",width:"100%"}}>
                  { this.state.buttonStatus===true?<PanelPage  />:<CreateEvent/>}
              </MDBRow >

                { this.state.buttonStatus===true?
                  feed
                  :
                  events
                }



              </MDBCol>


              <MDBCol md="4" className="d-flex  justify-content-center " >

                 <MDBRow className="d-flex  justify-content-center  position-fixed "  style={{paddingTop:"100px"}} >
                 <MDBAnimation type="slideInRight">

                  {switchTo}
                  </MDBAnimation>

                 </MDBRow >

              </MDBCol>

                </MDBRow >
                <ToastContainer
                       hideProgressBar={true}
                       newestOnTop={true}
                       autoClose={5000}
                       toastClassName="rounded-pill amber darken-3"
                       bodyClassName="d-flex justify-content-center "
                       style={{maxWidth:"15rem"}}

                     />
                </div>


          )
    }
}
const mapStatetoProps = state =>({
  refreshFeed:state.Reducer.refreshFeed,
  status:state.Reducer.status,
  profilImage:state.ChatRoomReducer.image2,
  name:state.ChatRoomReducer.name,
  room:state.ChatRoomReducer.room,
  userId:state.ChatRoomReducer.userId,
  token:state.ChatRoomReducer.token,
})

export default connect(mapStatetoProps,null)(NewsFeed);

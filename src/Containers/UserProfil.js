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
class UserProfil extends Component {
  constructor(props){
    super(props)
    this.state={
      profilImage:"",
      name:"",
      posts:[],
      events:[],
      refreshFeed:this.props.refreshFeed,
      loadingPost:true,
      loadingEvents:true,
      buttonStatus:true,
      skip:0,
    }
    this.myRef=React.createRef()
  }

  componentDidMount(){


    axios.get(`/getUser/${this.props.match.params.id}`,
      {
        headers:{
          'Authorization': `Bearer ${this.props.token}`

        }
      }
    )
    .then(result=>{
          this.setState({
            profilImage:result.data.image,
            name:result.data.name
          })
    })
      axios.get(`/getUserPosts/${this.state.skip}/${this.props.match.params.id}`,
        {
          headers:{
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

  componentDidUpdate(prevProps,prevState){
      if(prevState.skip!==this.state.skip){

        axios.get(`/getUserPosts/${this.state.skip}/${this.props.match.params.id}`,
          {
            headers:{
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
  if (prevProps.match.params.id!==this.props.match.params.id ) {
    this.setState({
      loadingPost:true
    })
      axios.get(`/getUserPosts/${this.state.skip}/${this.props.match.params.id}`,
        {
          headers:{
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
      axios.get(`/getUser/${this.props.match.params.id}`,
        {
          headers:{
            'Authorization': `Bearer ${this.props.token}`

          }
        }
      )
      .then(result=>{
            this.setState({
              profilImage:result.data.image,
              name:result.data.name
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
      const switchTo = (this.props.status===false ? <Contacts/>  : <Friends/> )
      const feed= (this.state.loadingPost=== false ? this.state.posts.map(post=>(
        <MDBAnimation type="slideInUp">

        <MDBRow  className="d-flex justify-content-center align-items-center mb-2 "  style={{width:"100%"}}>
              <Feed   file={post.file} date={post.date} type={post.type} id={post._id} posterId={post.userId} comments={post.comments} text={post.text} image={post.image} profilImage={post.profilImage} name={post.name} likes={post.likes} />
        </MDBRow >
        </MDBAnimation>

      )) :         <MDBRow  className="d-flex justify-content-center align-items-center" style={{height:"25rem"}}  >
                  <MDBSpinner crazy white/>
                  </MDBRow >)

      const events= (this.state.loadingEvents=== false ? this.state.events.slice(0).reverse().map(eventt=>(
        <MDBRow  className="d-flex justify-content-center align-items-center mb-2 "  style={{width:"100%"}}>
              <Event id={eventt._id} type={eventt.type} description={eventt.description} background={eventt.background} participants={eventt.participants} place={eventt.place} name={eventt.name} time={eventt.time} date={eventt.date} icone={eventt.icone}  />
        </MDBRow >
      )) :         <MDBRow  className="d-flex justify-content-center align-items-center" style={{height:"25rem"}}  >
                  <MDBSpinner crazy white/>
                  </MDBRow >)
          return(
              <div style={{overflowY:"scroll",overflowX:"hidden",height:"100vh"}} onScroll={this.onScroll} ref={this.myRef}>



              <MDBRow  className="ml-auto" style={{width:"100%"}} >
              <Navbar profilImage={this.props.profilImage} search={true} userId={this.props.userId} room={this.props.room} name={this.props.name}/>


                <MDBCol md="4" className="d-flex  justify-content-center" >
                   <MDBRow className=" d-flex justify-content-center position-fixed" style={{paddingTop:"150px"}} >
                      <Profile image={this.props.profilImage} avatarStyle={{width:"7rem",maxWidth:"7rem",height:"7rem",maxHeight:"7rem"}} name={this.props.name} cardStyle={{height:"32rem",width:"25rem"}} notif={true}/>

                   </MDBRow >

                </MDBCol>

              <MDBCol md="4"  className="d-flex flex-column justify-content-center" style={{width:"100%"}} >
              <MDBRow  className="d-flex justify-content-center align-items-center "  style={{paddingTop:"150px",marginBottom:"20px",width:"100%"}}>
                  <Profile image={this.state.profilImage} avatarStyle={{width:"7rem",maxWidth:"7rem",height:"7rem",maxHeight:"7rem"}} name={this.state.name} cardStyle={{height:"10rem",width:"30rem"}} norif={false}/>
              </MDBRow >

                { this.state.buttonStatus===true?
                  feed
                  :
                  events
                }



              </MDBCol>


              <MDBCol md="4" className="d-flex  justify-content-center " >

                 <MDBRow className="d-flex  justify-content-center  position-fixed "  style={{paddingTop:"100px"}} >

                  {switchTo}
                   </MDBRow >

              </MDBCol>

                </MDBRow >
                <ToastContainer
                       hideProgressBar={true}
                       newestOnTop={true}
                       autoClose={5000}
                       toastClassName="rounded-pill amber darken-3"
                       bodyClassName="d-flex justify-content-center align-self-center"
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
  token:state.ChatRoomReducer.token

})
export default connect(mapStatetoProps)(UserProfil);

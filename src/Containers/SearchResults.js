import React,{Component} from 'react'
import axios from "axios";

import { MDBBtn, MDBCol, MDBContainer, MDBRow,MDBSpinner,MDBAnimation,MDBIcon,ToastContainer } from "mdbreact";
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
class SearchResults extends Component {
  constructor(props){
    super(props)
    this.state={
      posts:[],
      refreshFeed:this.props.refreshFeed,
      loadingPost:true,
      loadingEvents:true,
      buttonStatus:true,
      skip:0,
    }
    this.myRef=React.createRef()
  }

  componentDidMount(){
    if ((this.props.match.params.within && this.props.match.params.within==="file" )|| (this.props.match.params.within && this.props.match.params.within==="post")){
      axios.get(`/searchPosts/${this.state.skip}/${this.props.match.params.search}/${this.props.room}/${this.props.match.params.within}`,
      {
        headers:{
          'Authorization': `Bearer ${this.props.token}`

        }
      })
           .then(result=>{
             console.log("search done")
            this.setState({
              posts:result.data,
              loadingPost:false
            })
          })
        }
      if (this.props.match.params.id) {
        console.log("triggered!!!!")
        axios.get(`/post/${this.props.match.params.id}`,
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




  }

  componentDidUpdate(prevProps,prevState){
      if(prevState.skip!==this.state.skip && ((this.props.match.params.within && this.props.match.params.within==="file" ) || (this.props.match.params.within && this.props.match.params.within==="post"))){
        axios.get(`/searchPosts/${this.state.skip}/${this.props.match.params.search}/${this.props.room}/${this.props.match.params.within}`,
          {
            headers:{
              'Authorization': `Bearer ${this.props.token}`

            }
          }
        )
        .then(result=>{
          this.setState({
            posts:this.state.posts.concat(result.data),
            loadingPost:false,
          })

      })

  }
  else if( (this.props.match.params.id && prevProps.match.params.id!==this.props.match.params.id))
      {
          this.setState({
            loadingPost:true
          })
          axios.get(`/post/${this.props.match.params.id}`,
            {
              headers:{
                'Authorization': `Bearer ${this.props.token}`

              }
            }
          )
          .then(result=>{

            this.setState({
              posts:result.data,
              loadingPost:false,
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
      const switchTo = (this.props.status===false ? <Contacts status={this.props.status}/>  : <Friends status={this.props.status}/> )
      const feed= (this.state.loadingPost=== false ? this.state.posts.map(post=>(
        <MDBAnimation type="slideInUp">

        <MDBRow  className="d-flex justify-content-center align-items-center mb-2 "  style={{width:"100%"}}>
              <Feed   file={post.file} date={post.date} type={post.type} id={post._id} comments={post.comments} posterId={post.userId} text={post.text} image={post.image} profilImage={post.profilImage} name={post.name} likes={post.likes} />
        </MDBRow >
        </MDBAnimation>

      )) :         <MDBRow  className="d-flex justify-content-center align-items-center" style={{height:"25rem"}}  >
                  <MDBSpinner crazy white/>
                  </MDBRow >)

          return(
              <div style={{overflowY:"scroll",overflowX:"hidden",height:"100vh"}} onScroll={this.onScroll} ref={this.myRef}>



              <MDBRow  className="ml-auto" style={{width:"100%"}} >
              <Navbar profilImage={this.props.profilImage} search={true} userId={this.props.userId} room={this.props.room} name={this.props.name}/>


                <MDBCol md="4" className="d-flex  justify-content-center" >
                   <MDBRow className=" d-flex justify-content-center position-fixed" style={{paddingTop:"150px"}} >
                   <MDBAnimation type="slideInLeft">
                      <Profile  image={this.props.profilImage} avatarStyle={{width:"7rem",maxWidth:"7rem",height:"7rem",maxHeight:"7rem"}} name={this.props.name} cardStyle={{height:"32rem",width:"25rem"}} notif={true}/>
                    </MDBAnimation>

                   </MDBRow >

                </MDBCol>

              <MDBCol md="4"  className="d-flex flex-column justify-content-center" style={{width:"100%"}} >
              <MDBRow  className="d-flex justify-content-center align-items-center "  style={{marginTop:"90px",marginBottom:"50px",width:"100%"}}>
              {
                this.props.match.params.within!==undefined
                ?
                <h4 className="text-center text-white" ><MDBIcon icon="search"/> Search results for <strong>{this.props.match.params.search}</strong> within <strong>{this.props.match.params.within}s</strong> :</h4>
                :
                <h4 className="text-center text-white" ><MDBIcon icon="running"/> Redirected <strong>to</strong> :</h4>

              }
              </MDBRow >

                  {feed}
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
export default connect(mapStatetoProps)(SearchResults);

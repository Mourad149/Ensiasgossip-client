import React,{Component} from 'react';
import { MDBRow,MDBCol,MDBCard, MDBCardTitle, MDBCardText, MDBContainer,MDBCardBody,
  MDBAvatar,MDBInput,MDBBtn ,MDBIcon,MDBScrollbar,MDBFileInput,
   MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBProgress, toast, ToastContainer} from "mdbreact";
import Resizer from 'react-image-file-resizer';
import {connect} from 'react-redux'
import axios from "axios";
import io from 'socket.io-client'
let socket;
const ENDPOINT="/Post"
const formData = new FormData();

class PanelPage extends Component {
state = {
  text:"",
  image:"",
  profilImage:this.props.image,
  name:this.props.Name,
  likes:0,
  modal1:false,
  modal1:false,
  userId:this.props.userId,
  file:[],
  postStatus:true,
  isPosted:""

}

componentDidMount(){
  socket = io("/Post");

  socket.emit('join', {room:this.props.room}, (error) => {
    if(error) {
      alert(error);
    }
} );


}
onImageChange = this.onImageChange.bind(this);

onImageChange(value) {
  Resizer.imageFileResizer(
           value[0],
           400,
           400,
           'JPEG',
           100,
           0,
           uri => {
               this.setState({
                 image:uri,
                 postStatus:true
               })
           }
       );
}
handleSubmit = event => {

  event.preventDefault();
  this.setState({isPosted:false})
  socket = io("/Post");

  socket.emit('join', {room:this.props.room}, (error) => {
    if(error) {
      alert(error);
    }
} );
  socket.emit("addPost",
        {
          text:this.state.text,
          image:this.state.image,
          profilImage:this.state.profilImage,
          file:this.state.file,
          name:this.state.name,
          likes:this.state.likes,
          userId:this.state.userId,
          type:"post"

        },
        this.setState({isPosted:true},this.playAudio())

)



   }


   playAudio = () => {
     document.getElementById("audio3").play();
  };
handleFileSubmit=event=>{
  event.preventDefault();
  this.setState({
    isPosted:false
  })

  axios({
      method: 'post',
      url: '/upload',
      headers: {
          'crossDomain': true,  //For cors errors
          'Authorization': `Bearer ${this.props.token}`,
          'Access-Control-Allow-Origin': '*'
      },
      data:   formData




  }).then((res)=> {
      let fileProps=[];
      res.data.map(data=> (fileProps.push(data)))
      socket = io("/Post");

      socket.emit('join', {room:this.props.room}, (error) => {
        if(error) {
          alert(error);
        }
    } );
      socket.emit("addPost",
            {
              text:this.state.text,
              image:this.state.image,
              file:fileProps,
              profilImage:this.state.profilImage,
              name:this.state.name,
              likes:this.state.likes,
              fileName:res.data.fileName,
              userId:this.state.userId,
              type:"file"

            }
    )
    this.setState({
      isPosted:true,
      postStatus:true
    },this.playAudio())

    formData.delete('file')
  });
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}
  onChange=(e)=>{
    this.setState({
      text:e.target.value
    })
  }
  onFileChange=(value)=>{
    formData.delete('file')
    for (var i = 0; i < value.length; i++) {
      formData.append(`file`, value[i]);

    }

this.setState({
    postStatus:false
})
}
render(){

  return (
<div>


  <MDBCard className="card-body" style={{ width: "30rem",height:"12rem", marginBottom: "1rem" }}>
    <MDBRow style={{height:"7rem"}} >
      <MDBCol md="2"  className="d-flex "  >
      <MDBAvatar
        tag="img"
        src={this.props.image}
        alt="avatar"
        circle
        className="z-depth-1"
        style={{maxHeight:"3rem",width:"3rem",maxWidth:"3rem"}}
      />
      </MDBCol>
      <MDBCol md="10"   >
      <textarea  name="text" onChange={this.onChange} className="form-control pl-2 my-0 d-flex" id="exampleFormControlTextarea2" rows="3" placeholder="Write something !" />
      </MDBCol>
    </MDBRow>

        <MDBRow style={{height:"4rem"}}  >
          <MDBCol md="12" className="d-flex flex-row-reverse " >
          {
            this.state.postStatus===true?
              <MDBBtn rounded color="red accent-4" type="button" onClick={this.handleSubmit} size="sm" >POST</MDBBtn>
              :
              <MDBBtn rounded color="red accent-4" type="button" onClick={this.handleFileSubmit} size="sm" >POST</MDBBtn>
          }


          <MDBBtn tag="a" size="sm" onClick={this.toggle(1)} floating color="amber darken-3">
           <MDBIcon icon="camera" />
         </MDBBtn>

           <MDBBtn tag="a" onClick={this.toggle(2)} size="sm" floating color="amber darken-3">
            <MDBIcon icon="file" />
          </MDBBtn>

          </MDBCol>
        </MDBRow>
        {this.state.isPosted===false
          ?
          <MDBRow   >
          <MDBProgress material preloader color="red accent-4" />
          </MDBRow>
          :
              (this.state.isPosted===true
                ?
                toast(
                  <p style={{fontSize:"0.8em"}} className="text-white"><MDBIcon far  icon="check-circle"/>  Your post has been submitted !</p>
                  , {
                    closeButton: false
                  },this.setState({isPosted:""}))

                :
                null
              )
        }



  </MDBCard>
  <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="sm" centered>
  <div  className="p-2 d-flex justify-content-end align-items-start">
      <MDBIcon icon="times" onClick={this.toggle(1)}  />
  </div>
  <MDBModalBody>
     < MDBFileInput type="file" name="image" textFieldTitle="Upload image" 	 getValue= {this.onImageChange} btnColor="amber darken-4" btnTitle="CHOOSE IMAGE"/>
  </MDBModalBody>

 </MDBModal >
 <MDBModal  isOpen={this.state.modal2} toggle={this.toggle(2)} size="sm" centered>
 <div  className="p-2 d-flex justify-content-end align-items-start">
     <MDBIcon icon="times" onClick={this.toggle(2)}  />
 </div>
 <MDBModalBody >
    < MDBFileInput type="file" name="file" multiple textFieldTitle="Upload file"	 getValue= {this.onFileChange}  btnColor="amber darken-4" btnTitle="CHOOSE File"/>
 </MDBModalBody>

</MDBModal>

</div>
);
};}
const mapStatetoProps = state =>({
  image:state.ChatRoomReducer.image2,
  Name:state.ChatRoomReducer.name,
  userId:state.ChatRoomReducer.userId,
  room:state.ChatRoomReducer.room

})


export default connect(mapStatetoProps,null)(PanelPage);

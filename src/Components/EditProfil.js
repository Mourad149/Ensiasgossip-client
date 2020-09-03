import React,{Component} from "react";
import {MDBScrollbar,MDBContainer,MDBDatePicker,MDBFileInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter,MDBDropdown, MDBDropdownToggle,MDBAvatar, MDBDropdownMenu,toast, MDBDropdownItem} from 'mdbreact';
import {Link} from 'react-router-dom'
import axios from "axios";
import ImageUpload from './ImageUpload';
import {connect} from 'react-redux'
import Resizer from 'react-image-file-resizer';


class EditProfil extends Component {
   state={

      name:this.props.name,
      phone:this.props.phone,
      gender:this.props.gender,
      date:this.props.date,
      image:this.props.image,
      pass1:"",
      pass2:"",
      radio:"",
      base64files:"",

   }
  onChange = this.onChange.bind(this);

   onChange(value) {
     Resizer.imageFileResizer(
              value[0],
              200,
              200,
              'JPEG',
              20,
              0,
              uri => {
                  this.setState({image:uri})
              }
          );
   }
   handleInputChange = e => {
const {name,value}=e.target
      this.setState({
        [name]:value
      })
     };
     handleRadio= nr=>()=>{
       this.setState({
         radio:nr
       })

     }
     getRadioValue=(value)=>{
      this.setState({
        gender:value
      })
     }
   getPickerValue = (value) => {
    this.setState({
      date:value
    })
   }
   getImagePath=value=>{

    this.setState({
      image:value[0]
    })

 }
 onclickHandlerNiv=(value)=>{
    this.setState({
    niveau:value
    })
 }
 onclickHandlerFil=(value)=>{
    this.setState({
    filiere:value
    })
 }

   handleSubmit = event => {
     event.preventDefault();
     if(this.state.pass1===this.state.pass2)
        {  //Alter your Axios request like below
          axios({
              method: 'post',
              url: `/updateProfil/${this.props.userId}`,
              headers: {
                  'crossDomain': true,  //For cors errors
                  'Authorization': `Bearer ${this.props.token}`,
                  'Access-Control-Allow-Origin': '*'
              },
              data: {
                  name: this.state.name,
                  phone: this.state.phone,
                  date: this.state.date,
                  email: this.state.email,
                  image:this.state.image,
                  gender: this.state.gender,
                  pass1: this.state.pass1,



              }
          }).then((res)=> {
            toast(
              <p style={{fontSize:"0.8em"}} className="text-white text-center">  <MDBIcon far  icon="check-circle"/>  profile updated successfuly !
              <br/> please logout and reconnect to see changes.<br/> (you'll be logged out automatically in 5 seconds)<br/><MDBIcon far  icon="smile"/><br/>
                <MDBBtn color="red accent-3" onClick={this.props.logout}>Logout</MDBBtn><br/>
                </p>
              , {
                closeButton: false
              })
              setTimeout(()=>this.props.logout(),5000)
          }).catch(err=>{

            this.props.setToastType("error")
            toast(
              <p style={{fontSize:"0.8em"}} className="text-white text-center">  <MDBIcon   icon="exclamation-triangle"/>  An error has occured !</p>
              , {
                closeButton: false
              })

          })
}else{
  this.props.setToastType("error")
  toast(
    <p style={{fontSize:"0.8em"}} className="text-white text-center">  <MDBIcon   icon="exclamation-triangle"/>   There is no match between passwords !</p>
    , {
      closeButton: false
    })
}
      }

   render(){
  return (

          <MDBCard style={{height:""}}>
            <MDBCardBody className="mx-1" >
              <div className="text-center">

                  <h3> <MDBIcon icon="edit"/> Edit your profil </h3>

              </div>
              <form onSubmit={this.handleSubmit} encType="multipart/form-data" >

              <MDBContainer style={{height:"25rem"}}>
              <MDBScrollbar>

              <MDBInput
                label="Your full name"
                type="text"
                validate
                name="name"
                group
                value={this.state.name}
                error="wrong"
                success="right"
                onChange={this.handleInputChange}

              />

              <MDBInput
                label="Phone number "
                type="text"
                group
                name="phone"
                value={this.state.phone}
                validate
                containerClass="mb-0"
              onChange={this.handleInputChange}
              />
              <h6>Gender :</h6>
              <MDBInput
                label="Male"
                group
                value="M"
                type="radio"
                validate
                onClick={this.handleRadio(1)}
                containerClass="mb-0"
                id='radio1'
                getValue={this.getRadioValue}
                checked={this.state.gender==="M"?true:false}
              />
              <MDBInput
                label="Female"
                group
                checked={this.state.gender==="F"?true:false}
                type="radio"
                value="F"
                validate
                containerClass="mb-0"
                onClick={this.handleRadio(2)}
                id='radio2'
                getValue={this.getRadioValue}

              />
              <MDBInput
                label="Other"
                group
                value="O"
                checked={this.state.gender==="O"?true:false}
                type="radio"
                validate
                containerClass="mb-0"
                onClick={this.handleRadio(3)}
                id='radio3'
                getValue={this.getRadioValue}



              />


              <hr/>

              <div className="d-flex justify-content-between align-items-center">
              <h6>Date of Birth :</h6>
              <MDBDatePicker
              theme={{
                palette: {
                  primary: {
                    main: '#581845',
                  },
                  secondary: {
                    main: '#581845',
                    contrastText: '#581845',
                  },
                },
                typography: {
                  useNextVariants: true,
                }
              }}
              format='DD MMMM, YYYY'
               getValue={this.getPickerValue}
               name="date"
               value={this.state.date!==""?this.state.date:null}
               />
              </div>
              <hr/>
              <div className="d-flex justify-content-center align-items-center flex-column">
              <MDBAvatar
                tag="img"
                src={this.state.image}
                alt="avatar"
                circle
                className="mx-2 z-depth-1"
                style={{width:"5rem",maxWidth:"5rem",height:"5rem",maxHeight:"5rem"}}
              />
                < MDBFileInput type="file" name="myImage" textFieldTitle="Upload image"	 getValue= {this.onChange} onChange={this.onFormSubmit} btnColor="red accent-3" btnTitle="CHOOSE IMAGE"/>
              </div>
               <hr/>

                <p className="text-center grey-text" style={{width:"20rem",fontSize:"0.8em"}}>If you are not willing to change your password , please complete the fields with your actual password.</p>
              <MDBInput
                label="Set password "
                name="pass1"
                group
                type="password"
                validate
                containerClass="mb-0"
                onChange={this.handleInputChange}
                required
              />
              <MDBInput
                label="Confirm your password"
                name="pass2"
                group
                type="password"
                validate
                containerClass="mb-0"
                onChange={this.handleInputChange}
                required
              />
              </MDBScrollbar>
              </MDBContainer>


              <div className="text-center mb-3">
                <MDBBtn
                  type="submit"
                  rounded
                  className="btn-block red accent-4 z-depth-1"
                >
                  Save
                </MDBBtn>
              </div>
              </form>


            </MDBCardBody>
          </MDBCard>

  );
}
};
const mapStatetoProps = state =>({
  image:state.ChatRoomReducer.image2,
  name:state.ChatRoomReducer.name,
  phone:state.ChatRoomReducer.phone,
  gender:state.ChatRoomReducer.gender,
  date:state.ChatRoomReducer.date,
  userId:state.ChatRoomReducer.userId,
  token:state.ChatRoomReducer.token

})
const mapDispatchtoProps = dispatch =>({
    uploadImage:(image)=>dispatch({type:"UPLOAD",image:image}),
    setToastType:(toastType)=>dispatch({type:"TOAST",toastType:toastType}),
    logout:()=>dispatch({type:"LOGOUT"})


})
export default connect(mapStatetoProps,mapDispatchtoProps)(EditProfil);

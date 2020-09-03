import React,{Component} from "react";
import {MDBScrollbar,MDBContainer,MDBDatePicker,MDBFileInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter,MDBDropdown, MDBDropdownToggle,MDBAvatar, MDBDropdownMenu, MDBDropdownItem,toast} from 'mdbreact';
import {Link} from 'react-router-dom'
import axios from "axios";

import ImageUpload from './ImageUpload';
import {connect} from 'react-redux'
import Resizer from 'react-image-file-resizer';
import data from "../data/Emails.json"

let emails;
class Subscription extends Component {
   state={

      name:"",
      email:"",
      phone:"",
      gender:"",
      niveau:"",
      filiere:"",
      date:"",
      image:"",
      pass1:"",
      pass2:"",
      radio:"",
      file:[],
      base64files:"",

   }
   componentDidMount(){
     axios.get("/getEmailUsers").then(res=>{
            emails=res.data
     }
     )
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
                  this.setState({file:uri})
              }
          );
   }
   handleInputChange = e => {
const {name,value}=e.target
      this.setState({
        [name]:value
      })
     };
     handleEmailInputChange = e => {
         const {name,value}=e.target
          this.setState({
            [name]:value
          },()=>{
            if(data.find(candidates=>candidates.Email===this.state.email)){

                   let cred = data.find(candidates=>candidates.Email===this.state.email)
                  this.setState({
                    name:cred.Prenom.slice(0,1).toUpperCase()+cred.Prenom.slice(1, cred.Prenom.length).toLowerCase()+" "+cred.Nom
                  })
            }


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
     if (emails.find(candidates=>candidates.email===this.state.email)) {
       this.props.setToastType("error")
       toast(
         <p style={{fontSize:"0.8em"}} className="text-white  text-center">  <MDBIcon  icon="exclamation-triangle"/> User already exists !! </p>
         , {
           closeButton: false
         })
     }else {
       if (this.state.date!=="" && this.state.file!==[] && this.state.gender!=="" && this.state.niveau!=="" && this.state.filiere!==""  ) {
         if (data.find(candidates=>candidates.Email===this.state.email)) {
           if (this.state.niveau==="2 eme" && this.state.filiere==="IWIM") {
             if(this.state.pass1===this.state.pass2)
                {  //Alter your Axios request like below
                  axios({
                      method: 'post',
                      url: '/formdata',
                      headers: {
                          'crossDomain': true,  //For cors errors

                         'Access-Control-Allow-Origin': '*'
                      },
                      data: {
                          name: this.state.name,
                          phone: this.state.phone,
                          date: this.state.date,
                          email: this.state.email,
                          image:this.state.file,
                          gender: this.state.gender,
                          pass1: this.state.pass1,
                          niveau:this.state.niveau,
                          filiere:this.state.filiere


                      }
                  }).then((res)=> {
                         this.props.setToastType("success")
                        toast(
                          <p style={{fontSize:"0.8em"}} className="text-white  text-center">  <MDBIcon far icon="check-circle"/> You have been subscribed successfuly <MDBIcon far icon="smile" /> ! </p>
                          , {
                            closeButton: false
                          })
                  }).catch(err=>{
                    this.props.setToastType("error")
                    toast(
                      <p style={{fontSize:"0.8em"}} className="text-white  text-center">  <MDBIcon  icon="exclamation-triangle"/> An error occured <MDBIcon far icon="sad-cry" /> ! </p>
                      , {
                        closeButton: false
                      })
                  });
            }
            else
            {
              this.props.setToastType("error")
                toast(
                  <p style={{fontSize:"0.8em"}} className="text-white  text-center">  <MDBIcon  icon="exclamation-triangle"/> No match between password ! </p>
                  , {
                    closeButton: false
                  })
             }
           }
           else {
             this.props.setToastType("error")
             toast(
               <p style={{fontSize:"0.8em"}} className="text-white text-center">  <MDBIcon  icon="exclamation-triangle"/> Only second year IWIM are allowed in for the moment </p>
               , {
                 closeButton: false
               })
           }


          }
              else{
                this.props.setToastType("error")
                toast(
                  <p style={{fontSize:"0.8em"}} className="text-white  text-center">  <MDBIcon  icon="exclamation-triangle"/> This email does not match an IWIM email </p>
                  , {
                    closeButton: false
                  })
                }

              }
              else {
                this.props.setToastType("error")
                toast(
                  <p style={{fontSize:"0.8em"}} className="text-white  text-center">  <MDBIcon  icon="exclamation-triangle"/> Please fill in all fields ! </p>
                  , {
                    closeButton: false
                  })
              }
     }


    }





   render(){
  return (

          <MDBCard style={{width:"30rem"}}>
            <MDBCardBody className="mx-1" >
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Sign up to your social network !</strong>
                </h3>
              </div>
              <form onSubmit={this.handleSubmit} encType="multipart/form-data" >

              <MDBContainer style={{height:"25rem"}}>
              <MDBScrollbar>


              <MDBInput
                label="Email address"
                type="email"
                validate
                required
                group
                name="email"
                containerClass="mb-0"
                onChange={this.handleEmailInputChange}

              />
              <MDBInput
                label="Your full name"
                type="text"
                validate
                name="name"
                group
                required
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
                validate
                containerClass="mb-0"
              onChange={this.handleInputChange}
              required

              />
              <h6>Gender :</h6>
              <MDBInput
                label="Male"
                group
                value="M"
                type="radio"
                validate
                onClick={this.handleRadio(1)}
                checked={this.state.radio===1?true:false}
                containerClass="mb-0"
                id='radio1'
                getValue={this.getRadioValue}
                required


              />
              <MDBInput
                label="Female"
                group
                checked={this.state.radio===2?true:false}
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
                checked={this.state.radio===3?true:false}
                type="radio"
                validate
                containerClass="mb-0"
                onClick={this.handleRadio(3)}
                id='radio3'
                getValue={this.getRadioValue}



              />
              <hr/>
              <div className="d-flex justify-content-between align-items-center">
              <h6>Niveau :</h6>
              <MDBDropdown size="sm">
                <MDBDropdownToggle caret color="red accent-3">
                  <div className="d-none d-md-inline" >
                  {this.state.niveau==="" ? "CHOISISSEZ UN NIVEAU" :this.state.niveau+" année"}
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu  color="dark">
                  <MDBDropdownItem onClick={()=>this.onclickHandlerNiv("1 ere")} >1 ere année</MDBDropdownItem>
                  <MDBDropdownItem onClick={()=>this.onclickHandlerNiv("2 eme")}>2 éme année</MDBDropdownItem>
                  <MDBDropdownItem onClick={()=>this.onclickHandlerNiv("3 eme")}>3 éme année</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>

              </div>

              <hr/>

              <div className="d-flex justify-content-between align-items-center">
              <h6>Filière :</h6>
              <MDBDropdown size="sm">
                <MDBDropdownToggle caret color="red accent-3">
                  <div className="d-none d-md-inline" >
                {this.state.filiere==="" ? "CHOISISSEZ VOTRE FILIERE" :this.state.filiere}
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu color="dark">
                  <MDBDropdownItem  onClick={()=>this.onclickHandlerFil("IWIM")}>IWIM</MDBDropdownItem>
                  <MDBDropdownItem  onClick={()=>this.onclickHandlerFil("GL")}>GL</MDBDropdownItem>
                  <MDBDropdownItem  onClick={()=>this.onclickHandlerFil("IEL")}>IEL</MDBDropdownItem>
                  <MDBDropdownItem  onClick={()=>this.onclickHandlerFil("SSI")}>SSI</MDBDropdownItem>
                  <MDBDropdownItem  onClick={()=>this.onclickHandlerFil("BI")}>BI</MDBDropdownItem>
                  <MDBDropdownItem  onClick={()=>this.onclickHandlerFil("ISEM")}>ISEM</MDBDropdownItem>
                  <MDBDropdownItem  onClick={()=>this.onclickHandlerFil("IDF")}>IDF</MDBDropdownItem>
                  <MDBDropdownItem  onClick={()=>this.onclickHandlerFil("2IA")}>2IA</MDBDropdownItem>

              </MDBDropdownMenu>
              </MDBDropdown>

              </div>
              <hr/>

              <div className="d-flex justify-content-between align-items-center">
              <h6>Date of Birth :</h6>
              <MDBDatePicker
              theme={{
                palette: {
                  primary: {
                    main: '#D0312D',
                  },
                  secondary: {
                    main: '#D0312D',
                    contrastText: '#D0312D',
                  },
                },
                typography: {
                  useNextVariants: true,
                }
              }}
              format='DD MMMM, YYYY'
               getValue={this.getPickerValue}
               name="date"
               required

               />
              </div>
              <hr/>
              < MDBFileInput type="file" name="myImage" textFieldTitle="Upload image"	 getValue= {this.onChange} onChange={this.onFormSubmit} btnColor="red accent-3" btnTitle="CHOOSE IMAGE"/>
               <hr/>


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
                  className="btn-block  z-depth-1a"
                  color="red accent-4"
                >
                  Subscribe
                </MDBBtn>
              </div>
              </form>


            </MDBCardBody>
            <MDBModalFooter className="mx-2 pt-3 mb-1 d-flex justify-content-center">
              <p className="font-small grey-text ">
                  Go and
                <a href="#signup" onClick={this.props.switchForm} className="ml-1" >
                  Sign in
                </a>
              </p>
            </MDBModalFooter>
          </MDBCard>

  );
}
};
const mapStatetoProps = state =>({
  image:state.ChatRoomReducer.image,
  toastType:state.Reducer.toastType

})
const mapDispatchtoProps = dispatch =>({
    uploadImage:(image)=>dispatch({type:"UPLOAD",image:image}),
    setToastType:(toastType)=>dispatch({type:"TOAST",toastType:toastType}),
    switchForm:()=>dispatch({type:"SWITCHFORM"}),


})
export default connect(mapStatetoProps,mapDispatchtoProps)(Subscription);

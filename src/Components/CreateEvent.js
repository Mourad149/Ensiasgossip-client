import React, { Component } from "react";
import {MDBBtn, MDBIcon, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBInput,MDBDropdown, MDBDropdownToggle,MDBAvatar, MDBDropdownMenu, MDBDropdownItem,toast,MDBDatePicker,
 MDBTimePicker,MDBScrollbar} from 'mdbreact';
 import axios from "axios"
 import {connect} from 'react-redux'

class CreateEvent extends Component {
  state = {
    modal: false,
    type:"",
    background:"",
    icone:"",
    date:"",
    time:"",
    name:"",
    description:"",
    team1:{
        name:"",
        participants:[]
    },
    team2:{
        name:"",
        participants:[]
    },
    place:"",
    participants:[]

  };



  handleSubmit = event => {
    event.preventDefault();

         axios({
             method: 'post',
             url: '/eventdata',
             headers: {
                 'crossDomain': true,  //For cors errors
                 'Authorization': `Bearer ${this.props.token}`,
                 'Access-Control-Allow-Origin': '*'
             },
             data: {
               type:this.state.type,
               background:this.state.background,
               icone:this.state.icone,
               date:this.state.date,
               time:this.state.time,
               name:this.state.name,
               description:this.state.description,
               place:this.state.place,
               participants:this.state.participants,
               profilImage:this.props.image,
               userName:this.props.Name,
               team1:this.state.team1,
               team2:this.state.team2


             }
         }).then((res)=> {
           toast(
             <p style={{fontSize:"0.8em"}} className="text-white"><MDBIcon far  icon="check-circle"/>  Event created !</p>
             , {
               closeButton: false
             })
             window.location="/NewsFeed"
         }).catch(err=>{
           toast(
             <p style={{fontSize:"0.8em"}} className="text-white"><MDBIcon far  icon="times-circle"/> Error !</p>
             , {
               closeButton: false
             })
         })

     }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  onclickHandlerNiv=(type,background,icone)=>{
     this.setState({
     type:type,
     background:background,
     icone:icone
     })
  }
  getTimePickerValue = (value) => {
   this.setState({
     time:value
   })
  }
  getDatePickerValue = (value) => {
   this.setState({
     date:value
   })
  }
  onChangeHandler=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  }
  onChangeHandlerTeam=(event,nbr)=>{
    const team= "team"+nbr
    this.setState({[team]:{name:event.target.value,participants:[]}})
  }
  render()
{
   return (

        <div style={{height:"7rem"}} className="d-flex align-items-center">
          <MDBBtn tag="a"  rounded color="red accent-4" onClick={this.toggle}>
            <MDBIcon icon="plus" />   CREATE EVENT !
          </MDBBtn>

          <MDBModal isOpen={this.state.modal} size="sm" toggle={this.toggle}    >

              <MDBModalBody>
                  <h4 className="text-center">CREATE YOUR EVENT</h4>
                  <hr/>
                <MDBContainer style={{height:"25rem"}}>
                    <MDBScrollbar>

                <div className="d-flex justify-content-center" >
                  <MDBDropdown size="sm">
                    <MDBDropdownToggle caret color="red accent-4">
                      <div className="d-none d-md-inline" >
                      {this.state.type==="" ? "EVENT TYPE" :this.state.type+" EVENT"}
                      </div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu  color="dark">
                      <MDBDropdownItem onClick={()=>this.onclickHandlerNiv("SPORT","https://image.winudf.com/v2/image/Y29tLnNnbS5oZHNwb3J0c3dhbGxwYXBlcl9zY3JlZW5zaG90c18yM18zMjAwZmJlZA/screen-23.jpg?fakeurl=1&type=.jpg","futbol")} >SPORT</MDBDropdownItem>
                      <MDBDropdownItem onClick={()=>this.onclickHandlerNiv("MUSICAL","https://i.pinimg.com/736x/40/d7/33/40d733e97f5f5301d4f1ee2cf590dd19.jpg","guitar")}>MUSICAL</MDBDropdownItem>
                      <MDBDropdownItem onClick={()=>this.onclickHandlerNiv("STUDY","https://www.teacheracademy.eu/wp-content/uploads/2019/02/CLA.1.DIV_-608x378.jpg","book-open")}>STUDY</MDBDropdownItem>
                      <MDBDropdownItem onClick={()=>this.onclickHandlerNiv("CONFERENCE","https://unctad.org/divs/gds/dmfas/what/PublishingImages/2017DMC_opening.JPG","microphone")}>CONFERENCE</MDBDropdownItem>
                      <MDBDropdownItem onClick={()=>this.onclickHandlerNiv("RED HACKERS","https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Journ%C3%A9e_des_olympiades_%C3%A0_l%27ENSIAS.jpg/440px-Journ%C3%A9e_des_olympiades_%C3%A0_l%27ENSIAS.jpg","drum")}>RED HACKERS</MDBDropdownItem>
                      <MDBDropdownItem onClick={()=>this.onclickHandlerNiv("OTHER","https://www.dynamique-mag.com/wp-content/uploads/94d8155cb7f2702d2b914dbfb56699d5-780x405.jpg","calendar-alt")}>OTHER</MDBDropdownItem>

                    </MDBDropdownMenu>

                  </MDBDropdown>
                  </div>

                  <MDBInput label="Event name"  name="name" onChange={this.onChangeHandler}/>
                  <MDBInput type="textarea" label="Describe your event" rows="1"  name="description" onChange={this.onChangeHandler}/>
                  {this.state.type==="SPORT"
                  ?
                  <div>
                  <MDBInput label="Team 1"  name="team1" onChange={(e)=>this.onChangeHandlerTeam(e,1)}/>
                  <MDBInput label="Team 2"  name="team2" onChange={(e)=>this.onChangeHandlerTeam(e,2)}/>
                  </div>
                  :
                  null
                }
                  <MDBInput label="Place" name="place" onChange={this.onChangeHandler} />

                  <div className="d-flex justify-content-between align-items-center">
                      <h6>Date :</h6>
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

                       getValue={this.getDatePickerValue}
                       name="date"
                       />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                      <h6>Time :</h6>
                      <MDBTimePicker
                      color="unique"
                      id="timePicker"
                      hours={12}
                      minutes={0}
                      hoursFormat={24}
                      getValue={this.getTimePickerValue}
                      name="time"
                      />

                  </div>
                     </MDBScrollbar>
                  </MDBContainer>
                  <hr/>
                  <div className="d-flex justify-content-center align-items-center">
                    <MDBBtn tag="a"  rounded color="red accent-4" onClick={this.handleSubmit}>
                      <MDBIcon icon="plus" />   CREATE
                    </MDBBtn>
                  </div>



              </MDBModalBody>

            </MDBModal>
          </div >

  );
}
}

const mapStatetoProps = state =>({
  image:state.ChatRoomReducer.image2,
  Name:state.ChatRoomReducer.name,
  userId:state.ChatRoomReducer.userId,
  room:state.ChatRoomReducer.room,
  token:state.ChatRoomReducer.token

})


export default connect(mapStatetoProps,null)(CreateEvent);

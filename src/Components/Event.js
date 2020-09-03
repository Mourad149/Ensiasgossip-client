import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn, MDBIcon, MDBCardTitle,MDBAvatar,ToastContainer } from 'mdbreact';
import {connect} from "react-redux"
import './Event.css'
import io from 'socket.io-client'
let socket;
const ENDPOINT = '/Event';
class Event extends Component {
  state={
    participants:this.props.participants || [],
    team1:this.props.team1.participants,
    team2:this.props.team2.participants
  }
  componentDidMount(){
    socket = io(ENDPOINT, {
     reconnection: true,
     reconnectionDelay: 1000,
     reconnectionDelayMax : 5000,
     reconnectionAttempts: 99999
 });

    socket.emit('joinEvent', {room:this.props.room}, (error) => {
      if(error) {
        alert(error);
      }
    });
  }
  onParticipate=()=>{
      socket.emit('Participate',{userId:this.props.userId,userName:this.props.userName, eventId:this.props.id,image:this.props.image},()=>{
        const participants=this.state.participants
        participants.push({userId:this.props.userId,userName:this.props.userName,userImage:this.props.image})
        this.setState({
          participants:participants
        })
      })
  }
  onSportParticipate1=()=>{
      socket.emit('SportParticipate1',{userId:this.props.userId,userName:this.props.userName, eventId:this.props.id,image:this.props.image},()=>{
        const participants=this.state.team1
        participants.push({userId:this.props.userId,userName:this.props.userName,userImage:this.props.image})
        this.setState({
          team1:participants
        })
      })
  }
  onSportParticipate2=()=>{
      socket.emit('SportParticipate2',{userId:this.props.userId,userName:this.props.userName, eventId:this.props.id,image:this.props.image},()=>{
        const participants=this.state.team2
        participants.push({userId:this.props.userId,userName:this.props.userName,userImage:this.props.image})
        this.setState({
          team2:participants
        })
      })
  }
  render() {
    return (
      <MDBContainer>

            <section>
              <MDBCard style={{ backgroundImage: `url(${this.props.background})` }}>
                <div className="text-white text-center d-flex  flex-column align-items-center justify-content-center img-gradient-overlay py-5 px-4">
                <div className="d-flex  justify-content-center align-items-center mb-2">
                    <MDBAvatar
                      tag="img"
                      src={this.props.profilImage}
                      alt="avatar"
                      circle
                      className="z-depth-3"
                      style={{maxHeight:"5rem",width:"5rem",height:"5rem",maxWidth:"5rem"}}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <h6>{this.props.userName}</h6>
                    <h4 className="orange-text"><MDBIcon  icon={this.props.icone} /> <strong>{this.props.type}</strong></h4>
                    <MDBCardTitle tag="h3" className="pt-2"><strong>{this.props.name}</strong></MDBCardTitle>
                    {this.props.type==="SPORT"
                      ?
                      <div className="d-flex flex-row justify-content-between " style={{width:"15rem",maxWidth:"15rem"}}>
                        <div className="d-flex flex-column justify-content-center align-items-center align-self-start">
                          <MDBIcon size="2x" icon="shield-alt" />
                          <h5>{this.props.team1.name}</h5>
                          {
                            this.state.team1.find(participant=>participant.userId===this.props.userId)===undefined
                            ?
                            <MDBBtn floating className="amber darken-3" onClick={this.onSportParticipate1}><MDBIcon icon="plus" /></MDBBtn>
                            :
                            <MDBBtn floating className="red accent-3" ><MDBIcon icon="check-circle" /></MDBBtn>

                          }
                          <div className="d-flex flex-column align-items-start">
                            {this.state.team1.map((participant,index)=>
                              (  <div className="d-flex flex-row  justify-content-center align-items-center">
                                  <MDBAvatar
                                    tag="img"
                                    src={participant.userImage}
                                    alt="avatar"
                                    circle
                                    className="z-depth-3"
                                    style={{maxHeight:"1.5rem",width:"1.5rem",height:"1.5rem",maxWidth:"1.5rem"}}
                                  />
                                    <p style={{fontSize:"0.65em",color:"white"}} >{participant.userName}</p>
                               </div>)
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center align-self-start">
                          <MDBIcon size="2x" icon="shield-alt" />
                          <h5>{this.props.team2.name}</h5>
                          {
                            this.state.team2.find(participant=>participant.userId===this.props.userId)===undefined
                            ?
                            <MDBBtn floating className="amber darken-3" onClick={this.onSportParticipate2}><MDBIcon icon="plus" /></MDBBtn>
                            :
                            <MDBBtn floating className="red accent-3" ><MDBIcon icon="check-circle" /></MDBBtn>

                          }
                          <div className="d-flex flex-column align-items-start">
                            {this.state.team2.map((participant,index)=>
                                (
                                  <div className="d-flex flex-row  justify-content-center align-items-center">
                                  <MDBAvatar
                                    tag="img"
                                    src={participant.userImage}
                                    alt="avatar"
                                    circle
                                    className="z-depth-3"
                                    style={{maxHeight:"1.5rem",width:"1.5rem",height:"1.5rem",maxWidth:"1.5rem"}}
                                  />
                                    <p style={{fontSize:"0.65em",color:"white"}} >{participant.userName}</p>
                               </div>
                             )
                           )}
                          </div>
                        </div>
                    </div>
                      :
                      null
                    }
                    <p>{this.props.description}</p>
                    <h3>{this.props.date.slice(0,10)}</h3>
                    <h4>{this.props.time}</h4>
                    <h4><MDBIcon icon="map-marker-alt" /> {this.props.place}</h4>
                    {this.state.type!=="SPORT"
                    ?
                    <div>
                    <h6>Are participating :</h6>
                    <div >
                    {this.state.participants.map((participant,index)=>(
                      <div key={participant.userId} className="d-flex flex-row  justify-content-center align-items-center">
                        <MDBAvatar
                          tag="img"
                          src={participant.userImage}
                          alt="avatar"
                          circle
                          className="z-depth-3"
                          style={{maxHeight:"1.5rem",width:"1.5rem",height:"1.5rem",maxWidth:"1.5rem"}}
                        />
                          <p style={{fontSize:"0.65em",color:"white"}} >{participant.userName}</p>
                     </div>
                   ))}
                   </div>
                   </div>

                      :
                    null
                  }

                    {this.props.type!=="SPORT"
                        ?
                          this.state.participants.find(participant=>participant.userId===this.props.userId)===undefined
                            ?
                            <MDBBtn className="rounded-pill amber darken-3" onClick={this.onParticipate}><MDBIcon icon="plus" className="mr-3" />Participate</MDBBtn>
                            :
                            <MDBBtn className="rounded-pill red accent-3" ><MDBIcon icon="check-circle" className="mr-3" />You are participating</MDBBtn>
                        :
                        null
                      }
                  </div>
                </div>
              </MDBCard>
            </section>

      </MDBContainer>

    );
  };
}

const mapStatetoProps = state =>({

  room:state.ChatRoomReducer.room,
  userName:state.ChatRoomReducer.name,
  image:state.ChatRoomReducer.image2,
  userId:state.ChatRoomReducer.userId,
  token:state.ChatRoomReducer.token,
})


export default connect(mapStatetoProps,null)(Event);

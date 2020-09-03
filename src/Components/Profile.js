import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux'
import { MDBCard, MDBCardBody, MDBCardUp, MDBAvatar, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import Notifications from "./Notifications"
import image from "../assets/royal.jpg"
const  Profile=(props)=> {

   return (
    <MDBCard testimonial  className="m-auto "  style={props.cardStyle}>

          <MDBAvatar className='mx-auto'>
            <img
              src={props.image}
              alt=''
              className="img-fluid"
              style={props.avatarStyle}
            />
          </MDBAvatar>
          <MDBCardBody>
            <h4 className='card-title'>{props.name}</h4>
            <hr />
            {props.notif===true
              ?
              <Notifications/>
            :
            null}

          </MDBCardBody>
        </MDBCard>

  )}



export default Profile;

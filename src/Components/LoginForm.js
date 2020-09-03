import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModalFooter,
  toast,
} from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
class LoginForm extends Component {
  state = {
    email: '',
    pass1: '',
    room: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  roomAndNameSetter = (filiere, niveau) => {
    let room;
    if (niveau === '1 ere') {
      room = '1';
    }
    if (niveau === '2 eme') {
      switch (filiere) {
        case 'IWIM':
          room = '2';
          break;
        case 'GL':
          room = '3';
          break;
        case 'BI':
          room = '4';
          break;
        case 'ISEM':
          room = '5';
          break;
        case 'SSI':
          room = '6';
          break;
        case '2IA':
          room = '7';
          break;
        case 'IDF':
          room = '8';
          break;
        case 'IEL':
          room = '9';
          break;
        default:
      }
    }
    if (niveau === '3 eme') {
      switch (filiere) {
        case 'IWIM':
          room = '10';
          break;
        case 'GL':
          room = '11';
          break;
        case 'BI':
          room = '12';
          break;
        case 'ISEM':
          room = '13';
          break;
        case 'SSI':
          room = '14';
          break;
        case '2IA':
          room = '15';
          break;
        case 'IDF':
          room = '16';
          break;
        case 'IEL':
          room = '17';
          break;
        default:
      }
    }
    this.setState({
      room: room,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:5000/login',
      headers: {
        crossDomain: true, //For cors errors
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      credentials: 'same-origin',
      data: {
        email: this.state.email,
        pass1: this.state.pass1,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === 1) {
          this.props.setToastType('error');
          toast(
            <p style={{ fontSize: '0.8em' }} className="text-white text-center">
              {' '}
              <MDBIcon far icon="times-circle" /> Your account is down please
              contact administration !
            </p>,
            {
              closeButton: false,
            }
          );
        } else {
          this.props.setToastType('success');
          toast(
            <p style={{ fontSize: '0.8em' }} className="text-white">
              {' '}
              <MDBIcon far icon="check-circle" /> Logged in successfuly ! <br />{' '}
              please wait while loading data{' '}
              <MDBIcon far icon="grin-beam-sweat" /> .{' '}
            </p>,
            {
              closeButton: false,
            }
          );
          this.props.setToken(res.data.token);
          this.roomAndNameSetter(
            res.data.filiere,
            res.data.niveau,
            res.data.name
          );
          this.props.init(
            this.state.room,
            res.data.name,
            res.data.filiere,
            res.data.niveau,
            res.data.gender,
            res.data.date,
            res.data.phone,
            res.data.email,
            res.data.status
          );
          this.props.setImage(res.data.image);
          this.props.setId(res.data.userId);
          this.props.setLikedPosts(res.data.likedPosts);
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.setToastType('error');
        toast(
          <p style={{ fontSize: '0.8em' }} className="text-white text-center">
            {' '}
            <MDBIcon far icon="times-circle" /> Email or password incorrect !
          </p>,
          {
            closeButton: false,
          }
        );
      });
  };
  render() {
    return (
      <MDBCard>
        <MDBCardBody className="mx-1">
          <div className="text-center">
            <h3 className="dark-grey-text mb-5">
              <strong>Sign in</strong>
            </h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <MDBInput
              label="Enter email"
              group
              type="email"
              validate
              error="wrong"
              name="email"
              onChange={this.handleInputChange}
            />
            <MDBInput
              label="Type your password"
              group
              type="password"
              validate
              name="pass1"
              containerClass="mb-0"
              onChange={this.handleInputChange}
            />

            <div className="text-center mb-3">
              <MDBBtn
                type="submit"
                rounded
                className="btn-block z-depth-1a"
                color="red accent-4"
              >
                Join
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
        <MDBModalFooter className="mx-5 pt-3 mb-1">
          <p className="font-small grey-text d-flex justify-content-end">
            Not a member?
            <a
              href="#signup"
              onClick={this.props.switchForm}
              className="blue-text ml-1"
            >
              Sign Up
            </a>
          </p>
        </MDBModalFooter>
      </MDBCard>
    );
  }
}
const mapStatetoProps = (state) => ({
  Room: state.ChatRoomReducer.room,
  Name: state.ChatRoomReducer.name,
  status: state.Reducer.status,
  image: state.ChatRoomReducer.image2,
  toastType: state.Reducer.toastType,
});
const mapDispatchtoProps = (dispatch) => ({
  switchForm: () => dispatch({ type: 'SWITCHFORM' }),
  init: async (
    room,
    name,
    filiere,
    niveau,
    gender,
    date,
    phone,
    email,
    status
  ) =>
    await dispatch({
      type: 'INIT',
      room: room,
      name: name,
      filiere: filiere,
      niveau: niveau,
      gender: gender,
      date: date,
      phone: phone,
      email: email,
      status: status,
    }),
  messages: (messages) => dispatch({ type: 'MESSAGES', messages: messages }),
  setImage: (im) => dispatch({ type: 'IMAGE', image: im }),
  setPosts: (posts) => dispatch({ type: 'POSTS', posts: posts }),
  setId: (userId) => dispatch({ type: 'SETID', userId: userId }),
  setLikedPosts: (likedPosts) =>
    dispatch({ type: 'SETLIKEDPOSTS', likedPosts: likedPosts }),
  setToastType: (toastType) =>
    dispatch({ type: 'TOAST', toastType: toastType }),
  setToken: (token) => dispatch({ type: 'TOKEN', token: token }),
});
export default connect(mapStatetoProps, mapDispatchtoProps)(LoginForm);

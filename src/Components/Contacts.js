import React, { useState, useEffect, useRef } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBAvatar,
  MDBBadge,
  MDBIcon,
  MDBInput,
  MDBBtnGroup,
  MDBPopover,
  MDBFileInput,
  MDBCardImage,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBContainer,
  MDBBtn,
  MDBScrollbar,
  MDBAnimation,
} from 'mdbreact';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import queryString from 'query-string';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import * as Scroll from 'react-scroll';
import Resizer from 'react-image-file-resizer';
import './Contacts.css';
import { Link } from 'react-router-dom';
let socket;

const Contacts = ({
  switchStatus,
  Room,
  Name,
  Messages,
  volumeMess,
  image,
  status,
  userId,
  setMessageCounter,
  setVolumeMessages,
  counter,
  setMessageCounterToZero,
  token,
}) => {
  const [name, setName] = useState(Name);
  const [room, setRoom] = useState(Room);
  const [avatar, setAvatar] = useState(image);
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState();
  const [skip, setSkip] = useState(0);
  const [msgImage, setMsgImage] = useState('');
  const [volume, setVolume] = useState(volumeMess);

  const ENDPOINT = '/N';
  const myref = useRef();
  const mySecRefer = useRef();

  let audio = new Audio('../assets/that-was-quick.mp3');

  useEffect(() => {
    myref.current.scrollIntoView({ block: 'end', inline: 'nearest' });
  }, [messages]);

  useEffect(() => {
    axios
      .get(`/getMessages/${skip}/${Room}`, {
        headers: {
          crossDomain: true, //For cors errors
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((result) => {
        setMessages((prevMessages) => {
          if (prevMessages && prevMessages !== result.data) {
            return prevMessages.concat(result.data);
          } else {
            return result.data;
          }
        });
      });
  }, [skip]);

  useEffect(() => {
    socket = io(ENDPOINT, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999,
    });

    socket.emit('join', { Name, Room, image }, (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on('message', (message) => {
      setMessages((prevState) => [message, ...prevState]);

      if (message.userId !== userId) {
        setMessageCounter();
        if (volumeMess === true) {
          playAudio();
        }
      }
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
    return () => socket.close();
  }, [volumeMess]);
  const playAudio = () => {
    document.getElementById('audio').play();
  };
  const onScroll = (e) => {
    const scrollY = window.scrollY;
    const scrollTop = mySecRefer.current.scrollTop;
    const scrollHeight = mySecRefer.current.scrollHeight;
    const offsetHeight = mySecRefer.current.offsetHeight;
    const clientHeight = mySecRefer.current.clientHeight;

    if (scrollHeight - scrollTop >= scrollHeight) {
      setSkip(messages.length);
    }
  };
  const sendMessage = () => {
    if (message) {
      socket.emit(
        'sendMessage',
        { message, userId, msgImage, Room, Name, image },
        () => {
          setMessage('');
          setMsgImage('');
        }
      );
    }
  };
  const addEmoji = (e) => {
    let emoji = e.native;
    setMessage(message + emoji);
  };
  const onImageChange = (value) => {
    Resizer.imageFileResizer(value[0], 200, 200, 'JPEG', 100, 0, (uri) => {
      setMsgImage(uri);
    });
  };
  return (
    <MDBCard
      className="grey lighten-3 chat-room mr-auto "
      style={{ height: '35rem', width: '25rem' }}
    >
      <MDBCardBody>
        <MDBRow>
          <MDBCol lg="12">
            <MDBRow
              style={{ height: '2.5rem' }}
              className="d-flex justify-content-center "
            >
              <MDBBtn
                onClick={() => switchStatus()}
                size={status === false ? 'sm' : null}
                color={status === false ? 'white' : 'red accent-4'}
                outline
                rounded
              >
                <MDBIcon icon="users" size="lg" />
              </MDBBtn>
              <MDBBtn
                size={status === false ? null : 'sm'}
                color={status === false ? 'red accent-4' : 'white'}
                outline
                rounded
                onClick={() => switchStatus()}
              >
                <MDBIcon fab size="lg" icon="facebook-messenger" />
                {counter !== 0 ? (
                  <MDBBadge pill color="amber darken-3">
                    {counter}
                  </MDBBadge>
                ) : null}
              </MDBBtn>
              {volumeMess === true ? (
                <MDBBtn
                  floating
                  size="sm"
                  color="amber darken-4"
                  onClick={() => {
                    setVolumeMessages(false);
                  }}
                >
                  <MDBIcon icon="volume-up" />
                </MDBBtn>
              ) : (
                <MDBBtn
                  floating
                  size="sm"
                  color="red accent-4"
                  onClick={() => {
                    setVolumeMessages(true);
                  }}
                >
                  <MDBIcon icon="volume-off" />
                </MDBBtn>
              )}
            </MDBRow>
            <hr />
            <div
              className="scrollable-chat"
              style={{ height: '25rem', overflowY: 'scroll' }}
              onScroll={(e) => onScroll()}
              ref={mySecRefer}
            >
              <MDBListGroup className="list-unstyled pl-3 pr-3">
                {messages !== undefined
                  ? messages
                      .slice(0)
                      .reverse()
                      .map((message) => (
                        <MDBAnimation type="slideInDown" duration="300ms">
                          <ChatMessage
                            userId={userId}
                            senderId={message.userId}
                            key={message.author + message.when}
                            user={message.user}
                            message={message.text}
                            name={name}
                            room={message.room}
                            Room={Room}
                            msgImage={message.msgImage}
                            Image={message.image}
                          />
                        </MDBAnimation>
                      ))
                  : null}

                <div style={{ float: 'left', clear: 'both' }} ref={myref}></div>
              </MDBListGroup>
            </div>
            <div className="form-group basic-textarea d-flex justify-content-center align-items-center">
              <textarea
                value={message}
                onClick={() => setMessageCounterToZero()}
                onChange={(event) => {
                  setMessageCounterToZero();
                  setMessage(event.target.value);
                }}
                style={{ width: '14rem', height: '3rem' }}
                className="form-control pl-2 my-0"
                id="exampleFormControlTextarea2"
                rows="1"
                placeholder="your message.."
                onKeyPress={(e) => {
                  if (e.key == 'Enter') {
                    sendMessage();
                  }
                }}
              />

              <div className="d-flex flex-row align-items-center">
                <MDBPopover placement="top" popover clickable id="popper1">
                  <MDBBtn floating size="sm" color="amber darken-3">
                    <MDBIcon icon="camera" />
                  </MDBBtn>
                  <MDBPopoverBody>
                    <MDBFileInput
                      type="file"
                      name="myImage"
                      textFieldTitle="Upload image"
                      getValue={(value) => onImageChange(value)}
                      btnColor="amber darken-4"
                      btnTitle="CHOOSE IMAGE"
                    />
                  </MDBPopoverBody>
                </MDBPopover>
                <MDBPopover placement="top" popover clickable id="popper1">
                  <MDBBtn floating size="sm" color="amber darken-3">
                    <MDBIcon far size="2x" icon="grin" />
                  </MDBBtn>
                  <MDBPopoverBody>
                    <Picker
                      style={{ maxWidth: '15rem' }}
                      onSelect={(e) => addEmoji(e)}
                    />
                  </MDBPopoverBody>
                </MDBPopover>
                <MDBBtn
                  onClick={(event) => sendMessage()}
                  floating
                  color="red accent-4"
                >
                  <MDBIcon icon="paper-plane" />
                </MDBBtn>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
};

const ChatMessage = ({
  message,
  name,
  user,
  room,
  Room,
  Image,
  msgImage,
  senderId,
  userId,
}) => {
  let isSentByUser = false;
  const data = Image;
  if (senderId === userId) {
    isSentByUser = true;
  }

  return isSentByUser ? (
    room === Room ? (
      <li className="chat-message d-flex justify-content-between mb-1  ml-1">
        <MDBCard
          style={{
            marginTop: '15px',
            borderBottomLeftRadius: '28px',
            borderTopLeftRadius: '28px',
            borderBottomRightRadius: '28px',
          }}
        >
          <MDBCardBody style={{ width: '18rem' }}>
            <div style={{ fontSize: '0.7em' }}>
              <strong className="primary-font">{user}</strong>
            </div>
            <p className="mb-0" style={{ fontSize: '0.75em' }}>
              {message}
            </p>
            {msgImage !== '' ? (
              <MDBCardImage top src={msgImage} alt="" />
            ) : null}
          </MDBCardBody>
        </MDBCard>
        <Link to={{ pathname: `/profil/${senderId}` }}>
          <MDBAvatar
            tag="img"
            src={`${data}`}
            alt="avatar"
            circle
            className="z-depth-1"
            style={{
              width: '2rem',
              height: '2rem',
              maxWidth: '2rem',
              maxHeight: '2rem',
            }}
          />
        </Link>
      </li>
    ) : null
  ) : room === Room ? (
    <li className="chat-message d-flex justify-content-between mb-1 mr-1">
      <Link to={{ pathname: `/profil/${senderId}` }}>
        <MDBAvatar
          tag="img"
          src={`${data}`}
          alt="avatar"
          circle
          className="z-depth-1"
          style={{
            width: '2rem',
            height: '2rem',
            maxWidth: '2rem',
            maxHeight: '2rem',
          }}
        />
      </Link>
      <MDBCard
        style={{
          marginTop: '15px',
          backgroundColor: '#D0322D',
          borderBottomLeftRadius: '28px',
          borderTopRightRadius: '28px',
          borderBottomRightRadius: '28px',
        }}
      >
        <MDBCardBody style={{ width: '18rem' }}>
          <div className="d-flex algn-self-start">
            <strong
              className="primary-font"
              style={{ color: 'white', fontSize: '0.7em' }}
            >
              {user}
            </strong>
          </div>
          <p className="mb-0" style={{ fontSize: '0.75em', color: 'white' }}>
            {message}
          </p>
          {msgImage !== '' ? <MDBCardImage top src={msgImage} alt="" /> : null}
        </MDBCardBody>
      </MDBCard>
    </li>
  ) : null;
};
const mapStatetoProps = (state) => ({
  volumeMess: state.ChatRoomReducer.volumeMess,
  Room: state.ChatRoomReducer.room,
  Name: state.ChatRoomReducer.name,
  status: state.Reducer.status,
  image: state.ChatRoomReducer.image2,
  userId: state.ChatRoomReducer.userId,
  counter: state.ChatRoomReducer.counter,
  token: state.ChatRoomReducer.token,
});
const mapDispatchtoProps = (dispatch) => ({
  switchStatus: () => dispatch({ type: 'SWITCH' }),
  setMessageCounter: () => dispatch({ type: 'COUNTER' }),
  setMessageCounterToZero: () => dispatch({ type: 'TOZERO' }),
  setVolumeMessages: (volum) => dispatch({ type: 'VOLUMEMESS', volume: volum }),
});
export default connect(mapStatetoProps, mapDispatchtoProps)(Contacts);

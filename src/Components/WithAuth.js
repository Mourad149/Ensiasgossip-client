import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoadingNewContainer from '../Containers/LoadingNewContainer'
import axios from "axios"
 export default function withAuth(ComponentToProtect,token) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      axios.get('/checkToken',{
        headers: {
            'crossDomain': true,  //For cors errors
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return <LoadingNewContainer/>
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}

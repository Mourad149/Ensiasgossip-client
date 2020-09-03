import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import Home from './Home'
import NewsFeed from './NewsFeed'
import UserProfil from './UserProfil'
import SearchResults from './SearchResults'
import Edit from './Edit'
import AboutUs from './AboutUs'
import withAuth from '../Components/WithAuth';
import {connect} from 'react-redux'




class Routes extends Component{
  render(){
    return(
      <div>
      <Route
             exact
             path="/"
             component={this.props.userId===""?Home:NewsFeed}
          />
        <Route
                 exact
                 path="/NewsFeed"
                 component={withAuth(NewsFeed,this.props.token)}
            />
        <Route
                exact
               path="/profil/:id"
               component={withAuth(UserProfil,this.props.token)}
          />
          <Route
                  exact
                 path="/profil/:search/:within"
                 component={withAuth(UserProfil,this.props.token)}
            />
          <Route
                 exact
                 path="/search/:search/:within"
                 component={withAuth(SearchResults,this.props.token)}
            />
            <Route
                    exact
                   path="/post/:id"
                   component={withAuth(SearchResults,this.props.token)}
              />
          <Route
                   exact
                   path="/EditProfil"
                   component={withAuth(Edit,this.props.token)}
              />
              <Route
                       exact
                       path="/AboutUs"
                       component={withAuth(AboutUs,this.props.token)}
                  />
      </div>
    )
  }
}
const mapStatetoProps = state =>({
  token:state.ChatRoomReducer.token,
  userId:state.ChatRoomReducer.userId
})

export default connect(mapStatetoProps,null)(Routes)

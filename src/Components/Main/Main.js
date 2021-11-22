import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Layouts/Home';
import Login from '../User/Login';
import Teams from '../Teams/Teams';
import Team from '../Teams/Team';
import Matches from '../Matches/Matches';
import Match from '../Matches/Match';
import Courts from '../Courts/Courts';
import Profile from '../User/Profile'
import Messages from '../Messages/Messages'
import MessagesNL from '../Messages/MessagesNL'


const Main = () => (
  
  <Switch>
    <Route exact path='/' render={()=>( (<Home />) )}/>
    <Route exact path='/login' render={()=>(
      (localStorage.getItem("email")!=null) ? (<Redirect to='/' />) : (<Login />))}/>
    <Route exact path='/Consultas' render={()=>(
      (localStorage.getItem("email")!=null) ? (<Teams/>) : (<Login />))}/>
    <Route exact path='/Citas' render={()=>(
      (localStorage.getItem("email")!=null) ? (<Matches/>) : (<Login />))}/>
    <Route exact path='/Sedes' component={Courts}/>
    <Route exact path='/perfil' render={()=>(
      (localStorage.getItem("email")!=null) ? (<Profile/>) : (<Login />))}/>
    <Route exact path='/mensajeNL' component={MessagesNL}/> 
    
  </Switch>
)



export default Main

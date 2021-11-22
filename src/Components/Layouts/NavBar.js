import React, { Component } from 'react';
import {bindActionCreators} from 'redux';

import logoimg from "../../hospital_logo.png";
import {Button, NavItem, Navbar} from 'react-materialize';
import M from 'materialize-css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

const history = require("history");

var logo = <a className="brand-logo" href="#"><img style={{width: "30pt", marginRight: "4pt"}} src={logoimg} alt="logo"/>Orenji</a>

export default class NavBar extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  constructor(props){
    super();
    this.logout = this.logout.bind(this);
    this.userBar = this.userBar.bind(this);
  }
  
  logout (event) {
    localStorage.clear();
    window.location.reload();
  }

  login = (evt) => {
    this.props.history.push("/login");
  }

  userBar = () =>{
    if(localStorage.getItem("email")!=null){
      return (
        <Navbar brand={logo} fixed='true' alignLinks="right" className='blue' sidenav={null}>
          <NavItem href='/Perfil' className='blue'>Perfil</NavItem>
          <NavItem href='/Citas' className='blue'>Mis Citas</NavItem>
          <NavItem href='/Consultas' className='blue'>Nueva Cita</NavItem>
          <NavItem href='/Sedes' className='blue'>Sedes</NavItem>
          <Button className="waves-effect findbtn" onClick={this.logout} >Cerrar Sesión</Button>
          <NavItem href='' className='blue'></NavItem>
        </Navbar>
      )
    }
    else{
      return( 
        <Navbar brand={logo} fixed='true' alignLinks="right" className='blue' sidenav={null}>
          <Button className="waves-effect findbtn" href='/Login' onClick={this.props.history.push("/login")} >Iniciar Sesión</Button>
          <NavItem href='' className='blue'></NavItem>
        </Navbar>
      )
    }
  }

  render () {
    if(localStorage.getItem("email")!=null){
      return (
        <Navbar brand={logo} fixed='true' alignLinks="right" className='blue' sidenav={null}>
          <NavItem href='/Perfil' className='blue'>Perfil</NavItem>
          <NavItem href='/Citas' className='blue'>Mis Citas</NavItem>
          <NavItem href='/Consultas' className='blue'>Nueva Cita</NavItem>
          <NavItem href='/Sedes' className='blue'>Sedes</NavItem>
          <NavItem href='/Mensajes' className='blue'>Mensajes</NavItem>
          <Button className="waves-effect findbtn" onClick={this.logout} >Cerrar Sesión</Button>
          <NavItem href='' className='blue'></NavItem>
        </Navbar>
      )
    }
    else{
      return( 
        <Navbar brand={logo} fixed='true' alignLinks="right" className='blue' sidenav={null}>
          <NavItem href='/Sedes' className='blue'>Sedes</NavItem>
          <NavItem href='/login' className='blue'>Iniciar sesión</NavItem>
          <NavItem href='' className='blue'></NavItem>
        </Navbar>
      )
    }
  }

}

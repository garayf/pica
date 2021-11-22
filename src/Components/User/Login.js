import React, { Component , PropTypes } from "react";
import { Link } from 'react-router-dom'
import {Row, Col, Button, Card, Toast, MediaBox } from 'react-materialize'
import logoimg from "../../hospital_logo.png";
import M from 'materialize-css';
import queryString from 'querystring';
import axios from 'axios';

const history = require("history");

class Login extends Component {
  dataToken = {
      "grant_type": "client_credentials",         
      "scope": "openid",
      "client_id": "spring-gateway-application",
      "client_secret": "b8465b7d-2284-4c95-b1f3-fca43c93d31d"
      };

  constructor(props,context) {
    super(props,context);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  componentDidMount() {
    M.AutoInit();
  }

  handleSubmit = event => {
      axios({
          method: 'post',
          url: 'http://10.43.100.173:3003/auth/realms/Appointment-realm/protocol/openid-connect/token',
          data: queryString.stringify(this.dataToken),
          config: {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }  
      }).then((response)=>{
          
          let config = {
              method: 'get',
              url: 'http://10.43.100.172:3101/affiliate/authentication?user='+this.state.email+'&password='+this.state.password,
              headers: {
                  'Authorization': 'Bearer '+response.data.access_token,
                  'Content-Type': 'application/json'
              }
          };
          axios(config).then((response)=> {
              if(response.data["Error"] != undefined && response.data["Error"] != null){
                console.log(JSON.stringify(response.data["Error"]));
                M.toast({html: response.data["Error"]});
              } else{
                localStorage.clear();
                console.log("LOCALSTORAGE0: "+localStorage.getItem("email"));
                console.log(JSON.stringify(response.data));
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("numberId", response.data.numberId);
                localStorage.setItem("typeId", response.data.typeId);    
                window.location.reload();
              }
          }).catch(function (error) {
              console.log(error);
          });
      }).catch(function (error) {
          console.log(error.data.error);
      });
  }

  render() {
    return (
      <Row>
        <Col m={4} className='grid-example'></Col>
        <Col m={4} className='center-align'>
          <img src={logoimg} width="80"/>
          <h5>Ingresa a Orenji!</h5>
          <Card className='center-align'
            actions={[<Button className = "waves-effect waves-light btn findbtn" onClick={this.handleSubmit}>Sign in</Button>]}>
            <Row>
                <input placeholder="Enter Email"
                  id="email"
                  type='email'
                  onChange={this.handleChange}
                  value={this.state.email}
                  className="form-control"
                  required/>

                <label htmlFor="psw">Contraseña</label>
                <input placeholder="Enter password"
                    id="password"
                    type='password'
                    onChange={this.handleChange}
                    value={this.state.password}
                    className="form-control"
                    required/>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Login;
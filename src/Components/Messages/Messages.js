import React, { Component } from "react";
import { Link } from 'react-router-dom';
import MessagesS from './MessagesS';
import {Row, Col, Button, Card, CardTitle} from 'react-materialize'
import axios from 'axios';
import * as consts from '../../consts';
var a;

export default class Messages extends Component {
     state = {
    eventos: []
  }
  componentDidMount() {
    console.log(JSON.parse(sessionStorage.user).username)
    axios.post(consts.GRAPHQL_URL, {
    //axios.get(`http://192.168.99.102:4003/message`)
    //,{
      "query":"query{\n  messageByReceptor(username:\""+JSON.parse(sessionStorage.user).username+"\"){\n    user1\n    subject\n    content\n  }\n}","variables":null
    })
 
    .then(res => {
        const eventos = res.data.data.messageByReceptor;
        console.log(res.data.data)        
        this.setState({ eventos });
        //a=JSON.stringify(b)
        console.log(eventos)
        })
    .catch(function (error) {
        console.log(error)
    });
    }
    //<a href="/MensajeNL" class="btn btn-primary green darken-4">Enviados</a>
    render() {
        return (
        <div>
          <Row>
            <Col l={2} m={1} className='grid-example'></Col>
            <Col l={8} m={10} s={12} className='grid-example'>
            <br></br>
              <Card className='' textClassName=''>
                <h4 font ><b>Mensajes recibidos</b></h4>

                
          
                
              </Card> 
              
                <Row>
                <Card className='' textClassName=''> 
                  { this.state.eventos.map(evento =>
                  <div>
                   
                      <Card className='' textClassName=''>
                      <h5>Mensaje de {evento.user1}</h5>
                      <p>{evento.subject}</p>
                      </Card>

                  </div>
                 )}
                   
                </Card>
                </Row>
                <MessagesS />                             
            </Col>
          </Row>
          
        </div>
        )
      }
    }





 
 


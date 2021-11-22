import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Row, Col, Button, Card, CardTitle} from 'react-materialize'

export default class MessagesNL extends Component {
 render() {
    return (
    <div>
    <div>
        <Row>
          <Col l={3} className='grid-example'></Col>
          <Col l={6} className='grid-example'>
            <Card className=''>
                <h4><b>Mensajes</b></h4>
  				      Regístrate como para tener acceso a todos los mensajes y notificaciones de tus citas y consultas.<br/>				
            </Card>
          </Col>
        </Row>
        <div style={{'margin-bottom':'200px'}}>
            <Button floating fab='vertical' faicon='fa fa-plus' className='red' icon='add' large style={{bottom: '45px', right: '24px'}}>
                <Button floating icon='insert_chart' className='red'/>
                <Button floating icon='format_quote' className='yellow darken-1'/>
                <Button floating icon='publish' className='green'/>
                <Button floating icon='attach_file' className='blue'/>
            </Button>
        </div>
    </div>
    </div>
    )
  }
}

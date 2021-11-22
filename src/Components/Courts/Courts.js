import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Row, Col, Button, Card, CardTitle} from 'react-materialize'
import MapContainer from './MapContainer'

const cardStyle = {
  display: 'block',
  width: '50vw',
  transitionDuration: '0.3s',
  height: '40vw'
}

export default class Courts extends Component {
 render() {
    return (
      <div>
        <Row>
          <Col l={3} className='grid-example'></Col>
          <Col l={6} className='grid-example'>
            <Card style={cardStyle}>
              <h4><b>Sedes</b></h4>
  				    <MapContainer />
            </Card>
            
          </Col>
        </Row>
      </div>
    )
  }
}

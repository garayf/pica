import React, { Component } from "react";
import {Row, Col, Button, Card, CardTitle, Collapsible, CollapsibleItem, Table} from 'react-materialize'
import '../../styles/styles.css'

const axios = require('axios');
const defaultimage = require('../../Images/perfil.jpg')

export default class Profile extends Component {

    mainUser = {name: 'Juan Sebastian', lastname: 'Agudelo', typeId: 'CC', numberId: '5249852167', phone: '3015792614', email: 'juan.agudelo@orenji.co'}

    afiliados = [{name: 'Juan Sebastian', lastname: 'Agudelo', typeId: 'CC', numberId: '5249852167', phone: '3015792614', email: 'juan.agudelo@orenji.co'},
        {name: 'Juan Sebastian', lastname: 'Agudelo', typeId: 'CC', numberId: '5249852167', phone: '3015792614', email: 'juan.agudelo@orenji.co'},
        {name: 'Juan Sebastian', lastname: 'Agudelo', typeId: 'CC', numberId: '5249852167', phone: '3015792614', email: 'juan.agudelo@orenji.co'},
        {name: 'Juan Sebastian', lastname: 'Agudelo', typeId: 'CC', numberId: '5249852167', phone: '3015792614', email: 'juan.agudelo@orenji.co'},
        {name: 'Juan Sebastian', lastname: 'Agudelo', typeId: 'CC', numberId: '5249852167', phone: '3015792614', email: 'juan.agudelo@orenji.co'}]


    state = {
        user: {},
        imgprf: null
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div>
                <Row>
                    <Col l={2} m={1} className='grid-example'></Col>
                    <Col l={8} m={10} s={12} className='grid-example'>
                        <Card className="card">
                            <div className="card-content row">
                                <Card className="col s4">
                                    <div className='row' >
                                        <a className={'col'}><img className="circle profile-img" src={require('../../Images/perfil.jpg')}/></a>
                                        <a className={'col'}>
                                            <h5>{this.mainUser.lastname}</h5>
                                            <h6><b>{this.mainUser.name}</b></h6>
                                        </a>
                                    </div>
                                    <p><b>Teléfono: </b> {this.mainUser.phone}</p>
                                    <br/>
                                    <p><b>E-mail: </b> {this.mainUser.email}</p>
                                    <br/>
                                    <p><b>Tipo de Documento: </b>{this.mainUser.typeId}</p>
                                    <br/>
                                    <p><b>Número de Documento: </b>{this.mainUser.numberId}</p>
                                </Card>
                                <div className="matrix-flex">
                                    {this.afiliados.map((row) => (
                                        <Card className="valign-wrapper">
                                            <p className = "row ">
                                                <a className={'col'}><img className="circle profile-img2" src={require('../../Images/perfil.jpg')}/></a>
                                                <p className={'col'}>
                                                    <h6><b>{this.mainUser.lastname}</b> {this.mainUser.name}</h6>
                                                    <p><b>Documento: </b>{this.mainUser.typeId} {this.mainUser.numberId}</p>
                                                </p>
                                            </p>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

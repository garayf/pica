import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { print } from 'graphql';
import axios from 'axios';
import {Row, Col, Card, CardTitle, Collapsible, CollapsibleItem, Table, Button, Icon, Modal} from 'react-materialize'
import M from 'materialize-css';
import queryString from 'querystring';



export default class Matches extends Component {    
        
    state = {
      data: [],
    }

    dataToken = {
        "grant_type": "client_credentials",         
        "scope": "openid",
        "client_id": "spring-gateway-application",
        "client_secret": "b8465b7d-2284-4c95-b1f3-fca43c93d31d"
        };

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.datepicker');
        M.Datepicker.init(elems, {});
        elems = document.querySelectorAll('.timepicker');
        M.Timepicker.init(elems, {});
        elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
        M.AutoInit();

        axios({
            method: 'post',
            url: 'http://10.43.100.173:3003/auth/realms/Appointment-realm/protocol/openid-connect/token',
            data: queryString.stringify(this.dataToken),
            config: {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }  
        }).then((response)=>{
            
            let config = {
                method: 'post',
                url: 'http://10.43.100.172:3101/find/appointment/',
                headers: {
                    'Authorization': 'Bearer '+response.data.access_token,
                    'Content-Type': 'application/json'
                },
                data : JSON.stringify({
                    "patient": {
                        "typeDocument": "CC",
                        "numberDocument": "1111111",
                        "email": "juan@asd.com"
                    },
                    "typeAppointmentSpecialized": false
                    })
            };
            axios(config).then((response)=> {
                this.setState({data: response.data.AppointmentList});
            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleCancel = (cita) => {
        axios({
            method: 'post',
            url: 'http://10.43.100.173:3003/auth/realms/Appointment-realm/protocol/openid-connect/token',
            data: queryString.stringify(this.dataToken),
            config: {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }  
        }).then((response)=>{
            let config = {
                method: 'post',
                url: 'http://10.43.100.172:3101/cancel',
                headers: {
                    'Authorization': 'Bearer '+response.data.access_token,
                    'Content-Type': 'application/json'
                },
                data : JSON.stringify({
                    "idAppointment": cita.appointmentId,
                    "reasonCancelation": "No puedo asistir a la cita",
                    "patient": {
                      "typeDocument": cita.typeDocument,
                      "numberDocument": cita.numberDocument,
                      "email": "juan@asd.com"
                    }})
            }
            axios(config).then((response)=> {
                console.log(JSON.stringify(response));
                config = {
                    method: 'post',
                    url: 'http://10.43.100.172:3101/find/appointment/',
                    headers: {
                        'Authorization': 'Bearer '+response.data.access_token,
                        'Content-Type': 'application/json'
                    },
                    data : JSON.stringify({
                        "patient": {
                            "typeDocument": "CC",
                            "numberDocument": "1111111",
                            "email": "juan@asd.com"
                        },
                        "typeAppointmentSpecialized": false
                        })
                };
                axios(config).then(async(response)=> {
                    window.location.reload(true);
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error) {
                console.log(error);
            });
            
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
    return (
        <div>
        <Row>
        <Col l={2} m={1} className='grid-example'></Col>
        <Col l={8} m={10} s={12} className='grid-example'>
        <Card header={<CardTitle image={require('../../Images/field3.jpg')}></CardTitle>}>
        <Table class="striped">
                    <thead><tr>
                        <th data-field="nameIps">IPS</th>
                        <th data-field="locationName">Sede</th>
                        <th data-field="cubsName">Especialización</th>
                        <th data-field="doctorName">Doctor</th>
                        <th data-field="startDate">Fecha</th>
                    </tr></thead>
                    <tbody>
                    {this.state.data.map((data) => (
                        <tr>
                            <td>{data.nameIps}</td>
                            <td>{data.locationName}</td>
                            <td>{data.cubsName}</td>
                            <td>{data.doctorName}</td>
                            <td>{data.startDate}</td>
                            <td><Modal s={2}
                                actions={[
                                    <Button flat modal="close" node="button" waves="green">Cerrar</Button>,
                                    <Button flat modal="close" node="button" waves="red" className="blue" onClick = {() => this.handleCancel(data)}>Cancelar</Button>
                                ]}
                                bottomSheet={false}
                                fixedFooter={false}
                                id="Modal-10"
                                open={false}
                                options={{
                                    dismissible: true,
                                    endingTop: '10%',
                                    inDuration: 250,
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    opacity: 0.5,
                                    outDuration: 250,
                                    preventScrolling: true,
                                    startingTop: '4%'
                                }}
                                trigger={<Button floating icon={<Icon>add</Icon>} small node="button"/>}
                            >
                                <div className="container">
                            <h4><b>Consultas</b></h4>
                                <div className="section">
                                    <h5>Datos Personales</h5>
                                    <div className="col">
                                        <div className="row s12 less-margin">
                                            <p className="col s6 less-margin"><b>Tipo de Documento: </b> {data.typeDocument}</p>
                                            <p className="col s6 less-margin"><b>Número de Documento: </b> {data.numberDocument}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"/>
                                <div className="section">
                                    <h5>Datos de la Cita</h5>
                                    <div className="col">
                                        <div className="row s12">
                                            <p className="col s6 less-margin"><b>IPS: </b> {data.nameIps}</p>
                                            <p className="col s6 less-margin"><b>Sede: </b> {data.locationName}</p>
                                        </div>
                                        <div className="row s12">
                                            <p className="col s6 less-margin"><b>Médico: </b> {data.doctorName}</p>
                                            <p className="col s6 less-margin"><b>Especialización: </b> {data.cubsName}</p>
                                        </div>
                                        <div className="row s12 less-margin">
                                            <p className="col s6 less-margin"><b>Especialización: </b> {data.cubsName}</p>
                                            <p className="col s6 less-margin"><b>Fecha: </b> {data.startDate}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Modal></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
          </Card>
          </Col>
        </Row>
        </div>
    )
  }
}
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Create from './Create';
import {Row, Col, Toast, Card, DatePicker, TextInput, Select, TimePicker} from 'react-materialize';
import M from 'materialize-css';
import queryString from 'querystring';
import ReactDOM from 'react-dom';

const history = require("history");


export default class Teams extends Component {
    state = {
        citas: [],
        id: 0
    }

    IPS=[
        {id: 0, nombre: "Unidad Médica Santa Fe", sedes: ["Calle 122", "Calle 127", "Calle 95", "Av. Américas", "Kennedy 1", "Kennedy 2"], especializacion: ["Medicina General", "Cita Prioritaria", "Oncología", "Pediatría", "Nutrición", "Dermatología"]},
        {id: 1, nombre: "Óptica Colombiana SAS", sedes: ["Éxito Calle 80", "C.C Andino", "C.C Gran Estación", "C.C Bulevar Niza", "C.C Palatino", "C.C Parque la Colina"], especializacion: ["Optometría", "Adaptación Lentes de Contacto", "Otro"]},
        {id: 2, nombre: "Clínica Colsanitas", sedes: ["Clínica Reina Sofía", "Clínica Pediátrica", "Clínica Universitaria Colombia", "Clínica Infantil Santa María", "Clínica Sebastián de Belalcázar", "Clínica Iberoamericana"], especializacion: ["Psiquiatría", "Medicina Interna", "Medicina General", "Ginecología", "Pediatría", "Planificación Familiar", "Podología"]},
        {id: 3, nombre: "Organización Santa Lucía SA", sedes: ["C.C Gran Estación", "C.C Nuestro Bogotá", "C.C Titán Plaza"], especializacion: ["Optometría", "Lentes de contacto", "Anteojos", "Otros Servicios"]},
        {id: 4, nombre: "Colmédica", sedes: ["Belaire", "Bulevar Niza", "Calle 185", "Cedritos", "Chapinero", "Colina Campestre", "Country Park", "Metrópolis", "Plaza Central", "Salitre Plaza", "Suba", "Unicentro de Occidente"], especializacion: ["Fonoaudiología", "Neurología", "Cardiología","Medicina Interna", "Nutriología","Medicina General","Genética","Pediatría","Podología"]},
        {id: 5, nombre: "BlueCare SAS", sedes: ["Centro Médico Chicó", "Centro Médico Castellana", "Centro Médico Palermo", "Centro Médico Santa Bárbara"], especializacion: ["Anestesiología", "Cardiología", "Neumología", "Geriatría", "Endocrinología", "Gatroenterología"]}
    ]

    medicos = ["Luisa Mota", "Sandra Castro","Eva Louis","Carlos Urrutia","Nicolás Pérez","Juan Pablo Castañeda", "Andrea Leguízamo"]

    dataToken = {
        "grant_type": "client_credentials",         
        "scope": "openid",
        "client_id": "spring-gateway-application",
        "client_secret": "b8465b7d-2284-4c95-b1f3-fca43c93d31d"
        };
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleTipoDoc = (evt) => {
        this.setState({tipoDoc: evt.target.value});
    }

    handleNumDoc = (evt) => {
        this.setState({numDoc: evt.target.value});
    }

    handleEmail = (evt) => {
        this.setState({email: evt.target.value});
    }

    handleIPS = (evt) => {
        this.setState({id: evt.target.value, ips: this.IPS[evt.target.value].nombre});
    }

    handleSede = (evt) => {
        this.setState({sede: evt.target.value});
    }

    handleEsp = (evt) => {
        this.setState({especializacion: evt.target.value});
    }

    handleMed = (evt) => {
        this.setState({medico: evt.target.value});
    }

    handleDate = (evt) => {
        this.setState({fecha: evt});
    }

    handleTime = (evt) => {
        console.log("HORA: "+JSON.stringify(evt));
        this.setState({hora: evt});
    }

    handleSubmit = async(evt) => {
        let data = JSON.stringify({
            "appointmentId": this.state.citas[0],
            "providerIps": {
              "nit": "555588881",
              "nameIps": this.state.ips
            },
            "cubsObject": {
              "code": "77777777",
              "name": this.state.especializacion
            },
            "careModality": "PR",
            "startDate": this.state.fecha,
            "endDate": "2021-12-02T14:12:12",
            "patient": {
                "typeDocument": "CC",
                "numberDocument": "1111111",
                "email": "juan@asd.com"
            },
            "doctorPartitioner": {
              "doctorName": this.state.medico
            },
            "location": {
              "name": this.state.sede,
              "adress": "cra 15 # 122-50 of. 205"
            },
            "typeAppointmentSpecialized": false
          });
        axios({
            method: 'post',
            url: 'http://10.43.100.173:3003/auth/realms/Appointment-realm/protocol/openid-connect/token',
            data: queryString.stringify(this.dataToken),
            config: {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }  
        }).then((response)=>{
            var config = {
                method: 'post',
                url: 'http://10.43.100.172:3101/booking',
                headers: { 
                    'Authorization': 'Bearer '+response.data.access_token, 
                    'Content-Type': 'application/json'
                },
                data : data
                };
            axios(config)
            .then(async(response) => {
                M.toast({html: 'Nueva cita agendada!'});
                await this.sleep(500);
                this.props.history.push("/citas");
            })
            .catch(function (error) {
                console.log(error);
            });   
        }).catch(function (error) {
        console.log(error);
        });

    }


    componentDidMount() {
        var elems = document.querySelectorAll('.datepicker');
        M.Datepicker.init(elems, {});
        elems = document.querySelectorAll('.timepicker');
        M.Timepicker.init(elems, {});
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
                url: 'http://10.43.100.172:3101/availability',
                headers: {
                    'Authorization': 'Bearer '+response.data.access_token,
                    'Content-Type': 'application/json'
                },
                data : JSON.stringify({
                    "dateRequired": "2021-08-06T11:12:17",
                    "cubsObject": {
                        "code": "77777777",
                        "name": " cardiologia"
                    },
                    "providerIps": {
                        "nit": "122222",
                        "nameIps": "Caminos IPS"
                    },
                    "patient": {
                        "typeDocument": "CC",
                        "numberDocument": "8888888",
                        "email": "xxx@xx.com"
                    },
                    "typeAppointmentSpecialized": true
                    })
            };
            return axios(config).then((response)=> {
                response.data.scheduleList.forEach((element) => {
                    this.state.citas.push(element.idAppointment )
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
                        <Card >
                            <div className="container">
                            <h4><b>Consultas</b></h4>
                            <div className="section">
                                <h5><b>Datos personales</b></h5>
                                <div className="row">
                                    <div className="col s3">
                                        <Select s={12} label="Tipo de documento" onChange={this.handleTipoDoc}>
                                            <option value="" disabled selected>Seleccionar</option>
                                            <option value="TI">Tarjeta de identidad</option>
                                            <option value="CC">Cédula de ciudadanía</option>
                                            <option value="CE">Cédula de extranjería</option>
                                            <option value="PP">Pasaporte</option>
                                        </Select>
                                    </div>
                                    <div className="col s3">
                                        <TextInput s={12} label="Número de Documento"  onChange={this.handleNumDoc}/>
                                    </div>
                                    <div className="col s6">
                                    <TextInput s={12} label="Correo Electrónico" onChange={this.handleEmail}/>
                                    </div>
                                </div>
                            </div>
                            <div className="divider"/>
                            <div className="section">
                                <h5><b>Datos de la consulta</b></h5>
                                <div className="row">
                                    <div className="col s4">
                                        <Select label="IPS" s={12} onChange={this.handleIPS}>
                                            <option value="" disabled selected>Seleccionar</option>
                                            {this.IPS.map((ips) => (
                                                <option value={ips.id}>{ips.nombre}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col s4">
                                        <Select  s={12} label="Sede" onChange={this.handleSede}>
                                            <option value="" disabled selected>Seleccione</option>
                                            {this.IPS[this.state.id].sedes.map((sede) => (
                                                <option value={sede}>{sede}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col s4">
                                        <Select label="Especialización" s={12} onChange={this.handleEsp}>
                                            <option value="" disabled selected>Seleccionar</option>
                                            {this.IPS[this.state.id].especializacion.map((esp) => (
                                                <option value={esp}>{esp}</option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <Select label="Profesional médico" s={12} onChange={this.handleMed}>
                                            <option value="" disabled selected>Seleccionar</option>
                                            {this.medicos.map((med) => (
                                                <option value={med}>{med}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col s3">
                                        <DatePicker className='datepicker' placeholder="Fecha" onChange={this.handleDate}/>
                                    </div>  
                                    <div className="col s3">
                                        <TimePicker className='timepicker' placeholder="Hora" onChange={this.handleTime}/>
                                    </div> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s1 offset-s10">
                                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleSubmit}>
                                        Solicitar
                                    </button>
                                </div>
                            </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <div style={{'margin-bottom':'200px'}}>
                </div>
            </div>
        )
    }
}
import React, { Component } from "react";
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {Row, Col, Button, Modal, Input} from 'react-materialize';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import * as consts from '../../consts';
import swal from 'sweetalert2';

export default class Create extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      court_id: 1,
      date: new Date(),
      team_home_id: "",
      courts: [],
      teams: []
    };
 
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
      const COURT = gql`
          query allCourts{
            allCourts{
              name
              id	
            }
          }
        `
      axios
      .post(consts.GRAPHQL_URL, {
          query: print(COURT),
          variables: {},
      })
      .then(res => {
          this.setState({courts: res.data.data.allCourts});
      })
      .catch(err => console.log(err))
      const TEAMS = gql`
        query TeamByCaptain($player_name:String!){
            teamByCaptain(captain_name:$player_name){
                name
                id
          }  
        }
        `
        axios
        .post(consts.GRAPHQL_URL, {
            query: print(TEAMS),
            variables: {
                player_name: JSON.parse(sessionStorage.user).username
            },
        })
        .then(res => {
            var tmp_team_home_id = (res.data.data.teamByCaptain[0] == null) ? "" : res.data.data.teamByCaptain[0].id
            this.setState({ teams:res.data.data.teamByCaptain });
            this.setState({team_home_id:tmp_team_home_id})   
        })
        .catch(err => {throw(err);})
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleDateChange = (date) => {
    this.setState({ date: date });
  }
  
  postMatch() {
    const date = new Date(this.state.date)
    const MATCH = gql`
          mutation createMatch($court_id:Int!, $team_home_id:String!,$date:String!){
            createMatch(match:{
              court_id:$court_id
              team_home_id:$team_home_id
              date:$date
            }){
              id
            }
          }
        `
      axios
      .post(consts.GRAPHQL_URL, {
          query: print(MATCH),
          variables: {
            court_id: this.state.court_id,
            team_home_id: this.state.team_home_id,
            date: date.toISOString()
          },
      })
      .then(res => {
          console.log(res);
          if (res.data.data == null )
          throw("Error")
        swal(
          "Partido creado correctamente",
          "",
    			"success"
          ).then(value => 
            window.location.reload())
      })
      .catch(function (error) {
        swal(
          "Error en la creacion de partido",
          "",
    			"warning"
          ).then(value => 
            window.location.reload())
      	//this.setState({ teams });
      });
  }
  
  handleSubmit = event => {
    event.preventDefault();
    this.postMatch();
  }
  
  
  render() {
    return (
      <Modal
        header='Crear Partido'
        fixedFooter
        trigger={<div className='fixed-action-btn'><Button floating fab='vertical' className='green' modal='confirm'
                icon='add' large style={{bottom: '45px', right: '24px'}}>
        </Button></div>}
        actions={[<Button onClick={this.handleSubmit}>Crear!</Button>]}>
        <Row>
          <Input s={12} type='select' id='court_id' label="Cancha" defaultValue='1' onChange={this.handleChange}>
            {this.state.courts.map(court => 
              <option value={court.id} key={court.id}>{court.name}</option>
            )}
          </Input>
        </Row>
        <Row>
          <Input s={6} type='select' id='team_home_id' label="Equipo Local" defaultValue='1' onChange={this.handleChange}>
            {this.state.teams.map(team => 
              <option value={team.id} key={team.id}>{team.name}</option>
            )}
          </Input>
          <Col s={6}>
          <DateTimePicker
            value={this.state.date}
            label="Fecha"
            disablePast
            onChange={this.handleDateChange}
          />
          </Col>
        </Row>
      </Modal>
    );
 }
}
import React, { Component } from "react";
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {Row, Col, Button, Modal, Input} from 'react-materialize';
import * as consts from '../../consts';
import swal from 'sweetalert2';
const style =  {width: '45vw', height: '15vw'}


export default class Join extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      team_away_id: "",
      teams: [],
    };
 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
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
            this.setState({ teams:res.data.data.teamByCaptain });
            this.setState({team_away_id:res.data.data.teamByCaptain[0].id})
        })
        .catch(err => {throw(err);})
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  updateMatch() {
    const MATCH = gql`
    mutation updateMatchAwayTeam($team_away_id:String!, $id:Int!){
        updateMatch(match:{team_away_id: $team_away_id}, id:$id)
        {
          id
        }
      }
  `
    axios
    .post(consts.GRAPHQL_URL, {
        query: print(MATCH),
        variables: {
        team_away_id: this.state.team_away_id,
        id: this.props.match.id
        },
    })
    .then(res => {
        console.log(res);
        if (res.data.data == null )
        throw("Error")
    swal(
        "Unido al partido correctamente",
        "",
            "success"
        ).then(value => 
        window.location.reload())
    })
    .catch(function (error) {
    swal(
        "Error en la creacion union al partido",
        "",
            "warning"
        ).then(value => 
        window.location.reload())
        //this.setState({ teams });
    });
  }
  
  handleSubmit = event => {
    event.preventDefault();
    this.updateMatch();
  }
  
  
  render() {
    return (
      <Modal
        style={style}
        header='Unirse a Partido'
        fixedFooter
        trigger={<div className='fixed-action-btn'><Button waves='light' className='green' large style={{bottom: '45px', right: '24px'}}>
        Unirse al Partido</Button></div>}
        actions={[<Button onClick={this.handleSubmit}>Unirse!</Button>]}>
        <Row>
          <Input s={12} type='select' id='team_away_id' label="Equipo Visitante" defaultValue='1' onChange={this.handleChange}>
            {this.state.teams.map(team => 
              <option value={team.id} key={team.id}>{team.name}</option>
            )}
          </Input>
        </Row>
      </Modal>
    );
 }
}
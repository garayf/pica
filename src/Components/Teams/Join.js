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
    this.handleClick = this.handleClick.bind(this)
  }
  
  joinTeam() {
    const MATCH = gql`
    mutation addPlayer($id:String!, $player_name:String!){
      addPlayerToTeam(id:$id, player_name:$player_name)
      {
        id
        squad
      }
    }
  `
    axios
    .post(consts.GRAPHQL_URL, {
        query: print(MATCH),
        variables: {
          id: this.props.team_id,
          player_name: JSON.parse(sessionStorage.user).username
        },
    })
    .then(res => {
        console.log(res);
        if (res.data.data == null )
        throw("Error")
    swal(
        "Unido al quipo correctamente",
        "",
            "success"
        ).then(value => 
        window.location.reload())
    })
    .catch(function (error) {
    swal(
        "Error en la union al equipo",
        "",
            "warning"
        ).then(value => 
        window.location.reload())
        //this.setState({ teams });
    });
  }
  
  handleClick = event => {
    this.joinTeam();
  }
  
  
  render() {
    return (
      <div className='fixed-action-btn'><Button onClick={this.handleClick} waves='light' className='green' large style={{bottom: '45px', right: '24px'}}>
        Unirse al Equipo</Button></div>
    );
 }
}
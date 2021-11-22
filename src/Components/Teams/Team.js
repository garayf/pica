import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Button, Card, CardTitle, Collection, CollectionItem} from 'react-materialize';
import * as consts from '../../consts';
import Join from './Join'


export default class Team extends Component {

  constructor(props,context) {
    super(props,context);
  }

  state = {
    team: [], members: []
  }

  componentDidMount() {
    axios.post(consts.GRAPHQL_URL,{
      query:"query{\nteamById(id:\""+this.props.match.params.id+"\"){\nname\ncaptain\nsquad\n}\n\n}","variables":null
    })
      .then(response => {
        console.log(response.data.data)
        var team = response.data.data.teamById
        var members = response.data.data.teamById.squad
        this.setState({team});
        this.setState({members});
      })
      .catch(function (error) {
        console.log(error)
      });
  }
  
  renderUsers(props){
    var miembros = props.miembros;
    
    var list = []
    if(miembros){
      list = miembros.map(miembro => 
        <CollectionItem>{miembro}</CollectionItem>
      );
    }
    return list  
  }

  TeamJoin(props){
    var miembros = props.miembros
    var user = props.user
    if(user == null || miembros.length > 10 || miembros.includes(JSON.parse(user).username))
      return null
    else
      return <Join team_id={props.team_id}/>
  }

  
  render() {
  	return (
      <Row>
        <Col l={2} m={1}></Col>
        <Col l={8} m={10} s={12}>
          <Card className=''
            header={<CardTitle image={require('../../Images/banner.jpg')}></CardTitle>}>
            <h4>{this.state.team.name}</h4>
            <h5>Capitan: {this.state.team.captain}</h5>
            <h5>Miembros:</h5>
            <Collection>
              <this.renderUsers miembros={this.state.team.squad} />
            </Collection>
            {console.log("memb",this.state.team.squad)}
          </Card>
        </Col>
        <this.TeamJoin user={sessionStorage.user} miembros={this.state.members} team_id={this.props.match.params.id}/>
  	  </Row>
    )
  }
}
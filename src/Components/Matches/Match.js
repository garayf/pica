import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Row, Col, Button, Card, CardTitle} from 'react-materialize'
import * as consts from '../../consts';
import { print } from 'graphql';
import gql from 'graphql-tag';
import axios from 'axios';
import Join from './Join'
const smallStyle =  {height: '7vw', position: 'relative'}


export default class Match extends Component {

    state = {
      match: {},
      team_home: {},
      team_away: {},
      court: {}
    }

    componentDidMount(){
        const MATCH = gql`
        query oneMatch($id: Int!){
            matchById(id: $id){
              id
              court_id
              date
              team_home_id
              team_away_id
              score_home
              score_away
              played
            }
          }
        `
        axios
        .post(consts.GRAPHQL_URL, {
            query: print(MATCH),
            variables: {
                "id": this.props.match.params.id
            },
        })
        .then(res => {
            this.getCourt(res.data.data.matchById.court_id).then(resCourt =>
              this.setState({court: resCourt})
            )
            this.getTeam(res.data.data.matchById.team_home_id).then(resHome =>
              this.setState({team_home: resHome})
              )
            if (res.data.data.matchById.team_away_id != null){
              this.getTeam(res.data.data.matchById.team_away_id).then(resAway =>
                this.setState({team_away: resAway})
                )
            }
            this.setState({match:res.data.data.matchById})
        })
        .catch(err => {throw(err);})
    }

    getCourt(court_id){
      const COURT = gql`
          query oneCourt($id: Int!){
            courtById(id:$id){
              name
              address	
            }
          }
        `
       return axios
              .post(consts.GRAPHQL_URL, {
                  query: print(COURT),
                  variables: {
                      "id": court_id
                  },
              })
              .then(res => {
                 return res.data.data.courtById
              })
              .catch(err => {return err;})
    }
    getTeam(team_id){
      const TEAM = gql`
      query oneTeam($id: String!){
        teamById(id:$id){
          id
          name
        }
       }
      `
      return axios
              .post(consts.GRAPHQL_URL, {
                  query: print(TEAM),
                  variables: {
                      "id": team_id
                  },
              })
              .then(res => {
                return res.data.data.teamById
              })
              .catch(err => {return err;})
        }

    AwayTeamPresent(props){
      const team_name = props.team_name
      if (team_name == null){
        return <p>Partido abierto, equipo visitante aun no decidido.</p>
      }else{
        return  <p>Nombre: {team_name}</p>
      }
    }

    Played(props){
      const date = new Date(props.match.date)
      if(props.match.played)
        return (
          <Row>
              <Col l={12}><Card title="Partido jugado" >
              Fue jugado el: {date.toLocaleDateString()}
              </Card></Col>
          </Row>
        )
      else
          return (
            <Row>
              <Col l={12}><Card title="Partido aún no jugado" >
              Se jugará el: {date.toLocaleDateString()}
              </Card></Col>
          </Row>
          )
    }

    Score(props){
      if(props.played)
        return <p>Marcador final: {props.score}</p>
      else 
        return null
    }

    MatchJoin(props){
      if(props.user == null || props.match.team_away_id != null)
        return null
      else
        return <Join match={props.match} />
    }


    render() {
    return (
    <div>
      <div>
        <Row>
        <Col l={3} m={1} className='grid-example'></Col>
        <Col l={6} m={10} s={12} className='grid-example'>
          <Card className='' header={<CardTitle image={require('../../Images/field2.jpg')}></CardTitle>}>
            <this.Played match={this.state.match} />
            <Row>
              <Col l={5}>
                <Card title="Equipo Local" style={smallStyle}>
                Nombre: {this.state.team_home.name}
                <this.Score played={this.state.match.played} score={this.state.match.score_home}/>
                </Card>
              </Col>
              <Col l={5} offset="l2">
                <Card title="Equipo Visitante" style={smallStyle}>
                  <this.AwayTeamPresent team_name={this.state.team_away.name} />
                  <this.Score played={this.state.match.played} score={this.state.match.score_away}/>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col l={12}><Card title={"Cancha: " + this.state.court.name}>
                Dirección: {this.state.court.address}
                </Card></Col>
            </Row>
          </Card>
        </Col>
        <this.MatchJoin user={sessionStorage.user} match={this.state.match}/>
      </Row>
    </div>
    </div>
    )
  }
}

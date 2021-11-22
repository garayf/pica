import React, { Component } from "react";
import {Row, Col, Button, Card, CardTitle} from 'react-materialize'
import axios from 'axios';
import * as consts from '../../consts';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom'
const defTeam = require('../../Images/team.jpg')
const capTeam = require('../../Images/team2.jpg')

export default class MyTeams extends Component {
    state = {
        teams: [],
    }
    componentDidMount(){
        const TEAMS = gql`
        query TeamByPlayer($player_name:String!){
            teamByPlayer(player_name:$player_name){
                name
                id
                captain
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
            this.setState({ teams:res.data.data.teamByPlayer });
        })
        .catch(err => {throw(err);})
    }

    TeamImage(props){
        const captain = props.captain
        const image = captain == JSON.parse(sessionStorage.user).username ? capTeam: defTeam
        return <img src={image} className="img-responsive profile-img"/>
    }

    render() {
        return (
                <Card className=''>
                    <h3><b>Mis Consultas</b></h3>
                    <Row>
                    { this.state.teams.map(team =>
                        <Col>
                        <Link to={`/equipo/${team.id}`}>
                            <this.TeamImage captain={team.captain}/>
                            <h4>{team.name}</h4>
                        </Link>
                        </Col>
                        )}
                    </Row>
                </Card>
        )
    }
}

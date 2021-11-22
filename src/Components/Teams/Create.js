import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Button, Card, CardTitle, Modal, Input, Collection, CollectionItem} from 'react-materialize';
import * as consts from '../../consts';
import swal from 'sweetalert2';


const ListItem = ({ value, onClick }) => (
  <CollectionItem onClick={onClick}>{value}</CollectionItem>
);

const List = ({ items, onItemClick }) => (
  <Collection>
    {
      items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick} />)
    }
  </Collection>
);

export default class Create extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      name: "",
      // sport: "futbol",
      captain: JSON.parse(sessionStorage.user).username,
      inputValue: '',
      squad: [JSON.parse(sessionStorage.user).username]
    };
 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  postTeam() {
    axios.post(consts.GRAPHQL_URL, {
      query:"mutation{\ncreateTeam(team:{\nname: \""+this.state.name+"\"\nsport:\""+this.state.sport+"\"\ncaptain: \""+this.state.captain+"\"\nsquad:[\""+this.state.squad.join(" \",\" ")+"\"]\n}){\nname\n}\n}",variables:null
    })
      .then(response => {
        console.log(response)
        if (response.data.data == null )
          throw("Error")
        swal(
          "Equipo creado correctamente",
          "",
    			"success"
          ).then(value => 
            window.location.reload())
      	//this.setState({ teams });
      })
      .catch(function (error) {
        swal(
          "Error en la creacion de equipo",
          "",
    			"warning"
          ).then(value => 
            window.location.reload())
      	//this.setState({ teams });
      });
  }
  
  handleSubmit = event => {
    event.preventDefault();
    //this.props.actions.loginUser(this.state);
    this.postTeam();
    //console.log(this.state);
    //console.log("mutation{\ncreateTeam(team:{\nname: \""+this.state.name+"\"\nsport:\""+this.state.sport+"\"\ncaptain: \""+this.state.captain+"\"\nsquad:[\""+this.state.squad.join(" \",\" ")+"\"]\n}){\nname\n}\n}");
  }
  
  onClickList = () => {
    const { inputValue, squad } = this.state;
    if (inputValue) {
      const nextState = [...squad, inputValue];
      this.setState({ squad: nextState, inputValue: '' });
    }
  }

  onChangeList = (e) => this.setState({ inputValue: e.target.value });

  handleItemClick = (e) => {console.log(e.target.innerHTML)}
  
  render() {
    const squad = this.state.squad;
    const inputValue = this.state.inputValue;
    return (
      <Modal
        header='Crear Equipo'
        fixedFooter
        trigger={<div className='fixed-action-btn'><Button floating fab='vertical' className='green' modal='confirm'
                icon='add' large style={{bottom: '45px', right: '24px'}}>
        </Button></div>}
        actions={[<Button onClick={this.handleSubmit}>Crear!</Button>]}>
        <Row>
          <Input s={12} label="Nombre" id='name' onChange={this.handleChange} />
          <Input s={12} label="capitan" id='captain' onChange={this.handleChange} defaultValue={this.state.captain} disabled/>
          {/* <Input s={12} type='select' id='sport' label="Deporte" defaultValue='futbol' onChange={this.handleChange}>
            <option value='futbol'>Futbol</option>
            <option value='micro'>Micro</option>
            <option value='fut-8'>Fut-8</option>
          </Input> */}
          <Row>
            <Input label="Squad" placeholder="add teammate" s={10} type="text" value={inputValue} onChange={this.onChangeList} />
            <Button s={2} onClick={this.onClickList} className='red' icon='add'></Button>
          </Row>
          <Row>
            <Col s={10}>
              <List items={squad} onItemClick={this.handleItemClick} />
            </Col>
          </Row>
        </Row>
      </Modal>
    );
 }
}
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as consts from '../../consts';
import { print } from 'graphql';
import gql from 'graphql-tag';

const BOGOTA_COOR = {lat: 4.710, lng: -74.072};
const BALLICON = "https://cdn0.iconfinder.com/data/icons/customicondesign-office7-shadow-png/32/Sport-football-pitch.png"
const style =  {width: '45vw', height: '30vw', position: 'relative'}


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            info: [],
            canchas: [],
            userlat: 4.63,
            userlng:-74.15
        }
        const setState = this.setState.bind(this)
        this.setcanchasstate = this.setcanchasstate.bind(this)
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
        this.getuserGeolocation = this.getuserGeolocation.bind(this)
    }

    states = {
        precios: [],
        direccion: [],
        disponibilidad: [],
        userlat: 4.63,
        userlng:-74.15
    }
      componentDidMount() {
        console.log('url: '+consts.GRAPHQL_URL)
        const COURTS = gql`
        query GetAllCourts{
            allCourts{
              id
              name
              address
              latitude
              longitude
              availability
              price_hour
            }
          }
        `
        axios
        .post(consts.GRAPHQL_URL, {
            query: print(COURTS),
            variables: {},
        })
        .then(res => {
            const canchas = res.data.data.allCourts;
          	//const b = eventos[0].name;
            this.setState({ canchas });
            for (var i=0;i<canchas.length;i++){
                this.setcanchasstate(canchas[i])
            }
            this.getuserGeolocation();
        })
        .catch(err => {throw(err);})          
      }
      
      getuserGeolocation(){
        let userlat = 0
        let userlng = 0
        navigator.geolocation.getCurrentPosition(function(objPosition)
    		{
    		  userlat = objPosition.coords.longitude
    		  userlng = objPosition.coords.latitude

    		}, function(objPositionError)
    		{
    			switch (objPositionError.code)
    			{
    				case objPositionError.PERMISSION_DENIED:
    					console.log("No se ha permitido el acceso a la posición del usuario.");
    				break;
    				case objPositionError.POSITION_UNAVAILABLE:
    					console.log("No se ha podido acceder a la información de su posición.");
    				break;
    				case objPositionError.TIMEOUT:
    					console.log("El servicio ha tardado demasiado tiempo en responder.");
    				break;
    				default:
    					console.log("Error desconocido.");
    			}
    			//window.location.refresh
    		}, {
          enableHighAccuracy: true,
          timeout: 25000,
          maximumAge: 0
    		});
    		this.setState({userlat})
    		this.setState({userlng})
      }
      
      setcanchasstate(cancha){
        //this.state.info[cancha.nombre]={precio: cancha.precio}
        this.states.precios[cancha.name]=cancha.price_hour
        this.states.direccion[cancha.name]=cancha.address
        this.states.disponibilidad[cancha.name] = cancha.availability ? 'Disponible' : "No disponible";
      }

      onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });

      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };


    render() {
         return (
         <Map google={this.props.google}
            onClick={this.onMapClicked}
            style={style}
            initialCenter={BOGOTA_COOR}
            zoom={12}>
            {/*
            <Marker
                title={'Cancha1'}
                name={'Cancha'}
                onClick={this.onMarkerClick}
                position={{lat: 4.624, lng: -74.063}}
                icon={BALLICON}/>
            */}
            { this.state.canchas.map(cancha =>
        		(<Marker
        		onClick={this.onMarkerClick}
                title={cancha.name}
                name={cancha.name}
                position={{lat: cancha.latitude, lng: cancha.longitude}}
                icon={BALLICON}
                key={cancha.id}/>
                )
        	)}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h2>{this.state.selectedPlace.name}</h2>
                  <p>{'Precio alquiler: '+this.states.precios[this.state.selectedPlace.name]}</p>
                  <p>{'Dirección: '+this.states.direccion[this.state.selectedPlace.name]}</p>
                  <p>{this.states.disponibilidad[this.state.selectedPlace.name]}</p>
                </div>
            </InfoWindow>
          </Map>
        );

      }

}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCr5Urf82ku6TbIVfrvhTxmlgHdlYOjlmw")
})(MapContainer)

//https://www.npmjs.com/package/google-maps-react

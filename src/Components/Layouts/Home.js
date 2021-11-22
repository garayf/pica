import React from 'react';
import {Row, Col, Button, Card, CardTitle} from 'react-materialize'
import logo from "../../hospital_logo.png";

export default props => 
  <div>
    <Row>
      <Col l={3} className='grid-example'></Col>
      <Col l={6} className='grid-example'>
        <Card className='center-align'actions={[
          <div>
            <a href='/login' style={{color:"black"}}>Mas Información</a>
          </div>]}> 
          <img className="responsive-img" src={logo}  width="180"/>
          <h2><b>ORENJI</b></h2>    		
           
          <p>Orenji tecnologies confia en la Confiabilidad, Cumplimiento y Competitividad de los productos y servicios que proporcionamos 
            a nuestros clientes, logrando satisfacer sus necesidades de negocio, acompañados en el proceso del mejoramiento continuo y calidad 
            de vida de quienes conforman este equipo de trabajo. </p>             
		    

        </Card>
        <Card className='center-align'
         actions={[
          <div>
            <a href='/login' style={{color:"black"}}>Ingresa</a>
          </div>]}> 
          <p>A través de nuestro excelente portafolio de servicio, lograr un posicionamiento en los diferentes nichos de mercado donde se seleccione 
           como oportunidad de negocio, siendo parte estratégica de nuestros clientes, ofreciendo la tecnología como un  proceso estratégico.</p>
        
        </Card>
      </Col>
    </Row>
  </div>

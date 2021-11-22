import React from 'react';
import {Footer} from 'react-materialize';
import M from 'materialize-css';

export default props => 
    <div>
      <Footer class="blue" copyrights="Orenji © 2021 Copyright"
              links={<ul><li><h5 className="white-text">Contáctanos</h5></li><li><a className="grey-text text-lighten-3" href="#!">Edgarayf@gmail.com</a></li><li><a className="grey-text text-lighten-3" href="#!">+57 3134745770</a></li><li><a className="grey-text text-lighten-3" href="#!">pbx 578 1245</a></li></ul>}
      >
                <h5 class="white-text">Orenji</h5>
                <p class="grey-text text-lighten-4">Orengi es un grupo asociado diponible para los personales de la salud.</p>
          <div class="footer-copyright">
            <div class="container" >
              <p class="white-text">  </p>
            </div>
          </div>
        </Footer>
    </div>
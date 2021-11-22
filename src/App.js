import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux'; 
import configureStore from './Store/configureStore';
import Footer from './Components/Layouts/Footer';
import NavBar from './Components/Layouts/NavBar';
import Main from './Components/Main/Main';
import './styles/materialize.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Main />
          <Footer />
        </Fragment>
      </BrowserRouter>
    </Provider>
    );
  }
}

export default App;

import * as types from './actionTypes';  
import sessionApi from '../Auth/sessionApi';
import swal from 'sweetalert2';

var usertest = { username: "@david" };
var tokentest = 'token00'

export function loginSuccess() {  
  return {type: types.LOG_IN_SUCCESS}
}

export function logoutUser(){
	sessionStorage.removeItem('jwt');
	sessionStorage.removeItem('user');
	return {type: types.LOG_OUT}
}
export function loginUser(credentials) {  
  return function(dispatch) { 
    return sessionApi.login(credentials).then(response => {
      let user = {
        name: response.name,
        lastname: response.lastname,
        username: response.username,
        phone: response.phone,
        email: response.email
      }
      sessionStorage.setItem('jwt', response.token);
      sessionStorage.setItem('client', response.client);
      sessionStorage.setItem('user',JSON.stringify(user));

      if (response.token==undefined){
        dispatch(logoutUser());
        swal(
          'usuario o contraseña invalidos',
          'intentalo de nuevo',
          'warning'
        ) 
      }else{
        dispatch(loginSuccess()); 
        swal(
    			"Ha ingresado correctamente",
    			"¡Bienvenido!",
    			"success"
          ).then(value => 
            window.location.reload())
      }
    }).catch(error => {
      throw(error);
    });
  };
}

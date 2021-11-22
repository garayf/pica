import * as types from '../Actions/actionTypes'; 

export default function sessionReducer(state = !!sessionStorage.jwt, action){
	switch(action.type){
		case types.LOG_IN_SUCCESS:
			return !!sessionStorage.jwt
		default:
			return state;
	}
}

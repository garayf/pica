import axios from 'axios';
import * as consts from '../consts';
import { print } from 'graphql';
import gql from 'graphql-tag';


class SessionApi {
  static login(credentials) {
    const LOGIN = gql`
    mutation signIn($email:String!, $password:String!){
      signIn(email:$email,password:$password){
        token
        client
        name
        lastname
        username
        phone
        email
      }
    }
    `
    return axios
          .post(consts.GRAPHQL_URL, {
            query: print(LOGIN),
            variables: {
              email: credentials.email,
              password: credentials.password
            },
          })
          .then(res => {
            return res.data.data.signIn;
          })
          .catch(err => {return err})
  }
}

export default SessionApi;

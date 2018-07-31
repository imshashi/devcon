import { GET_ERRORS } from './types';
import axios from 'axios';

// Register
export const registerUser = (userData, history) => dispatch => {

  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );


};



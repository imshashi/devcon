import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERRORS
} from './types';

// Get current profile

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

// Create profile

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch( error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}

// Delete account & profile

export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This can not be undone!')){
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(error =>
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        })
      )
  }
}

// Profile loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Profile loading

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}


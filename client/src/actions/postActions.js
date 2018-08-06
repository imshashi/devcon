import axios from 'axios';

import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  GET_ERRORS
} from './types';


// Add Post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading);
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    )
}

// Post loading

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

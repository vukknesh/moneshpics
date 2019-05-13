import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import {
  ADD_IMAGE,
  GET_ERRORS,
  IMAGE_LOADING,
  GET_IMAGES,
  GET_IMAGE,
  CLEAR_ERRORS,
  DELETE_IMAGE
} from "./types";

//add image

export const addImage = (image, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(showLoading());

  axios
    .post("/api/image/image-upload", image)
    .then(res => {
      const imageUrl = res.data;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.jwtToken}`
        }
      };
      axios
        .post("/api/image/", imageUrl, config)
        .then(dispatch(hideLoading()))

        .then(res => {
          history.push("/profiles");
          dispatch({
            type: ADD_IMAGE,
            payload: res.data
          });
        });
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get post

export const getImages = () => dispatch => {
  dispatch(setImageLoading());
  axios
    .get("/api/image")
    .then(res =>
      dispatch({
        type: GET_IMAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_IMAGES,
        payload: null
      })
    );
};

//Get post

export const getImage = id => dispatch => {
  dispatch(setImageLoading());
  axios
    .get(`/api/image/${id}`)
    .then(res =>
      dispatch({
        type: GET_IMAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_IMAGES,
        payload: null
      })
    );
};

//delete Post

export const deleteImage = id => dispatch => {
  axios
    .delete(`/api/image/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_IMAGE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Likes
export const addLike = id => dispatch => {
  axios
    .post(`/api/image/like/${id}`)
    .then(res => dispatch(getImages()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//unlike Posts
export const removeLike = id => dispatch => {
  axios
    .post(`/api/image/unlike/${id}`)
    .then(res => dispatch(getImages()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add Comment

export const addComment = (imageId, newComment) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/image/comment/${imageId}`, newComment)
    .then(res =>
      dispatch({
        type: GET_IMAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Comment

export const deleteComment = (imageId, commentId) => dispatch => {
  axios
    .delete(`/api/image/comment/${imageId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_IMAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set Loading state

export const setImageLoading = () => {
  return {
    type: IMAGE_LOADING
  };
};

//clear errorrs

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

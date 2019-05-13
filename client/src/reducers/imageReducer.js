import {
  ADD_IMAGE,
  GET_IMAGES,
  GET_IMAGE,
  IMAGE_LOADING,
  DELETE_IMAGE
} from "../actions/types";

const initialState = {
  images: [],
  image: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IMAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_IMAGES:
      return {
        ...state,
        images: action.payload,
        loading: false
      };
    case ADD_IMAGE:
      return {
        ...state,
        images: [action.payload, ...state.images]
      };
    case GET_IMAGE:
      return {
        ...state,
        image: action.payload,
        loading: false
      };
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter(image => image._id !== action.payload)
      };
    default:
      return state;
  }
}

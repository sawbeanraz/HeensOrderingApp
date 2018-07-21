import {
  MENU_FETCH_REQUEST,
  MENU_FETCH_SUCCESS,
  MENU_FETCH_ERROR,
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_ERROR,
  MENU_GET_REQUEST,
  MENU_GET_SUCCESS,
  MENU_DELETE_REQUEST,
  MENU_DELETE_SUCCESS,
  MENU_DELETE_ERROR
} from "../actions/types";

const initialState = {
  loading: false,
  list: [],
  current: undefined,
  errors: {},
  msg: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MENU_FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case MENU_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        errors: {}
      };
    case MENU_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        errors: action.payload
      };

    case MENU_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: "Saving menu"
      };
    case MENU_CREATE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
        current: action.payload,
        msg: "Menu saved successfully"
      };
    case MENU_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        msg: "There is error saving menu"
      };
    case MENU_GET_REQUEST:
      return {
        ...state,
        loading: true
      };

    case MENU_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload
      };

    case MENU_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: "Deleting.."
      };
    case MENU_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: "Menu is deleted."
      };
    case MENU_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        msg: "Unable to delete error",
        errors: action.payload
      };
    default:
      return state;
  }
}
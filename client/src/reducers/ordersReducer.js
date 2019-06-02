import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  SET_ORDER_TYPE,
  ORDER_SELECT_CATEGORY,
} from '../actions/types';

const initialState = {
  loading: false,
  list: [],
  errors: {},
  isOpenOrderModal: true,
  orderType: 'table',
  selectedCategory: undefined,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: action.payload,
        errors: {},
      };
    }
    case GET_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        errors: action.payload,
      };
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
      };
    case UPDATE_ORDER_STATUS_SUCCESS: {
      const { _id: orderIdToUpdate } = action.payload;
      const updateIndex = state.list.findIndex(({ _id: orderId }) => orderId === orderIdToUpdate);
      return {
        ...state,
        loading: false,
        list: [
          ...state.list.slice(0, updateIndex),
          action.payload,
          ...state.list.slice(updateIndex + 1),
        ],
      };
    }
    case UPDATE_ORDER_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case OPEN_ORDER_MODAL:
      return {
        ...state,
        isOpenOrderModal: true,
      };
    case CLOSE_ORDER_MODAL:
      return {
        ...state,
        isOpenOrderModal: false,
      };
    case SET_ORDER_TYPE:
      return {
        ...state,
        orderType: payload,
      };
    case ORDER_SELECT_CATEGORY: {
      return {
        ...state,
        category: payload,
      };
    }
    default:
      return state;
  }
}

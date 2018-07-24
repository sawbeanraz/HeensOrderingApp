import axios from "axios";
import {
  MENU_FETCH_REQUEST,
  MENU_FETCH_SUCCESS,
  MENU_FETCH_ERROR,
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_ERROR,
  MENU_UPDATE_REQUEST,
  MENU_UPDATE_SUCCESS,
  MENU_UPDATE_ERROR,
  MENU_GET_REQUEST,
  MENU_GET_SUCCESS,
  MENU_GET_ERROR,
  MENU_DELETE_REQUEST,
  MENU_DELETE_SUCCESS,
  MENU_DELETE_ERROR,
  MENU_OPTION_ADD_REQUEST,
  MENU_OPTION_ADD_SUCCESS,
  MENU_OPTION_ADD_ERROR,
  MENU_OPTION_DELETE_REQUEST,
  MENU_OPTION_DELETE_SUCCESS,
  MENU_OPTION_DELETE_ERROR
} from "./types";

// GET         /api/menus/
export const getMenus = () => dispatch => {
  dispatch({
    type: MENU_FETCH_REQUEST
  });
  axios
    .get(`/api/menus`)
    .then(res =>
      dispatch({
        type: MENU_FETCH_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: MENU_FETCH_ERROR,
        payload: err.response.data
      })
    );
};

// GET         /api/menus/:id
export const getMenu = id => dispatch => {
  dispatch({
    type: MENU_GET_REQUEST
  });

  axios
    .get(`/api/menus/${id}`)
    .then(res =>
      dispatch({
        type: MENU_GET_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: MENU_GET_ERROR,
        payload: err.response.data
      })
    );
};
// GET         /api/category/:cateogryId

// POST        /api/menus/
export const createMenu = menu => dispatch => {
  dispatch({
    type: MENU_CREATE_REQUEST
  });

  axios
    .post(`/api/menus/`, menu)
    .then(res =>
      dispatch({
        type: MENU_CREATE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: MENU_CREATE_ERROR,
        payload: err.response.data
      })
    );
};

// PUT         /api/menus/:id
export const updateMenu = (id, menu, history) => dispatch => {
  dispatch({
    type: MENU_UPDATE_REQUEST
  });

  axios
    .put(`/api/menus/${id}`, menu)
    .then(res => {
      dispatch({
        type: MENU_UPDATE_SUCCESS,
        payload: res.data
      });
      if (history) history.push(`/menus`);
    })
    .catch(err =>
      dispatch({
        type: MENU_UPDATE_ERROR,
        payload: err.response.data
      })
    );
};

// DELETE      /api/menus/:id
export const deleteMenu = (id, history) => dispatch => {
  dispatch({
    type: MENU_DELETE_REQUEST
  });
  axios
    .delete(`/api/menus/${id}`)
    .then(res => {
      dispatch({
        type: MENU_DELETE_SUCCESS,
        payload: res.data
      });

      //TODO REMOVE THE MENU ITEM FROM THE LIST
      if (history) history.push("/menus/");
    })
    .catch(err =>
      dispatch({
        type: MENU_DELETE_ERROR,
        payload: err.response.data
      })
    );
};

// POST        /api/menus/:id/options
export const addMenuOption = (id, option, history) => dispatch => {
  dispatch({
    type: MENU_OPTION_ADD_REQUEST
  });
  axios
    .post(`/api/menus/${id}/options`, option)
    .then(res => {
      dispatch({
        type: MENU_OPTION_ADD_SUCCESS,
        payload: res.data
      });
      if (history) history.push(`/menus/${id}/`);
    })
    .catch(err =>
      dispatch({
        type: MENU_OPTION_ADD_ERROR,
        payload: err.response.data
      })
    );
};

// DELETE      /:id/options/:optionId
export const deleteMenuOption = (id, optionId, history) => dispatch => {
  dispatch({
    type: MENU_OPTION_DELETE_REQUEST
  });
  axios
    .delete(`/api/menus/${id}/options/${optionId}`)
    .then(res => {
      dispatch({
        type: MENU_OPTION_DELETE_SUCCESS,
        payload: res.data
      });
      return axios.get(`/api/menus/${id}`);
    })
    .then(res => {
      dispatch({
        type: MENU_GET_SUCCESS,
        payload: res.data
      });
      if (history) history.push(`/menus/${id}/`);
    })
    .catch(err =>
      dispatch({
        type: MENU_OPTION_DELETE_ERROR,
        payload: err.response.data
      })
    );
};

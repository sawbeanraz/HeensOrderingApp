import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import customersReducer from "./customersReducers";
import categoryReducer from "./categoryReducer";
import menuReducer from "./menuReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  customers: customersReducer,
  categories: categoryReducer,
  menus: menuReducer
});
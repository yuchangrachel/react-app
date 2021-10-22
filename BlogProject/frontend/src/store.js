import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./redux/reducers/userReducers";

import {
  diaryGetReducer,
  diaryCreateReducer,
  diaryUpdateReducer,
  diaryDeleteReducer,
} from "./redux/reducers/diaryReducers";

import {
  usersGetReducer,
  userCreateReducer,
  userUpdateReducer,
  userDeleteReducer,
} from "./redux/reducers/adminReducers";

const reducer = combineReducers({
  //userReducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  //diaryReducers
  diaryGet: diaryGetReducer,
  diaryCreate: diaryCreateReducer,
  diaryUpdate: diaryUpdateReducer,
  diaryDelete: diaryDeleteReducer,

  //adminReducers
  usersGet: usersGetReducer,
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

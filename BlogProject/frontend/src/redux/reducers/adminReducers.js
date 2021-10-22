import {
  ALLUSERS_GET_REQUEST,
  ALLUSERS_GET_SUCCESS,
  ALLUSERS_GET_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../constants/adminConstants";
export const usersGetReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALLUSERS_GET_REQUEST:
      return {};
    case ALLUSERS_GET_SUCCESS:
      return { users: action.payload };
    case ALLUSERS_GET_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return {};
    case USER_CREATE_SUCCESS:
      return { success: true };
    case USER_CREATE_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {};
    case USER_UPDATE_SUCCESS:
      return { success: true };
    case USER_UPDATE_FAIL:
      return { error: action.payload, success: false };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {};
    case USER_DELETE_SUCCESS:
      return { success: true };
    case USER_DELETE_FAIL:
      return { error: action.payload, success: false };

    default:
      return state;
  }
};

import {
  ALLDIARIES_GET_REQUEST,
  ALLDIARIES_GET_SUCCESS,
  ALLDIARIES_GET_FAIL,
  DIARY_CREATE_REQUEST,
  DIARY_CREATE_SUCCESS,
  DIARY_CREATE_FAIL,
  DIARY_UPDATE_REQUEST,
  DIARY_UPDATE_SUCCESS,
  DIARY_UPDATE_FAIL,
  DIARY_DELETE_REQUEST,
  DIARY_DELETE_SUCCESS,
  DIARY_DELETE_FAIL,
} from "../constants/diaryConstants";

export const diaryGetReducer = (state = { diaries: [] }, action) => {
  switch (action.type) {
    case ALLDIARIES_GET_REQUEST:
      return {};
    case ALLDIARIES_GET_SUCCESS:
      return { diaries: action.payload };
    case ALLDIARIES_GET_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

export const diaryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DIARY_CREATE_REQUEST:
      return {};
    case DIARY_CREATE_SUCCESS:
      return { success: true };
    case DIARY_CREATE_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

export const diaryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DIARY_UPDATE_REQUEST:
      return {};
    case DIARY_UPDATE_SUCCESS:
      return { success: true };
    case DIARY_UPDATE_FAIL:
      return { error: action.payload, success: false };

    default:
      return state;
  }
};

export const diaryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DIARY_DELETE_REQUEST:
      return {};
    case DIARY_DELETE_SUCCESS:
      return { success: true };
    case DIARY_DELETE_FAIL:
      return { error: action.payload, success: false };

    default:
      return state;
  }
};

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

import axios from "axios";

export const getDiary = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALLDIARIES_GET_REQUEST,
    });

    const {
      //redux
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //middleware
    const { data } = await axios.get(`/api/diaries`, config);

    dispatch({
      type: ALLDIARIES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALLDIARIES_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createDiary =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DIARY_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/diaries/create`,
        { title, content, category },
        config
      );

      dispatch({
        type: DIARY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DIARY_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateDiary =
  //need id since need find diary in db
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DIARY_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/diaries/${id}`,
        { title, content, category },
        config
      );

      dispatch({
        type: DIARY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DIARY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteDiary = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DIARY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/diaries/${id}`, config);

    dispatch({
      type: DIARY_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIARY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

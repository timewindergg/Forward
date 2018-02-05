export const LOAD_STATIC_SUCCESS = 'LOAD_STATIC_SUCCESS';
export const LOAD_STATIC_FAILED = 'LOAD_STATIC_FAILED';

export const loadStaticDataSuccess = (staticData) => ({
  type: LOAD_STATIC_SUCCESS,
  payload: {
    staticData
  }
});

export const loadStaticDataFailed = (error) => ({
  type: LOAD_STATIC_FAILED,
  payload: {
    error
  }
});
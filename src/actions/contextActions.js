export const LOAD_VERSION_SUCCESS = 'LOAD_VERSION_SUCCESS';
export const LOAD_VERSION_FAILED = 'LOAD_VERSION_FAILED';

export const loadVersionSuccess = (version) => ({
  type: LOAD_VERSION_SUCCESS,
  payload: {
    version
  }
});

export const loadVersionFailed = (error) => ({
  type: LOAD_VERSION_FAILED,
  payload: {
    error
  }
});

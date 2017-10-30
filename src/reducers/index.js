import {
  STORE_STATUS_QUEUE_ACTION,
  FETCHING_STATUS_QUEUE_ACTION,
  ERROR_FETCH_STATUS_QUEUE_ACTION
} from '../actions';

export default (state = {}, action) => {
  const actionMap = {
    [FETCHING_STATUS_QUEUE_ACTION]: () => ({
      ...state,
      isFetchingStatusQueue: true
    }),
    [ERROR_FETCH_STATUS_QUEUE_ACTION]: () => ({
      ...state,
      isFetchingStatusQueue: false,
      error: action.error,
      queue: []
    }),
    [STORE_STATUS_QUEUE_ACTION]: () => ({
      ...state,
      isFetchingStatusQueue: false,
      error: null,
      queue: action.queue
    })
  };

  return actionMap[action.type] ? actionMap[action.type]() : state;
};


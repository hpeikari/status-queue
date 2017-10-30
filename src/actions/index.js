import * as utils from '../utils/utils.js';
import { STUB_DATA } from './STUB_DATA';

export const STORE_STATUS_QUEUE_ACTION = 'scenario-status-queue/STORE_STATUS_QUEUE';
export const FETCHING_STATUS_QUEUE_ACTION = 'scenario-status-queue/FETCHING_STATUS_QUEUE';
export const ERROR_FETCH_STATUS_QUEUE_ACTION = 'scenario-status-queue/ERROR_FETCH_STATUS_QUEUE';

export const fetchingScenarioStatusQueue = () => ({
  type: FETCHING_STATUS_QUEUE_ACTION
});

export const storeScenarioStatusQueue = data => ({
  type: STORE_STATUS_QUEUE_ACTION,
  queue: data.queueArray || STUB_DATA || [] // TODO remove stubs when api is hooked up
});

export const failedFetchingScenarioStatusQueue = error => ({
  type: ERROR_FETCH_STATUS_QUEUE_ACTION,
  error
});

export const fetchScenarioStatusQueue = () => (dispatch, getState) => {
  dispatch(fetchingScenarioStatusQueue);
  return fetch(`${utils.getApiUrl()}/users/5`, { // TODO , change to a valid api url
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${utils.getAuthToken(getState())}`
    }
  })
  .then(res => res.json())
  .then(res => dispatch(storeScenarioStatusQueue(res)))
  .catch(err => {
    console.warn('[scenario-status-queue] - The api call failed: ', err);
    return dispatch(failedFetchingScenarioStatusQueue(err))
  })
};

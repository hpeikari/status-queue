import {
  // action creators
  fetchScenarioStatusQueue,
  fetchingScenarioStatusQueue,
  storeScenarioStatusQueue,
  failedFetchingScenarioStatusQueue,
  // action types
  STORE_STATUS_QUEUE_ACTION,
  FETCHING_STATUS_QUEUE_ACTION,
  ERROR_FETCH_STATUS_QUEUE_ACTION
} from '../src/actions';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import { STUB_DATA } from '../src/actions/STUB_DATA';
import { getApiUrl } from '../src/utils/utils';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('___API CALLS___', () => {
  let requester;
  let payload = {
    queueArray: [
      {scenarioName: 'name 1', time: '11:42:44'},
      {modelName: 'name 2', status: 'complete'},
      {modelName: 'name 3', status: 'complete', time: '01:12:34'}
    ]
  };

  // TODO : This test should be updated once the actual api is hooked up
  it('should fetch scenario status queue', (done) => {
    const expectedActions = [
      {
        type: STORE_STATUS_QUEUE_ACTION,
        queue: payload.queueArray
      }
    ];

    fetchMock.mock(`${getApiUrl()}/users/5`, { queueArray: payload.queueArray });

    const store = mockStore({});

    return store.dispatch(fetchScenarioStatusQueue()).then(() => {
      const resultActions = store.getActions();
      expect(resultActions[0]).toEqual(expectedActions[0]);
      done();
    });
  });

  // TODO : This test should be updated once the actual api is hooked up
  it('should create an action from "storeScenarioStatusQueue"', () => {
    const result = storeScenarioStatusQueue(payload);
    expect(result).toEqual({
      type: STORE_STATUS_QUEUE_ACTION,
      queue: payload.queueArray
    });
  });

  it('should create an action from "fetchingScenarioStatusQueue"', () => {
    const result = fetchingScenarioStatusQueue();
    expect(result).toEqual({
      type: FETCHING_STATUS_QUEUE_ACTION
    });
  });

  it('should create an action from "failedFetchingScenarioStatusQueue"', () => {
    const error = "Some error message!";
    const result = failedFetchingScenarioStatusQueue(error);
    expect(result).toEqual({
      type: ERROR_FETCH_STATUS_QUEUE_ACTION,
      error
    });
  });
});

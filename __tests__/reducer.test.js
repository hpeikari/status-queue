import {
  STORE_STATUS_QUEUE_ACTION,
  FETCHING_STATUS_QUEUE_ACTION,
  ERROR_FETCH_STATUS_QUEUE_ACTION,
  fetchScenarioStatusQueue
} from '../src/actions';

import reducer from '../src/reducers';

describe('___Package Reducers___', () => {

  describe('NON_EXISTENT_ACTION', () => {
    it('should return the default state', () => {
      const dummyAction = { type: 'NON_EXISTENT_ACTION' };
      expect(typeof reducer(undefined, dummyAction)).toEqual('object');
      expect(reducer(undefined, dummyAction)).toEqual({});
      expect(reducer({key: 'value'}, dummyAction)).toEqual({key: 'value'});
    });
  });

  describe('FETCHING_STATUS_QUEUE_ACTION', () => {
    it('should set "isFetchingStatusQueue" to true', () => {
      expect(reducer({}, { type: FETCHING_STATUS_QUEUE_ACTION }).isFetchingStatusQueue).toEqual(true);
    });
  });

  describe('STORE_STATUS_QUEUE_ACTION', () => {
    it('should set "isFetchingStatusQueue" to false', () => {
      expect(reducer({ isFetchingStatusQueue: 'true' }, { type: STORE_STATUS_QUEUE_ACTION }).isFetchingStatusQueue).toEqual(false);
    });

    it('should set "error" to null', () => {
      expect(reducer({ error: 'some error' }, { type: STORE_STATUS_QUEUE_ACTION }).error).toBeNull();
    });

    it('should set "queue" array', () => {
      const action = {
        type: STORE_STATUS_QUEUE_ACTION,
        queue: [
          {scenarioName: 'name 1', time: '11:42:44'},
          {modelName: 'name 2', status: 'complete'},
          {modelName: 'name 3', status: 'complete', time: '01:12:34'}
        ]
      };
      expect(reducer({}, action).queue).toEqual(
        [
          {scenarioName: 'name 1', time: '11:42:44'},
          {modelName: 'name 2', status: 'complete'},
          {modelName: 'name 3', status: 'complete', time: '01:12:34'}
        ]
      );
    });
  });

  describe('ERROR_FETCH_STATUS_QUEUE_ACTION', () => {
    it('should set "error"', () => {
      expect(reducer({ error: null }, { type: ERROR_FETCH_STATUS_QUEUE_ACTION }).error).not.toBeNull();
    });
    it('should set "isFetchingStatusQueue" to false', () => {
      expect(reducer({ isFetchingStatusQueue: 'true/false' }, { type: ERROR_FETCH_STATUS_QUEUE_ACTION }).isFetchingStatusQueue).toEqual(false);
    });
    it('should set "queue" array to []', () => {
      expect(reducer({ queue: [{time:''},{scenarioName:''}]}, { type: ERROR_FETCH_STATUS_QUEUE_ACTION }).queue).toEqual([]);
    });
  });
});

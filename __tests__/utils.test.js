import * as utils from '../src/utils/utils';

describe('___UTILS___', () => {
  const tokenId = 'some-token';
  const initialState = {
    auth: {
      token: tokenId
    }
  }

  it('should return correct oauth token from "getAuthToken"', () => {
    // TODO update this test accordingly
    const result = utils.getAuthToken(initialState);
    expect(result).toEqual(tokenId);
  });

  it('should return correct url from "getApiUrl"', () => {
    // TODO update urls once they are finalized
    const result = utils.getApiUrl();
    expect(result).toEqual('https://jsonplaceholder.typicode.com');
  });
});

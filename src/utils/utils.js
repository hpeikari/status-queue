export const getAuthToken = (state) => {
  return (state.auth && state.auth.token) || 'TODO';
}

export const getApiUrl = () => {
  // based on the environment we could hit diff server endpoints
  const env = (process && process.env && process.env.NODE_ENV) || 'Not Defined';
  console.info('[scenario-status-queue] --> env: ', env);

  // TODO: apiUrl needs to be updated
  return (env === 'production') ?
    'https://jsonplaceholder.typicode.com' :
    'https://jsonplaceholder.typicode.com';
}

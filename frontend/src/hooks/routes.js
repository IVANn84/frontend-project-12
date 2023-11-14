const apiPatch = '/api/v1';

export default {
  loginPath: () => [apiPatch, 'login'].join('/'),
  usersPath: () => [apiPatch, 'data'].join('/'),
};

// '/api/v1/login'

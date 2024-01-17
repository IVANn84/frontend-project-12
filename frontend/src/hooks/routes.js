const apiPatch = '/api/v1';

export default {
  loginPath: () => [apiPatch, 'login'].join('/'),
  usersPath: () => [apiPatch, 'data'].join('/'),
  chatPagePath: '/',
  chatPageLogin: '/login',
  chatPageNoFound: '*',
};

// '/api/v1/login'

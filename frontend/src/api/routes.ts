const a = '/auth';
const g = '/public';

export const publicPaths = {
  login: g + '/login',
  register: g + '/register',
  logout: g + '/logout'
};

export const authPaths = {
  employees: a + '/employees',
  roles: a + '/roles',
  tags: a + '/tags',
  teams: a + '/teams',
  accesstoken: a + '/accesstoken',
  accounts: a + '/accounts'
}

export default {
  publicPaths, authPaths
}

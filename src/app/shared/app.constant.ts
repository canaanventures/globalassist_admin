export const CONST = Object.freeze({
  SESSION_NAME: 'jobportal',
  VERSION: '',
  PATH: {
    LOGIN: {
      SELF: 'login',
      TITLE: 'login'
    },
    // For User Module
    USER: {
      SELF: '',
      HOME: {
        SELF: 'home',
        TITLE: 'home'
      },

      REGISTER: {
        SELF: 'register',
        TITLE: 'register'
      },
      FORGET_PASSWORD: {
        SELF: 'forgetpassword',
        TITLE: 'forgetpassword'
      },
      PROFILE: {
        SELF: 'profile',
        TITLE: 'profile'
      },
      ADDUSERS: {
        SELF: 'addusers',
        TITLE: 'addusers'
      }
    },

    // For Admin Module
    ADMIN: {
      SELF: 'admin',
      DASHBOARD: {
        SELF: 'dashboard',
        TITLE: 'dashboard'
      },
      PROFILE: {
        SELF: 'profile',
        TITLE: 'profile'
      }
    }
  }
});

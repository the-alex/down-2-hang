import axios from 'axios';

const Auth = {
  initialize: function() {
    const storedState = localStorage.getItem('auth');
    this.username = storedState? storedState : '';
  },
  username: '',
  authenticate: function(username, password) {
    return axios.post('/api/users/login', {username, password}).then(result => {
      if (result.status === 200) {
        this.username = username;
      }
      this.saveState();
      return this.isAuthenticated();
    });
  },
  logout: function() {
    this.username = '';
    this.saveState();
  },
  isAuthenticated: function() {
    return this.username.length > 0;
  },
  saveState: function() {
    localStorage.setItem('auth', this.username);
  },
};

Auth.initialize();

export default Auth;

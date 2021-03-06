import Http from './http';

// const URL = 'http://192.168.1.10:3000';
// const URL = 'http://192.168.1.17:3000';
const URL='http://10.0.0.9:3000';
// const URL = 'http://192.168.1.28:3000';
//  const URL = 'http://86.43.98.198:3000';

class Api extends Http {

  constructor(url, tokenSource) {
    console.log("\n\n**************************constructing api instance\n\n");
    super(url, tokenSource);
  }

  getCategories() {
    return (
      this.get('/categories')
    );
  }

  getProvidersByCategory(category) {
    return (
      this.get('/providers/category/', [{ category }])
    )
  }

  getMessages(jobID) {
    return (
      this.get(`/jobs/${jobID}/messages`)
    );
  }

  loginWithFb(fbAccessToken) {
    return this.post('/auth/facebook', { fbAccessToken });
  }

  login(email, password) {
    return this.post('/auth/login', { email, password });
  }

  register(registerForm) {
    return this.post('/auth/register', { registerForm });
  }

  requestJob(jobRequest) {
    return this.post('/jobs/', { ...jobRequest });
  }

}

export default api = new Api(URL, 'userAuthToken');
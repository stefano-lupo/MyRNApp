import Request from './request';

const URL = 'http://192.168.1.10:3000';
let request = new Request();

class Api {

  static fetchCategories() {
    return (
      request.get('/categories')
    );
  }

  static fetchProvidersByCategory(category) {
    return (
      request.get('/providers/category/', [{ category }])
    )
  }

  static logIn() {
    console.log("Logged in ");
  }

}

export default Api;
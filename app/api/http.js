import { store } from '../../App';

class Http {

  constructor(URL, tokenSource) {
    this.url = URL;
    this.tokenSource = tokenSource;
    console.log(`\n\n**************************Constructing http, type = ${tokenSource}\n\n`);
  }

  getHeaders() {
    const account = store.getState().get('account');
    const user = store.getState().get('user');
    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };

    if(this.tokenSource === 'fbAccessToken') {
      headers.Authorization = `OAuth ${account.get(this.tokenSource)}`;
    } else if(this.tokenSource === 'accountAuthToken') {
      headers['x-access-token'] = account.get(this.tokenSource);
    } else {
      headers['x-access-token'] = user.get(this.tokenSource);
    }
    return headers;
  }

  get(endpoint, params = []) {

    params.map((paramObj) => {
      Object.keys(paramObj).map((paramKey) => {
        endpoint += '?' + encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramObj[paramKey]) + '&';
      })
    });

    return fetch(`${this.url}${endpoint}`,{method: "GET", headers: this.getHeaders()})
      .then(function(response) {
        return response.json();
      }
    )
    .catch(err => console.log(err));
  }

  post(endpoint, body) {
    //console.log(`Posting ${this.url+endpoint}`);
    return fetch(this.url+endpoint,
      {
        headers: this.getHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
      }
    ).then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
  }
}

export default Http;
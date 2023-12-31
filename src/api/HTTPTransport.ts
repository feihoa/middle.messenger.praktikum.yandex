import { HOST } from "../constants";

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method?: METHODS;
  timeout?: number;
  data?: { [key: string]: string | string[] };
  file?: FormData;
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

function queryStringify(data: { [key: string]: string }) {
  const queryString = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
  return queryString ? `?${queryString}` : '';
}

export class HTTPTransport {

  private apiUrl: string;

  constructor(apiPath: string) {
    this.apiUrl = `${HOST}${apiPath}`;
  }

  get: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options, method: METHODS.GET,
    }, options.timeout);
  };

  put: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options, method: METHODS.PUT,
    }, options.timeout);
  };

  post: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options, method: METHODS.POST,
    }, options.timeout);
  };

  delete: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options, method: METHODS.DELETE,
    }, options.timeout);
  };

  request(url: string, options: Options, timeout = 5000) {
    const { method, data, file } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.withCredentials = true;
      if (method === METHODS.GET && data && !Array.isArray(data)) {

        xhr.open(method, url + queryStringify(data as { [key: string]: string }));

      } else {
        xhr.open(method as METHODS, url);
        if (data) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
      }

      xhr.onload = function () {
        let response = this.responseText;
        try {
          response = JSON.parse(this.responseText);
        } catch (error) { /* empty */ }
        finally {
          resolve(response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      setTimeout(() => xhr.abort(), timeout);

      if (method === METHODS.GET) {
        xhr.send();
      } else if (file) {
        xhr.send(file);
      } else {
        xhr.send(JSON.stringify(data));
      }

    }).catch(err => { throw err });
  }
}

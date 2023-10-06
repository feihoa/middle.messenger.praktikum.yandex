enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method?: METHODS;
  timeout?: number;
  data?: { [key: string]: string };
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

function queryStringify(data: { [key: string]: string }) {
  const queryString = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
  return queryString ? `?${queryString}` : '';
}

class HTTPTransport {

  get: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(url, {
      ...options, method: METHODS.GET,
      data: undefined
    }, options.timeout);
  };
  put: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(url, {
      ...options, method: METHODS.PUT,
      data: undefined
    }, options.timeout);
  };

  post: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(url, {
      ...options, method: METHODS.POST,
      data: undefined
    }, options.timeout);
  };

  delete: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(url, {
      ...options, method: METHODS.DELETE,
      data: undefined
    }, options.timeout);
  };

  request(url: string, options: Options, timeout = 5000) {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      console.log(method, url + queryStringify(data!))

      if (method === METHODS.GET && data) {

        xhr.open(method, url + queryStringify(data));

      } else {
        xhr.open(method as METHODS, url);
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      setTimeout(() => xhr.abort(), timeout);

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    }).catch(err => console.error(err));
  }
}

console.log(new HTTPTransport().get('', {data: {key: 'value'}})); 

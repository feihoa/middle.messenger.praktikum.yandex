import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { HTTPTransport, METHODS, queryStringify } from "./HTTPTransport"
import { assert, expect } from "chai";

describe('HTTPTransport', () => {
  it('data правильно преобразуется в query', async () => {

    const res = queryStringify({ a: '1', b: '2' });

    const expectedUrl = `?a=1&b=2`;

    expect(expectedUrl).to.be.eq(res);
  })

  it('GET метод должен передавать в реквест соответствующие url и options', async () => {
    const http = new HTTPTransport('/test');

    const requestStub = sinon.stub(http, 'request').resolves();

    await http.get('/test', { data: { a: '1', b: '2' } });

    expect(requestStub.calledWithMatch('/test/test', { method: METHODS.GET, data: { a: '1', b: '2' } })).to.be.true;
  })

  it('POST метод должен передавать в реквест соответствующие url и options', async () => {
    const http = new HTTPTransport('/test');

    const requestStub = sinon.stub(http, 'request').resolves();

    await http.post('/test', { data: { a: '1', b: '2' } });

    expect(requestStub.calledWithMatch('/test/test', { method: METHODS.POST, data: { a: '1', b: '2' } })).to.be.true;
  })

  it('PUT метод должен передавать в реквест соответствующие url и options', async () => {
    const http = new HTTPTransport('/test');

    const requestStub = sinon.stub(http, 'request').resolves();

    await http.put('/test', { data: { a: '1', b: '2' } });

    expect(requestStub.calledWithMatch('/test/test', { method: METHODS.PUT, data: { a: '1', b: '2' } })).to.be.true;
  })

  it('DELETE метод должен передавать в реквест соответствующие url и options', async () => {
    const http = new HTTPTransport('/test');

    const requestStub = sinon.stub(http, 'request').resolves();

    await http.delete('/test', { data: { a: '1', b: '2' } });

    expect(requestStub.calledWithMatch('/test/test', { method: METHODS.DELETE, data: { a: '1', b: '2' } })).to.be.true;
  })

})

describe('Метод request', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];
  before(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = (request) => {
      requests.unshift(request);
    };
  });

  after(() => {
    xhr.restore();
  });

  it('Должен отправить Get запрос', (done) => {
    const url = '/test';
    const options = {
      method: METHODS.GET,
    };

    const http = new HTTPTransport('/test');

    http.request(url, options).then((response) => {
      assert.isNotNull(response);

      assert.deepEqual(JSON.stringify(response), JSON.stringify({ message: 'Success' }));

      done();
    }).catch(done);

    requests[0].respond(200, { }, JSON.stringify({ message: 'Success' }));

    expect(requests[0].method).to.equal(METHODS.GET);
    expect(requests[0].url).to.equal('/test');
    expect(requests).to.have.lengthOf(1);
  }).timeout(5000);

  it('Должен отправить Post запрос', (done) => {
    const url = '/test';
    const options = {
      method: METHODS.POST,
      data: { key: 'value' },
    };

    const http = new HTTPTransport('/test');

    http.request(url, options).then((response) => {
      assert.isNotNull(response);

      assert.deepEqual(JSON.stringify(response), JSON.stringify({ message: 'Success' }));

      done();
    }).catch(done);
    requests[0].respond(200, { 'Content-Type': 'application/json;charset=utf-8' }, JSON.stringify({ message: 'Success' }));


    expect(requests[0].method).to.equal(METHODS.POST);
    expect(requests[0].url).to.equal('/test');
    expect(requests[0].requestHeaders['Content-Type']).to.equal('application/json;charset=utf-8');
    expect(requests[0].requestBody).to.equal(JSON.stringify(options.data));
    expect(requests).to.have.lengthOf(2);
  });

});

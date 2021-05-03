import { Request, Response } from 'express';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
  RequestMethod,
  Body,
} from 'node-mocks-http';

type ReqHandlerParams = [MockRequest<Request>, MockResponse<Response>];

export interface Mock {
  reqHandlerParams: ReqHandlerParams;
  body: Body;
  status: number;
  params: (params: Body) => Mock;
}

class MockHttp {
  private request(method: RequestMethod, url: string, body?: Body): Mock {
    return {
      reqHandlerParams: [
        createRequest({
          method,
          url,
          body,
        }),
        createResponse(),
      ] as ReqHandlerParams,

      get body() {
        return this.reqHandlerParams[1]._getJSONData() as Body;
      },

      get status(): number {
        return this.reqHandlerParams[1].statusCode;
      },

      params(params): Mock {
        Object.assign(this.reqHandlerParams[0].params, params);
        return this;
      },
    };
  }

  get(url: string) {
    return this.request('GET', url);
  }

  post(url: string, body: Body) {
    return this.request('POST', url, body);
  }

  put(url: string, body: Body) {
    return this.request('PUT', url, body);
  }

  patch(url: string, body: Body) {
    return this.request('PATCH', url, body);
  }

  del(url: string) {
    return this.request('DELETE', url);
  }
}

export default new MockHttp();

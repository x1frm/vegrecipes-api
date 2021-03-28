import { Request, Response } from 'express';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
  RequestMethod,
  Body,
} from 'node-mocks-http';

type ReqResArray = [MockRequest<Request>, MockResponse<Response>];

export interface Mock {
  mock: ReqResArray;
  body: Body;
  status: number;
  params: (params: Body) => Mock;
}

class MockHttp {
  private request(method: RequestMethod, url: string, body?: Body): Mock {
    return {
      mock: [
        createRequest({
          method,
          url,
          body,
        }),
        createResponse(),
      ] as ReqResArray,

      get body() {
        return this.mock[1]._getJSONData() as Body;
      },

      get status(): number {
        return this.mock[1].statusCode;
      },

      params(params): Mock {
        Object.assign(this.mock[0].params, params);
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

  del(url: string) {
    return this.request('DELETE', url);
  }
}

export default new MockHttp();

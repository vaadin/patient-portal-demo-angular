import {
  Http,
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Headers
} from '@angular/http';
import { Observable } from 'rxjs';
/**
 * Adds 'Authorization' headers to all requests if available.
 */
export class AuthHttp extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  // For some reason it's not enough to override this, needed to override
  // all methods
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, this.addHeaders(options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.addHeaders(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, this.addHeaders(options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(url, body, this.addHeaders(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.addHeaders(options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.patch(url, body, this.addHeaders(options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.head(url, this.addHeaders(options));
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.options(url, this.addHeaders(options));
  }

  private addHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    const token = localStorage.getItem('token_id');
    if (token) {
      if (options == null) {
        options = new RequestOptions();
      }
      if (options.headers == null) {
        options.headers = new Headers();
      }
      options.headers.append('Authorization', `Bearer ${token}`);
    }
    return options;
  }
}

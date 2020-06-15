import { TestBed, async, inject } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModelsComponent, Error, User, Course, Video} from '../models/models.component';

describe('HttpService', () => {
  let service: HttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [
    		HttpClientTestingModule
    	],
    	providers: [
    		HttpService
    	]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getuserAct function', async(inject([HttpTestingController, HttpService], (httpClient: HttpTestingController, serviceI: HttpService) => {
    const mockUserAct = new User();
    mockUserAct.given_name = "Bob";
    mockUserAct.authlvl = 1;
    mockUserAct.picture ="dfsffd";

    serviceI.getUserAct(1).subscribe(us => {
        expect(us).toEqual(mockUserAct);
    });

    const mockReq = httpClient.expectOne(ModelsComponent.api + ModelsComponent.version + 'users/' + 1);

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(mockUserAct);

    httpClient.verify();
  })));
});

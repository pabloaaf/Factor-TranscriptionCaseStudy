import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCallbackComponent } from './login-callback.component';
import { HttpService } from '../../../globals/helpers/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from "@angular/router";
import { convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('LoginCallbackComponent', () => {
  let component: LoginCallbackComponent;
  let fixture: ComponentFixture<LoginCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCallbackComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, ],
      providers: [ HttpService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of( convertToParamMap( { code: 1 } ) ),
            queryParamMap: of( convertToParamMap( { code: 1 } ) ),
            parent: {
              params: {
                code: 1
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

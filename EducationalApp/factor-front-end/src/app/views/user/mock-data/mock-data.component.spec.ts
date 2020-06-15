import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDataComponent } from './mock-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MockDataComponent', () => {
  let component: MockDataComponent;
  let fixture: ComponentFixture<MockDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockDataComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

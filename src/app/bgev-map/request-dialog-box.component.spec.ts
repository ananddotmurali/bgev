import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDialogBoxComponent } from './request-dialog-box.component';

describe('RequestDialogBoxComponent', () => {
  let component: RequestDialogBoxComponent;
  let fixture: ComponentFixture<RequestDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

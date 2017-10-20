import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRedirectComponent } from './password-redirect.component';

describe('PasswordRedirectComponent', () => {
  let component: PasswordRedirectComponent;
  let fixture: ComponentFixture<PasswordRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

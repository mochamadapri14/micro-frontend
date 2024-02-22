import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLandingPageComponent } from './employee-landing-page.component';

describe('EmployeeLandingPageComponent', () => {
  let component: EmployeeLandingPageComponent;
  let fixture: ComponentFixture<EmployeeLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLandingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

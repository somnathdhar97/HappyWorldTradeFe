import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvestmentComponent } from './new-investment.component';

describe('NewInvestmentComponent', () => {
  let component: NewInvestmentComponent;
  let fixture: ComponentFixture<NewInvestmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInvestmentComponent]
    });
    fixture = TestBed.createComponent(NewInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

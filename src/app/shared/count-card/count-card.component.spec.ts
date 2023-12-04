import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountCardComponent } from './count-card.component';

describe('CountCardComponent', () => {
  let component: CountCardComponent;
  let fixture: ComponentFixture<CountCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountCardComponent]
    });
    fixture = TestBed.createComponent(CountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

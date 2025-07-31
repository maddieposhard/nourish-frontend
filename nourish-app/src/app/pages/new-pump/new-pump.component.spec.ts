import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPumpComponent } from './new-pump.component';

describe('NewPumpComponent', () => {
  let component: NewPumpComponent;
  let fixture: ComponentFixture<NewPumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPumpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralizedContainer } from './centralized-container';

describe('CentralizedContainer', () => {
  let component: CentralizedContainer;
  let fixture: ComponentFixture<CentralizedContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralizedContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralizedContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

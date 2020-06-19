import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardChainingComponent } from './backward-chaining.component';

describe('BackwardChainingComponent', () => {
  let component: BackwardChainingComponent;
  let fixture: ComponentFixture<BackwardChainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackwardChainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardChainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

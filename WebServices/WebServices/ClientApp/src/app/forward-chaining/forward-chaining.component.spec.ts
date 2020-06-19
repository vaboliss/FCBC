import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardChainingComponent } from './forward-chaining.component';

describe('ForwardChainingComponent', () => {
  let component: ForwardChainingComponent;
  let fixture: ComponentFixture<ForwardChainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardChainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardChainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncerComponent } from './annoncer.component';

describe('AnnoncerComponent', () => {
  let component: AnnoncerComponent;
  let fixture: ComponentFixture<AnnoncerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

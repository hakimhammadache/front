import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecolisComponent } from './listecolis.component';

describe('ListecolisComponent', () => {
  let component: ListecolisComponent;
  let fixture: ComponentFixture<ListecolisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListecolisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListecolisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

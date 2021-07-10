import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutercolisComponent } from './ajoutercolis.component';

describe('AjoutercolisComponent', () => {
  let component: AjoutercolisComponent;
  let fixture: ComponentFixture<AjoutercolisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutercolisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutercolisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

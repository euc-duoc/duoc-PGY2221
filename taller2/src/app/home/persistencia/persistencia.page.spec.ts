import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersistenciaPage } from './persistencia.page';

describe('PersistenciaPage', () => {
  let component: PersistenciaPage;
  let fixture: ComponentFixture<PersistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

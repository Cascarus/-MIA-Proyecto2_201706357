import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasUsuariosComponent } from './denuncias-usuarios.component';

describe('DenunciasUsuariosComponent', () => {
  let component: DenunciasUsuariosComponent;
  let fixture: ComponentFixture<DenunciasUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenunciasUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciasUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

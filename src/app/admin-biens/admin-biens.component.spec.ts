import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBiensComponent } from './admin-biens.component';

describe('AdminBiensComponent', () => {
  let component: AdminBiensComponent;
  let fixture: ComponentFixture<AdminBiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBiensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

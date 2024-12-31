import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselDialogComponent } from './vessel-dialog.component';

describe('VesselDialogComponent', () => {
  let component: VesselDialogComponent;
  let fixture: ComponentFixture<VesselDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VesselDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesselDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

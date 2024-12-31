import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { MaterialModule } from './material/material.module';
import { VesselDialogComponent } from './components/vessel-dialog/vessel-dialog.component';

@NgModule({
  declarations: [
    MapComponent,
    VesselDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MapComponent,
    VesselDialogComponent
  ]
})
export class SharedModule { }

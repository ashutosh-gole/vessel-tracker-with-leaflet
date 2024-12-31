import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vessel-dialog',
  standalone: false,
  templateUrl: './vessel-dialog.component.html',
  styleUrl: './vessel-dialog.component.scss'
})
export class VesselDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VesselDialogComponent>
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

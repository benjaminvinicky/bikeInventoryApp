import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../bike-table/bike-table.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikeService } from '../../services/bike.service';
import { Bike } from '../bike.model';
import { tap } from 'rxjs';

@Component({
  selector: 'lib-bike-details',
  templateUrl: './bike-details.component.html',
  styleUrl: './bike-details.component.scss'
})

export class BikeDetailsComponent {
  bikeForm: FormGroup;
  stringLabel: "Enter valid string";
  numberLabel: "Enter valid number";

  get f(): { [key: string]: AbstractControl } {
    return this.bikeForm.controls;
  }
  constructor(
    public dialogRef: MatDialogRef<BikeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly fb: FormBuilder,
    private readonly bikeService: BikeService,
  ) {
    this.bikeForm = this.fb.group({
      name: [data?.bike?.name??'', [Validators.required]],
      type: [data?.bike?.type??'', [Validators.required]],
      description: [data?.bike?.description??'', [Validators.required]],
      price: [data?.bike?.price??'', [Validators.required]],
      wheelName: [data?.bike?.wheelName??'', [Validators.required]],
      wheelSize: [data?.bike?.wheelSize??'', [Validators.required]],
      frameName: [data?.bike?.frameName??'', [Validators.required]],
      frameSize: [data?.bike?.frameSize??'', [Validators.required]],
      frameWeight: [data?.bike?.frameWeight??'', [Validators.required]],
      stock: [data?.bike?.stock??'', [Validators.required]],
      orderAvailabilityId: [data?.bike?.orderAvailabilityId??'', [Validators.required]],
      imageUrl: [data?.bike?.imageUrl??'', [Validators.required]],
    });
  };

  submitForm(value: Bike): void {
    if(this.data.edit) {
      value.id = this.data.bike?.id as string;
      this.bikeService.update(value).pipe(
        tap(() => {
          this.dialogRef.close();
        })
      ).subscribe();
    } else {
      this.bikeService.create(value).pipe(
        tap(() => {
          this.dialogRef.close();
        })
      ).subscribe();
    }
  }
}

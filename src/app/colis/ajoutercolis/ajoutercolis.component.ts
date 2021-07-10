import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ColisService } from '../colis.service';

@Component({
  selector: 'app-ajoutercolis',
  templateUrl: './ajoutercolis.component.html',
  styleUrls: ['./ajoutercolis.component.scss']
})
export class AjoutercolisComponent implements OnInit {
formdata:FormGroup;
  constructor(private colis:ColisService) { }

  get parcels() {
    console.log(this.formdata.value.parcels)
    return this.formdata.value.parcels 
  }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      tracking: new FormControl(),
      parcels: new FormArray([
        new FormGroup({
          weight: new FormControl(0),
          length: new FormControl(0),
          width: new FormControl(0),
          height: new FormControl(0),
          quantity: new FormControl(0),
        })
      ])
  })

}
  newColis(){
    const express_reg = new RegExp(/^yal-\d{4}\w{2}$/i);
    const data = this.formdata.value;

    const colisEnv = this.colis.addcolis(data).subscribe()
    if (colisEnv) {
      alert('Succes')
    } else {
      alert('Echec')
    }
  }


  addParcel() {
    console.log(this.formdata.get('parcels'), this.formdata.value.parcels);
    (this.formdata.get('parcels') as FormArray).push(
      new FormGroup({
        weight: new FormControl(0),
        length: new FormControl(0),
        width: new FormControl(0),
        height: new FormControl(0),
        quantity: new FormControl(0),
      })
    )
  }

  deleteParcel(index) {
    console.log(index, this.formdata.get('parcels'), this.formdata.value.parcels);
    (this.formdata.get('parcels') as FormArray).removeAt(index)
  }
}


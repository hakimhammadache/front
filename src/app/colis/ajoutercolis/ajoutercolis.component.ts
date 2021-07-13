import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColisService } from '../colis.service';

@Component({
  selector: 'app-ajoutercolis',
  templateUrl: './ajoutercolis.component.html',
  styleUrls: ['./ajoutercolis.component.scss']
})
export class AjoutercolisComponent implements OnInit {
formdata:FormGroup;
cost:number = 0;
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
          weight: new FormControl(0, Validators.required),
          length: new FormControl(0, Validators.required),
          width: new FormControl(0, Validators.required),
          height: new FormControl(0, Validators.required),
          quantity: new FormControl(1, Validators.required),
        })
      ])
  })
}
  calculateOverweight(){
    const express_reg1 = new RegExp(/^yal-\d{4}\w{2}$/i);
    const express_reg2 = new RegExp(/^yal-\d{3}\w{3}$/i);
    if (express_reg1.test(this.formdata.value['tracking']) || express_reg2.test(this.formdata.value['tracking'])){
    const data = this.formdata.value;
   this.colis.addcolis(data).subscribe(
     (res)=>{
       this.cost= res.cost
     }
   )
  }else{
  return alert('format tracking error')
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
  validateShipment(){}
}


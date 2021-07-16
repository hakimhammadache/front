import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { IAlert } from 'src/app/interfaces/alert.interface';
import { ColisService } from '../colis.service';
import { NgbAlert, NgbAlertConfig, NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';



@Component({
  selector: 'app-detailcolis',
  templateUrl: './detailcolis.component.html',
  styleUrls: ['./detailcolis.component.scss']
})
export class DetailcolisComponent implements OnInit {
  formdata: FormGroup;
  colis: any
  private _success = new Subject<string>();

  alert: IAlert
  @ViewChild('ngbAlert', { static: false }) ngbAlert: NgbAlert;

  route: ActivatedRouteSnapshot



  constructor(
    private modalService: NgbModal,
    private colisService: ColisService,
    alertConfig: NgbAlertConfig,
    _route: ActivatedRoute
  ) {
    this.route = _route.snapshot
    this.alert = { type: '', message: '', dismissible: true }
    alertConfig.animation = true;

    this._success.pipe(debounceTime(5000)).subscribe(() => {
      console.log(this.ngbAlert, this.alert)
      this.alert = { ...this.alert, type: '' }
      if (this.ngbAlert) {
        this.ngbAlert.close();
      }
    });
    this.formdata = new FormGroup({
      tracking: new FormControl(),
      parcels: new FormArray([])
    });
    this.colis = {}
  }
  get parcels() {
    console.log(this.formdata.value.parcels)
    return this.formdata.value.parcels
  }

  ngOnInit(): void {
    
    this.colisService.getcolis(this.route.params.id).subscribe(colis => {
      this.colis = colis
      this.formdata.get('tracking').setValue(colis.tracking)
      for (const parcel of colis.parcels) {
        (this.formdata.get('parcels') as FormArray).push(
          new FormGroup({
            weight: new FormControl(parcel.weight),
            length: new FormControl(parcel.length),
            width: new FormControl(parcel.width),
            height: new FormControl(parcel.height),
            quantity: new FormControl(parcel.quantity),
          })
        )
      }
    })
    
  }
  calculateOverweight() {
    const express_reg1 = new RegExp(/^yal-\d{4}\w{2}$/i);
    const express_reg2 = new RegExp(/^yal-\d{3}\w{3}$/i);
    if (express_reg1.test(this.formdata.value['tracking']) || express_reg2.test(this.formdata.value['tracking'])) {
      const data = {
        ...this.formdata.value,
        id: this.colis.id
      };
      this.colisService.addcolis(data).subscribe(
        (res) => {
          this.colis = res
        }
      )
    } else {
      this.displayAlert({
        ...this.alert,
        type: 'danger',
        message: 'format ou les champs'
      })
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


  displayAlert(alert: IAlert) {
    this.alert = alert
    this._success.next();
  }
  
  print(){
    this.colisService.getTicketFile(this.colis.id)
  }

  valider() {
    this.colisService.validate(this.colis.id).subscribe({
      next: (colis) => this.colis = colis
    })
  }

  cancel() {
    this.colisService.cancel(this.colis.id).subscribe({
      next: (colis) => this.colis = colis
    })
  }

}



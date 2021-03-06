import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { IAlert } from 'src/app/interfaces/alert.interface';
import { ColisService } from '../colis.service';
import { NgbAlert, NgbAlertConfig, NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";




@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Prix a payé</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>{{prix}}</strong></p>
  </div>
   <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  @Input() prix;
  constructor(public modal: NgbActiveModal) { }
}


@Component({
  selector: 'app-ajoutercolis',
  templateUrl: './ajoutercolis.component.html',
  styleUrls: ['./ajoutercolis.component.scss']
})
export class AjoutercolisComponent implements OnInit {
  formdata: FormGroup;
  colis:any
  private _success = new Subject<string>();

  alert: IAlert
  @ViewChild('ngbAlert', { static: false }) ngbAlert: NgbAlert;


  constructor(
    private modalService: NgbModal,
    private colisService: ColisService,
    alertConfig: NgbAlertConfig
  ) {
    this.alert = { type: '', message: '', dismissible: true }
    alertConfig.animation = true;

    this._success.pipe(debounceTime(5000)).subscribe(() => {
      console.log(this.ngbAlert, this.alert)
      this.alert = { ...this.alert, type: '' }
      if (this.ngbAlert) {
        this.ngbAlert.close();
      }
    });
    this.colis = {}
  }
  get parcels() {
    console.log(this.formdata.value.parcels)
    return this.formdata.value.parcels
  }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      tracking: new FormControl(),
      parcels: new FormArray([
        new FormGroup({
          weight: new FormControl(0, [Validators.required]),
          length: new FormControl(0, Validators.required),
          width: new FormControl(0, Validators.required),
          height: new FormControl(0, Validators.required),
          quantity: new FormControl(1, Validators.required),
        })
      ])
    })
  }
  calculateOverweight() {
    const express_reg1 = new RegExp(/^yal-\d{4}\w{2}$/i);
    const express_reg2 = new RegExp(/^yal-\d{3}\w{3}$/i);
    if (express_reg1.test(this.formdata.value['tracking']) || express_reg2.test(this.formdata.value['tracking'])) {
      const data = this.formdata.value;
      this.colisService.addcolis(data).subscribe(
        (res) => {
          this.colis = res;
          
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
  openModal(prix) {
    const modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.prix = prix;
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



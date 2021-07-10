import { Component, OnInit } from '@angular/core';
import { ColisService } from '../colis.service';

@Component({
  selector: 'app-listecolis',
  templateUrl: './listecolis.component.html',
  styleUrls: ['./listecolis.component.scss']
})
export class ListecolisComponent implements OnInit {
  liste_colis:any;
  constructor(private colis:ColisService) {
   }
  ngOnInit(): void {
    this.getListColi()
  }
  getListColi(){
    this.colis.getList().subscribe(data => this.liste_colis = data)
  }
}

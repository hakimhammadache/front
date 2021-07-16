import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IPaginationState } from 'src/app/interfaces/paginate.interface';
import { UserService } from 'src/app/user/user.service';
import { ColisService } from '../colis.service';


@Component({
  selector: 'app-listecolis',
  templateUrl: './listecolis.component.html',
  styleUrls: ['./listecolis.component.scss']
})
export class ListecolisComponent implements OnInit {
  shipmentStatus = {
    CREATED: { text: 'Crée', color: 'info'},
    VALIDATED: { text: 'Validé', color: 'success' },
    CANCELED: { text: 'Annuler', color: 'danger' },
  }
  liste_colis: any;
  formsearch:FormGroup;
  paginationState: IPaginationState;
  constructor(private colis: ColisService, private userService: UserService, private authService: AuthService,private router:Router) {
    this.paginationState = {
      currentPage: 0,
      itemsPerPage: 10,
      sortBy: [['createdAt', 'DESC']],
      search: '',
      totalItems: 0,
      totalPages: 0
    }
    this.formsearch = new FormGroup({
      station: new FormControl(),
      date: new FormControl()
    })
   }
  ngOnInit() {
    this.getListColi()
  }
  getListColi(){

    return this.colis.getList(this.paginationState).subscribe((res:any) => {
      this.liste_colis = res.data
      this.paginationState = {...this.paginationState, ...res.meta}
      console.log(res.meta, this.paginationState)
    })
  }
  searchList(){
    const result = this.colis.search(this.formsearch.value)
    return result
  }
  isAdmin() {
    if (this.authService.isAuth['role'] === 'admin') {
      return true;
    }
    return false;
  }
  showDetail(id){
    this.router.navigateByUrl(`/colis/detail_colis/${id}`)
  }
  
}

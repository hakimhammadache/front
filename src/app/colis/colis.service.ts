import { Injectable, Query } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaginationState } from '../interfaces/paginate.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ColisService {
 
liste_colis:any;
  
  constructor(
    private http: HttpClient
  ) {}
  getList(queryData: IPaginationState){
    let query = new HttpParams()
    query = query.append('page', queryData.currentPage)
    query = query.append('limit', queryData.itemsPerPage)
    query = query.append('search', queryData.search)
    const res = this.http.get(`${environment.apiUrl}shipment`, {params: query})
    console.log(res)
    return res;
  }

  getcolis(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}shipment/${id}`)
  }
  addcolis(data ): Observable<any>{
    return this.http.post(`${environment.apiUrl}shipment`, data)
  }
  search(data){
    console.log(data)
   // return this.http.post(this.urlsearch, data)
  }

  getTicketFile(id){
    this.http.get(`${environment.apiUrl}shipment/${id}/print`, {responseType: 'blob'})
      .subscribe({
        next: response => this.openFile(response, "application/pdf"),
        error: (error) => console.log(error)
      })
  }

  openFile(data: any, type: string){
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if(!pwa || pwa.closed || typeof pwa.closed == 'undefined'){
      alert('Please disable your pop-up blocker and try again!')
    } 
  }

  validate(id) {
    return this.http.patch(`${environment.apiUrl}shipment/${id}/status`, { status: 'VALIDATED' })
  }

  cancel(id) {
    return this.http.patch(`${environment.apiUrl}shipment/${id}/status`, { status: 'CANCELED' })
  }

}

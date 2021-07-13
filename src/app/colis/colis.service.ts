import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ColisService {

liste_colis:any;
  url = 'http://localhost:3000/shipment';
  urlsearch = 'http://localhost:3000/shipment/search';
  
  constructor(
    private http: HttpClient
  ) {}
  getList(){
    const res = this.http.get(this.url)
    console.log(res)
    return res;
  }
  addcolis(data ): Observable<any>{
    return this.http.post(this.url, data)
  }
  search(data){
    console.log(data)
   // return this.http.post(this.urlsearch, data)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ColisService {

liste_colis:any;
  url = 'http://localhost:3000/delivray';
  constructor(
    private http: HttpClient
  ) {}
  getList(){
    const res = this.http.get(this.url)
    console.log(res)
    return res;
  }
  addcolis(data ): Observable<any>{
    const headers = { 'content-type': 'application/json' }
    return this.http.post(this.url, data)
  }
}

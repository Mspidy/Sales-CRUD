import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //four method for post,get,put,delete
  // services use with 3rd party   "https://www.npmjs.com/package/json-server"
  //http://localhost:3000/posts  ----> this is the url of the json 3rd party application used for web api's


  //here is the condition for all get , post, put, delete


  postSales(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getSales(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateSales(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteSales(id:number){
    return this.http.delete<any>("http://localhost:3000/posts"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

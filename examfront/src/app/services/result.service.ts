import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient) { }

  public getResults()
  {
    return this.http.get(`${baseUrl}/result/`);
  }

  public getResultByUser(userId:number){
    // return this.http.get()
  }
}

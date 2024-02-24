import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public  loadQuizStatus = new Subject<boolean>

  public getQuizzes()
  {
    return this.http.get(`${baseUrl}/quiz/`);
  }

  public getQuizById(id:any){
    return this.http.get(`${baseUrl}/quiz/${id}`)
  }

  public addQuiz(quiz:any)
  {
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(id:any){
    return this.http.delete(`${baseUrl}/quiz/${id}`)
  }

  public getAllActiveQuizes(){
    return this.http.get(`${baseUrl}/quiz/all/active/`)
  }

  public getActiveQuizesByCategory(cId:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cId}`)
  }

}

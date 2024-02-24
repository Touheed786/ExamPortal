import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public  startQuizStatus = new Subject<boolean>

  public getQuestionByQuizId(id:any){
    return this.http.get(`${baseUrl}/question/quiz/all/${id}`)
  }

  public getQuestionNoOfByQuizId(id:any){
    return this.http.get(`${baseUrl}/question/quiz/${id}`)
  }

  public getQuizById(id:any){
    return this.http.get(`${baseUrl}/quiz/${id}`)
  }

  public addQuestion(question:any){
    return this.http.post(`${baseUrl}/question/`,question)
  }

  public deleteQuestion(id:any){
    return this.http.delete(`${baseUrl}/question/${id}`)
  }

  public getQuestionById(id:any){
    return this.http.get(`${baseUrl}/question/${id}`)
  }

  public addResult(result:any)
  {
    return this.http.post(`${baseUrl}/result/`,result)
  }

  public evalQuiz(result:any,id:any)
  {
    return this.http.post(`${baseUrl}/question/eval_quiz/${id}`,result)
  }

}

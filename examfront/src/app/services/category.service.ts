import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public getCategories()
  {
    return this.http.get(`${baseUrl}/categories/`)    
  }

  public addCategory(category:any)
  {
    return this.http.post(`${baseUrl}/categories/`,category)
  }
  public updateCategory(category:any)
  {
    return this.http.put(`${baseUrl}/categories/`,category)
  }

  public deleteCategory(id:any)
  {
    return this.http.delete(`${baseUrl}/categories/${id}`)
  }

  public getCategoryById(id:any){
    return this.http.get(`${baseUrl}/categories/${id}`)
  }
}

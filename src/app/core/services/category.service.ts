import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/Category`;

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  update(id: string, data: { name: string; description?: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }
  
  getAll(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}
  add(data: { name: string; description: string }): Observable<any> {
  return this.http.post<any>(this.apiUrl, data);
}
}
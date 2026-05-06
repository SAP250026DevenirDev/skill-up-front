import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = 'https://localhost:7152/api/Skill';

  constructor(private http: HttpClient){}

  creerSkill(data: any): Observable<any>{
    return this.http.post(this.apiUrl, data);
  }
}

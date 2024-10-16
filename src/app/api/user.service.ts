import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }


  getProfileDetails() {
    return this.http.get('../../assets/data.json');
  }

  setSessionData(value: any, newValue: any) {
    return sessionStorage.setItem(value, JSON.stringify(newValue));
  }

  getSessionData(key: string) {
    return JSON.parse(sessionStorage.getItem(key) || '{}');
  }

}

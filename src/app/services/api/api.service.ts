import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private httpClient: HttpClient) { }
  getTodoList(): any {
    return this.httpClient.get('https://run.mocky.io/v3/dbf3c2ed-b184-4d91-87ae-b2cf9082588e');
  }
}

import { Injectable } from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api/login';

  constructor(private http: HttpClient) {}


}

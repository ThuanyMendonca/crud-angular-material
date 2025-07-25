import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../../models/brasilapi.model';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {

  baseUrl: string = 'https://brasilapi.com.br/api/';

  constructor(private http: HttpClient) { }

  listarUFs(): Observable<Estado[]>{
    const path = 'ibge/uf/v1';
    return this.http.get<Estado[]>(this.baseUrl + path);
  }
}

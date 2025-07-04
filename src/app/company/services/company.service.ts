import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  postAd(adDTO: FormData): Observable<any> {
    const userId = UserStorageService.getUserId();
    const headers = this.createAuthorizationHeader();

    return this.http.post(BASIC_URL + `api/company/ad/${userId}`, adDTO, { headers });
  }

  private createAuthorizationHeader(): HttpHeaders {
  const token = UserStorageService.getToken();
  if (token) {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  } else {
    console.warn('No token found in UserStorageService');
    return new HttpHeaders();
  }
}

}

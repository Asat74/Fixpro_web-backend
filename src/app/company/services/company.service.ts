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
  return this.http.post(BASIC_URL + `api/company/ad/${userId}`, adDTO, {
    headers: this.createAuthorizationHeader()
  });
  }

  getAllAdsByUserId(): Observable<any> {
  const userId = UserStorageService.getUserId();
  return this.http.get(BASIC_URL + `api/company/ads/${userId}`, {
    headers: this.createAuthorizationHeader()
  });
  }

  getAdById(adId:any): Observable<any> {
  return this.http.get(BASIC_URL + `api/company/ad/${adId}`, {
    headers: this.createAuthorizationHeader()
  });
  }

  updateAd(adId: any, formData: FormData): Observable<any>{
  return this.http.put(BASIC_URL + `api/company/ad/${adId}`, {
    headers: this.createAuthorizationHeader()
  });  
  }

  deleteAd(adId: any): Observable<any>{
  return this.http.delete(BASIC_URL + `api/company/ad/${adId}`, {
    headers: this.createAuthorizationHeader()
  });  
  }

  getAllAdBookings(): Observable<any> {
  const companyId = UserStorageService.getUserId();
  return this.http.get(BASIC_URL + `api/company/bookings/${companyId}`, {
    headers: this.createAuthorizationHeader()
  });
  }

  changeBookingStatus(bookingId:number,status:string): Observable<any> {
  return this.http.get(BASIC_URL + `api/company/bookings/${bookingId}/${status}`, {
    headers: this.createAuthorizationHeader()
  });
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

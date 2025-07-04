import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface Ad {
  id: number;
  description: string;
  returnedImg: string;
  price: number;
  serviceName: string;
  // Add other properties that match your API response
}

@Component({
  selector: 'app-all-ads',
  standalone: false,
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss'
})
export class AllAdsComponent {
deletedAd(arg0: any) {
throw new Error('Method not implemented.');
}
  ads:any;

  constructor(private companyService: CompanyService,
    private notification: NzNotificationService,
  ){}

  ngOnInit(){
    this.getAllAdsByUserId();
  }

  getAllAdsByUserId(){
  this.companyService.getAllAdsByUserId().subscribe({
    next: (res) => {
      console.log('[DEBUG] Ads data:', res);
      this.ads = res;
    },
    error: (err) => {
      console.error('[ERROR] Failed to fetch ads:', err);
    }
  });
}

  updateImg(img){
    return'data:image/jpeg;base64,' + img;
  }

  deleteAd(adId:any){
    this.companyService.deleteAd(adId).subscribe(res =>{
      this.notification
      .success(
        'SUCCESS',
        `Ad Deleted Successfully`,
        {nzDuration: 5000}
      );
      this.getAllAdsByUserId();

    })
  }

}

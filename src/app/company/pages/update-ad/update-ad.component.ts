import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';


import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzUploadModule,
    NzNotificationModule,
    NzIconModule
  ]
})
export class UpdateAdComponent implements OnInit {
  adId: any;
  validateForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService, 
    private router: Router,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.adId = this.activatedRoute.snapshot.paramMap.get('id');
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
    this.getAdById();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  updateAd() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('serviceName', this.validateForm.get('serviceName')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);

    this.companyService.updateAd(this.adId, formData).subscribe(
      () => {
        this.notification.success('SUCCESS', 'Ad Updated Successfully!', { nzDuration: 5000 });
        this.router.navigateByUrl('/company/ads');
      },
      (error) => {
        console.error('Error:', error);
        this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
      }
    );
  }

  getAdById() {
    this.companyService.getAdById(this.adId).subscribe((res) => {
      this.validateForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
    });
  }
}

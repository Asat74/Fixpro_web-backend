import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create-ad',
  standalone: false,
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent {

  selected: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm! : FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,
    private notification : NzNotificationService,
    private router : Router,
    private companyService : CompanyService){}

    ngOnInit(){
      this.validateForm = this.fb.group({
        serviceName: [null,[Validators.required]],
        description: [null,[Validators.required]],
        price: [null,[Validators.required]],
      })
    }

    onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
}

previewImage() {
    if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
    }
}

postAd() {
    if (!this.selectedFile || !this.validateForm.valid) {
        console.error('File or form data is missing');
        return;
    }

    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);

    this.companyService.postAd(formData).subscribe(
      (res) => {
        this.notification.success('SUCCESS', 'Ad Posted Successfully!', { nzDuration: 5000 });
        this.router.navigateByUrl('/company/ads');
      },
      (error) => {
      console.error('Error:', error);
      this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
    }
    );
  }

}

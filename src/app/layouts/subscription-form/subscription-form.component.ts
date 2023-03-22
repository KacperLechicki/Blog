import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Subscriber } from 'src/app/models/subscriber';
import { LoadingService } from 'src/app/services/loading.service';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent {
  subscriptionForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private subService: SubscribersService,
    private loadingS: LoadingService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscriptionForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    let subData: Subscriber = {
      email: this.subscriptionForm.value.email,
      name: this.subscriptionForm.value.name,
      createdAt: new Date()
    }
    if (this.subscriptionForm.valid) {
      this.loading = this.loadingS.loadingStart();
      this.subService.saveData(subData);
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 1000);
      this.subscriptionForm.reset();
    }
  }
}
